import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { API_URL } from '../../services/apiService'; // Ensure this path is correct
import '../css/job.css';

const jobOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'devops', label: 'DevOps' },
  { value: 'qa', label: 'QA' },
  { value: 'designer', label: 'Designer' },
  { value: 'cyber', label: 'Cyber' },
];

const JobForm = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Fetch cities and their coordinates
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/jobs/cities'); // עדכון לשרת בפורט 3001

        const citiesWithCoordinates = await Promise.all(response.data.map(async (city) => {
          const coordinates = await fetchCityCoordinates(city.label);
          return { ...city, coordinates };
        }));

        const cities = citiesWithCoordinates.map(city => ({
          value: city.value,
          label: city.label,
          coordinates: city.coordinates,
        }));

        setLocationOptions(cities);
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

  // Fetch coordinates for a city using Nominatim
  const fetchCityCoordinates = async (cityName) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: cityName,
          format: 'json',
          addressdetails: 1,
        }
      });

      if (response.data && response.data[0]) {
        const { lat, lon } = response.data[0];
        return { lat, lon };
      }
    } catch (error) {
      console.error(`Error fetching coordinates for ${cityName}:`, error);
    }
    return null; // return null if no coordinates found
  };

  const onSubmit = async (data) => {
    const bodyData = {
      title: data.title ? data.title.value : '',
      description: data.description,
      requirements: data.requirements, // Add requirements field
      salary: data.salary, // Add salary field
      location: data.location ? data.location.value : '',
    };

    try {
      const url = `${API_URL}/jobs`;
      axios.defaults.withCredentials = true;
      const response = await axios.post(url, bodyData);
      if (response.data._id) {
        alert('New job added successfully');
        navigate('/jobs'); // Redirect after successful submission
      }
    } catch (err) {
      console.error('Error adding job:', err.response ? err.response.data : err.message);
      alert(`Error adding job: ${err.response ? err.response.data.error : err.message}`);
    }
  };

  // Update selected city when location is chosen
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
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

        {/* Moved Requirements Field after Description */}
        <div className="form-group">
          <label htmlFor="requirements">Job Requirements</label>
          <textarea
            id="requirements"
            {...register("requirements", { 
              required: "Requirements are required", 
              minLength: { value: 10, message: "Requirements must be at least 10 characters long" }
            })}
            className="form-control"
            placeholder="Enter job requirements"
          />
          {errors.requirements && <div className="text-danger">{errors.requirements.message}</div>}
        </div>

        {/* Location Field at the End */}
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
                onChange={handleCityChange}
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

      {/* Display map for the selected city */}
      {selectedCity && selectedCity.coordinates && (
        <div className="map-container">
          <h3>Map of {selectedCity.label}</h3>
          <img
            src={`https://static-maps.openstreetmap.de/staticmap.php?center=${selectedCity.coordinates.lat},${selectedCity.coordinates.lon}&zoom=10&size=300x200&markers=${selectedCity.coordinates.lat},${selectedCity.coordinates.lon}`}
            alt="Map"
          />
        </div>
      )}
    </div>
  );
};

export default JobForm;
