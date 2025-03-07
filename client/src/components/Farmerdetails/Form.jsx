import React, { useState } from 'react';
import axios from '../../services/api';

const FarmForm = () => {
  const [farm, setFarm] = useState({ name: '', location: '', size: '', farmType: '', description: '' });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFarm({ ...farm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first.');
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(farm).forEach((key) => formData.append(key, farm[key]));
      Array.from(images).forEach((image) => formData.append('images', image));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      await axios.post('/farms', formData, config);
      alert('Farm registered successfully!');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to register farm');
    }
  };

  return (
    <div 
      style={{
        backgroundImage: "url('/r.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div 
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          width: '400px',
          textAlign: 'center',
        }}
      >
        <h2>Register Your Farm</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" name="name" placeholder="Farm Name" onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
          <input type="text" name="size" placeholder="Farm Size (acres)" onChange={handleChange} required />
          <input type="text" name="farmType" placeholder="Farm Type" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input type="file" multiple onChange={handleFileChange} />
          <button type="submit">Register Farm</button>
        </form>
      </div>
    </div>
  );
};

export default FarmForm;
