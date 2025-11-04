// // import React, { useState } from "react";
// // import { saveIssue } from "../utils/localStorageUtils";

// // export default function StudentIssue({ student }) {
// //   const [message, setMessage] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!message.trim()) {
// //       alert("Please enter an issue description.");
// //       return;
// //     }
// //     const newIssue = {
// //       id: Date.now(),
// //       studentId: student.id,
// //       message: message.trim(),
// //       submittedAt: new Date().toISOString(),
// //     };
// //     saveIssue(newIssue);
// //     alert("Issue submitted successfully!");
// //     setMessage("");
// //   };

// //   return (
// //     <div className="issue-card">
// //       <h3>Raise an Issue</h3>
// //       <form onSubmit={handleSubmit}>
// //         <textarea
// //           placeholder="Describe your issue..."
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //           required
// //         ></textarea>
// //         <button type="submit">Submit Issue</button>
// //       </form>
// //     </div>
// //   );
// // }



// import React, { useState } from "react";
// import { saveIssue } from "../utils/localStorageUtils";
// import {
//   FaPaperPlane,
//   FaExclamationCircle,
//   FaCheckCircle,
//   FaClock,
//   FaUserGraduate,
// } from "react-icons/fa";

// export default function StudentIssue({ student }) {
//   const [message, setMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [charCount, setCharCount] = useState(0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!message.trim()) {
//       showNotification("Please enter an issue description.", "error");
//       return;
//     }

//     if (message.trim().length < 10) {
//       showNotification("Please provide more details (at least 10 characters).", "error");
//       return;
//     }

//     setIsSubmitting(true);

//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const newIssue = {
//       id: Date.now(),
//       studentId: student.id,
//       studentName: student.name,
//       message: message.trim(),
//       submittedAt: new Date().toISOString(),
//       status: "pending",
//       priority: message.toLowerCase().includes("urgent") ? "high" : "normal"
//     };

//     saveIssue(newIssue);
    
//     setIsSubmitting(false);
//     setShowSuccess(true);
//     setMessage("");
//     setCharCount(0);
    
//     setTimeout(() => setShowSuccess(false), 3000);
//   };

//   const showNotification = (message, type) => {
//     // You can replace this with a proper toast notification library
//     alert(`${type === "error" ? "⚠️" : "✅"} ${message}`);
//   };

//   const handleMessageChange = (e) => {
//     const value = e.target.value;
//     setMessage(value);
//     setCharCount(value.length);
//   };

//   const getCharCountColor = () => {
//     if (charCount === 0) return "#6c757d";
//     if (charCount < 10) return "#dc3545";
//     if (charCount < 50) return "#ffc107";
//     return "#28a745";
//   };

//   const commonIssues = [
//     "Assignment submission problem",
//     "Grade discrepancy",
//     "Course material access",
//     "Technical issue",
//     "Attendance discrepancy",
//     "Other academic concern"
//   ];

//   const setCommonIssue = (issue) => {
//     setMessage(prev => prev ? `${prev}\n${issue}` : issue);
//   };

//   return (
//     <div className="issue-container">
//       {/* Success Notification */}
//       {showSuccess && (
//         <div className="success-notification">
//           <FaCheckCircle className="success-icon" />
//           <span>Issue submitted successfully! We'll get back to you soon.</span>
//         </div>
//       )}

//       <div className="issue-header">
//         <div className="header-content">
//           <FaExclamationCircle className="header-icon" />
//           <div>
//             <h1>Raise an Issue</h1>
//             <p>Describe your concern and we'll assist you promptly</p>
//           </div>
//         </div>
//         <div className="student-badge">
//           <FaUserGraduate />
//           <span>{student.name}</span>
//         </div>
//       </div>

