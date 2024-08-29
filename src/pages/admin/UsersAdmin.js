import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/apiService';
import AuthAdmin from '../../components/admin/AuthAdmin';

export default function UsersAdmin() {
  const [users_ar, setUsersAr] = useState([]);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    axios.defaults.withCredentials = true;
    try {
      const url = API_URL + "/users/list";
      const { data } = await axios.get(url);
      console.log(data);
      setUsersAr(data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeRole = async (item) => {
    try {
      const newRole = item.role === "admin" ? "user" : "admin";
      const url = `${API_URL}/users/role/${item._id}/${newRole}`;
      axios.defaults.withCredentials = true;
      await axios.patch(url);
      doApi();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (_id) => {
    // הצג אישור למחיקת המשתמש
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const url = `${API_URL}/users/${_id}`;
        axios.defaults.withCredentials = true;
        const { data } = await axios.delete(url);
        if (data.deletedCount) {
          doApi(); // Refresh the user list after deletion
        }
        console.log(data);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className='container'>
      <AuthAdmin />
      <h1>Table of users</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Email</td>
            <td>Date</td>
            <td>Role</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users_ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.createdAt}</td>
                <td>
                  <button onClick={() => changeRole(item)} style={{ background: item.role === "admin" ? "gold" : "silver" }}>
                    {item.role}
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteUser(item._id)} className='btn btn-danger'>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
