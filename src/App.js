import React, { useState } from "react";
// import "./App.css";
import Teacher from "./Teacher";
import Student from "./Student";
import LocationDisplay from "./location";
import { setTakingAttendance, getTakingAttendance } from './Takeattendance';

function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const [attendanceValue, setAttendanceValue] = useState(getTakingAttendance());
  setInterval(() => {
    setAttendanceValue(getTakingAttendance());
  }, 1000);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="App">
      <h1>current status of Attendance : {attendanceValue}</h1>
      <LocationDisplay/>
      <h1>ATTENDANCE</h1>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>
      {selectedOption === "teacher" ? <Teacher  /> : null}
      {selectedOption === "student" ? <Student /> : null}
    </div>
  );
}

export default App;
