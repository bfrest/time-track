import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import ClockIn from "./Components/ClockIn";
import Timer from "./Components/Timer";

//  ! clock in & out
//  ! persist curent time, even when app is closed
//  ! once clock out, save current time to "todays hours"
//  ! show all times clocked for the on seperate paged
//  ? home page only show clock in and out buttons with current running time

// todo add a "lunch" button that will pause the running time and start the break timer
// todo log in and out so data can be tied to user
// todo add database to store times over time
// todo dropdowns for job, cost code and description

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: sans-serif;
  background-color: #23232d;
  color: white;
  width: 100vw;
  /* #DC9CFD #FEEFEC#9DE47C #7968D8 #FDD47F #88C185 #FFA9C7 #23232D #17181C */

  button {
    background: none;
    border: none;
    padding: 10px;
    font-size: 1rem;
    width: 60vw;
    color: #23232d;
    border-radius: 10px;
    font-weight: 520;
  }

  select {
    width: 60vw;
    border: 2px solid #feefec;
    text-align: center;
    background-color: white;
  }
`;

function App() {
  const [clockedIn, setClockedIn] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [costCode, setCostCode] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockInDate, setClockInDate] = useState(null);

  return (
    <Main>
      {jobId && costCode ? (
        <Timer
          clockedIn={clockedIn}
          setClockedIn={setClockedIn}
          setCostCode={setCostCode}
          setJobId={setJobId}
          jobId={jobId}
          costCode={costCode}
          clockInTime={clockInTime}
          clockInDate={clockInDate}
        />
      ) : (
        <ClockIn
          clockedIn={clockedIn}
          setClockedIn={setClockedIn}
          setCostCode={setCostCode}
          setJobId={setJobId}
          clockInTime={clockInTime}
          setClockInTime={setClockInTime}
          setClockInDate={setClockInDate}
        />
      )}
    </Main>
  );
}

export default App;
