import { useState } from "react";
import { setTakingAttendance, getTakingAttendance } from './Takeattendance';
// import {takingAttendance} from './Takeattendance'
const TeacherPage = () => {
  // get the current value of takingAttendance
  // setTakingAttendance(1);
  // let currentTakingAttendance = getTakingAttendance();
  // console.log(currentTakingAttendance); // should log 1
  
  const [selectedClass, setSelectedClass] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const [timeLeft, setTimeLeft] = useState(0);
  let countdownInterval;




  const handleClassChange = (e) => {
    const selectedRoomNumber = e.target.value;
    setSelectedClass(selectedRoomNumber);
    const selectedClassroom = classrooms.find(
      (classroom) => classroom.roomNumber === selectedRoomNumber
    );
    setSelectedClassroom(selectedClassroom);
  };



  const handleSetTime = (event) => {
    event.preventDefault();
    const time = parseInt(event.target.time.value);
    setTakingAttendance(1);

    setTimeLeft(time * 60);
    countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(countdownInterval);
      setTakingAttendance(0); 
      setTimeLeft(0);
    }, time * 60 * 1000);
  };
  

  
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };


  const handleAddClassroom = () => {
    // Check if roomNumber already exists in classrooms array
    if (classrooms.some((classroom) => classroom.roomNumber === roomNumber)) {
      alert(`Classroom ${roomNumber} already exists!`);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newClassroom = {
          roomNumber,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        };
        setClassrooms([...classrooms, newClassroom]);
        setRoomNumber("");
      },
      (error) => {
        alert(`Error getting location: ${error.message}`);
      }
    );
  };

  return (
    <div>

      <h1>Teacher Page</h1>
      <div>
        <label htmlFor="classDropdown">Select a Class:</label>
        <select id="classDropdown" value={selectedClass} onChange={handleClassChange}>
          <option value="">-- Select a Class --</option>
          {classrooms.map((classroom) => (
            <option key={classroom.roomNumber} value={classroom.roomNumber}>
              Room {classroom.roomNumber}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="roomNumber">Enter Room Number:</label>
        <input
          type="text"
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
        <button type="button" onClick={handleAddClassroom}>
          Add Classroom
        </button>
      </div>
      {selectedClassroom && (
        <div>
          <h2>Classroom: Room {selectedClassroom.roomNumber}</h2>
          <p>Latitude: {selectedClassroom.location.latitude}</p>
          <p>Longitude: {selectedClassroom.location.longitude}</p>
          <form onSubmit={handleSetTime}>
            <label htmlFor="time">Set time (in minutes): </label>
            <input type="number" id="time" name="time" min="1" required />
            <button disabled={handleSetTime}>Take Attendance</button>
          </form>
          {setTakingAttendance && (
            <div>
              <p>Taking Attendance</p>
              <p>Time left: {formatTime(timeLeft)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherPage;
