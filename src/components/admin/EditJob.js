import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../services/apiService';
import Select from 'react-select';
import "../../css/editPopup.css";

const jobOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'devops', label: 'DevOps' },
  { value: 'qa', label: 'QA' },
  { value: 'designer', label: 'Designer' },
  { value: 'cyber', label: 'Cyber' },
];

export default function EditJobAdmin({ setShowEdit, currentEditItem, doApi }) {
  const navigate = useNavigate();
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: jobOptions.find(option => option.value === currentEditItem.title) || null,
      description: currentEditItem.description,
      requirements: currentEditItem.requirements || '',
      salary: currentEditItem.salary || '',
      location: null, // Updated after cities are loaded
   
    }
  });

  const [locationOptions, setLocationOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs/cities`);
        const cityOptions = response.data.map(city => ({
          value: city.value,
          label: city.label,
        }));

        setLocationOptions(cityOptions);

        const currentLocation = cityOptions.find(city => city.value === currentEditItem.location);
        if (currentLocation) {
          setValue('location', currentLocation);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError("Failed to fetch cities");
        setLoading(false);
      }
    };

    fetchCities();
  }, [currentEditItem.location, setValue]);

  const onSubForm = async (data) => {
    const bodyData = {
      title: data.title ? data.title.value : '',
      description: data.description,
      requirements: data.requirements,
      location: data.location ? data.location.value : '',
    };

    try {
      const url = `${API_URL}/jobs/${currentEditItem._id}`;
      axios.defaults.withCredentials = true;
      const response = await axios.put(url, bodyData);
      console.log(response.data);
      alert("Job updated successfully!");
      setShowEdit(false);
      doApi();
    } catch (err) {
      console.error('Error updating job:', err.response ? err.response.data : err.message);
      alert(`Error updating job: ${err.response ? err.response.data.error : err.message}`);
    }
  };

  return (
    <div className='popup_window'>
      <div className='popup_window_inside'>
        <h2>Update Job:</h2>
        <form onSubmit={handleSubmit(onSubForm)} className='col-md-10'>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <Controller
              name="title"
              control={control}
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
              {...register("description", {
                required: "Description is required",
                minLength: { value: 5, message: "Description must be at least 5 characters long" }
              })}
              className="form-control"
            />
            {errors.description && <div className="text-danger">{errors.description.message}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="requirements">Job Requirements</label>
            <textarea
              id="requirements"
              {...register("requirements", {
                required: "Requirements are required",
                minLength: { value: 5, message: "Requirements must be at least 5 characters long" }
              })}
              className="form-control"
              placeholder="Enter job requirements"
            />
            {errors.requirements && <div className="text-danger">{errors.requirements.message}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={locationOptions}
                  className="form-control"
                  placeholder="Select location"
                  isClearable
                  isLoading={loading}
                />
              )}
            />
            {errors.location && <div className="text-danger">{errors.location.message}</div>}
          </div>

          <button className='btn btn-info mt-4'>Update</button>
          <button
            onClick={() => setShowEdit(false)}
            type="button"
            className='btn btn-danger ms-2 mt-4'
          >
            Exit
          </button>
        </form>
      </div>
    </div>
  );
}
