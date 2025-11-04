// import React, { useState, useEffect } from "react";
// import { getAllReports, setAllReports } from "../utils/localStorageUtils";
// import "./HRDRSPanel.css";

// export default function HRDRSPanel() {
//   const [reports, setReports] = useState([]);
//   const [selectedRating, setSelectedRating] = useState({});

//   // 🔹 Always load latest reports from localStorage even after refresh
//   useEffect(() => {
//     setReports(getAllReports());
//     const sync = setInterval(() => {
//       setReports(getAllReports());
//     }, 1000);
//     return () => clearInterval(sync);
//   }, []);

//   const handleRatingChange = (reportId, rating) => {
//     setSelectedRating((prev) => ({ ...prev, [reportId]: rating }));
//   };

//   const submitRating = (reportId) => {
//     const rating = selectedRating[reportId];
//     if (!rating) return alert("⚠️ Select a rating first!");

//     const updated = reports.map((r) =>
//       r.id === reportId
//         ? {
//             ...r,
//             rating,
//             ratedAt: new Date().toISOString(),
//             status: "rated",
//           }
//         : r
//     );

//     setReports(updated);
//     setAllReports(updated);
//     alert("✅ Rating submitted successfully!");
//   };

//   const pending = reports.filter((r) => !r.rating);
//   const rated = reports.filter((r) => r.rating);

//   return (
//     <div className="hr-drs-panel">
//       <h2>📊 HR Daily Report Review Panel</h2>

//       <div className="stats-container">
//         <div className="stat-card">Total: {reports.length}</div>
//         <div className="stat-card pending">Pending: {pending.length}</div>
//         <div className="stat-card rated">Rated: {rated.length}</div>
//       </div>

//       <section className="pending-section">
//         <h3>📝 Pending Reports</h3>
//         {pending.length === 0 ? (
//           <p>No pending reports.</p>
//         ) : (
//           pending.map((r) => (
//             <div key={r.id} className="report-item pending">
//               <h4>{r.topic}</h4>
//               <p><strong>Student:</strong> {r.name}</p>
//               <p><strong>Date:</strong> {r.date}</p>
//               <div className="daily-report-box">
//                 <strong>Daily Report:</strong>
//                 <p>{r.report}</p>
//               </div>

//               <select
//                 value={selectedRating[r.id] || ""}
//                 onChange={(e) =>
//                   handleRatingChange(r.id, parseInt(e.target.value))
//                 }
//               >
//                 <option value="">Select Rating</option>
//                 {[1, 2, 3, 4, 5].map((n) => (
//                   <option key={n} value={n}>
//                     {n} Star{n !== 1 && "s"}
//                   </option>
//                 ))}
//               </select>

//               <button onClick={() => submitRating(r.id)}>Submit</button>
//             </div>
//           ))
//         )}
//       </section>

//       <section className="rated-section">
//         <h3>✅ Rated Reports</h3>
//         {rated.length === 0 ? (
//           <p>No rated reports yet.</p>
//         ) : (
//           rated.map((r) => (
//             <div key={r.id} className="report-item rated">
//               <h4>{r.topic}</h4>
//               <p><strong>Student:</strong> {r.name}</p>
//               <div className="daily-report-box">
//                 <strong>Daily Report:</strong>
//                 <p>{r.report}</p>
//               </div>
//               <p><strong>Rating:</strong> ⭐ {r.rating}/5</p>
//               <p><strong>Rated At:</strong> {new Date(r.ratedAt).toLocaleString()}</p>
//             </div>
//           ))
//         )}
//       </section>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { getAllReports, setAllReports } from "../utils/localStorageUtils";
import "./HRDRSPanel.css";

export default function HRDRSPanel() {
  const [reports, setReports] = useState([]);
  const [selectedRating, setSelectedRating] = useState({});

  useEffect(() => {
    setReports(getAllReports());
  }, []);

  const submitRating = (reportId) => {
    const rating = selectedRating[reportId];
    if (!rating) return alert("⚠️ Please select rating!");

    const updated = reports.map((r) =>
      r.id === reportId
        ? { ...r, rating, ratedAt: new Date().toISOString(), status: "rated" }
        : r
    );

    setReports(updated);
    setAllReports(updated);
    alert("✅ Rating Saved!");
  };

  return (
    <div className="hr-drs-panel">
      <h2>📊 HR Daily Reports Review</h2>

      {reports.map((r) => (
        <div key={r.id} className="report-item">
          <h4>{r.topic}</h4>
          <p><strong>Student:</strong> {r.name}</p>
          <p><strong>Date:</strong> {r.date}</p>
          <p>{r.report}</p>

          {!r.rating ? (
            <>
              <select onChange={(e) => setSelectedRating((p) => ({ ...p, [r.id]: e.target.value }))}>
                <option value="">Select Rating</option>
                {[1,2,3,4,5].map((n) => (
                  <option key={n} value={n}>{n} Star{n > 1 && "s"}</option>
                ))}
              </select>
              <button onClick={() => submitRating(r.id)}>Submit</button>
            </>
          ) : (
            <p>✅ Rated: ⭐ {r.rating}/5 at {new Date(r.ratedAt).toLocaleString()}</p>
          )}
        </div>
      ))}
    </div>
  );
}
