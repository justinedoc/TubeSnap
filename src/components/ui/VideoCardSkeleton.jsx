import Skeleton from "react-loading-skeleton";

function VideoCardSkeleton() {
  return (
    <section className="video-data__container">
      <div className="video-data">
        <div className="thumbnail thumbnail-skeleton">
          <Skeleton height={"30vh"} borderRadius={"15px"} />
        </div>
        <div className="video__details">
          <div className="tags">
            <div className="tag-skeleton">
              <Skeleton width={"70px"} height={"35px"} borderRadius={"20px"} />
            </div>
            <div className="tag-skeleton">
              <Skeleton width={"70px"} height={"35px"} borderRadius={"20px"} />
            </div>
          </div>

          <Skeleton count={3} height={"10px"} />

          <div className="skeleton__btn">
            <Skeleton width={"100%"} height={"50px"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoCardSkeleton;
