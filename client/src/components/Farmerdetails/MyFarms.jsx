
import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import '../../styles/Farmer.css';

const MyFarms = () => {
  const [farms, setFarms] = useState([]);
  const [editFarm, setEditFarm] = useState(null);
  const [updatedFarm, setUpdatedFarm] = useState({
    name: '',
    location: '',
    size: '',
    farmType: '',
  });

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('/farms/my-farms', config);
      setFarms(response.data);
    } catch (error) {
      console.error('Error fetching farms:', error);
      alert('Failed to fetch farms');
    }
  };

  const handleEdit = (farm) => {
    setEditFarm(farm);
    setUpdatedFarm({
      name: farm.name || '',
      location: farm.location || '',
      size: farm.size || '',
      farmType: farm.farmType || '',
    });
  };

  const handleChange = (e) => {
    setUpdatedFarm({ ...updatedFarm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      if (!editFarm) return;

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      await axios.put(`/farms/${editFarm._id}`, updatedFarm, config);
      alert('Farm updated successfully!');

      setEditFarm(null);
      setUpdatedFarm({ name: '', location: '', size: '', farmType: '' });
      fetchFarms();
    } catch (error) {
      console.error('Error updating farm:', error);
      alert(error.response?.data?.message || 'Failed to update farm');
    }
  };

  // **Handle Delete Farm**
  const handleDelete = async (farmId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this farm?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/farms/${farmId}`, config);
      alert('Farm deleted successfully!');
      fetchFarms(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting farm:', error);
      alert('Failed to delete farm');
    }
  };

  return (
    <div className="container">
      <h2>My Farms</h2>
      {farms.length === 0 ? (
        <p>No farms found.</p>
      ) : (
        <ul className="farm-list">
          {farms.map((farm) => (
            <li key={farm._id} className="farm-item">
              <h3>{farm.name}</h3>
              <p><strong>Farm ID:</strong> {farm._id}</p>
              <p><strong>Location:</strong> {farm.location}</p>
              <p><strong>Size:</strong> {farm.size} acres</p>
              <p><strong>Type:</strong> {farm.farmType}</p>
              <p><strong>Status:</strong> {farm.status}</p>

              {farm.images && farm.images.length > 0 && (
                <div className="farm-images">
                  <h4>Images:</h4>
                  <div className="image-grid">
                    {farm.images.map((image, index) => {
                      const imageUrl = `http://localhost:5000/${image.replace(/\\/g, '/')}`;
                      return (
                        <img key={index} src={imageUrl} alt={farm.name} className="farm-image" />
                      );
                    })}
                  </div>
                </div>
              )}

              <button onClick={() => handleEdit(farm)}>Edit</button>
              <button onClick={() => handleDelete(farm._id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      )}

      {editFarm !== null && (
        <div className="edit-form">
          <div>
            <h2>Edit Farm</h2>
            <label>Farm Name:</label>
            <input type="text" name="name" value={updatedFarm.name} onChange={handleChange} />
            
            <label>Location:</label>
            <input type="text" name="location" value={updatedFarm.location} onChange={handleChange} />
            
            <label>Size (acres):</label>
            <input type="number" name="size" value={updatedFarm.size} onChange={handleChange} />
            
            <label>Farm Type:</label>
            <input type="text" name="farmType" value={updatedFarm.farmType} onChange={handleChange} />
            
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setEditFarm(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFarms;
