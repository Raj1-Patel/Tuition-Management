import React, { useState, useEffect } from "react";
import { getStudents, setStudents } from "../utils/localStorageUtils";
import "./StudentProgres.css";

function StudentProgres() {
  const [students, setStudentsState] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [progressText, setProgressText] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setStudentsState(getStudents());
  }, []);

  const handleSelectStudent = (e) => {
    const id = e.target.value;
    setSelectedStudentId(id);
    const student = students.find((s) => s.id === id);
    if (student) {
      setProgressText(student.progress || "");
      setIsEdit(true);
    } else {
      setProgressText("");
      setIsEdit(false);
    }
  };

  const handleSaveProgress = () => {
    if (!selectedStudentId) {
      alert("Please select a student");
      return;
    }
    let updatedStudents = students.map((s) =>
      s.id === selectedStudentId ? { ...s, progress: progressText.trim() } : s
    );
    setStudents(updatedStudents);
    setStudentsState(updatedStudents);
    alert("Progress updated successfully!");
    setSelectedStudentId("");
    setProgressText("");
    setIsEdit(false);
  };

  const handleDeleteProgress = (id) => {
    if (window.confirm("Are you sure you want to delete this student's progress?")) {
      let updatedStudents = students.map((s) =>
        s.id === id ? { ...s, progress: "" } : s
      );
      setStudents(updatedStudents);
      setStudentsState(updatedStudents);
    }
  };

  return (
    <div className="progress-container">
      <h2>Student Progress Management</h2>

      <div className="progress-form">
        <select
          value={selectedStudentId}
          onChange={handleSelectStudent}
          className="student-select"
        >
          <option value="">Select Student</option>
          {students.map((stu) => (
            <option key={stu.id} value={stu.id}>
              {stu.name} ({stu.id})
            </option>
          ))}
        </select>

        <textarea
          placeholder="Enter progress details here..."
          value={progressText}
          onChange={(e) => setProgressText(e.target.value)}
          rows={4}
          className="progress-textarea"
          disabled={!selectedStudentId}
        />

        <button className="btn-save" onClick={handleSaveProgress}>
          {isEdit ? "Update Progress" : "Add Progress"}
        </button>
      </div>

      <div className="progress-list">
        <h3>All Students Progress</h3>
        {students.length === 0 ? (
          <p className="empty-msg">No Students Found.</p>
        ) : (
          <table className="progress-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu.id}>
                  <td>{stu.id}</td>
                  <td>{stu.name}</td>
                  <td className="progress-cell">{stu.progress || "No progress"}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => {
                        setSelectedStudentId(stu.id);
                        setProgressText(stu.progress || "");
                        setIsEdit(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteProgress(stu.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentProgres;
