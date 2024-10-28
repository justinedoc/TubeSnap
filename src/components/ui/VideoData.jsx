import { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export function VideoData({ videoData, dependencies }) {
  const [loading, setLoading] = useState(true);
  const [downloadURL, setDownloadURL] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("");

  const timeoutRef = useRef(null);

  // Polls progress of the video download
  const pollProgress = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `https://p.oceansaver.in/ajax/progress.php?id=${id}`
        );
        const data = await response.json();

        if (data.download_url) {
          setLoading(false);
          setDownloadURL(data.download_url);
          setLoadProgress((cur) => {
            if (cur < data?.progress) {
              return data?.progress;
            }
            return cur;
          });
          clearTimeout(timeoutRef.current);
          return;
        }

        if (data.progress <= 1000) {
          setLoadProgress((cur) => {
            if (cur < data?.progress) {
              return data?.progress;
            }
            return cur;
          });
          setLoadingText(data.text);
          // Schedule the next polling
          if (loadProgress === 1000) {
            clearTimeout(timeoutRef.current);
          } else {
            timeoutRef.current = setTimeout(() => pollProgress(id), 2000);
          }
        } else if (data.progress > 1000) {
          clearTimeout(timeoutRef.current); // Stop polling when download is ready
          throw new Error("An error occurred while fetching the video..");
        }
      } catch (err) {
        console.error("Error polling progress:", err);
        Swal.fire({
          title: "Oops...",
          icon: "error",
          text: "An error occurred, try again later",
        });
        clearTimeout(timeoutRef.current);
      }
    },
    [] // useCallback will preserve the function instance
  );

  // Fetch the video for download
  const fetchVideo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://tube-snap.onrender.com/api/videos/download?videoURL=${encodeURIComponent(
          dependencies.url
        )}&resolution=${dependencies.resolution}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        Swal.fire({
          title: "Oops...",
          icon: "error",
          text: "An error occurred",
        });
        throw new Error("An error occurred while fetching the video.");
      }

      const data = await response.json();

      await pollProgress(data?.data?.id); // Start polling progress
      setLoadProgress((cur) => {
        if (cur < data?.data?.progress) {
          return data?.data?.progress;
        }
        return cur;
      });
    } catch (err) {
      console.error("Error downloading the video:", err);
      Swal.fire({
        title: "Oops...",
        icon: "error",
        text: "An error occurred, try again later",
      });
    }
  }, [dependencies, pollProgress]);

  // Fetch video as soon as the component mounts
  useEffect(() => {
    fetchVideo();
    return () => clearTimeout(timeoutRef.current); // Clean up timeout on unmount
  }, [fetchVideo]);

  // Handle download click when video is ready
  const handleDownload = () => {
    if (downloadURL) {
      const a = document.createElement("a");
      a.href = downloadURL;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      Swal.fire({
        text: "Download not ready...",
      });
    }
  };

  const progressNum = loadProgress / 10;
  const progressWidth = `${progressNum}%`;

  return (
    <section className="video-data__container">
      <div className="video-data">
        <div className="thumbnail">
          <img
            src={
              videoData?.snippet?.thumbnails?.standard?.url ||
              videoData?.snippet?.thumbnails?.default?.url
            }
            alt="thumbnail"
          />
        </div>
        <div className="video__details">
          <div className="tags">
            <button className="tag">
              {dependencies?.resolution && isNaN(dependencies?.resolution)
                ? "Audio"
                : "Video"}
            </button>
            <button className="tag">
              {dependencies?.resolution && isNaN(dependencies?.resolution)
                ? dependencies?.resolution.toUpperCase()
                : `MP4 (${dependencies?.resolution}p)`}
            </button>
          </div>
          <h1>{videoData?.snippet.title}</h1>

          <div className="url__link">
            <span>URL:</span>
            <a href={dependencies?.url}>{dependencies?.url}</a>
          </div>

          <div className="button__container" onClick={handleDownload}>
            <div className="loading" style={{ width: progressWidth }}></div>
            <button disabled={loading}>
              {!loading ? (
                <>
                  <svg
                    width="24"
                    height="27"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 21.0002H16C18.8284 21.0002 20.2426 21.0002 21.1213 20.1215C22 19.2429 22 17.8286 22 15.0002V14.0002C22 11.1718 22 9.7576 21.1213 8.8789C20.3529 8.11051 19.175 8.01406 17 8.00195M7 8.00195C4.82497 8.01406 3.64706 8.11051 2.87868 8.87889C2 9.7576 2 11.1718 2 14.0002V15.0002C2 17.8286 2 19.2429 2.87868 20.1215C3.17848 20.4213 3.54062 20.6188 4 20.749"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M12 1V14M12 14L9 10.5M12 14L15 10.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>

                  <span style={{ color: "#ffff" }}>Save To Device</span>
                </>
              ) : (
                <span style={{ color: "#ffff" }}>
                  {loadingText || "Fetching"}... {`${loadProgress / 10}%`}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