//       <div className="issue-content">
//         <div className="issue-form-container">
//           <form onSubmit={handleSubmit} className="issue-form">
//             {/* Common Issues Quick Select */}
//             <div className="common-issues-section">
//               <label className="section-label">Common Issues</label>
//               <div className="common-issues-grid">
//                 {commonIssues.map((issue, index) => (
//                   <button
//                     key={index}
//                     type="button"
//                     className="common-issue-btn"
//                     onClick={() => setCommonIssue(issue)}
//                   >
//                     {issue}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Message Textarea */}
//             <div className="form-group">
//               <label htmlFor="issueMessage" className="form-label">
//                 Issue Description
//                 <span className="required">*</span>
//               </label>
//               <textarea
//                 id="issueMessage"
//                 placeholder="Please provide detailed information about your issue. Include relevant course names, dates, and specific details to help us assist you better..."
//                 value={message}
//                 onChange={handleMessageChange}
//                 required
//                 maxLength={1000}
//                 className="message-textarea"
//                 disabled={isSubmitting}
//               ></textarea>
              
//               {/* Character Counter */}
//               <div className="textarea-footer">
//                 <div 
//                   className="char-count"
//                   style={{ color: getCharCountColor() }}
//                 >
//                   {charCount}/1000 characters
//                 </div>
//                 <div className="min-chars">
//                   <FaExclamationCircle />
//                   Minimum 10 characters required
//                 </div>
//               </div>
//             </div>

//             {/* Submission Info */}
//             <div className="submission-info">
//               <div className="info-item">
//                 <FaClock className="info-icon" />
//                 <span>Typically responded within 24-48 hours</span>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button 
//               type="submit" 
//               className="submit-btn"
//               disabled={isSubmitting || message.trim().length < 10}
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="spinner"></div>
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   <FaPaperPlane className="btn-icon" />
//                   Submit Issue
//                 </>
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Sidebar with Guidelines */}
//         <div className="guidelines-sidebar">
//           <h3>📝 Submission Guidelines</h3>
//           <div className="guidelines-list">
//             <div className="guideline-item">
//               <div className="guideline-number">1</div>
//               <p>Be specific about the issue and include relevant details</p>
//             </div>
//             <div className="guideline-item">
//               <div className="guideline-number">2</div>
//               <p>Mention course names and assignment titles when applicable</p>
//             </div>
//             <div className="guideline-item">
//               <div className="guideline-number">3</div>
//               <p>Include dates and specific instances for reference</p>
//             </div>
//             <div className="guideline-item">
//               <div className="guideline-number">4</div>
//               <p>Check if your issue matches common problems listed</p>
//             </div>
//             <div className="guideline-item">
//               <div className="guideline-number">5</div>
//               <p>For urgent matters, include "URGENT" in your message</p>
//             </div>
//           </div>

//           {/* Emergency Contact */}
//           <div className="emergency-contact">
//             <h4>🚨 Emergency Support</h4>
//             <p>For immediate technical assistance during class hours:</p>
//             <div className="contact-info">
//               <strong>IT Help Desk: </strong>
//               <span>+91 415442479</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .issue-container {
//           margin-left: 70px;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           padding: 2rem;
//         }

//         /* Success Notification */
//         .success-notification {
//           position: fixed;
//           top: 20px;
//           right: 20px;
//           background: #28a745;
//           color: white;
//           padding: 1rem 1.5rem;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
//           z-index: 1000;
//           animation: slideIn 0.3s ease;
//         }

//         @keyframes slideIn {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }

//         .success-icon {
//           font-size: 1.2rem;
//         }

//         /* Header Styles */
//         .issue-header {
//           background: white;
//           border-radius: 20px;
//           padding: 2rem;
//           margin-bottom: 2rem;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .header-content {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .header-icon {
//           font-size: 2.5rem;
//           color: #3498db;
//         }

//         .header-content h1 {
//           margin: 0;
//           color: #2c3e50;
//           font-size: 2rem;
//           font-weight: 700;
//         }

//         .header-content p {
//           margin: 0.5rem 0 0 0;
//           color: #7f8c8d;
//           font-size: 1.1rem;
//         }

