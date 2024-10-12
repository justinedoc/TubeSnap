import { useState, useEffect } from "react";
// import { useFetchVideoData } from "../hooks/useFetchVideoData";
const availRes = [360, 480, 720, 1080, 1440];

export function InputBox({ extractVideoId }) {
  const [showOptions, setShowOptions] = useState(false);
  const [resolution, setResolution] = useState(720);
  const [videoURL, setVideoURL] = useState("");
  const [format, setFormat] = useState("mp4")
  const SVGstyle = showOptions ? { rotate: "180deg" } : { rotate: "0deg" };

  useEffect(() => {
    document.addEventListener("click", handleSelectResolution);
    function handleSelectResolution(e) {
      if (
        e.target.tagName === "SPAN" &&
        e.target.parentElement.classList.contains("options")
      ) {
        setResolution(Number(e.target.dataset.value));
        setShowOptions(false);
      } else if (e.target.tagName === "rect" || e.target.tagName === "path") {
        return;
      } else {
        setShowOptions(false);
      }
    }

    return () => {
      document.removeEventListener("click", handleSelectResolution);
    };
  });

  return (
    <div className="input-box">
      <input
        type="url"
        placeholder="Paste URL here..."
        value={videoURL}
        onChange={(e) => setVideoURL(e.target.value)}
      />
      <div className="btn-wrapper">
        <div className="select">
          <span>MP4 ({resolution}p)</span>
          <svg
            onClick={() => setShowOptions((cur) => !cur)}
            style={{ ...SVGstyle, transition: ".2s ease" }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="6" fill="white"></rect>
            <path
              d="M8 11L12 15L16 11"
              stroke="#2D3436"
              strokeLinecap="round"
            ></path>
          </svg>
          <div className={`options ${showOptions ? "open" : null}`}>
            <h2>Video</h2>
            {availRes.map((res) => (
              <span key={res} data-value={res.toString()}>
                MP4 ({res}p)
              </span>
            ))}
          </div>
        </div>
        <div
          className="download"
          onClick={() => {
            videoURL && extractVideoId(videoURL, resolution, format);
            setVideoURL("");
          }}
        >
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
          <span>Download</span>
        </div>
      </div>
    </div>
  );
}
