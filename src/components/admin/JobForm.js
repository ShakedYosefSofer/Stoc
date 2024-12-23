import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { API_URL } from '../../services/apiService'; // Ensure this path is correct
import '../../css/job.css';

const jobOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'devops', label: 'DevOps' },
  { value: 'qa', label: 'QA' },
  { value: 'designer', label: 'Designer' },
];

const locationOptions = [
  { value: 'tel_aviv', label: 'Tel Aviv' },
  { value: 'jerusalem', label: 'Jerusalem' },
  { value: 'haifa', label: 'Haifa' },
  { value: 'beer sheva', label: 'Beer Sheva' },
  { value: 'netanya', label: 'Netanya' },
];

const JobForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const bodyData = {
      title: data.title ? data.title.value : '',
      description: data.description,
      location: data.location ? data.location.value : ''
    };

    try {
      const url = `${API_URL}/jobs`;
      axios.defaults.withCredentials = true;
      const response = await axios.post(url, bodyData);
      if (response.data._id) {
        alert('New job added successfully');
      }
    } catch (err) {
      console.error('Error adding job:', err.response ? err.response.data : err.message);
      alert(`Error adding job: ${err.response ? err.response.data.error : err.message}`);
    }
  };

  return (
    <div className="job-form-container">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <Controller
            name="title"
            control={control}
            defaultValue={null}
            rules={{ required: "Job title is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={jobOptions}
                className="form-control"
                placeholder="Select job title"
                isClearable
              />
            )}
          />
          {errors.title && <div className="text-danger">{errors.title.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required", minLength: { value: 5, message: "Description must be at least 5 characters long" } })}
            className="form-control"
          />
          {errors.description && <div className="text-danger">{errors.description.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <Controller
            name="location"
            control={control}
            defaultValue={null}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={locationOptions}
                className="form-control"
                placeholder="Select location"
                isClearable
              />
            )}
          />
          {errors.location && <div className="text-danger">{errors.location.message}</div>}
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