//         .student-badge {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: #e3f2fd;
//           padding: 0.75rem 1.5rem;
//           border-radius: 50px;
//           color: #1976d2;
//           font-weight: 600;
//         }

//         /* Main Content Layout */
//         .issue-content {
//           display: grid;
//           grid-template-columns: 2fr 1fr;
//           gap: 2rem;
//           align-items: start;
//         }

//         /* Form Styles */
//         .issue-form-container {
//           background: white;
//           border-radius: 20px;
//           padding: 2rem;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//         }

//         .common-issues-section {
//           margin-bottom: 2rem;
//         }

//         .section-label {
//           display: block;
//           font-weight: 600;
//           color: #2c3e50;
//           margin-bottom: 1rem;
//           font-size: 1.1rem;
//         }

//         .common-issues-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 0.75rem;
//         }

//         .common-issue-btn {
//           background: #f8f9fa;
//           border: 2px solid #e9ecef;
//           padding: 0.75rem 1rem;
//           border-radius: 12px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-size: 0.9rem;
//           color: #495057;
//         }

//         .common-issue-btn:hover {
//           background: #3498db;
//           color: white;
//           border-color: #3498db;
//           transform: translateY(-2px);
//         }

//         .form-group {
//           margin-bottom: 2rem;
//         }

//         .form-label {
//           display: block;
//           font-weight: 600;
//           color: #2c3e50;
//           margin-bottom: 0.75rem;
//           font-size: 1.1rem;
//         }

//         .required {
//           color: #e74c3c;
//           margin-left: 0.25rem;
//         }

//         .message-textarea {
//           width: 100%;
//           min-height: 200px;
//           padding: 1.5rem;
//           border: 2px solid #e9ecef;
//           border-radius: 16px;
//           font-size: 1rem;
//           line-height: 1.6;
//           resize: vertical;
//           transition: all 0.3s ease;
//           font-family: inherit;
//         }

//         .message-textarea:focus {
//           outline: none;
//           border-color: #3498db;
//           box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
//         }

//         .message-textarea:disabled {
//           background: #f8f9fa;
//           cursor: not-allowed;
//         }

//         .textarea-footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-top: 0.75rem;
//           font-size: 0.875rem;
//         }

//         .min-chars {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: #6c757d;
//         }

//         /* Submission Info */
//         .submission-info {
//           background: #e8f4fd;
//           padding: 1.5rem;
//           border-radius: 12px;
//           margin-bottom: 2rem;
//         }

//         .info-item {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           color: #1976d2;
//           font-weight: 500;
//         }

//         /* Submit Button */
//         .submit-btn {
//           width: 100%;
//           background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
//           color: white;
//           border: none;
//           padding: 1.25rem 2rem;
//           border-radius: 16px;
//           font-size: 1.1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.75rem;
//         }

//         .submit-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
//         }

//         .submit-btn:disabled {
//           background: #bdc3c7;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .spinner {
//           width: 20px;
//           height: 20px;
//           border: 2px solid transparent;
//           border-top: 2px solid white;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         /* Guidelines Sidebar */
//         .guidelines-sidebar {
//           background: white;
//           border-radius: 20px;
//           padding: 2rem;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//           position: sticky;
//           top: 2rem;
//         }

//         .guidelines-sidebar h3 {
//           color: #2c3e50;
//           margin-bottom: 1.5rem;
//           font-size: 1.3rem;
//         }

//         .guidelines-list {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//           margin-bottom: 2rem;
//         }

//         .guideline-item {
//           display: flex;
//           gap: 1rem;
//           align-items: flex-start;
//         }

//         .guideline-number {
//           background: #3498db;
//           color: white;
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 0.875rem;
//           font-weight: 600;
//           flex-shrink: 0;
//         }

//         .guideline-item p {
//           margin: 0;
//           color: #555;
//           line-height: 1.5;
//           font-size: 0.95rem;
//         }

//         .emergency-contact {
//           background: #fff3cd;
//           border: 1px solid #ffeaa7;
//           border-radius: 12px;
//           padding: 1.5rem;
//         }

