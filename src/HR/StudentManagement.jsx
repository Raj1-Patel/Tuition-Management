// import React, { useState } from "react";
// import "./StudentManagement.css";
// import { getStudents, setStudents } from "../utils/localStorageUtils";

// const COURSE_OPTIONS = [
//   "React",
//   "Node",
//   "Digital Marketing",
//   "Python",
//   "AI/ML"
// ];

// function StudentManagement() {
//   const [students, setStudentsState] = useState(getStudents());
//   const [form, setForm] = useState({
//     id: "",
//     name: "",
//     password: "",
//     joinDate: "",
//     course: COURSE_OPTIONS[0]
//   });

//   const refresh = () => setStudentsState(getStudents());

//   const handleAdd = () => {
//     if (!form.id || !form.name || !form.password || !form.joinDate || !form.course) {
//       alert("Please fill all fields");
//       return;
//     }
//     let data = getStudents();
//     if (data.find(s => s.id === form.id)) {
//       alert("Student ID already exists");
//       return;
//     }
//     data.push({ ...form, marks: [], progress: "" });
//     setStudents(data);
//     refresh();
//     setForm({ id: "", name: "", password: "", joinDate: "", course: COURSE_OPTIONS[0] });
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this student?")) {
//       setStudents(getStudents().filter(s => s.id !== id));
//       refresh();
//     }
//   };

//   const handleEdit = (student) => setForm({
//     id: student.id,
//     name: student.name,
//     password: student.password,
//     joinDate: student.joinDate,
//     course: student.course
//   });

//   const handleUpdate = () => {
//     let data = getStudents().map(s =>
//       s.id === form.id
//         ? { ...form, marks: s.marks || [], progress: s.progress || "" }
//         : s
//     );
//     setStudents(data);
//     refresh();
//     setForm({ id: "", name: "", password: "", joinDate: "", course: COURSE_OPTIONS[0] });
//   };

//   const handleCancel = () => {
//     setForm({ id: "", name: "", password: "", joinDate: "", course: COURSE_OPTIONS[0] });
//   };

//   return (
//     <div className="student-management-container">
//       <div className="form-section">
//         <h2 className="section-title">Student Information</h2>
//         <div className="form-grid">
//           <div className="input-group">
//             <label htmlFor="student-id">Student ID</label>
//             <input
//               id="student-id"
//               placeholder="Enter student ID"
//               value={form.id}
//               onChange={e => setForm({ ...form, id: e.target.value })}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="student-name">Full Name</label>
//             <input
//               id="student-name"
//               placeholder="Enter full name"
//               value={form.name}
//               onChange={e => setForm({ ...form, name: e.target.value })}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="student-password">Password</label>
//             <input
//               id="student-password"
//               placeholder="Enter password"
//               type="password"
//               value={form.password}
//               onChange={e => setForm({ ...form, password: e.target.value })}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="join-date">Join Date</label>
//             <input
//               id="join-date"
//               type="date"
//               value={form.joinDate}
//               onChange={e => setForm({ ...form, joinDate: e.target.value })}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="course">Course</label>
//             <select
//               id="course"
//               value={form.course}
//               onChange={e => setForm({ ...form, course: e.target.value })}
//             >
//               {COURSE_OPTIONS.map(course => (
//                 <option key={course} value={course}>
//                   {course}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="form-actions">
//           <button
//             className={`btn ${form.id && getStudents().find(s => s.id === form.id) ? 'btn-update' : 'btn-add'}`}
//             onClick={
//               form.id && getStudents().find(s => s.id === form.id)
//                 ? handleUpdate
//                 : handleAdd
//             }
//           >
//             {form.id && getStudents().find(s => s.id === form.id)
//               ? "Update Student"
//               : "Add Student"}
//           </button>
//           {form.id && (
//             <button className="btn btn-cancel" onClick={handleCancel}>
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="students-section">
//         <h2 className="section-title">Student List</h2>
//         {students.length === 0 ? (
//           <div className="empty-state">
//             <p>No students found. Add a student to get started.</p>
//           </div>
//         ) : (
//           <div className="table-container">
//             <table className="student-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Join Date</th>
//                   <th>Course</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map(s => (
//                   <tr key={s.id}>
//                     <td>{s.id}</td>
//                     <td>{s.name}</td>
//                     <td>{s.joinDate}</td>
//                     <td>
//                       <span className={`course-badge course-${s.course.toLowerCase().replace(/\s+/g, '-')}`}>
//                         {s.course}
//                       </span>
//                     </td>
//                     <td className="actions">
//                       <button className="btn-edit" onClick={() => handleEdit(s)}>
//                         <i className="icon-edit"></i> Edit
//                       </button>
//                       <button className="btn-delete" onClick={() => handleDelete(s.id)}>
//                         <i className="icon-delete"></i> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default StudentManagement;




