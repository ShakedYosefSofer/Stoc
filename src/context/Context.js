import React, { createContext, useLayoutEffect, useState } from "react";
import axios from 'axios';
import { API_URL } from '../services/apiService'; // ודא שהנתיב הזה נכון

export const AppContext = createContext(null);

export default function ContextProvider(props) {
  const [job_ar, setJobAr] = useState([]);
  const [showJobEdits, setShowJobEdits] = useState(false);
  const [currentEditJob, setCurrentEditJob] = useState({});
  const [currentCategory, setCurrentCategory] = useState(""); // קטגוריה נוכחית

  // פונקציה לטעינת עבודות מהשרת (עם או בלי קטגוריה)
  const fetchJobs = async (category = "") => {
    try {
      const endpoint = category ? `${API_URL}/jobs/category/${category}` : `${API_URL}/jobs`;
      const response = await axios.get(endpoint);
      setJobAr(response.data);
      localStorage.setItem("job_ar", JSON.stringify(response.data));
    } catch (err) {
      console.error('שגיאה בזמן קבלת העבודות:', err);
    }
  };

  useLayoutEffect(() => {
    // קריאה ל-LocalStorage אם יש נתונים זמינים
    const storedJobAr = localStorage.getItem("job_ar");
    if (storedJobAr) {
      setJobAr(JSON.parse(storedJobAr));
    } else {
      fetchJobs(); // קריאה ל-fetchJobs אם אין נתונים ב-localStorage
    }
  }, []);

  const addJob = (newItem) => {
    const updatedJobAr = [...job_ar, newItem];
    setJobAr(updatedJobAr);
    localStorage.setItem("job_ar", JSON.stringify(updatedJobAr));
  };

  const deleteJob = async (del_id) => {
    try {
      await axios.delete(`${API_URL}/jobs/${del_id}`); // מחיקת עבודה מהשרת
      const updatedJobAr = job_ar.filter(item => item._id !== del_id);
      setJobAr(updatedJobAr);
      localStorage.setItem("job_ar", JSON.stringify(updatedJobAr));
    } catch (err) {
      console.error('שגיאה בזמן מחיקת העבודה:', err);
    }
  };

  const updateJob = async (jobId, bodyData) => {
    if (!jobId) {
      throw new Error("Job ID is not defined");
    }

    try {
      const url = `${API_URL}/jobs/${jobId}`;
      axios.defaults.withCredentials = true;
      const { data } = await axios.put(url, bodyData);
      return data;
    } catch (err) {
      console.error(`Error updating job: ${err.response?.data?.message || err.message}`);
      throw err;
    }
  };

  const globalValue = {
    job_ar, fetchJobs,
    addJob, deleteJob, updateJob,
    showJobEdits, setShowJobEdits,
    currentEditJob, setCurrentEditJob,
    currentCategory, setCurrentCategory // קטגוריה נוכחית לניהול
  };

  return (
    <AppContext.Provider value={globalValue}>
      {props.children}
    </AppContext.Provider>
  );
}
