import React, { useState } from "react";
import axios from "../../services/api";
import "../../styles/Farmer.css";

const DocumentUpload = () => {
  const [document, setDocument] = useState({
    title: "",
    type: "farm_certificate",
    relatedToModel: "",
    relatedToId: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setDocument({ ...document, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", document.title);
      formData.append("type", document.type);
      formData.append("relatedToModel", document.relatedToModel);
      formData.append("relatedToId", document.relatedToId);
      formData.append("document", file);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post("/documents/upload", formData, config);
      alert("Document uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to upload document");
    }
  };

  return (
    <div className="form-container">
      <h2>Upload Document</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <select name="type" onChange={handleChange} required>
          <option value="farm_certificate">Farm proofs</option>
          <option value="loan_agreement">Loan Agreement</option>
          <option value="identity_proof">Identity Proof</option>
          <option value="other">Other</option>
        </select>
        {/* <input type="text" name="relatedToModel" placeholder="Related Model (Farm/Loan/User)" onChange={handleChange} />
        <input type="text" name="relatedToId" placeholder="Related ID" onChange={handleChange} /> */}
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default DocumentUpload;
