import { useState, useEffect } from "react";
import styled from "styled-components";
import { daysOfTheWeek } from "../assets/daysOfTheWeek";
import { months } from "../assets/months";

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
  font-size: 3rem;
`;

const Info = styled.div`
  background-color: #17181c;
  font-size: 1.4rem;
  margin-top: 15px;
  padding: 10px;
`;

const Timer = (props) => {
  const [runningTimer, setRunningTimer] = useState(0);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    let intervalId;

    if (props.clockedIn) {
      intervalId = setInterval(() => {
        setRunningTimer((runningTimer) => runningTimer + 1);
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
    setRunningTimer(0);
    props.setClockedIn(false);
    props.setJobId(null);
    props.setCostCode(null);
  };

  const cleanUpTime = (clockedInSeconds) => {
    let seconds;
    let minutes;
    let hours;

    // converts the number to a string and adds a 0 if single digit
    seconds = String(Math.floor(clockedInSeconds % 60)).padStart(2, 0);
    minutes = String(Math.floor(clockedInSeconds / 60)).padStart(2, 0);
    hours = String(Math.floor(clockedInSeconds / 3600)).padStart(2, 0);

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <TimerView>
      <Time>{cleanUpTime(runningTimer)}</Time>

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
        <p>Clocked in:</p>
        <p>Job: {props.jobId}</p>
        <p> {props.costCode}</p>
        <p>
          {months[props.clockInDate.getMonth()]}-{props.clockInDate.getDate()}-
          {props.clockInDate.getFullYear()}
        </p>
        <p>
          {String(props.clockInDate.getHours()).padStart(2, 0)}:
          {String(props.clockInDate.getMinutes()).padStart(2, 0)}:
          {String(props.clockInDate.getSeconds()).padStart(2, 0)} a.m.
        </p>
      </Info>
    </TimerView>
  );
};

export default Timer;
