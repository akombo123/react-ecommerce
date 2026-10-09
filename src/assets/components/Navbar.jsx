import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logOut } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Shop Hub
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/checkout" className="navbar-link">
            Checkout
          </Link>
        </div>
        {user ? (
          <div className="navbar-user">
            <span>Hello, {user.email}!</span>
            <button className="btn btn-secondary" onClick={logOut}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="navbar-auth">
            <div className="navbar-auth-links">
              <Link to="/auth" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/auth" className="btn btn-primary">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
