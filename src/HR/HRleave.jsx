import React, { useEffect, useState } from "react";
import "./HRleave.css";

export default function HRLeavePanel() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setRequests(stored);
  }, []);

  const handleDecision = (id, decision) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: decision } : req
    );
    setRequests(updated);
    localStorage.setItem("leaveRequests", JSON.stringify(updated));
  };

  const filteredRequests = requests.filter((req) =>
    req.student.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="leave-container">
      <h2 className="title">HR Leave Requests</h2>

      <input
        type="text"
        placeholder="Search by student name"
        className="input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredRequests.length === 0 ? (
        <p className="no-data">No leave requests found.</p>
      ) : (
        <div className="request-list">
          {filteredRequests.map((req) => (
            <div key={req.id} className="card">
              <p>
                <strong>Student:</strong> {req.student}
              </p>
              <p>
                <strong>Reason:</strong> {req.reason}
              </p>
              <p>
                <strong>From:</strong> {req.fromDate}
              </p>
              <p>
                <strong>To:</strong> {req.toDate}
              </p>
              <p className={`status ${req.status.toLowerCase()}`}>
                Status: {req.status}
              </p>

              {req.status === "Pending" && (
                <div className="btn-group">
                  <button
                    onClick={() => handleDecision(req.id, "Approved")}
                    className="btn-approve"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(req.id, "Rejected")}
                    className="btn-reject"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
