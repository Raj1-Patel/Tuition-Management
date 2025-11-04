import React, { useState } from "react";
import {
  FaUser,
  FaChartLine,
  FaClipboardList,
  FaExclamationTriangle,
  FaSignOutAlt,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function StudentNavbar({ activeTab, setActiveTab, studentName }) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: "profile", label: "Profile", icon: <FaUser className="icon" /> },
    { id: "progress", label: "Progress", icon: <FaChartLine className="icon" /> },
    { id: "marks", label: "Marks", icon: <FaClipboardList className="icon" /> },
    { id: "Studentleave", label: "Studentleave", icon: <FaChartLine className="icon" /> },
    { id: "issue", label: "Issue", icon: <FaExclamationTriangle className="icon" /> },
    { id: "StudentAttendance", label: "Attendance", icon: <FaExclamationTriangle className="icon" /> },
    { id: "StudentDRS", label: "StudentDRS", icon: <FaHome className="icon" /> },
  ];

  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="top-bar">
          <div className="sidebar-logo">
            🎓 {!collapsed && <span>{studentName}</span>}
          </div>
          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle Sidebar"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        <nav className="menu" role="navigation" aria-label="Student Navigation">
          {navItems.map(({ id, label, icon }) => (
            <button
              key={id}
              className={activeTab === id ? "active" : ""}
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? "page" : undefined}
              aria-label={`Go to ${label}`}
            >
              {icon} {!collapsed && label}
            </button>
          ))}
          <button className="logout-btn" aria-label="Logout">
            <FaSignOutAlt className="icon" /> {!collapsed && "Logout"}
          </button>
        </nav>
      </aside>

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 240px;
          background: linear-gradient(180deg, #222f3e 0%, #54a0ff 100%);
          color: white;
          display: flex;
          flex-direction: column;
          z-index: 2100;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.08);
          transition: width 0.25s ease-in-out;
        }

        .sidebar.collapsed {
          width: 70px;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 1rem;
          font-weight: 500;
        }

        .toggle-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.2s;
        }

        .toggle-btn:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          flex-grow: 1;
        }

        .menu button {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1rem;
          background: none;
          border: none;
          color: #f1f2f6;
          font-size: 0.95rem;
          border-radius: 12px;
          cursor: pointer;
          text-align: left;
          transition: 0.2s;
        }

        .menu button:hover,
        .menu button.active {
          background: rgba(255, 255, 255, 0.18);
          color: #fff;
          transform: translateX(5px);
        }

        .logout-btn {
          margin-top: auto;
          margin-bottom: 1rem;
          background: rgba(255, 255, 255, 0.12);
          border: none;
          color: #f1f2f6;
          border-radius: 12px;
          padding: 0.9rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          transition: 0.3s;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        .sidebar.collapsed .menu button {
          justify-content: center;
          padding: 0.8rem 0;
        }

        .sidebar.collapsed .menu button span {
          display: none;
        }

        @media (max-width: 1023px) {
          .sidebar {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
  