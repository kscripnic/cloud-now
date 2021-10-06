import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import moment from "moment";
import "./App.css";

function App() {
  const [peerId, setPeerId] = useState("");
  const [pingMS, setPingMS] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const init = async () => {
    const peer = new Peer();
    peer.on("open", function (id) {
      setPeerId(id);
      peer.on("connection", function (conn) {
        console.log("conectouuu");
        conn.on("data", function (data) {
          setPingMS(moment().diff(data.dt, "milliseconds"));
          setTimeout(() => {
            conn.send({ dt: moment().toISOString() });
          }, 1000);
        });

        // Send messages
        conn.send({ dt: moment().toISOString() });
      });

      peer.on("call", function (call) {
        // Answer the call, providing our mediaStream
        call.answer();
        call.on("stream", function (stream) {
          if (videoRef.current) videoRef.current.srcObject = stream;
        });
      });

      peer.on("error", function (err) {
        console.log(err);
      });
    });
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div className="App">
      <p>{`peerId: ${peerId}`}</p>
      <p>{`ping: ${pingMS}`}</p>
      <video
        autoPlay
        ref={videoRef}
        controls
        style={{ height: 400, width: 600 }}
        onMouseMove={(e) => {
          console.log(e.movementX);
        }}
      />
    </div>
  );
}

export default App;
