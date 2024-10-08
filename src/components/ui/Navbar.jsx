import { useEffect, useState } from "react";
import moonIcon from "../../assets/icon/moonSVG.png";
import sunIcon from "../../assets/icon/sun-svgrepo-com.png";
import { Logo } from "./Logo";

export function Navbar() {
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [navOpen, setnavOpen] = useState(false);
  const [curTheme, setCurTheme] = useState(null);

  useEffect(() => {
    setCurTheme(localStorage.getItem("theme"));
    switch (curTheme) {
      case "dark":
        document.body.classList.add("dark__mode");
        setIsDarkmode(true);
        break;
      case "light":
        document.body.classList.remove("dark__mode");
        setIsDarkmode(false);
        break;
      default:
        document.body.classList.remove("dark__mode");
        setIsDarkmode(false);
        break;
    }
  }, [curTheme, navOpen]);

  const SVGColor = isDarkmode ? "#ffff" : "#000";

  return (
    <nav className={`${isDarkmode ? "switched" : null}`}>
      <Logo />
      <div className={`nav-links ${navOpen ? "open" : null}`}>
        <ul>
          <li className="active">
            <a href="/tube">YT Video Downloader</a>
          </li>
          <li>
            <a href="/tube">Youtube to MP3</a>
          </li>

          <div className="theme__switch-container">
            <div
              className={`theme-switch`}
              onClick={() => {
                localStorage.setItem("theme", isDarkmode ? "light" : "dark");
                setCurTheme(localStorage.getItem("theme"));
              }}
            >
              {!isDarkmode ? <span>Light</span> : <img src={sunIcon} alt="" />}
              {isDarkmode ? <span>Dark</span> : <img src={moonIcon} alt="" />}
            </div>
          </div>
        </ul>
      </div>
      {window.screen.availWidth <= 767 && (
        <div className="mobile-nav" onClick={() => setnavOpen((cur) => !cur)}>
          {!navOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g id="Menu / Menu_Alt_05">
                  {" "}
                  <path
                    id="Vector"
                    d="M5 17H13M5 12H19M11 7H19"
                    stroke={SVGColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                  fill={SVGColor}
                ></path>
              </g>
            </svg>
          )}
        </div>
      )}
    </nav>
  );
}
