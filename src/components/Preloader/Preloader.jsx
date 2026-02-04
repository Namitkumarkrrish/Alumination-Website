import "./Preloader.css";
import preloaderVideo from "../../assets/uhd_30fps.mp4";

function Preloader({ onFinish }) {
  return (
    <div className="preloader">
      <video
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
        className="preloader-video"
      >
        <source src={preloaderVideo} type="video/mp4" />
      </video>
    </div>
  );
}



export default Preloader;
