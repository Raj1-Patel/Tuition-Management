// import React, { useState, useEffect } from "react";
// import {
//   getReportsByStudent,
//   getAllReports,
//   setAllReports,
// } from "../utils/localStorageUtils";
// import "./StudentDRS.css";

// export default function StudentDRS({ student }) {
//   const [date, setDate] = useState("");
//   const [topic, setTopic] = useState("");
//   const [report, setReport] = useState("");
//   const [reports, setReports] = useState([]);

//   // 🔹 Always load reports from localStorage when student changes or page refreshes
//   useEffect(() => {
//     setReports(getReportsByStudent(student.id));
//     const sync = setInterval(() => {
//       setReports(getReportsByStudent(student.id));
//     }, 1000);
//     return () => clearInterval(sync);
//   }, [student.id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!date.trim() || !topic.trim() || !report.trim()) {
//       alert("⚠️ All fields are required.");
//       return;
//     }

//     const allReports = getAllReports();

//     const newReport = {
//       id: Date.now(),
//       studentId: student.id,
//       name: student.name,
//       date,
//       topic,
//       report,
//       rating: null,
//       hrComment: "",
//       status: "submitted",
//       submittedAt: new Date().toISOString(),
//     };

//     allReports.push(newReport);
//     setAllReports(allReports);
//     setReports(getReportsByStudent(student.id));

//     setDate("");
//     setTopic("");
//     setReport("");
//     alert("✅ Report submitted successfully!");
//   };

//   return (
//     <div className="drs-container">
//       <h2>📅 Daily Report Submission</h2>
//       <form onSubmit={handleSubmit} className="drs-form">
//         <div className="drs-field">
//           <label>Student Name</label>
//           <input type="text" value={student.name} disabled />
//         </div>

//         <div className="drs-field">
//           <label>Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//         </div>

//         <div className="drs-field">
//           <label>Topic</label>
//           <input
//             type="text"
//             placeholder="Enter topic"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             required
//           />
//         </div>

//         <div className="drs-field">
//           <label>Report</label>
//           <textarea
//             placeholder="Write your daily report..."
//             value={report}
//             onChange={(e) => setReport(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="submit-btn">
//           Submit Report
//         </button>
//       </form>

//       <div className="drs-list">
//         <h3>My Reports ({reports.length})</h3>
//         {reports.length === 0 ? (
//           <p>No reports yet.</p>
//         ) : (
//           reports
//             .slice()
//             .reverse()
//             .map((r) => (
//               <div key={r.id} className="drs-card">
//                 <div className="report-header">
//                   <strong>{r.topic}</strong> — <span>{r.date}</span>
//                 </div>
//                 <p>{r.report}</p>
//                 <p>
//                   {r.rating
//                     ? `⭐ Rated: ${r.rating}/5`
//                     : "⏳ Pending HR Review"}
//                 </p>
//                 {r.hrComment && (
//                   <p>
//                     💬 <strong>HR Comment:</strong> {r.hrComment}
//                   </p>
//                 )}
//               </div>
//             ))
//         )}
//       </div>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { getReportsByStudent, getAllReports, setAllReports } from "../utils/localStorageUtils";
import "./StudentDRS.css";

export default function StudentDRS({ student }) {
  const [date, setDate] = useState("");
  const [topic, setTopic] = useState("");
  const [report, setReport] = useState("");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(getReportsByStudent(student.id));
  }, [student.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !topic || !report) return alert("⚠️ All fields are required.");

    const allReports = getAllReports();
    const newReport = {
      id: Date.now(),
      studentId: student.id,
      name: student.name,
      date,
      topic,
      report,
      rating: null,
      hrComment: "",
      status: "submitted",
      submittedAt: new Date().toISOString(),
    };

    allReports.push(newReport);
    setAllReports(allReports);
    setReports(getReportsByStudent(student.id));
    setDate("");
    setTopic("");
    setReport("");
    alert("✅ Report submitted!");
  };

  return (
    <div className="drs-container">
      <h2>📅 Daily Report Submission</h2>
      <form onSubmit={handleSubmit} className="drs-form">
        <div className="drs-field">
          <label>Student Name</label>
          <input type="text" value={student.name} disabled />
        </div>
        <div className="drs-field">
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="drs-field">
          <label>Topic</label>
          <input type="text" placeholder="Enter topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
        <div className="drs-field">
          <label>Report</label>
          <textarea placeholder="Write your daily report..." value={report} onChange={(e) => setReport(e.target.value)} />
        </div>
        <button type="submit" className="submit-btn">Submit Report</button>
      </form>

      <div className="drs-list">
        <h3>My Reports ({reports.length})</h3>
        {reports.map((r) => (
          <div key={r.id} className="drs-card">
            <strong>{r.topic}</strong> — <span>{r.date}</span>
            <p>{r.report}</p>
            <p>{r.rating ? `⭐ ${r.rating}/5` : "⏳ Pending HR Review"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
