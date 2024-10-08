import { Box } from "../ui/Box";

const contentFeatures = [
  {
    svg: (
      <svg
        width="150px"
        height="150px"
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
            d="M9.163 2.819C9 3.139 9 3.559 9 4.4V11H7.803c-.883 0-1.325 0-1.534.176a.75.75 0 0 0-.266.62c.017.274.322.593.931 1.232l4.198 4.401c.302.318.453.476.63.535a.749.749 0 0 0 .476 0c.177-.059.328-.217.63-.535l4.198-4.4c.61-.64.914-.96.93-1.233a.75.75 0 0 0-.265-.62C17.522 11 17.081 11 16.197 11H15V4.4c0-.84 0-1.26-.164-1.581a1.5 1.5 0 0 0-.655-.656C13.861 2 13.441 2 12.6 2h-1.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zM5 21a1 1 0 0 0 1 1h12a1 1 0 1 0 0-2H6a1 1 0 0 0-1 1z"
            fill="#ffffff"
          ></path>
        </g>
      </svg>
    ),
    title: "High-Quality Downloads",
    desc: "Download videos in resolutions up to 1080p or higher, so you never have to compromise on quality when watching offline.",
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.66 13.73L13.38 14.47L12.1 15.21C10.45 16.16 9.1 15.38 9.1 13.48V12V10.52C9.1 8.61 10.45 7.84 12.1 8.79L13.38 9.53L14.66 10.27C16.31 11.22 16.31 12.78 14.66 13.73Z"
            fill="#ffffff"
          ></path>{" "}
        </g>
      </svg>
    ),
    title: "Multiple Format Support",
    desc: "You can convert video and audio content into various formats like MP4, MP3, and more, ensuring compatibility with your devices.",
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
          <path
            d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
          <path
            d="M22 4.2V4.31C22 4.59 21.78 4.81 21.5 4.81H12.5C12.22 4.81 12 4.59 12 4.31V4.2C12 2.44 12.44 2 14.22 2H19.78C21.56 2 22 2.44 22 4.2Z"
            fill="#ffffff"
          ></path>{" "}
          <path
            d="M12.5 5.80859C12.22 5.80859 12 6.02859 12 6.30859V7.30859V8.29859C12 10.0586 12.44 10.4986 14.22 10.4986H19.78C21.56 10.4986 22 10.0586 22 8.29859V7.30859V6.30859C22 6.02859 21.78 5.80859 21.5 5.80859H12.5Z"
            fill="#ffffff"
          ></path>{" "}
          <path
            d="M12 15.7V15.81C12 16.09 11.78 16.31 11.5 16.31H2.5C2.22 16.31 2 16.09 2 15.81V15.7C2 13.94 2.44 13.5 4.22 13.5H9.78C11.56 13.5 12 13.94 12 15.7Z"
            fill="#ffffff"
          ></path>{" "}
          <path
            d="M2.5 17.3086C2.22 17.3086 2 17.5286 2 17.8086V18.8086V19.7986C2 21.5586 2.44 21.9986 4.22 21.9986H9.78C11.56 21.9986 12 21.5586 12 19.7986V18.8086V17.8086C12 17.5286 11.78 17.3086 11.5 17.3086H2.5Z"
            fill="#ffffff"
          ></path>{" "}
        </g>
      </svg>
    ),
    title: "Fast Conversion",
    desc: "Experience lightning-fast video conversions and downloads, so you can save your favorite content in seconds.",
  },
];

export function Features() {
  return (
    <section className="section__padding features__section">
      <h1>
        What Makes Us<span> Special</span>
      </h1>

      <div className="features__container">
        {contentFeatures.map((feature) => (
          <Box feature={feature} className="feature-box" key={feature.title} />
        ))}
      </div>
    </section>
  );
}
