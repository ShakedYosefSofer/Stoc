import React, { useEffect, useState, useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { AppContext } from '../../context/Context';
import '../../css/job.css';
import { API_URL } from '../../services/apiService';

const jobOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'devops', label: 'DevOps' },
  { value: 'qa', label: 'QA' },
  { value: 'designer', label: 'Designer' },
  { value: 'cyber', label: 'Cyber' },
];

export default function PostJob() {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { user } = useContext(AppContext);
  const userId = user?.id || localStorage.getItem("userId") || null;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs/cities`);
        setLocationOptions(response.data.map(city => ({
          value: city.value,
          label: city.label
        })));
        setFetchError(null);
      } catch (err) {
        console.error('Error fetching cities:', err.message);
        setFetchError('Failed to load cities. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const onSubmit = async (data) => {
    const bodyData = {
      title: data.title?.value || '',
      description: data.description,
      requirements: data.requirements,
      location: data.location?.value || '',
      userId,
    };

    try {
      const response = await axios.post(`${API_URL}/jobs`, bodyData, {
        withCredentials: true,
      });

      if (response.data._id) {
        alert("New job added successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error('Error adding job:', err);
      alert(`Error adding job: ${err.response ? JSON.stringify(err.response.data) : err.message}`);
    }
  };

  return (
    <div className='container'>
      <h1>Post a Job</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='col-md-6'>
        <div className="form-group">
          <label>Job Title</label>
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
          <label>Description</label>
          <input
            {...register("description", { required: "Description is required", minLength: { value: 5, message: "Description must be at least 5 characters long" } })}
            className="form-control"
            placeholder="Enter job description"
            type="text"
          />
          {errors.description && <div className="text-danger">{errors.description.message}</div>}
        </div>

        <div className="form-group">
          <label>Job Requirements</label>
          <textarea
            {...register("requirements", { 
              required: "Requirements are required", 
              minLength: { value: 10, message: "Requirements must be at least 10 characters long" }
            })}
            className="form-control"
            placeholder="Enter job requirements"
          />
          {errors.requirements && <div className="text-danger">{errors.requirements.message}</div>}
        </div>

        <div className="form-group">
          <label>Location</label>
          {isLoading ? (
            <p>Loading cities...</p>
          ) : fetchError ? (
            <p className="text-danger">{fetchError}</p>
          ) : (
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
          )}
          {errors.location && <div className="text-danger">{errors.location.message}</div>}
        </div>
        <button type="submit" className='btn btn-success mt-4'>Add Job</button>
      </form>
    </div>
  );
}
