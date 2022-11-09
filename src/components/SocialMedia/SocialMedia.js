import { useState, useEffect } from "react";
import Compressor from "compressorjs";
import "./socialmedia.css";

const SocialMedia = ({ imgFile }) => {
  const [lowRes, setLowRes] = useState();
  const [lowResSize, setLowResSize] = useState();

  const [midRes, setMidRes] = useState();
  const [midResSize, setMidResSize] = useState();

  const [highRes, setHighRes] = useState();
  const [highResSize, setHighResSize] = useState();

  useEffect(() => {
    if (imgFile) {
      multiLevelCompression(imgFile);
    }
  }, [imgFile]);

  const setStateImages = (imgFile, qual) => {
    let reader = new FileReader();
    reader.readAsDataURL(imgFile);

    reader.onload = (event) => {
      let img_url = event.target.result;
      if (qual === "low") {
        setLowRes(img_url);
        setLowResSize(imgFile.size);
      }
      if (qual === "mid") {
        setMidRes(img_url);
        setMidResSize(imgFile.size);
      }
      if (qual === "high") {
        setHighRes(img_url);
        setHighResSize(imgFile.size);
      }
    };
  };

  const multiLevelCompression = (file) => {
    new Compressor(file, {
      quality: 1,
      width: 280,
      success(result) {
        setStateImages(result, "low");
      }
    });
    new Compressor(file, {
      quality: 1,
      height: 600,
      success(result) {
        setStateImages(result, "mid");
      }
    });
    new Compressor(file, {
      quality: 1,
      width: 1000,
      success(result) {
        setStateImages(result, "high");
      }
    });
  };

  const imgArr = [
    { img: midRes, description: "mid res photo" },
    { img: midRes, description: "mid res photo" },
    { img: midRes, description: "mid res photo" },
    { img: midRes, description: "mid res photo" }
  ];

  const imgMap = imgArr.map((e, i) => {
    return (
      <div key={i} className="post-wrapper">
        <h6>{e.description}</h6>
        <div
          style={{ backgroundImage: `url(${midRes})` }}
          className="post-img"
          ></div>
          <p>{midResSize / 1000}kb</p>
      </div>
    );
  });
  return (
    <div className="social-media-container">
      <div className="img-sizes">
      </div>
      <div className="nav-bar">
        <p>{lowResSize / 1000}kb</p>
        <div
          style={{ backgroundImage: `url(${lowRes})` }}
          className="profile-picture"
          src={lowRes}
        ></div>
      </div>
      <div style={{ backgroundImage: `url(${highRes})` }} className="hero">
        <p>{highResSize / 1000}kb</p>
      </div>

      <div className="main-content">{imgMap}</div>
    </div>
  );
};

export default SocialMedia;
