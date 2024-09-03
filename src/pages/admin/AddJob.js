import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { API_URL } from '../../services/apiService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../../css/job.css'; // ודא שהקובץ קיים ומכיל את העיצובים המתאימים

const jobOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'devops', label: 'DevOps' },
  { value: 'qa', label: 'QA' },
  { value: 'designer', label: 'Designer' },
];

const locationOptions = [
  { value: 'tel aviv', label: 'Tel Aviv' },
  { value: 'jerusalem', label: 'Jerusalem' },
  { value: 'haifa', label: 'Haifa' },
  { value: 'beer sheva', label: 'Beer Sheva' },
  { value: 'netanya', label: 'Netanya' },
];

export default function AddJob() {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Extracting values from Select components
    const bodyData = {
      title: data.title ? data.title.value : '', // Extracting value from the Select component
      description: data.description,
      location: data.location ? data.location.value : '' // Extracting value from the Select component
    };

    console.log(bodyData); // For debugging purposes
    try {
      const url = `${API_URL}/jobs`;
      axios.defaults.withCredentials = true;
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
          <input
            {...register("description", { required: true, minLength: 5 })}
            className="form-control"
            type="text"
          />
          {errors.description && <div className="text-danger">* Enter a valid description</div>}
        </div>

        <div className="form-group">
          <label>Location</label>
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

        <button className='btn btn-success mt-4'>Add</button>
      </form>
    </div>
  );
}
