import React from 'react';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../services/apiService';
import axios from 'axios';
import '../css/forgotPassMembers'; // עיצוב מותאם אישית

export default function ForgotPassMembers() {
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();

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

  const onSubmit = async (formData) => {
    delete formData.checkEmail;

    const emailExists = await checkEmailExists(formData.email);

    if (!emailExists) {
      alert('The email does not exist in the system.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const url = `${API_URL}/users/reset-password`;
      const { data } = await axios.post(url, { email: formData.email, password: formData.password });

      if (data.success) {
        alert('Password reset successfully.');
        reset();
      } else {
        alert('Error resetting password. Please try again.');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
    }
  };

  return (
    <div className='container mt-5'>
      <div className="card shadow-lg p-4">
        <h2 className='text-center mb-4'>Reset Your Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
          
          {/* שדה מייל */}
          <div className="mb-4">
            <label>Email Address:</label>
            <input
              {...register('email', { 
                required: 'Email is required', 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email'
                },
                validate: async (value) => {
                  const emailExists = await checkEmailExists(value);
                  return emailExists || 'Email does not exist in the system';
                }
              })} 
              type="email" 
              className="form-control"
            />
            {errors.email && <div className='text-danger'>{errors.email.message}</div>}
          </div>

          {/* שדה סיסמה חדשה */}
          <div className="mb-4">
            <label>New Password:</label>
            <input
              {...register('password', { 
                required: 'Password is required', 
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })} 
              type="password" 
              className="form-control" 
            />
            {errors.password && <div className='text-danger'>{errors.password.message}</div>}
          </div>

          {/* שדה אימות סיסמה */}
          <div className="mb-4">
            <label>Confirm New Password:</label>
            <input
              {...register('confirmPassword', { 
                required: 'Please confirm your password', 
                validate: (val) => val === getValues('password') || 'Passwords do not match'
              })} 
              type="password" 
              className="form-control" 
            />
            {errors.confirmPassword && <div className='text-danger'>{errors.confirmPassword.message}</div>}
          </div>

          {/* כפתור לשליחה */}
          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
