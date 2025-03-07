import React from "react";
import { Link } from "react-router-dom";
import "../../styles/F.css"; 
import Footer from "../equal/Footer";

const AdminDashboard = () => {
  
  const adminItems = [
    { path: "/admin/users", title: "Manage Users", icon: "🛠️", description: "View and manage all users" },
    { path: "/admin/loans", title: "All Loans", icon: "🏦", description: "Review all loan requests" },
    { path: "/admin/farms", title: "All Farms", icon: "🌱", description: "View all registered farms" },
    { path: "/admin/issues", title: "Reported Issues", icon: "🚨", description: "See reported issues" },
  ];

  return (
    <div className="page-container" style={styles.pageContainer}>
      <div className="container" style={styles.container}>
        <h1 style={styles.header}>Admin Dashboard</h1>
        <div style={styles.cardGrid}>
          {adminItems.map((item, index) => (
            <Link to={item.path} key={index} style={styles.card} className="hover-effect">
              <div style={styles.cardContent}>
                <span style={styles.icon}>{item.icon}</span>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardDesc}>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundImage: "url('/admind.jpeg')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.03)", 
    borderRadius: "10px",
    padding: "30px",
  },
  header: {
    fontSize: "28px",
    marginBottom: "40px",
    color: "#9979467",
    fontWeight: "bold",
  },
  cardGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    display: "block",
    textDecoration: "none",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "rgba(203, 209, 190, 0.16)", 
    padding: "20px",
    width: "260px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    color: "inherit",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "20px",
    margin: "10px 0",
    color: "#007bff",
    fontWeight: "bold",
  },
  cardDesc: {
    fontSize: "14px",
    color:"rgb(2,0,0,0,)",
  },
};

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  .hover-effect:hover {
    transform: scale(1.05);
    box-shadow: 4px 4px 15px rgba(0,0,0,0.3);
  }
`;
document.head.appendChild(styleSheet);

export default AdminDashboard;
