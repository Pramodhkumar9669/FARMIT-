import React, { useEffect, useState } from "react";
import axios from "axios";


const AllFarms = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/users/farms", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setFarms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching farms:", error);
        setError("Failed to fetch farms. Please log in again.");
        setLoading(false);
      });
  }, []);

  const handleInvest = async (farmId, loanId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    const amount = prompt("Enter investment amount:");
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Invalid amount entered.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/loans/${loanId}/invest`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Investment successful!");
    } catch (error) {
      console.error(error);
      alert("Failed to invest.");
    }
  };

  if (loading) return <p>Loading farms...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2>All Farms</h2>
      <div style={styles.farmList}>
        {farms.length === 0 ? (
          <p>No farms available.</p>
        ) : (
          farms.map((farm) => (
            <div key={farm._id} style={styles.farmCard}>
              <h3>{farm.name}</h3>
              {farm.images?.length > 0 && (
                <img 
  src={`http://localhost:5000/${farm.images[0]}`} 
  alt="Farm" 
  style={styles.image} // Apply the inline style here
/>


              )}
              <p><strong>Location:</strong> {farm.location}</p>
              <p><strong>Type:</strong> {farm.farmType}</p>
              <p><strong>Size:</strong> {farm.size} acres</p>
              <p><strong>Status:</strong> {farm.status}</p>
              <p><strong>Owner:</strong> {farm.farmer?.firstName} {farm.farmer?.lastName}</p>
              {farm.loan && (
                <button onClick={() => handleInvest(farm._id, farm.loan._id)}>Invest in Farm</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  farmList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  farmCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default AllFarms;
