import React, { useState } from 'react';
import axios from 'axios';

export default function EditProfile({ user, setIsEditing }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    username: user.username,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/updateProfile', formData, { withCredentials: true });
      alert('Profile updated successfully!');
      setIsEditing(false); // חוזרים לדף הצפייה אחרי עדכון
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="btn btn-secondary ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
