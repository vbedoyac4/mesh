//1. Install dependencies @tensorflow/tfjs @tensorflow-models/face-landmarks-detection react-webcam
//2. Import dependencies 

import React, {useRef} from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import Webcam from 'react-webcam';
import {drawMesh} from './utilities';

function App() {

  //4. Define references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null); 

  //5. Load facemesh
const runFacemesh = async () => {
  const net = await facemesh.load(
    facemesh.SupportedPackages.mediapipeFacemesh,
    {  
    inputResolution:{width:640, height:480}, 
    scale:0.8
  });
  setInterval(() => {
  },100)
};

//6. Detect function 
const detect = async (net) => {
  if(typeof webcamRef.current != "undefined" &&
  webcamRef.current !== null && webcamRef.current.video.readyState === 4) //Check si esta recibiendo info de la camara
  {
    //Set video properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    //Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    //Set canvas width
    canvasRef.current.video.width = videoWidth;
    canvasRef.current.video.height = videoHeight;

    //Make detections
    const face = await net.estimateFace(video);
    console.log(face);

    //Get canvas context for drawing
    const ctx = canvasRef.current.getContext('2d');
    drawMesh(face, ctx);

  }
};

  return (
    <div className="App">
      <header className="App-header">
      <Webcam
         ref = {webcamRef}
         style = {{
           position: "absolute",
           marginLeft:"auto",
           marginRight:"auto",
           left: 0,
           right: 0,
           textAlign: "center",
           zIndex:9,
           width:640,
           height:480,
         }}/>
         <canvas
          ref = {canvasRef}
          style = {{
            position: "absolute",
            marginLeft:"auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex:9,
            width: 640,
            height: 480,

          }}
         /> 
      </header>
    </div>
  );
}

export default App;
