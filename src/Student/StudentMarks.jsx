// import React from "react";
// import "./StudentMarks.css";

// const StudentMarks = ({ student }) => {
//   // Function to get score class based on percentage
//   const getScoreClass = (score) => {
//     if (score >= 90) return "score-excellent";
//     if (score >= 75) return "score-good";
//     if (score >= 50) return "score-average";
//     return "score-poor";
//   };

//   // Function to format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//     } catch (error) {
//       return "Invalid Date";
//     }
//   };

//   const marks = student?.marks || [];

//   return (
//     <div className="marks-card">
//       <h3>Marks Details</h3>
      
//       {marks.length > 0 ? (
//         <div className="marks-list">
//           {/* Header Row */}
//           <div className="marks-header">
//             <span>Course Name</span>
//             <span>Score</span>
//             <span>Date</span>
//           </div>
          
//           {/* Marks List */}
//           {marks.map((mark, index) => (
//             <div key={index} className="mark-item">
//               <span>{mark.subject || mark.course || "Unnamed Course"}</span>
//               <span className={getScoreClass(mark.score)}>
//                 {mark.score}%
//               </span>
//               <span>{formatDate(mark.date)}</span>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="no-data">No marks data available</div>
//       )}
//     </div>
//   );
// };

// export default StudentMarks;








import React from "react";
import "./StudentMarks.css";

const StudentMarks = ({ student }) => {
  // Function to get score class based on percentage
  const getScoreClass = (score) => {
    if (score >= 90) return "score-excellent";
    if (score >= 75) return "score-good";
    if (score >= 50) return "score-average";
    return "score-poor";
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const marks = student?.marks || [];

  return (
    <div className="marks-card">
      <h3>Marks Details</h3>
      
      {marks.length > 0 ? (
        <div className="marks-list">
          {/* Header Row */}
          <div className="marks-header">
            <span>Course Name</span>
            <span>Score</span>
            <span>Date</span>
          </div>
          
          {/* Marks List */}
          {marks.map((mark, index) => (
            <div key={index} className="mark-item">
              <span>{mark.courseName || mark.subject || mark.course || "Unnamed Course"}</span>
              <span className={getScoreClass(mark.score)}>
                {mark.score}%
              </span>
              <span>{formatDate(mark.date)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">No marks data available</div>
      )}
    </div>
  );
};

export default StudentMarks;