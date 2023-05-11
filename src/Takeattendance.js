// taking.js

let takingAttendance = 0;

export const setTakingAttendance = (value) => {
  takingAttendance = parseInt(value);
}

export const getTakingAttendance = () => {
  return takingAttendance;
}
