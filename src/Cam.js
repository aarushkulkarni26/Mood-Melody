import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ml5 from "ml5";
import useInterval from "@use-it/interval";
import songs from "./songs.js";
import axios from "axios";
import ReactPlayer from "react-player/youtube";
let classifier;

function Cam() {
  const videoRef = useRef();
  const [gaugeData, setGaugeData] = useState([0.5, 0.5]);
  const [shouldClassify, setShouldClassify] = useState(true);
  const [youtubeid, setyoutubeid] = useState("");
  const [song, setSong] = useState("");
  const [request, setRequest] = useState(false);
  const opts = {
    height: "400",
    width: "400",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  useEffect(() => {
    classifier = ml5.imageClassifier(
      "https://teachablemachine.withgoogle.com/models/30c7A9hr8/" +
        "model.json",
      () => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          });
      }
    );
  }, []);
  useInterval(() => {
    if (classifier && shouldClassify) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        results.sort((a, b) => b.label.localeCompare(a.label));
        setGaugeData(results.map((entry) => entry.confidence));
      });
    }
  }, 500);

  return (
    <div style={{textAlign: 'center', backgroundColor: '#141432'}}>
      <h1>
        Check my emotion, Sad or Happy! <br />
      </h1>
      {/* <button
        className="btn btn-fill text-white border-0"
        onClick={() => {
          setShouldClassify(!shouldClassify);
        }}
      >
        {shouldClassify ? "Start!" : "Stop"}
      </button> */}
      <video
        ref={videoRef}
        style={{ transform: "scale(-1, 1)" }}
        width="800"
        height="400"
      />
      {gaugeData[1].toFixed(2) > gaugeData[0].toFixed(2) ? (
        <h1>You are Happy</h1>
      ) : (
        <h1>You are Sad</h1>
      )}
      <button onClick={() => {
        gaugeData[0].toFixed(2) > gaugeData[1].toFixed(2)
        ? setSong(songs[Math.floor(Math.random()) * 11].Songs)
        : setSong(songs[Math.floor(Math.random() * 20) + 10].Songs)
        console.log(song)
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?q=${song}&key=AIzaSyA1W2WwIH7qVtxWP1t5n16h4i62xp0KMOw`
        )
        .then((response) => {
          setyoutubeid(response.data.items[0].id.videoId);
          console.log(youtubeid);
          setRequest(true);
        });
      }} className="btn btn-fill text-white border-0">
        click me to get a song
      </button>
      <h1 style={{ textAlign: "center" }}>{song}</h1>
      {request == true ? (
        <div>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${youtubeid}`} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Cam;
