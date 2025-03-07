// import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";

// const AvailableLoans = () => {
//   const [loans, setLoans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLoans = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("User not authenticated. Please log in.");
//         }

//         const response = await fetch("http://localhost:5000/api/loans/available-loans", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Raw response:", response);

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch loans: ${errorText}`);
//         }

//         const data = await response.json();
//         console.log("Fetched data:", data);
//         setLoans(data);
//       } catch (error) {
//         console.error("Error fetching loans:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLoans();
//   }, []);

//   if (loading) return <p>Loading available loans...</p>;
//   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

//   return (
//     <div style={styles.container}>
//       <h1>Available Loans</h1>
//       {loans.length === 0 ? (
//         <p>No available loans at the moment.</p>
//       ) : (
//         <ul style={styles.list}>
//           {loans.map((loan) => (
//             <li key={loan._id} style={styles.loanItem}>
//               <h3>{loan.farm?.name || "Unknown Farm"} - {loan.amount}</h3>
//               <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
//               <p><strong>Duration:</strong> {loan.duration} months</p>
//               <p><strong>Loan Status:</strong> {loan.status || "N/A"}</p>
//               <p><strong>Invested Amount:</strong> {loan.investedAmount || 0}</p>

//               {/* <Link to={`/investor/invest-farm/${loan._id}`} style={styles.investButton}>
//                 Invest Now
//               </Link> */}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: { textAlign: "center", padding: "20px" },
//   list: { listStyle: "none", padding: 0 },
//   loanItem: {
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//     padding: "15px",
//     margin: "10px",
//     textAlign: "left",
//     maxWidth: "400px",
//     marginInline: "auto",
//     boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
//   },
//   investButton: {
//     display: "inline-block",
//     textDecoration: "none",
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "8px 16px",
//     borderRadius: "5px",
//     marginTop: "10px",
//     transition: "0.3s",
//   },
//   investButtonHover: {
//     backgroundColor: "#0056b3",
//   },
// };

// export default AvailableLoans;
import React, { useEffect, useState } from "react";

const AvailableLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated. Please log in.");
        }

        const response = await fetch(
          "http://localhost:5000/api/loans/available-loans",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch loans: ${errorText}`);
        }

        const data = await response.json();
        setLoans(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) return <p style={styles.loadingText}>Loading available loans...</p>;
  if (error) return <p style={styles.errorText}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Available Loans</h1>
      {loans.length === 0 ? (
        <p style={styles.noLoans}>No available loans at the moment.</p>
      ) : (
        <div style={styles.loanGrid}>
          {loans.map((loan) => (
            <div key={loan._id} style={styles.loanItem}>
              <h3 style={styles.loanTitle}>
                {loan.farm?.name || "Unknown Farm"} - ${loan.amount}
              </h3>
              <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
              <p><strong>Duration:</strong> {loan.duration} months</p>
              <p><strong>Status:</strong> {loan.status || "N/A"}</p>
              <p><strong>Invested Amount:</strong> ${loan.investedAmount || 0}</p>

              <button style={styles.investButton}>Invest Now</button>
            </div>
          ))}
        </div>
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
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  noLoans: {
    fontSize: "1.2rem",
    color: "#555",
  },
  loanGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  loanItem: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "left",
    borderLeft: "5px solid #007bff",
  },
  loanItemHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
  },
  loanTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#333",
  },
  investButton: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  investButtonHover: {
    backgroundColor: "#0056b3",
  },
  errorText: {
    color: "red",
    fontSize: "1.2rem",
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "#333",
  },
};

export default AvailableLoans;
