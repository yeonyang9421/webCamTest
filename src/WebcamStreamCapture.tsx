import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

interface ButtonProps {
  theme?: "blue" | "pink";
  disabled?: boolean;
  onClick?: () => void;
}

const Button = styled.button<ButtonProps>`
  background-color: #e91e63;
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
    background-color: #ad1457;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

const CamWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WebcamStreamCapture = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const handleDataAvailable = useCallback(
    (event: BlobEvent) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(event.data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    if (webcamRef.current?.stream) {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <>
      <CamWrap>
        <Webcam audio={false} ref={webcamRef} />
        <img
          src="https://youngintbasecamp2lrs.blob.core.windows.net/block/v2/9d959b44-fde6-4b42-bb84-63a30ce4ea75-origin.png"
          alt="Overlay"
          className="overlay-image"
        />
      </CamWrap>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {capturing ? (
          <Button onClick={handleStopCaptureClick}>녹화 끝내기</Button>
        ) : (
          <Button onClick={handleStartCaptureClick}>녹화 시작</Button>
        )}
      </div>
      <br />
      {recordedChunks.length > 0 && (
        <Button onClick={handleDownload}>영상 내려받기</Button>
      )}
    </>
  );
};

export default WebcamStreamCapture;
