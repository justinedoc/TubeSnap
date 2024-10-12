import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function VideoData({ videoData, dependencies }) {
  const [loading, setLoading] = useState(true);
  const [downloadURL, setDownloadURL] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://tube-snap.onrender.com/api/videos/download?videoURL=${encodeURIComponent(
            dependencies.url
          )}&format=${dependencies.format}&resolution=${
            dependencies.resolution
          }p`,
          {
            method: "GET",
          }
        );

        console.log("finished fetching");

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error("An error occured");
        }

        // Create a Blob from the response data
        const blob = await response.blob();
        const blobURL = URL.createObjectURL(blob);

        console.log("turning to blob");

        setDownloadURL(blobURL);
        setLoading(false);
        console.log("done");
      } catch (err) {
        console.error("Error downloading the video:", err);
        Swal.fire({
          title: "Ops...",
          icon: "error",
          text: "format unavailable",
        });
        console.log(err);
      }
    }

    fetchVideo();
  }, [videoData, dependencies]);

  function handleDownloadVideo() {
    if (!downloadURL) return;

    const aTag = document.createElement("a");
    aTag.href = downloadURL;
    aTag.download = `${videoData?.snippet.title}.${dependencies.format}`;
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    setTimeout(() => window.URL.revokeObjectURL(downloadURL), 100);
  }

  console.log(videoData);

  return (
    <section className="video-data__container">
      <div className="video-data">
        <div className="thumbnail">
          <img src={videoData?.snippet?.thumbnails?.default?.url} alt="" />
        </div>
        <div className="video__details">
          <div className="tags">
            <button className="tag">
              {dependencies.resolution && "Video"}
            </button>
            <button className="tag">
              {dependencies.resolution && `MP4 (${dependencies.resolution}p)`}
            </button>
          </div>
          <h1>{videoData?.snippet.title}</h1>

          <div className="url__link">
            <span>URL:</span>
            <a href={dependencies.url}>{dependencies.url}</a>
          </div>

          <button onClick={handleDownloadVideo} disabled={loading}>
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
              <>
                <svg
                  version="1.1"
                  id="L9"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="27"
                  viewBox="0 0 24 27"
                  fill="#fff"
                  enableBackground="new 0 0 0 0"
                >
                  <rect x="20" y="50" width="4" height="10" fill="#fff">
                    <animateTransform
                      attributeType="xml"
                      attributeName="transform"
                      type="translate"
                      values="0 0; 0 20; 0 0"
                      begin="0s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <rect x="30" y="50" width="4" height="10" fill="#fff">
                    <animateTransform
                      attributeType="xml"
                      attributeName="transform"
                      type="translate"
                      values="0 0; 0 20; 0 0"
                      begin="0.2s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <rect x="40" y="50" width="4" height="10" fill="#fff">
                    <animateTransform
                      attributeType="xml"
                      attributeName="transform"
                      type="translate"
                      values="0 0; 0 20; 0 0"
                      begin="0.4s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </svg>
                <span style={{ color: "#ffff" }}>Fetching video...</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
