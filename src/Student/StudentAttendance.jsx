// import React, { useEffect, useState } from "react";
// import { getSession, getAttendanceRecords } from "../utils/localStorageUtils";
// import "./StudentAttendance.css";

// export default function StudentAttendance() {
//   const [studentId, setStudentId] = useState(null);
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     const session = getSession();
//     if (session && session.role === "student") {
//       setStudentId(session.id);

//       // Load all attendance records for this student
//       const allRecords = getAttendanceRecords();
//       // Filter all records and map attendance relevant to this student
//       let studentRecords = [];
//       allRecords.forEach((rec) => {
//         rec.details.forEach((detail) => {
//           if (detail.studentId === session.id) {
//             studentRecords.push({
//               date: rec.date,
//               time: rec.time,
//               status: detail.status,
//             });
//           }
//         });
//       });
//       setRecords(studentRecords);
//     }
//   }, []);

//   return (
//     <div className="student-attendance-container">
//       <h2>My Attendance Records</h2>
//       {records.length === 0 ? (
//         <p>No attendance records found yet.</p>
//       ) : (
//         <table className="student-attendance-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map((rec, index) => (
//               <tr key={index}>
//                 <td>{rec.date}</td>
//                 <td>{rec.time}</td>
//                 <td className={rec.status === "present" ? "present" : "absent"}>
//                   {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }








import React, { useEffect, useState } from "react";
import { getSession, getAttendanceRecords } from "../utils/localStorageUtils";
import "./StudentAttendance.css";

export default function StudentAttendance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "student") return;

    const allRecords = getAttendanceRecords() || [];
    const filteredRecords = [];

    allRecords.forEach((record) => {
      record.details?.forEach((detail) => {
        if (detail.studentId === session.id) {
          filteredRecords.push({
            date: record.date,
            time: record.time,
            status: detail.status,
          });
        }
      });
    });

    setRecords(filteredRecords);
  }, []);

  return (
    <div className="student-attendance-container">
      <h2>📋 My Attendance</h2>

      {records.length === 0 ? (
        <p>No attendance marked yet.</p>
      ) : (
        <table className="student-attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, index) => (
              <tr key={index}>
                <td>{rec.date}</td>
                <td>{rec.time}</td>
                <td className={rec.status === "present" ? "present" : "absent"}>
                  {rec.status.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
  