//         .emergency-contact h4 {
//           color: #856404;
//           margin-bottom: 0.75rem;
//         }

//         .emergency-contact p {
//           color: #856404;
//           font-size: 0.9rem;
//           margin-bottom: 0.75rem;
//         }

//         .contact-info {
//           color: #856404;
//           font-size: 0.9rem;
//         }

//         /* Responsive Design */
//         @media (max-width: 1024px) {
//           .issue-content {
//             grid-template-columns: 1fr;
//             gap: 1.5rem;
//           }

//           .guidelines-sidebar {
//             position: static;
//           }
//         }

//         @media (max-width: 768px) {
//           .issue-container {
//             padding: 1rem;
//           }

//           .issue-header {
//             flex-direction: column;
//             gap: 1rem;
//             text-align: center;
//             padding: 1.5rem;
//           }

//           .header-content {
//             flex-direction: column;
//             text-align: center;
//           }

//           .common-issues-grid {
//             grid-template-columns: 1fr;
//           }

//           .textarea-footer {
//             flex-direction: column;
//             gap: 0.5rem;
//             align-items: flex-start;
//           }

//           .issue-form-container,
//           .guidelines-sidebar {
//             padding: 1.5rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .header-content h1 {
//             font-size: 1.5rem;
//           }

//           .student-badge {
//             padding: 0.5rem 1rem;
//             font-size: 0.9rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }















import React, { useState, useEffect } from "react";
import { saveIssue, getIssues } from "../utils/localStorageUtils";
import { FaPaperPlane, FaCheckCircle, FaUserGraduate, FaClock } from "react-icons/fa";

