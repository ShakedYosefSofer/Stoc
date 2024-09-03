import React, { useEffect, useState } from 'react';
import { API_URL } from '../../services/apiService';
import axios from 'axios';
import AuthAdmin from '../../components/admin/AuthAdmin';
import { Link } from 'react-router-dom';
import EditJob from '../../components/admin/EditJob';

export default function JobsAdmin() {
  const [jobs, setJobs] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const url = `${API_URL}/jobs`;
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(url);
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const deleteItem = (_id) => {
    try {
      const url = `${API_URL}/jobs/${_id}`;
      axios.defaults.withCredentials = true;
      axios.delete(url).then(response => {
        if (response.data.deletedCount) {
          // Update the state to remove the deleted job
          setJobs(prevJobs => prevJobs.filter(job => job._id !== _id));
        }
      }).catch(err => {
        console.error('Error deleting job:', err);
      });
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const onEditItem = (item) => {
    setShowEdit(true);
    setCurrentEditItem(item);
  };

  return (
    <div className='container'>
      <AuthAdmin />
      {showEdit && <EditJob doApi={fetchJobs} currentEditItem={currentEditItem} setShowEdit={setShowEdit} />}
      <h1>Job Listings</h1>
      <Link to="/admin/jobs/add" className="btn btn-info">Add New Job</Link>
      <table className='table table-striped'>
        <thead>
          <tr>
            <td>#</td>
            <td>Title</td>
            <td>Description</td>
            <td>Location</td>
            <td>Salary</td>
            <td>Del/Edit</td>
          </tr>
        </thead>
        <tbody>
          {jobs.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.location}</td>
              <td>{item.salary}</td>
              <td>
                <button
                  onClick={() => {
                    if (window.confirm("Delete job?")) {
                      deleteItem(item._id);
                    }
                  }}
                  className='btn btn-danger'
                >
                  Delete
                </button>
                <button
                  onClick={() => onEditItem(item)}
                  className='btn btn-info ms-2'
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
