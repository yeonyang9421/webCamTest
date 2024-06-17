import "./App.css";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

function App() {
  function handleTakePhoto(dataUri: string) {
    // Do stuff with the photo...
    console.log("takePhoto", dataUri);
  }
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
        <Camera
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
        />
      </header>
    </div>
  );
}

export default App;
