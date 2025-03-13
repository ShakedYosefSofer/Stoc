import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_URL } from '../services/apiService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FormSignUp() {
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
  const nav = useNavigate();
  const [isNotRobot, setIsNotRobot] = useState(false); // מצב הצ'קבוקס

  // פונקציה לבדוק אם האימייל קיים במערכת
  const checkEmailExists = async (email) => {
    try {
      const url = `${API_URL}/users/check-email/${email}`;
      const { data } = await axios.get(url);
      return data.exists;
    } catch (err) {
      console.error('Error checking email existence:', err);
      return false;
    }
  };

  const onSubForm = async (bodyData) => {
    delete bodyData.checkEmail;
    const { password, ...bodyDataWithoutPassword } = bodyData;
    const emailExists = await checkEmailExists(bodyData.email);

    if (emailExists) {
      alert('Email already exists in the system.');
      return;
    }

    try {
      const url = `${API_URL}/users`;
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(url, bodyData);

      if (data._id) {
        console.log('Submitted data (without password):', bodyDataWithoutPassword);
        alert('User added successfully');
        reset();
      }
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return (
    <div className='container'>
      <br />
      <h1>Sign Up</h1>
      <br />
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-6'>
        <label>Name:</label>
        <input {...register('name', { required: true, minLength: 2, pattern: /^[A-Z]{2,}$/i })} type="text" className='form-control' />
        {errors.name && <div className='text-danger'>* Enter valid name in English (min 2 chars)</div>}

        <br />
        <label>Email:</label>
        <input {...register('email', { 
          required: true, 
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          validate: async value => !(await checkEmailExists(value)) || 'Email already exists'
        })} 
        type="email" className='form-control' />
        {errors.email && <div className='text-danger'>* {errors.email.message || 'Enter valid Email'}</div>}

        <br />
        <label>Enter Email again:</label>
        <input {...register('checkEmail', { required: true, validate: (val) => val === getValues('email') })} type="text" className='form-control' />
        {errors.checkEmail && <div className='text-danger'>* Email inputs do not match</div>}

        <br />
        <label>Password:</label>
        <input {...register('password', { required: true, minLength: 6 })} type="password" className='form-control' />
        {errors.password && <div className='text-danger'>* Enter valid password (min 6 chars)</div>}

        <br />
        {/* Checkbox לאימות שהמשתמש אינו רובוט */}
        <div className="form-check">
          <input
            type="checkbox"
            id="notRobot"
            className="form-check-input"
            checked={isNotRobot}
            onChange={() => setIsNotRobot(!isNotRobot)}
          />
          <label htmlFor="notRobot" className="form-check-label" >
            I'm not a robot
          </label>
        </div>

        <br />
        <button className='btn btn-danger mt-4' type="submit" disabled={!isNotRobot}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
