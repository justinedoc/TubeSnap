import { Logo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="section__padding">
      <div className="footer__container">
        <Logo />
        <div className="footer_links-rol">
          <h3>More Links</h3>
          <div className="footer_links-col">
            <li>
              <a href="/">Youtube to MP3</a>
            </li>
            <li>
              <a href="/">Youtube Video Downloader</a>
            </li>
            <li>
              <a href="/https://image-search-smoky-nine.vercel.app/">
                Image Library
              </a>
            </li>
            <li>
              <a href="https://justinedoc.vercel.app/#contact">Reach me</a>
            </li>
          </div>
        </div>
      </div>
      <div className="f_bottom">Copyright © 2024 All Rights Reserved.</div>
    </footer>
  );
}
