import React from "react";
import { Link } from "react-router-dom";
import "../../styles/F.css";
import Footer from "../equal/Footer";

const FarmerDashboard = () => {
  const dashboardItems = [
    { path: "/farmer/farm-form", icon: "🏡", title: "Register a Farm", description: "Add and manage your farm details." },
    { path: "/farmer/my-farms", icon: "🌱", title: "My Farms", description: "View and manage your registered farms." },
    { path: "/farmer/upload-document", icon: "📤", title: "Upload Document", description: "Submit necessary farm-related documents." },
    { path: "/farmer/my-documents", icon: "🗂️", title: "My Documents", description: "View and download uploaded documents." },
    { path: "/farmer/request-loan", icon: "🏦", title: "Request a Loan", description: "Apply for farm-related financial support." },
    { path: "/farmer/my-loans", icon: "💳", title: "My Loans", description: "Track your loan requests and approvals." },
    { path: "/farmer/transactions", icon: "📊", title: "My Transactions", description: "Monitor all your financial transactions." },
  ];

  const styles = {
    background: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/farmerd.jpg)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    card: {
      background: "rgba(255, 255, 255, 0.25)",
      backdropFilter: "blur(1px)",
      borderRadius: "10px",
      padding: "20px",
      width: "250px",
      textAlign: "center",
      color: "blue",
      fontWeight: "bold",
      transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
      boxShadow: "0px 4px 6px rgba(228, 223, 223, 0.56)",
      textDecoration: "none",
    },
    cardHover: {
      background: "rgba(255, 255, 255, 0.69)",
      transform: "scale(1.05)",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.44)",
    },
  };

  return (
    <div style={styles.background}>
      <div className="farmer-container">
        <div style={{marginLeft:"80vh"}}>
        <h1 className="farmer-title">Welcome, Farmer!</h1></div>
        <div className="farmer-grid" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {dashboardItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="farmer-card"
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
            >
              <div className="farmer-card-content">
                <span className="farmer-icon">{item.icon}</span>
                <h3 className="farmer-card-title">{item.title}</h3>
                <p className="farmer-card-description">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FarmerDashboard;
