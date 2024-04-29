import React, { useState, useEffect, useRef } from "react";

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(new Date() - startTimeRef.current);
      }, 10);
      return () => {
        clearInterval(intervalIdRef.current);
      };
    }
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = new Date() - elapsedTime;
  }
  function stop() {
    setIsRunning(false);
  }
  function reset() {
    setIsRunning(false);
    setElapsedTime(0);
  }

  function timeFormat() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="watch-container">
      <div className="watch">
        <p>{timeFormat()}</p>
        <button className="start-btn btn" onClick={start}>
          Start
        </button>
        <button className="stop-btn btn" onClick={stop}>
          Stop
        </button>
        <button className="reset-btn btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
