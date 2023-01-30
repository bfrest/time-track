import styled from "styled-components";

const ClockInFlow = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClockIn = (props) => {
  let job;
  let costCode;
  console.log(props.clockedIn);
  return props.clockedIn ? (
    <ClockInFlow>
      <select onChange={(e) => (job = e.target.value)}>
        <option>536</option>
        <option>537</option>
      </select>
      <select onChange={(e) => (costCode = e.target.value)}>
        <option>02000 - earthwork</option>
        <option>00300 - layout</option>
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
