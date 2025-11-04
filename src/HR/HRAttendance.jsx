import React, { useState, useEffect } from "react";
import {
  getStudents,
  getAttendanceRecords,
  saveAttendance,
} from "../utils/localStorageUtils";
import "./HRAttendance.css";

export default function HRAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [records, setRecords] = useState([]);

  // ✅ Load students + attendance data on page load
  useEffect(() => {
    const allStudents = getStudents() || [];
    setStudents(allStudents);

    const savedRecords = getAttendanceRecords() || [];
    setRecords(savedRecords);
  }, []);

  // ✅ Mark attendance for each student
  const handleMarkAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // ✅ Save attendance to localStorage
  const handleSave = () => {
    if (students.length === 0) {
      alert("No students found!");
      return;
    }

    if (Object.keys(attendance).length !== students.length) {
      alert("⚠ Please mark attendance for ALL students before saving!");
      return;
    }

    const now = new Date();
    const record = {
      id: Date.now(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      details: students.map((s) => ({
        studentId: s.id,
        name: s.name,
        status: attendance[s.id], // present/absent
      })),
    };

    saveAttendance(record);
    setRecords([...records, record]);
    setAttendance({});
    alert("✅ Attendance saved!");
  };

  return (
    <div className="hr-attendance">
      <h2>HR Attendance Panel</h2>

      {/* ✅ Mark Attendance Table */}
      <table className="attendance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mark Attendance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>
                <button
                  className={`present-btn ${
                    attendance[student.id] === "present" ? "active" : ""
                  }`}
                  onClick={() => handleMarkAttendance(student.id, "present")}
                >
                  Present
                </button>
                <button
                  className={`absent-btn ${
                    attendance[student.id] === "absent" ? "active" : ""
                  }`}
                  onClick={() => handleMarkAttendance(student.id, "absent")}
                >
                  Absent
                </button>
              </td>
              <td>
                {attendance[student.id]
                  ? attendance[student.id].toUpperCase()
                  : "Not Marked"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="save-btn" onClick={handleSave}>
        Save Attendance
      </button>

      {/* ✅ Attendance History */}
      <h3>Attendance Records</h3>
      {records.length === 0 ? (
        <p>No attendance records yet!</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Student</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.flatMap((record) =>
              record.details.map((detail, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.time}</td>
                  <td>{detail.name}</td>
                  <td
                    className={
                      detail.status === "present" ? "present" : "absent"
                    }
                  >
                    {detail.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
