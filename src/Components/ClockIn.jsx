import styled from "styled-components";

const ClockInFlow = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClockIn = (props) => {
  let jobs = [];
  let costCodes = [];
  let job;
  let costCode;

  for (let i = 500; i < 550; i++) {
    jobs.push(i);
  }

  for (let j = 0; j < 700; j++) {
    costCodes.push(j);
  }

  return props.clockedIn ? (
    <ClockInFlow>
      <select defaultValue={"Choose Job"} onChange={(e) => (job = e.target.value)}>
        {jobs && jobs.map((item) => <option label={item}>{item}</option>)}
      </select>
      <select onChange={(e) => (costCode = e.target.value)}>
        {costCodes && costCodes.map((item) => <option label={item}>{item}</option>)}
      </select>
      <button
        style={{ backgroundColor: "#9DE47C" }}
        onClick={() => {
          props.setJobId(job);
          props.setCostCode(costCode);
        }}>
        Done
      </button>
      {/* when done open the timer ui to show that info */}
      <button
        style={{ backgroundColor: "#FF6961" }}
        onClick={() => {
          props.setClockedIn(false);
        }}>
        cancel
      </button>
    </ClockInFlow>
  ) : (
    <button
      style={{ backgroundColor: "#9DE47C" }}
      onClick={() => {
        let time = Date.now();
        let date = new Date();
        props.setClockedIn(true);
        props.setClockInTime(time);
        props.setClockInDate(date);
      }}>
      Clock In
    </button>
  );
};

export default ClockIn;
