import React, { useState } from "react";
import StudentNavbar from "./StudentNavbar";
import StudentProfile from "./StudentProfile";
import ProgressCard from "./StudentProgress";
import StudentPerformance from "./StudentPerformance";
import StudentMarks from "./StudentMarks";
import StudentIssue from "./StudentIssue";
import StudentAttendance from "./StudentAttendance";
import Studentleave from "./Studentleave";
import StudentDRS from "./StudentDRS";
import { getSession, getUser } from "../utils/localStorageUtils";
import "./StudentPanel.css";

const StudentPanel = () => {
  const session = getSession();
  const student = getUser(session?.id, "student");

  const [activeTab, setActiveTab] = useState("profile");

  if (!student) return <div>Loading student data...</div>;

  return (
    <div className="student-panel">
      <StudentNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentName={student.name}
      />

      <main className="panel-content">
        {activeTab === "profile" && <StudentProfile student={student} />}
        {activeTab === "progress" && <ProgressCard student={student} />}
        {activeTab === "performance" && <StudentPerformance student={student} />}
        {activeTab === "marks" && <StudentMarks student={student} />}
        {activeTab === "issue" && <StudentIssue student={student} />}
        {activeTab === "StudentAttendance" && <StudentAttendance student={student} />}
        {activeTab === "Studentleave" && <Studentleave student={student} />}
        {activeTab === "StudentDRS" && <StudentDRS student={student} />}
      </main>
    </div>
  );
};

export default StudentPanel;
