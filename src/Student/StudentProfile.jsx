// import React from "react";

// export default function StudentProfile({ student }) {
//   const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "S");

//   return (
//     <center>
//     <div className="profile-card">
//       <div className="avatar">{getInitial(student.name)}</div>
//       <div className="profile-details">
//         <h3>{student.name}</h3>
//         <p><strong>ID:</strong> {student.id}</p>
//         <p><strong>Email:</strong> {student.email || "Not provided"}</p>
//         <p><strong>Phone:</strong> {student.phone || "Not provided"}</p>
//         <p><strong>Course:</strong> {student.course}</p>
//         <p><strong>Join Date:</strong> {student.joinDate}</p>
//       </div>
//     </div>
//     </center>
//   );
// }







import React from "react";
import { getCurrentUser } from "../utils/localStorageUtils";
// import "./StudentDashboard.css";

function StudentDashboard() {
  const student = getCurrentUser();

  if (!student) {
    return <div>Please login to view your dashboard</div>;
  }

  return (
    <center>
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {student.name}!</h1>
        <p>Student Dashboard</p>
      </div>

      <div className="profile-section">
        <div className="profile-card">
          <div className="avatar">
            {student.name ? student.name.charAt(0).toUpperCase() : "S"}
          </div>
          <div className="profile-details">
            <h3>{student.name}</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <strong>Student ID:</strong>
                <span>{student.id}</span>
              </div>
              <div className="detail-item">
                <strong>Email:</strong>
                <span>{student.email || "Not provided"}</span>
              </div>
              <div className="detail-item">
                <strong>Phone:</strong>
                <span>{student.phone || "Not provided"}</span>
              </div>
              <div className="detail-item">
                <strong>Course:</strong>
                <span className={`course-badge course-${student.course?.toLowerCase().replace(/\s+/g, '-')}`}>
                  {student.course}
                </span>
              </div>
              <div className="detail-item">
                <strong>Join Date:</strong>
                <span>{student.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    </center>
  );
}

export default StudentDashboard;