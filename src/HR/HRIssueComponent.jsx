import React, { useEffect, useState } from "react";
import { getStudents, getIssues, setIssues } from "../utils/localStorageUtils";
import "./HRIssueComponent.css";

function HRIssueComponent() {
  const [issues, setIssuesState] = useState([]);

  useEffect(() => {
    const storedIssues = getIssues() || [];
    console.log("Loaded issues:", storedIssues);
    setIssuesState(storedIssues);
  }, []);

  const handleResolve = (id) => {
    if (window.confirm("Mark this issue as resolved?")) {
      const updatedIssues = issues.map((issue) => {
        if (issue.id === id) {
          return { ...issue, resolved: true };
        }
        return issue;
      });
      setIssues(updatedIssues);
      setIssuesState([...updatedIssues]);
    }
  };

  return (
    <div className="hr-issue-container">
      <h2>Student Issues</h2>
      {issues.length === 0 ? (
        <div className="empty">No student issues reported yet.</div>
      ) : (
        <ul className="issue-list">
          {issues.map(({ id, studentId, message, submittedAt, resolved }) => {
            const student = getStudents().find((s) => s.id === studentId) || {};
            const date = new Date(submittedAt);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            return (
              <li
                key={id}
                className={`issue-item ${resolved ? "resolved" : "unresolved"}`}
              >
                <div className="issue-header">
                  <span className="student-name">{student.name || "Unknown Student"}</span>
                  <span className="issue-datetime">
                    {formattedDate} {formattedTime}
                  </span>
                </div>
                <div className="issue-message">{message}</div>
                {resolved ? (
                  <div className="resolved-text">Solved</div>
                ) : (
                  <button className="resolve-btn" onClick={() => handleResolve(id)}>
                    Solve this problem
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default HRIssueComponent;
