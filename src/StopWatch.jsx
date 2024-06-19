import React, { useState, useEffect, useRef } from "react";
import AddElapseTime from "./assets/AddElapseTime";
export default function StopWatch() {
  const [timeList, setTimeList] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    //first the effect works but the condition fo running is false so nothing will happen
    // after clicking on start the isRunning is changed now that makes the useEffect works
    //now the condition is true so the code runs , then we click on stop or reset the isRunning is
    //changed so the useEffect is clean up  and and the useEffect is working to finish new round but
    //  the condition is false now so the useEffect is has no side effect code to run

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

  function save() {
    setTimeList([
      `${String(Math.floor((elapsedTime / (1000 * 60)) % 60)).padStart(
        2,
        "0"
      )}:${String(Math.floor((elapsedTime / 1000) % 60)).padStart(
        2,
        "0"
      )}:${String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, "0")}`,
      ...timeList,
    ]);
  }
  function timeFormat() {
    //     % 60:

    // The % operator is the modulo operator, which returns the remainder of a division operation.
    // Applying % 60 to the number of seconds will give you the remainder when the number of seconds is divided by 60. This is used to get the number of seconds that have passed within the current minute.
    // For example, if the number of seconds is 125, 125 % 60 would be 5, because 125 seconds is 2 minutes and 5 seconds.
    // Math.floor(...):

    // Math.floor() is a JavaScript function that rounds down to the nearest integer.
    // This ensures that the value of seconds is an integer, which is typically desired when dealing with time values.
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
  function handleDelete(index) {
    setTimeList(timeList.filter((_, i) => i !== index));
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
        <button className="add-btn btn" onClick={save}>
          Add{" "}
        </button>
        <div className="list">
          <AddElapseTime timeList={timeList} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
