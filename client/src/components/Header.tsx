import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <div className="header-logo-icon">🎯</div>
          <span className="header-logo-text">LeadScore AI</span>
        </Link>
        <nav className="header-nav">
          <Link
            to="/"
            className={`header-nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            to="/analyze"
            className={`header-nav-link ${location.pathname === "/analyze" ? "active" : ""}`}
          >
            Nova Análise
          </Link>
        </nav>
      </div>
    </header>
  );
}
