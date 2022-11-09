import { useState } from "react";
import "./App.css";
import Compressor from "compressorjs";

function App() {
  const [firstImage, setFirstImage] = useState();
  const [firstImageSize, setFirstImageSize] = useState();

  const [compressedImage, setCompressedImage] = useState();
  const [compressedImageSize, setCompressedImageSize] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    let imgFile = e.target.files[0];
    setStateImages(imgFile, "first");
  };

  const setStateImages = (imgFile, state) => {
    let reader = new FileReader();
    reader.readAsDataURL(imgFile);

    reader.onload = (event) => {
      let img_url = event.target.result;
      if (state === "first") {
        console.log(imgFile.size);
        setFirstImage(img_url);
        setFirstImageSize(imgFile.size);
        compressFile(imgFile, img_url);
      }
      if (state === "compressed") {
        console.log(imgFile.size);
        setCompressedImage(img_url);
        setCompressedImageSize(imgFile.size);
      }
    };
  };

  const compressFile = (file, img_url) => {
    new Compressor(file, {
      quality: 0.1,
      success(result) {
        setStateImages(result, "compressed");
      }
    });
  };

  return (
    <div className="App">
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

      <br />
      <div className="image-container">
        <div>
          <h2>Before Compression</h2>
          <img src={firstImage} />
          <h3>Size: {Math.floor(firstImageSize / 1000)}kb</h3>
        </div>
        <div>
          <p>quality</p>
          <input type="range" min="0" max="10" />
          <h2>After Compression</h2>
          <img src={compressedImage} />
          <h3>Size: {Math.floor(compressedImageSize / 1000)}kb</h3>
        </div>
      </div>
      <br />
      <div>
        <h1>Visual Example uses for compressed image</h1>
      </div>
    </div>
  );
}

export default App;
