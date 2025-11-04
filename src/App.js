// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login from "./components/Login";
// import Register from "./components/Register";
// import ProtectedRoute from "./components/ProtectedRoute";

// // HR imports
// import HRNavbar from "./HR/HRNavbar";
// import StudentManagement from "./HR/StudentManagement";
// import StudentMarks from "./HR/StudentMarks";
// import StudentProgress from "./HR/StudentProgres";
// import HRProfile from "./HR/HRProfile";
// import Exam from "./HR/Exam";
// import HRIssueComponent from "./HR/HRIssueComponent";
// import HRAttendance from "./HR/HRAttendance";
// import HRleave from "./HR/HRleave";  // Import your HRleave here
// import HRDRSPanel from "./HR/HRDRSPanel";

// // Student imports
// import StudentPanel from "./Student/StudentPanel";
// import Studentleave from "./Student/Studentleave"
// import StudentDRS from "./Student/StudentDRS";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* HR Dashboard */}
//         <Route
//           path="/hr/*"
//           element={
//             <ProtectedRoute role="hr">
//               <div style={{ display: "flex" }}>
//                 <HRNavbar />
//                 <div style={{ flexGrow: 1, padding: "20px" }}>
//                   <Routes>
//                     <Route path="student-list" element={<StudentManagement />} />
//                     <Route path="student-marks" element={<StudentMarks />} />
//                     <Route path="progress" element={<StudentProgress />} />
//                     <Route path="hr-profile" element={<HRProfile />} />
//                     <Route path="exam" element={<Exam />} />
//                     <Route path="HRIssueComponent" element={<HRIssueComponent />} />
//                     <Route path="attendance" element={<HRAttendance />} />
//                     <Route path="HRleave" element={<HRleave />} />
//                     <Route path="Studentleave" element={<Studentleave />} />
//                     <Route path="HRDRSPanel" element={<HRDRSPanel />} />
//                     <Route path="StudentDRS" element={<StudentDRS />} />



//                   </Routes>
//                 </div>
//               </div>
//             </ProtectedRoute>
//           }
//         />

//         {/* Student Dashboard */}
//         <Route
//           path="/student/*"
//           element={
//             <ProtectedRoute role="student">
//               <StudentPanel />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

// HR imports
import HRNavbar from "./HR/HRNavbar";
import StudentManagement from "./HR/StudentManagement";
import StudentMarks from "./HR/StudentMarks";
import StudentProgress from "./HR/StudentProgres";
import HRProfile from "./HR/HRProfile";
import Exam from "./HR/Exam";
import HRIssueComponent from "./HR/HRIssueComponent";
import HRAttendance from "./HR/HRAttendance";
import HRleave from "./HR/HRleave";
import HRDRSPanel from "./HR/HRDRSPanel";

// Student imports
import StudentPanel from "./Student/StudentPanel";
import Studentleave from "./Student/Studentleave";
import StudentDRS from "./Student/StudentDRS";

function App() {
  // Shared state for daily reports between Student and HR
  const [dailyReports, setDailyReports] = useState([]);
  const [currentStudent] = useState({ id: 1, name: "John Doe" }); // In real app, this would come from auth

  // Load reports from localStorage on component mount
  useEffect(() => {
    const savedReports = localStorage.getItem('dailyReports');
    if (savedReports) {
      setDailyReports(JSON.parse(savedReports));
    }
  }, []);

  // Save reports to localStorage whenever reports change
  useEffect(() => {
    localStorage.setItem('dailyReports', JSON.stringify(dailyReports));
  }, [dailyReports]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* HR Dashboard */}
        <Route
          path="/hr/*"
          element={
            <ProtectedRoute role="hr">
              <div style={{ display: "flex" }}>
                <HRNavbar />
                <div style={{ flexGrow: 1, padding: "20px" }}>
                  <Routes>
                    <Route path="student-list" element={<StudentManagement />} />
                    <Route path="student-marks" element={<StudentMarks />} />
                    <Route path="progress" element={<StudentProgress />} />
                    <Route path="hr-profile" element={<HRProfile />} />
                    <Route path="exam" element={<Exam />} />
                    <Route path="HRIssueComponent" element={<HRIssueComponent />} />
                    <Route path="attendance" element={<HRAttendance />} />
                    <Route path="HRleave" element={<HRleave />} />
                    <Route path="Studentleave" element={<Studentleave />} />
                    <Route 
                      path="HRDRSPanel" 
                      element={
                        <HRDRSPanel 
                          dailyReports={dailyReports}
                          setDailyReports={setDailyReports}
                        />
                      } 
                    />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute role="student">
              <StudentPanel>
                <Routes>
                  <Route 
                    path="student-drs" 
                    element={
                      <StudentDRS 
                        student={currentStudent}
                        dailyReports={dailyReports}
                        setDailyReports={setDailyReports}
                      />
                    } 
                  />
                  <Route path="student-leave" element={<Studentleave />} />
                  {/* Add other student routes here */}
                </Routes>
              </StudentPanel>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;