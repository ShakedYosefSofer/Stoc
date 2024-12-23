import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../../css/job.css'; // ודא שהקובץ קיים ומכיל את העיצובים המתאימים

const jobOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'devops', label: 'DevOps' },
  { value: 'qa', label: 'QA' },
  { value: 'designer', label: 'Designer' },
  { value: 'cyber', label: 'cyber' },
];

export default function AddJob() {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [locationOptions, setLocationOptions] = useState([]); // סטייט עבור הערים
  const [isLoading, setIsLoading] = useState(true); // סטייט עבור טוען
  const [fetchError, setFetchError] = useState(null); // סטייט עבור שגיאות טעינה

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/jobs/cities'); // עדכון לשרת בפורט 3001

        const cities = response.data.map(city => ({
          value: city.value,
          label: city.label // ודא שהנתונים מכילים את המידע הנדרש
        }));

        setLocationOptions(cities); // עדכון הערים
        setFetchError(null); 
      } catch (err) {
        console.error('Error fetching cities:', err.message);
        setFetchError('Failed to load cities. Please try again later.');
      } finally {
        setIsLoading(false); // סיום הטעינה
      }
    };

    fetchCities(); // קריאה לפונקציה ב- useEffect
  }, []); // ריקון של מערך התלויות כדי להריץ רק פעם אחת לאחר טעינת הרכיב

  const onSubmit = async (data) => {
    const bodyData = {
      title: data.title ? data.title.value : '',
      description: data.description,
      location: data.location ? data.location.value : ''
    };

    try {
      const url = 'http://localhost:3001/jobs'; // עדכון לשרת בפורט 3001
      const { data: responseData } = await axios.post(url, bodyData);
      if (responseData._id) {
        alert("New job added");
        navigate("/admin/JobsAdmin"); // ניווט לאחר הצלחה
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
          {isLoading ? (
            <p>Loading cities...</p> // הודעה בזמן טעינה
          ) : fetchError ? (
            <p className="text-danger">{fetchError}</p> // הודעת שגיאה אם קרתה
          ) : (
            <Controller
              name="location"
              control={control}
              defaultValue={null}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={locationOptions} // הערים שהורדו מה-API
                  className="form-control"
                  placeholder="Select location"
                  isClearable
                />
              )}
            />
          )}
          {errors.location && <div className="text-danger">{errors.location.message}</div>}
        </div>

        <button className='btn btn-success mt-4'>Add</button>
      </form>
    </div>
  );
}
