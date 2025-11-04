import React, { useState, useEffect } from "react";
import { FaUserGraduate } from "react-icons/fa";
import "./Studentleave.css";

export default function StudentLeave({ student }) {
  // Use student.name from props instead of localStorage
  const [studentName, setStudentName] = useState(student?.name || "");
  const [studentId, setStudentId] = useState(student?.id || "");

  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState(""); 
  const [toDate, setToDate] = useState("");
  const [requests, setRequests] = useState([]);

  // Load leave requests filtered for this student name prop
  useEffect(() => {
    if (!studentName) {
      setRequests([]);
      return;
    }
    const allRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const filtered = allRequests.filter(
      (req) => req.student.toLowerCase() === studentName.toLowerCase()
    );
    setRequests(filtered);
  }, [studentName]);

  // Update React state if student prop changes dynamically
  useEffect(() => {
    setStudentName(student?.name || "");
    setStudentId(student?.id || "");
  
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason || !fromDate || !toDate) {
      alert("Please fill all fields.");
      return;
    }
    if (!studentName) {
      alert("Student not identified.");
      return;
    }
    const newRequest = {
      id: Date.now(),
      student: studentName,
      reason,
      fromDate,
      toDate,
      status: "Pending",
    };

    const existingRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    existingRequests.push(newRequest);
    localStorage.setItem("leaveRequests", JSON.stringify(existingRequests));

    setRequests((prev) => [...prev, newRequest]);
    setReason("");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="leave-container">
      <h2 className="title">Student Leave Application</h2>
      <div className="student-badge">
        <FaUserGraduate /> <span>Student Name</span> - <span>{studentName}</span>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <textarea
          className="input"
          rows={4}
          placeholder="Enter reason for leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="date-section">
          <input
            type="date"
            className="input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit">
          Submit Leave
        </button>
      </form>

      <div className="history">
        <h3 className="sub-title">Leave History for {studentName}</h3>
        {requests.length === 0 ? (
          <p className="no-data">No leave requests found.</p>
        ) : (
          <div className="request-list">
            {requests.map((req) => (
              <div key={req.id} className="card">
                <p><strong>Reason:</strong> {req.reason}</p>
                <p><strong>From:</strong> {req.fromDate}</p>
                <p><strong>To:</strong> {req.toDate}</p>
                <p className={`status ${req.status.toLowerCase()}`}>Status: {req.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
