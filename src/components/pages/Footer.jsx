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
              <a href="/abc">Youtube to MP3</a>
            </li>
            <li>
              <a href="/abc">Youtube Video Downloader</a>
            </li>
            <li>
              <a href="/abc">Image Searcher</a>
            </li>
            <li>
              <a href="/abc">Contact Us</a>
            </li>
          </div>
        </div>
      </div>
      <div className="f_bottom">Copyright © 2024 All Rights Reserved.</div>
    </footer>
  );
}
