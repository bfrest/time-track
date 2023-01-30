import { useState, useEffect } from "react";
import styled from "styled-components";

const TimerView = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
  height: 100vh;

  button,
  select {
    margin-top: 15px;
  }
`;

const Time = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Info = styled.div`
  border: 2px solid red;
  margin-top: 15px;
`;

const Timer = (props) => {
  const [runningTimer, setRunningTimer] = useState("00:00:00");
  const [description, setDescription] = useState(null);

  // function to take the clocked in time and subtract it from the current time and display that number.
  const compareTimes = (clockInMilliseconds) => {
    // compare the current time to the clocked in time which is sent here through props
    // then I want to convert the miliseconds into readable time and return that
    let currentTimeMilliseconds = Date.now();

    let hours = String(
      Math.floor((currentTimeMilliseconds - clockInMilliseconds) / 1000 / 60 / 60),
    ).padStart(2, 0);
    let minutes = String(
      Math.floor((currentTimeMilliseconds - clockInMilliseconds) / 1000 / 60),
    ).padStart(2, 0);
    let seconds = String(
      Math.floor((currentTimeMilliseconds - clockInMilliseconds) / 1000),
    ).padStart(2, 0);

    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    let intervalId;
    if (props.clockedIn) {
      intervalId = setInterval(() => {
        let timeLapsed = compareTimes(props.clockInTime);
        setRunningTimer(timeLapsed);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); // clear on unmount
  }, [props.clockedIn]);

  const handleStart = () => props.setclockedIn(true);

  const handlePause = () => {
    props.setClockedIn(false);
  };

  const handleReset = () => {
    props.setClockedIn(false);
    setRunningTimer("00:00:00");
    props.setClockedIn(false);
    props.setJobId(null);
    props.setCostCode(null);
  };

  const cleanupRunningTime = (milliseconds) => {
    let seconds = Math.floor(milliseconds / 1000 / 60);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    return (
      <span>
        <span>{String(hours).padStart(2, 0)}</span>
      </span>
    );
  };
  return (
    <TimerView>
      <Time>{runningTimer}</Time>

      <button
        style={{ backgroundColor: "#FDD47F" }}
        onClick={() => {
          handlePause();
        }}>
        BREAK
      </button>
      <button
        style={{ backgroundColor: "#FF6961" }}
        onClick={() => {
          handleReset();
        }}>
        CLOCK OUT
      </button>

      <Info>
        <p>Job: {props.jobId}</p>
        <p>Cost Code: {props.costCode}</p>
        <p>
          date: {props.clockInDate.getDate()}
          {props.clockInDate.getMonth()}
        </p>
      </Info>
    </TimerView>
  );
};

export default Timer;
