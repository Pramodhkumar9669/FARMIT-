import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../login/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            navigate("/");
        }, 300);
    };

    return (
        <nav style={styles.navbar}>
            {/* Farmit logo on the left */}
            <div className="farmit" style={styles.farmit}>
                <Link to="/" style={styles.farmitLink}>
                    <h3 style={{fontSize:"40px",fontFamily:"cursive",color:"#234568"}}>Farmit</h3>
                </Link>
            </div>

            {/* Navigation Links */}
            <div style={styles.navLinks}>
                <Link to="/dashboard" style={styles.link} className="nav-item">Dashboard</Link>
                <Link to="/common/report-issue" style={styles.link} className="nav-item">Report Issue</Link>

                {/* Signup/Login Dropdown */}
                {!user ? (
                    <div
                        style={styles.signup}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <span style={styles.link} className="nav-item">Signup</span>
                        {showDropdown && (
                            <div style={styles.dropdown}>
                                <Link to="/login" style={styles.dropdownItem}>Login</Link>
                                <Link to="/register" style={styles.dropdownItem}>Register</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={handleLogout} style={styles.button} className="logout-button">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

// 🎨 CSS Styles
const styles = {
    navbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        background: 'linear-gradient(135deg,rgb(123, 140, 91), #9C6A94)',
        color: 'white',
        boxShadow: '0px 4px 6px rgba(53, 45, 45, 0.1)',
        zIndex: 1000,
    },
    farmit: {
        position: 'absolute',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontWeight:"bold",
        fontSize: '670px',
    },
    farmitLink: {
        textDecoration: 'none',
    
        fontWeight:"bold",
        color: '0px 4px 6px rgba(137, 98, 98, 0.1)',
        transition: 'color 0.3s ease, transform 0.3s ease',
        fontSize:"100px",
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginLeft: 'auto', // Push links to the right
        paddingRight: '20px',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'color 0.3s ease, transform 0.3s ease',
    },
    signup: {
        position: 'relative',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        background: 'white',
        color: '#2c3e50',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '5px',
        boxShadow: '0px 4px 8px rgba(187, 168, 168, 0.2)',
    },
    dropdownItem: {
        padding: '8px 15px',
        textDecoration: 'none',
        color: '#2c3e50',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        transition: 'background 0.2s ease',
    },
    button: {
        backgroundColor: '#d9534f',
        color: 'white',
        padding: '8px 14px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'background 0.3s ease, transform 0.3s ease',
    },
};


const styleSheet = document.createElement("style");
document.head.appendChild(styleSheet);

export default Navbar;
