
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./HRNavbar.css";

export default function HRNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("session");
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const getActiveClass = ({ isActive }) =>
    `hr-sidebar-link ${isActive ? "active" : ""}`;

  const navItems = [
  { to: "/hr/student-list", label: "Student List", icon: "📋" },
  { to: "/hr/student-marks", label: "Student Marks", icon: "🧾" },
  { to: "/hr/progress", label: "Progress", icon: "📈" },
  { to: "/hr/exam", label: "Exam", icon: "🧠" },
  { to: "/hr/HRIssueComponent", label: "Issue", icon: "⚠" },
  { to: "/hr/hr-profile", label: "HR Profile", icon: "👤" },
  { to: "/hr/Attendance", label: "Attendance", icon: "⚠" },
  { to: "/hr/HRleave", label: "HRleave", icon: "⚠" },
  { to: "/hr/HRDRSPanel", label: "DRS", icon: "⚠" },


];


  return (
    <>
      {/* Header */}
      <header className="hr-header">
        <div className="hr-header-inner">
          <h1 className="hr-logo">HR Panel</h1>
          <button className="hr-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`hr-overlay-menu ${isMenuOpen ? "show" : ""}`}>
        <nav className="hr-mobile-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={getActiveClass}
              onClick={closeMenu}
              end
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <button className="hr-logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span> Logout
          </button>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hr-sidebar">
        <nav className="hr-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={getActiveClass}
              end
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <button className="hr-logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span> Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
