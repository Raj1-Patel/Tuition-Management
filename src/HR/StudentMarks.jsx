import React, { useState } from "react";
import { getStudents, setStudents } from "../utils/localStorageUtils";
import "./StudentMarks.css";

function StudentMarks() {
  const [students, setStudentsState] = useState(getStudents());
  const [selectedId, setSelectedId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [date, setDate] = useState("");
  const [score, setScore] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [message, setMessage] = useState("");

  // Refresh students list from localStorage
  const refreshStudents = () => {
    setStudentsState(getStudents());
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  // Student dropdown change
  const handleStudentSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);

    const student = students.find((s) => s.id === id);
    setStudentName(student ? student.name : "");

    // Reset form fields
    setCourseName("");
    setDate("");
    setScore("");
    setIsEdit(false);
    setEditIndex(-1);
  };

  // Save or update mark
  const handleSaveMark = () => {
    if (!selectedId || !courseName || !date || !score) {
      showMessage("Please fill all fields");
      return;
    }

    const allStudents = getStudents();
    const studentIndex = allStudents.findIndex((s) => s.id === selectedId);
    if (studentIndex === -1) return;

    const newMark = { courseName, date, score };

    if (isEdit) {
      allStudents[studentIndex].marks[editIndex] = newMark;
      showMessage("Mark updated successfully!");
      setIsEdit(false);
      setEditIndex(-1);
    } else {
      if (!allStudents[studentIndex].marks) {
        allStudents[studentIndex].marks = [];
      }
      allStudents[studentIndex].marks.push(newMark);
      showMessage("Mark added successfully!");
    }

    setStudents(allStudents);
    refreshStudents();
    setCourseName("");
    setDate("");
    setScore("");
  };

  // Edit mark
  const handleEditMark = (mark, index) => {
    setCourseName(mark.courseName);
    setDate(mark.date);
    setScore(mark.score);
    setIsEdit(true);
    setEditIndex(index);
    showMessage("Editing mark...");
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setCourseName("");
    setDate("");
    setScore("");
    setIsEdit(false);
    setEditIndex(-1);
    showMessage("Edit cancelled");
  };

  // DELETE mark
  const handleDeleteMark = (index) => {
    const allStudents = getStudents();
    const studentIndex = allStudents.findIndex((s) => s.id === selectedId);
    if (studentIndex === -1) return;
    allStudents[studentIndex].marks.splice(index, 1);
    setStudents(allStudents);
    refreshStudents();
    showMessage("Mark deleted!");
  };

  // Get current student's marks
  const getCurrentStudentMarks = () => {
    if (!selectedId) return [];
    const student = students.find((s) => s.id === selectedId);
    return student?.marks || [];
  };

  // Score color class
  const getScoreClass = (score) => {
    const numScore = parseInt(score, 10);
    if (numScore >= 90) return "score-excellent";
    if (numScore >= 75) return "score-good";
    if (numScore >= 60) return "score-average";
    return "score-poor";
  };

  return (
    <div className="student-marks-container">
      <h3>Student Marks Management</h3>

      {message && <div className="message">{message}</div>}

      <div className="form-section">
        <div className="form-group">
          <label>Select Student</label>
          <select value={selectedId} onChange={handleStudentSelect}>
            <option value="">Choose student...</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.id})
              </option>
            ))}
          </select>
        </div>

        {selectedId && (
          <>
            <hr />

            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                value={studentName}
                disabled
                placeholder="Student name will appear here"
              />
            </div>

            <div className="form-group">
              <label>Course Name</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Score</label>
              <input
                type="text"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Enter score (0-100)"
              />
            </div>

            <div className="button-group">
              <button
                className={isEdit ? "update-button" : "add-button"}
                onClick={handleSaveMark}
              >
                {isEdit ? "Update Mark" : "Add Mark"}
              </button>
              {isEdit && (
                <button className="cancel-button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Marks Table Section */}
      {selectedId && (
        <div className="table-section">
          <h4>Marks for {studentName}</h4>

          {getCurrentStudentMarks().length === 0 ? (
            <div className="no-marks">
              <p>No marks recorded yet.</p>
              <p>Add marks using the form above.</p>
            </div>
          ) : (
            <table className="marks-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentStudentMarks().map((mark, index) => (
                  <tr key={index}>
                    <td>{mark.courseName}</td>
                    <td>{mark.date}</td>
                    <td className={getScoreClass(mark.score)}>
                      {mark.score}%
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditMark(mark, index)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        style={{
                          marginLeft: "8px",
                          background: "#e34141",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          padding: "0.2rem 0.7rem",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteMark(index)}
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
      )}
    </div>
  );
}

export default StudentMarks;
