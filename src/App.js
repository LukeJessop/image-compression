import { useState } from "react";
import "./App.css";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import Compressor from "compressorjs";

function App() {
  const [stateImgFile, setStateImgFile] = useState();
  const [demoActive, setDemoActive] = useState(false);

  const [firstImage, setFirstImage] = useState();
  const [firstImageSize, setFirstImageSize] = useState();

  const [compressedImage, setCompressedImage] = useState();
  const [compressedImageSize, setCompressedImageSize] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    let imgFile = e.target.files[0];
    setStateImgFile(imgFile);
    setStateImages(imgFile, "first");
  };

  const setStateImages = (imgFile, state) => {
    let reader = new FileReader();
    reader.readAsDataURL(imgFile);

    reader.onload = (event) => {
      let img_url = event.target.result;
      if (state === "first") {
        setFirstImage(img_url);
        setFirstImageSize(imgFile.size);
        compressFile(imgFile);
      }
      if (state === "compressed") {
        setCompressedImage(img_url);
        setCompressedImageSize(imgFile.size);
      }
    };
  };

  const compressFile = (file) => {
    new Compressor(file, {
      quality: 0.1,
      success(result) {
        setStateImages(result, "compressed");
      }
    });
  };

  return (
    <div className="App">
      <button
      className="demo-trigger"
        onClick={() =>
          demoActive ? setDemoActive(false) : setDemoActive(true)
        }
      >
        {" "}
        Demo{" "}
      </button>
      {!demoActive ? (
        <>
          <div className="upload-container">
            <div>
              <h3>Upload file!</h3>
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .gif, .mp4"
                onChange={(e) => {
                  submitHandler(e);
                }}
              />
            </div>
          </div>
          <div className="image-container">
            <div>
              <h2>Before Compression</h2>
              <img src={firstImage} />
              <h3>Size: {Math.floor(firstImageSize / 1000)}kb</h3>
            </div>
            <div>
              <h2>After Compression</h2>
              <img src={compressedImage} />
              <h3>Size: {Math.floor(compressedImageSize / 1000)}kb</h3>
            </div>
          </div>
        </>
      ) : (
        <SocialMedia imgFile={stateImgFile} />
      )}
    </div>
  );
}

export default App;
