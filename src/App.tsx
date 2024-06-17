import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
function App() {
  const handleTakePhoto = (dataUri: string) => {
    // Convert the data URI to a Blob
    const byteString = atob(dataUri.split(',')[1]);
    const mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    // Generate a filename with the current date and time
    const now = new Date();
    const filename = `photo_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(3, '0')}.png`;

    // Create a link element to download the blob
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
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
  );
}

export default App;
