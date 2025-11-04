import React from "react";
import "./ProgressCard.css"
export default function StudentProgress({ student }) {
  return (
    <div className="progress-card">
      <h3>Course Progress</h3>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${student.progress || 0}%` }}
        ></div>
      </div>
      <p className="progress-value">{student.progress || 0}% Completed</p>
    </div>
  );
}
