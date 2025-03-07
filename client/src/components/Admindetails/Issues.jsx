import React, { useEffect, useState } from "react";
import axios from "axios";

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Please log in.");
      return;
    }

    axios
      .get("http://localhost:5000/api/issues/all-issues", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setIssues(response.data))
      .catch((error) => {
        console.error("Error fetching issues:", error);
        setError("Failed to fetch issues. Please log in again.");
      });
  }, []);

  return (
    <div>
      <h2>Reported Issues</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Reported By</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue._id}>
              <td>{issue.issueTitle}</td>
              <td>{issue.issueDescription}</td> {/* ✅ Fixed: Matches backend */}
              <td>{issue.user?.firstName} {issue.user?.lastName} ({issue.user?.email})</td> {/* ✅ Shows full user details */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Issues;
