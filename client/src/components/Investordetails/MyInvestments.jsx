import React, { useEffect, useState } from "react";
import axios from "../../services/api";

const MyInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return; // Prevent API call if token is null

    const fetchInvestments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/loans/my-investments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Investments data:", response.data); // Debugging
        setInvestments(response.data);
      } catch (error) {
        console.error("Error fetching investments:", error.response?.data || error.message);
      }
    };

    fetchInvestments();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Investments</h2>
      {investments.length > 0 ? (
        <ul style={styles.list}>
          {investments.map((investment) => (
            <li key={investment._id || investment.id} style={styles.item}>
              <p><strong>Farm:</strong> {investment.farm?.name || "Unknown"}</p>
              <p><strong>Amount:</strong> RS-{investment.amount}</p>
              <p><strong>Status:</strong> {investment.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noInvestments}>No investments found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    maxWidth: "700px",
    margin: "auto",
  },
  item: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  },
  itemHover: {
    transform: "translateY(-3px)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
  },
  noInvestments: {
    fontSize: "1.2rem",
    color: "#6c757d",
    marginTop: "10px",
  },
};

export default MyInvestments;
