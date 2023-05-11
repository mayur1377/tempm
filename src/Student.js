import React, { useState } from "react";
import { setTakingAttendance, getTakingAttendance } from './Takeattendance';

function Student(){ 
    const [attendanceValue, setAttendanceValue] = useState(getTakingAttendance());
    setInterval(() => {
        setAttendanceValue(getTakingAttendance());
      }, 1000);
  return (
    <div>
      <h1>Student Page</h1>

      <p>{attendanceValue ? "Attendance is being taken" : "No session right now"}</p>
    </div>
  );
};

export default Student;
