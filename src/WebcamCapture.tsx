import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

const CamWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width:670px;
`;

// const CardBorder = styled.div`
//   position: absolute;
//   border: 2px solid #ffffffcc;
//   box-shadow: 0 0 34px 0 black;
//   border-radius: 4%;
//   width: 80vw;
//   height: calc(80vw * 0.63);
//   max-width: 600px;
//   max-height: calc(600px * 1.63);
//   padding: 8px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   box-sizing: border-box;
//   cursor: pointer;
//   &:hover {
//     background: #ffffff22;
//   }
// `;

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

const videoConstraints = {
  width: 700,
  height: 1220,
  facingMode: "user",
};
const Img = styled.img`
  transform: scaleX(-1);
`;

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <CamWrap>
        <Webcam
          style={{ maxWidth:"700px" }}
          audio={false}
          mirrored
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        {/* <CardBorder onClick={capture}>
          현재 보이는 화면으로 사진 찍기
        </CardBorder> */}
        <img src="https://youngintbasecamp2lrs.blob.core.windows.net/block/v2/5503f2ed-81c9-4096-a43e-fec8a3c93edf-origin.png" alt="Overlay" className="overlay-image" />
      </CamWrap>
      <CamWrap>
      <div style={{display:"flex", justifyContent:"center"}}>
      <Button onClick={capture}>사진 찍기</Button>
      </div>
      </CamWrap>
      {imgSrc && <Img alt="pic" src={imgSrc} />}
    </>
  );
};

export default WebcamCapture;