export default function StudentIssue({ student }) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [studentIssues, setStudentIssues] = useState([]);

  // Load student's issues
  useEffect(() => {
    const issues = getIssues().filter(issue => issue.studentId === student.id);
    setStudentIssues(issues);
  }, [student.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || message.trim().length < 10) {
      alert("Please enter issue description (min 10 characters)");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newIssue = {
      id: Date.now(),
      studentId: student.id,
      studentName: student.name,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      status: "pending",
      priority: message.toLowerCase().includes("urgent") ? "high" : "Solve"
    };

    saveIssue(newIssue);
    
    // Update local state
    setStudentIssues(prev => [newIssue, ...prev]);
    setIsSubmitting(false);
    setShowSuccess(true);
    setMessage("");
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const commonIssues = [
    "Assignment submission problem",
    "Grade discrepancy", 
    "Course material access",
    "Technical issue"
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "solved":
        return <FaCheckCircle className="solved-icon" />;
      case "pending":
        return <FaClock className="pending-icon" />;
      default:
        return <FaClock className="pending-icon" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "solved":
        return "Solved";
      case "pending":
        return "Pending";
      default:
        return "Pending";
    }
  };

  return (
    <div className="issue-container">
      {showSuccess && (
        <div className="success-notification">
          <FaCheckCircle /> Issue submitted successfully!
        </div>
      )}

      <div className="issue-card">
        <div className="card-header">
          <h2>Raise an Issue</h2>
          <div className="student-badge">
            <FaUserGraduate /> {student.name}
          </div>
        </div>

        <div className="common-issues">
          <p>Quick select:</p>
          <div className="common-issues-grid">
            {commonIssues.map((issue, index) => (
              <button
                key={index}
                type="button"
                className="common-issue-btn"
                onClick={() => setMessage(prev => prev ? `${prev}\n${issue}` : issue)}
              >
                {issue}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="issue-form">
          <div className="form-group">
            <label>Issue Description *</label>
            <textarea
              placeholder="Describe your issue in detail (minimum 10 characters)..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={500}
              disabled={isSubmitting}
              rows="6"
            ></textarea>
            <div className="char-count">
              {message.length}/500 characters
              {message.length > 0 && message.length < 10 && (
                <span className="error"> - Minimum 10 characters required</span>
              )}
            </div>
          </div>

          <div className="submit-btn-container">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting || message.trim().length < 10}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Submit Issue
                </>
              )}
            </button>
          </div>
        </form>

        {/* Issues History Section */}
        {studentIssues.length > 0 && (
          <div className="issues-history">
            <h3>Your Submitted Issues</h3>
            <div className="issues-list">
              {studentIssues.map((issue) => (
                <div key={issue.id} className="issue-item">
                  <div className="issue-content">
                    <p className="issue-message">{issue.message}</p>
                    <div className="issue-meta">
                      <span className="issue-date">
                        {new Date(issue.submittedAt).toLocaleDateString()}
                      </span>
                      <span className={`priority-badge ${issue.priority}`}>
                        {issue.priority}
                      </span>
                    </div>
                  </div>
                  <div className="issue-status">
                    {getStatusIcon(issue.status)}
                    <span className={`status-text ${issue.status}`}>
                      {getStatusText(issue.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="guidelines">
          <h4>💡 Tips for better help:</h4>
          <ul>
            <li>Be specific and include relevant details</li>
            <li>Mention course names and dates when applicable</li>
            <li>Use "URGENT" for time-sensitive matters</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .issue-container {
          margin-left: 70px;
          padding: 2rem;
          background: #f8f9fa;
          min-height: 100vh;
        }

        .success-notification {
          background: #28a745;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .issue-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .card-header h2 {
          margin: 0;
          color: #2c3e50;
        }

        .student-badge {
          background: #e3f2fd;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          color: #1976d2;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .common-issues {
          margin-bottom: 1.5rem;
        }

        .common-issues p {
          margin-bottom: 0.5rem;
          color: #666;
          font-size: 0.9rem;
        }

        .common-issues-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .common-issue-btn {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .common-issue-btn:hover {
          background: #e9ecef;
          border-color: #adb5bd;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #2c3e50;
        }

        textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.2s;
        }

        textarea:focus {
          outline: none;
          border-color: #3498db;
        }

        textarea:disabled {
          background: #f8f9fa;
          cursor: not-allowed;
        }

        .char-count {
          font-size: 0.8rem;
          color: #6c757d;
          margin-top: 0.25rem;
        }

        .error {
          color: #dc3545;
        }

        .submit-btn-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .submit-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 200px;
          justify-content: center;
        }

        .submit-btn:hover:not(:disabled) {
          background: #2980b9;
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Issues History Styles */
        .issues-history {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e9ecef;
        }

        .issues-history h3 {
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .issues-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .issue-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }

        .issue-content {
          flex: 1;
        }

        .issue-message {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
          line-height: 1.4;
        }

        .issue-meta {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .issue-date {
          font-size: 0.8rem;
          color: #6c757d;
        }

        .priority-badge {
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .priority-badge.high {
          background: #ffe6e6;
          color: #dc3545;
        }

        .priority-badge.Solve {
          background: #e6f3ff;
          color: #3498db;
        }

        .issue-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          min-width: 80px;
        }

        .solved-icon {
          color: #28a745;
          font-size: 1.2rem;
        }

        .pending-icon {
          color: #ffc107;
          font-size: 1.2rem;
        }

        .status-text {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-text.solved {
          color: #28a745;
        }

        .status-text.pending {
          color: #ffc107;
        }

        .guidelines {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e9ecef;
        }

        .guidelines h4 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
        }

        .guidelines ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #666;
        }

        .guidelines li {
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .issue-container {
            margin-left: 0;
            padding: 1rem;
          }
          
          .issue-card {
            padding: 1.5rem;
          }
          
          .card-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .common-issues-grid {
            grid-template-columns: 1fr;
          }
          
          .issue-item {
            flex-direction: column;
            gap: 1rem;
          }
          
          .issue-status {
            flex-direction: row;
            align-self: flex-end;
          }
          
          .submit-btn {
            min-width: 180px;
            padding: 0.75rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .issue-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .submit-btn {
            width: 100%;
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
}