import { useState, useCallback } from "react";
import Swal from "sweetalert2";

export function useFetchVideoData() {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dependencies, setDependencies] = useState({
    resolution: null,
    url: null,
  });
  const apiKey = process.env.REACT_APP_API_YOUTUBE;

  const fetchVideoData = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setVideoData(data?.items[0]);
        console.log("done");
      } catch (err) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    },
    [apiKey]
  );

  function extractVideoId(url, res) {
    let videoId = null;
    let playlistId = null;
    const youtubeRegex =
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})|youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);

    if (match && match[1]) {
      videoId = match[1];
    } else if (match && match[2]) {
      // If it's a playlist
      playlistId = match[2];
    } else if (url.length === 11) {
      videoId = url;
    } else if (!match) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Invalid Input!",
      });
      return;
    }

    fetchVideoData(videoId);
    setDependencies({ ...dependencies, resolution: res, url });
    console.log(videoId, res);
  }

  return { videoData, loading, error, extractVideoId, dependencies };
}
