import React, { useState, useEffect } from "react";
import { getStudents } from "../utils/localStorageUtils";
import "./Exam.css";

function Exam() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [paperTitle, setPaperTitle] = useState("");
  const [adminName, setAdminName] = useState("");
  const [file, setFile] = useState(null);
  const [sentPapers, setSentPapers] = useState([]);

  useEffect(() => {
    const data = getStudents();
    setStudents(data);
  }, []);

  const handleSend = () => {
    if (!selectedStudent || !paperTitle || !file || !adminName) {
      alert("Fill all fields and select a file.");
      return;
    }
    const student = students.find(s => s.id === selectedStudent);
    setSentPapers([
      ...sentPapers,
      {
        id: Date.now(),
        student,
        paperTitle,
        fileName: file.name,
        adminName
      }
    ]);
    setPaperTitle("");
    setFile(null);
    setSelectedStudent("");
    setAdminName("");
  };

  return (
    <div className="exam-container">
      <h2>Send Question Paper</h2>
      <div className="exam-form-card">
        <select
          className="select"
          value={selectedStudent}
          onChange={e => setSelectedStudent(e.target.value)}
        >
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="input"
          placeholder="Question Paper Title"
          value={paperTitle}
          onChange={e => setPaperTitle(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Sender Admin Name"
          value={adminName}
          onChange={e => setAdminName(e.target.value)}
        />
        <input
          type="file"
          className="file-input"
          onChange={e => setFile(e.target.files[0])}
        />
        <button className="send-btn" onClick={handleSend}>Send Paper</button>
      </div>
      <div className="sent-list">
        <h3>Papers Sent</h3>
        <ul>
          {sentPapers.map(paper => (
            <li key={paper.id} className="sent-item-card">
              <span><strong>{paper.paperTitle}</strong> → {paper.student.name}</span>
              <span className="file-name">{paper.fileName}</span>
              <span className="admin-name">By: {paper.adminName}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Exam;
