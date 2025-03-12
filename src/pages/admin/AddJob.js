import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../../css/job.css';

const jobOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'devops', label: 'DevOps' },
  { value: 'qa', label: 'QA' },
  { value: 'designer', label: 'Designer' },
  { value: 'cyber', label: 'Cyber' },
];

export default function AddJob() {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/jobs/cities');
        if (response.data && Array.isArray(response.data)) {
          const cities = response.data.map(city => ({
            value: city.value,
            label: city.label
          }));
          setLocationOptions(cities);
        } else {
          setFetchError("Invalid data format received");
        }
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
    if (isSubmitting) return;

    const bodyData = {
      title: data.title ? data.title.value : '',
      description: data.description,
      location: data.location ? data.location.value : '',
      requirements: data.requirements,
    };

    try {
      const url = 'http://localhost:3001/jobs';
      const { data: responseData } = await axios.post(url, bodyData);
      if (responseData._id) {
        alert("New job added");
        navigate("/admin/JobsAdmin");
      }
    } catch (err) {
      console.error('Error adding job:', err);
      alert(`Error adding job: ${err.response ? JSON.stringify(err.response.data) : err.message}`);
    }
  };

  return (
    <div className='container'>
      <h1>Add New Job</h1>
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
          <textarea
            {...register("description", { required: "Description is required", minLength: 5 })}
            className="form-control"
            placeholder="Enter job description"
          />
          {errors.description && <div className="text-danger">{errors.description.message}</div>}
        </div>

        <div className="form-group">
          <label>Job Requirements</label>
          <textarea
            {...register("requirements", { required: "Requirements are required", minLength: 10 })}
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

        <button className='btn btn-success mt-4' disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}
