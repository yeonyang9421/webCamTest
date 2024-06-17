import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import GlobalStyle from "./GlobalStyle";
import WebcamCapture from "./WebcamCapture";
import WebcamStreamCapture from "./WebcamStreamCapture";
import styled from "styled-components";

interface ButtonProps {
  theme?: "blue" | "pink";
  disabled?: boolean;
  onClick?: () => void;
}

const Button = styled.button<ButtonProps>`
  background-color: #3f51b5;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0;
  font-size: 30px;
  text-transform: uppercase;
  margin: 20px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #283593;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

function App() {
  const [isSelectedPhotoCapture, setIsSelectedPhotoCapture] = useState(true);
  //react-html5-camera-photo
  /*   const handleTakePhoto = (dataUri: string) => {
    // Convert the data URI to a Blob
    const byteString = atob(dataUri.split(',')[1]);
    const mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    const now = new Date();
    const filename = `photo_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(3, '0')}.png`;

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };
  return (
    <div className="App">
      <header className="App-header">
           <div className="camera-container">
      <Camera
        onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        imageType={IMAGE_TYPES.PNG}
        isImageMirror={false}
      />
       <img src="https://youngintbasecamp2lrs.blob.core.windows.net/block/v2/aef6b7df-c911-4b33-9b2a-fabce731d971-preivew.png" alt="Overlay" className="overlay-image" />
       </div>
      </header>
    </div>
  ); */

  const onTakePickture = () => {
    setIsSelectedPhotoCapture(true);
  };
  const onRecordVideo = () => {
    setIsSelectedPhotoCapture(false);
  };

  return (
    <div style={{maxWidth:"800px"}}>
      <GlobalStyle />
      <Button onClick={onTakePickture} theme="pink">
        사진찍기{" "}
      </Button>
      <Button onClick={onRecordVideo} theme="pink">
        영상 녹화하기{" "}
      </Button>
      <div>
        {isSelectedPhotoCapture ? <WebcamCapture /> : <WebcamStreamCapture />}
      </div>
    </div>
  );
}

export default App;