import React, { useState } from "react";
import "./StudentManagement.css";
import { getStudents, setStudents } from "../utils/localStorageUtils";

const COURSE_OPTIONS = [
  "React",
  "Node",
  "Digital Marketing",
  "Python",
  "AI/ML"
];

function HRManagement() {
  const [students, setStudentsState] = useState(getStudents());
  const [form, setForm] = useState({
    id: "",
    name: "",
    password: "",
    email: "",
    phone: "",
    joinDate: "",
    course: COURSE_OPTIONS[0]
  });

  const refresh = () => setStudentsState(getStudents());

  const handleAdd = () => {
    if (!form.id || !form.name || !form.password || !form.email || !form.joinDate || !form.course) {
      alert("Please fill all required fields");
      return;
    }
    
    let data = getStudents();
    if (data.find(s => s.id === form.id)) {
      alert("Student ID already exists");
      return;
    }
    
    if (data.find(s => s.email === form.email)) {
      alert("Email already exists");
      return;
    }

    data.push({ 
      ...form, 
      marks: [], 
      progress: "",
      phone: form.phone || "Not provided"
    });
    setStudents(data);
    refresh();
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(getStudents().filter(s => s.id !== id));
      refresh();
    }
  };

  const handleEdit = (student) => setForm({
    id: student.id,
    name: student.name,
    password: student.password,
    email: student.email,
    phone: student.phone,
    joinDate: student.joinDate,
    course: student.course
  });

  const handleUpdate = () => {
    let data = getStudents().map(s =>
      s.id === form.id
        ? { 
            ...form, 
            marks: s.marks || [], 
            progress: s.progress || "",
            phone: form.phone || "Not provided"
          }
        : s
    );
    setStudents(data);
    refresh();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      password: "",
      email: "",
      phone: "",
      joinDate: "",
      course: COURSE_OPTIONS[0]
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="student-management-container">
      <div className="form-section">
        <h2 className="section-title">Student Information Management</h2>
        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="student-id">Student ID *</label>
            <input
              id="student-id"
              placeholder="Enter student ID"
              value={form.id}
              onChange={e => setForm({ ...form, id: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="student-name">Full Name *</label>
            <input
              id="student-name"
              placeholder="Enter full name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="student-email">Email *</label>
            <input
              id="student-email"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="student-phone">Phone</label>
            <input
              id="student-phone"
              type="tel"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="student-password">Password *</label>
            <input
              id="student-password"
              placeholder="Enter password"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="join-date">Join Date *</label>
            <input
              id="join-date"
              type="date"
              value={form.joinDate}
              onChange={e => setForm({ ...form, joinDate: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="course">Course *</label>
            <select
              id="course"
              value={form.course}
              onChange={e => setForm({ ...form, course: e.target.value })}
            >
              {COURSE_OPTIONS.map(course => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button
            className={`btn ${form.id && getStudents().find(s => s.id === form.id) ? 'btn-update' : 'btn-add'}`}
            onClick={
              form.id && getStudents().find(s => s.id === form.id)
                ? handleUpdate
                : handleAdd
            }
          >
            {form.id && getStudents().find(s => s.id === form.id)
              ? "Update Student"
              : "Add Student"}
          </button>
          {form.id && (
            <button className="btn btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="students-section">
        <h2 className="section-title">Student List</h2>
        {students.length === 0 ? (
          <div className="empty-state">
            <p>No students found. Add a student to get started.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Join Date</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                    <td>{s.joinDate}</td>
                    <td>
                      <span className={`course-badge course-${s.course.toLowerCase().replace(/\s+/g, '-')}`}>
                        {s.course}
                      </span>
                    </td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEdit(s)}>
                        <i className="icon-edit"></i> Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(s.id)}>
                        <i className="icon-delete"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default HRManagement;