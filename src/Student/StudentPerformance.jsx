import React from "react";

export default function StudentPerformance({ student }) {
  return (
    <div className="marks-card">
      <h3>Performance Overview</h3>
      <div className="marks-list">
        {(student.performance || []).length > 0 ? (
          (student.performance || []).map((p, i) => (
            <div key={i} className="mark-item">
              <span>{p.subject}</span>
              <span>{p.score}%</span>
              <span>
                {p.score >= 90
                  ? "A+"
                  : p.score >= 80
                  ? "A"
                  : p.score >= 70
                  ? "B"
                  : p.score >= 60
                  ? "C"
                  : "D"}
              </span>
            </div>
          ))
        ) : (
          <div className="no-data">No performance data available</div>
        )}
      </div>
    </div>
  );
}
