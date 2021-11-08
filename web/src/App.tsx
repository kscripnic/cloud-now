import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import moment from "moment";
import "./App.css";

function App() {
  const [peerId, setPeerId] = useState("");
  const [pingMS, setPingMS] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [globalConn, setGlobalCoon] = useState<Peer.DataConnection | null>(
    null
  );

  const init = async () => {
    const peer = new Peer("f5e0f2a2-19ed-42bd-8b70-2c033eacc9c6");
    peer.on("open", function (id) {
      setPeerId(id);
      peer.on("connection", function (conn) {
        console.log("conectouuu");
        setGlobalCoon(conn);
        conn.on("data", function (data) {
          switch (data.type) {
            case "ping":
            default:
              setPingMS(moment().diff(data.dt, "milliseconds"));
              setTimeout(() => {
                conn.send({ dt: moment().toISOString(), type: "ping" });
              }, 1000);
              break;
          }
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
      <div
        style={{ position: "absolute", backgroundColor: "white", zIndex: 2 }}
      >
        <p>{`peerId: ${peerId}`}</p>
        <p>{`ping: ${pingMS}`}</p>
        <p>v3</p>
      </div>

      <video
        autoPlay
        // ver como resolver o muted
        muted
        ref={videoRef}
        onPause={() => {
          if (videoRef.current) videoRef.current.play();
        }}
        onLoad={() => {
          if (videoRef.current) videoRef.current.play();
        }}
        style={{ height: "100%", width: "100%" }}
        onMouseMove={(e) => {
          if (globalConn)
            globalConn.send({
              type: "mouseMove",
              key: {
                x: e.clientX,
                y: e.clientY,
              },
            });
        }}
        onKeyDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (globalConn) globalConn.send({ type: "keyDown", key: e.key });
        }}
        onKeyUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (globalConn) globalConn.send({ type: "keyUp", key: e.key });
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (globalConn) globalConn.send({ type: "mouseDown", key: e.button });
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (globalConn) globalConn.send({ type: "mouseUp", key: e.button });
        }}
      />
    </div>
  );
}

export default App;
