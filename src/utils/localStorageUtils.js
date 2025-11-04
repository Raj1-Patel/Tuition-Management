// // ✅ Save logged-in user session
// export const saveSession = (session) => {
//   localStorage.setItem("session", JSON.stringify(session));
// };

// // ✅ Get current session
// export const getSession = () => {
//   const session = localStorage.getItem("session");
//   return session ? JSON.parse(session) : null;
// };

// // ✅ Clear session
// export const clearSession = () => {
//   localStorage.removeItem("session");
// };

// // ✅ Save new user (student/hr)
// export const saveUser = (user) => {
//   const key = user.role === "hr" ? "hrs" : "students";
//   const users = JSON.parse(localStorage.getItem(key)) || [];
//   users.push(user);
//   localStorage.setItem(key, JSON.stringify(users));
// };

// // ✅ Get user by ID & role
// export const getUser = (id, role) => {
//   const key = role === "hr" ? "hrs" : "students";
//   const users = JSON.parse(localStorage.getItem(key)) || [];
//   return users.find((user) => user.id === id);
// };

// // ✅ Get all students
// export const getStudents = () => {
//   return JSON.parse(localStorage.getItem("students")) || [];
// };

// // ✅ Save all students
// export const setStudents = (students) => {
//   localStorage.setItem("students", JSON.stringify(students));
// };

// // ✅ Get HR data
// export const getHR = () => {
//   return JSON.parse(localStorage.getItem("hrs")) || [];
// };

// // ✅ Update HR details
// export const updateHR = (updatedHR) => {
//   localStorage.setItem("hrs", JSON.stringify(updatedHR));
// };

// // ✅ ✅ DAILY REPORTS (DRS)
// export const saveDailyReport = (report) => {
//   const reports = JSON.parse(localStorage.getItem("reports")) || [];
//   reports.push(report);
//   localStorage.setItem("reports", JSON.stringify(reports));
// };

// export const getReportsByStudent = (studentName) => {
//   const reports = JSON.parse(localStorage.getItem("reports")) || [];
//   return reports.filter((report) => report.student === studentName);
// };

// export const getAllReports = () => {
//   return JSON.parse(localStorage.getItem("reports")) || [];
// };

// export const updateReport = (updatedReport) => {
//   let reports = JSON.parse(localStorage.getItem("reports")) || [];
//   reports = reports.map((report) =>
//     report.id === updatedReport.id ? updatedReport : report
//   );
//   localStorage.setItem("reports", JSON.stringify(reports));
// };

// // ✅ HR Rating System
// export const rateReport = (reportId, rating) => {
//   const reports = JSON.parse(localStorage.getItem("reports")) || [];
//   const updatedReports = reports.map((r) =>
//     r.id === reportId ? { ...r, rating, ratedAt: new Date() } : r
//   );
//   localStorage.setItem("reports", JSON.stringify(updatedReports));
// };

// // ✅ Attendance
// export const saveAttendance = (record) => {
//   const data = JSON.parse(localStorage.getItem("attendance")) || [];
//   data.push(record);
//   localStorage.setItem("attendance", JSON.stringify(data));
// };

// export const getAttendanceRecords = () => {
//   return JSON.parse(localStorage.getItem("attendance")) || [];
// };

// // ✅ Issue / Leave Request
// export const saveIssue = (issue) => {
//   const data = JSON.parse(localStorage.getItem("issues")) || [];
//   data.push(issue);
//   localStorage.setItem("issues", JSON.stringify(data));
// };

// export const getIssues = () => {
//   return JSON.parse(localStorage.getItem("issues")) || [];
// };

// export const setIssues = (issues) => {
//   localStorage.setItem("issues", JSON.stringify(issues));
// };

// // ✅ Get logged-in user (FINAL FIX FOR ERROR)
// export const getCurrentUser = () => {
//   const session = getSession(); // { id: "...", role: "student/hr" }
//   if (!session) return null;
//   return getUser(session.id, session.role);
// };

// // ✅ Clear all data
// export const clearAllData = () => {
//   localStorage.clear();
// };




// ✅ ========== USER MANAGEMENT ==========

// Save user (Student or HR)
export function saveUser(user) {
  const key = user.role === "hr" ? "hrs" : "students";
  const users = JSON.parse(localStorage.getItem(key)) || [];
  const exists = users.some((u) => u.id === user.id);
  if (exists) return false;
  users.push(user);
  localStorage.setItem(key, JSON.stringify(users));
  return true;
}

// Get specific user by ID & role
export function getUser(id, role) {
  const key = role === "hr" ? "hrs" : "students";
  const users = JSON.parse(localStorage.getItem(key)) || [];
  return users.find((user) => user.id === id);
}

// Get all students
export function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

// Update entire student list
export function setStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

// Get specific HR by ID (optional use)
export function getHR(id) {
  const hrs = JSON.parse(localStorage.getItem("hrs")) || [];
  return hrs.find((hr) => hr.id === id);
}

// Update HR info
export function updateHR(hr) {
  let hrs = JSON.parse(localStorage.getItem("hrs")) || [];
  hrs = hrs.map((h) => (h.id === hr.id ? hr : h));
  localStorage.setItem("hrs", JSON.stringify(hrs));
}

// ✅ ========== SESSION MANAGEMENT ==========

// Save current session { id, role }
export function saveSession(session) {
  localStorage.setItem("session", JSON.stringify(session));
}

// Get active session
export function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

// Get current logged user
export function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  return getUser(session.id, session.role);
}

// Logout
export function clearSession() {
  localStorage.removeItem("session");
}

// Clear all data
export function clearAllData() {
  localStorage.clear();
}

// ✅ ========== DAILY REPORTS (DRS) ==========

// Get all reports
export function getAllReports() {
  return JSON.parse(localStorage.getItem("dailyReports")) || [];
}

// Set all reports
export function setAllReports(reports) {
  localStorage.setItem("dailyReports", JSON.stringify(reports));
}

// Save new report
export function saveDailyReport(report) {
  const reports = getAllReports();
  reports.push(report);
  setAllReports(reports);
}

// Get reports by student
export function getReportsByStudent(studentId) {
  return getAllReports().filter((r) => r.studentId === studentId);
}

// HR Rating update
export function rateReport(reportId, rating) {
  const reports = getAllReports();
  const updated = reports.map((r) =>
    r.id === reportId ? { ...r, rating, ratedAt: new Date().toISOString() } : r
  );
  setAllReports(updated);
}

// ✅ ========== ATTENDANCE ==========

export function getAttendanceRecords() {
  return JSON.parse(localStorage.getItem("attendance_records")) || [];
}

export function saveAttendance(record) {
  const records = getAttendanceRecords();
  records.push(record);
  localStorage.setItem("attendance_records", JSON.stringify(records));
}

// ✅ ========== ISSUES / COMPLAINTS ==========

export function getIssues() {
  return JSON.parse(localStorage.getItem("student_issues")) || [];
}

export function setIssues(issues) {
  localStorage.setItem("student_issues", JSON.stringify(issues));
}

export function saveIssue(issue) {
  const issues = getIssues();
  issues.push(issue);
  setIssues(issues);
}

// ✅ ========== UPDATE REPORT DETAILS ==========

export function updateReport(updatedReport) {
  let reports = getAllReports();
  reports = reports.map((r) => (r.id === updatedReport.id ? updatedReport : r));
  setAllReports(reports);
}
