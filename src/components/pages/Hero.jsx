import ytLogo from "../../assets/icon/ytLogo.png";
import sparkle from "../../assets/icon/sparkle.png";
import playIcon from "../../assets/icon/play-svgrepo-com.png";
import musicIcon from "../../assets/icon/music-svgrepo-com.png";
import { InputBox } from "../ui/InputBox";
import { CopyRightWarning } from "../ui/CopyRightWarning";
import { VideoData } from "../ui/VideoData";
import { useFetchVideoData } from "../hooks/useFetchVideoData";
import Swal from "sweetalert2";
import "react-loading-skeleton/dist/skeleton.css";
import VideoCardSkeleton from "../ui/VideoCardSkeleton";

export function Hero() {
  const { videoData, loading, error, extractVideoId, dependencies } =
    useFetchVideoData();

  return (
    <section id="hero" className="hero__section section__padding">
      <HeroHeader />
      <InputBox extractVideoId={extractVideoId} />
      <CopyRightWarning />
      {loading && <VideoCardSkeleton />}
      {(!loading && videoData) && (
        <VideoData
          dependencies={dependencies}
          videoData={videoData}
          key={videoData.snippet}
        />
      )}
      {error &&
        Swal.fire({
          icon: "error",
          title: "Couldn't fetch video data.",
          text: error,
          timer: 3000,
        })}
    </section>
  );
}

function HeroHeader() {
  return (
    <div className="hero__text">
      <h1>
        Youtube Video <span>Downloader</span>
      </h1>
      <p>
        Try tubeSnap for quick, hassle-free downloads from Youtube. Transform
        your offline video collection with TubeSnap ~ A reliable and efficient
        downloader.
      </p>

      <img className="youtube" src={ytLogo} alt="" />
      <img className="star" src={sparkle} alt="" />
      <img className="playBtn" src={playIcon} alt="" />
      <img className="music" src={musicIcon} alt="" />
    </div>
  );
}
