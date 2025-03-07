
import React, { useEffect, useState } from "react";
import axios from "../../services/api";

import "../../styles/Farmer.css";

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("/documents/my-documents", config);
      setDocuments(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch documents");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/documents/${id}`, config);
      alert("Document deleted successfully!");
      fetchDocuments(); // Refresh the document list
    } catch (error) {
      console.error("Error deleting document:", error);
      alert(error.response?.data?.message || "Failed to delete document");
    }
  };

  return (
    <div className="container">
      <h2>My Documents</h2>
      {documents.length === 0 ? (
        <p>No documents uploaded.</p>
      ) : (
        <ul className="document-list">
          {documents.map((doc) => (
            <li key={doc._id} className="document-item">
              <h3>{doc.title}</h3>
              <p><strong>Type:</strong> {doc.type}</p>
              <p><strong>Uploaded:</strong> {new Date(doc.uploadedAt).toLocaleDateString()}</p>
              <a href={`http://localhost:5000/${doc.filePath}`} target="_blank" rel="noopener noreferrer">View Document</a>
              <button onClick={() => handleDelete(doc._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDocuments;
