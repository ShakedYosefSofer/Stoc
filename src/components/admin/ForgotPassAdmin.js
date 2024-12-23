import React from 'react';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../services/apiService';
import axios from 'axios';

export default function ForgotPassAdmin() {
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();

  // פונקציה לבדוק אם האימייל קיים במערכת
  const checkEmailExists = async (email) => {
    try {
      const url = `${API_URL}/users/check-email/${email}`; // URL לבדוק אם האימייל קיים
      const { data } = await axios.get(url);
      return data.exists; // החזר true אם האימייל קיים, אחרת false
    } catch (err) {
      console.error('Error checking email existence:', err);
      return false; // החזר false במקרה של שגיאה
    }
  };

  const onSubmit = async (formData) => {
    delete formData.checkEmail;

    // בדיקת קיום אימייל במערכת
    const emailExists = await checkEmailExists(formData.email);

    if (!emailExists) {
      alert('The email does not exist in the system.');
      return; // עצור את הביצוע אם האימייל לא קיים
    }

    // בדיקת התאמת הסיסמאות
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const url = `${API_URL}/users/reset-password`; // URL לעדכון סיסמה
      const { data } = await axios.post(url, { email: formData.email, password: formData.password });

      if (data.success) {
        alert('Password reset successfully.');
        reset(); // איפוס שדות הטופס
      } else {
        alert('Error resetting password. Please try again.');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
    }
  };

  return (
    <div className='container mt-5'>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-3 col-md-6'>
        
        {/* שדה מייל */}
        <div className="mb-3">
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
          {errors.email && <div className='text-danger'>* {errors.email.message}</div>}
        </div>

        {/* שדה סיסמה חדשה */}
        <div className="mb-3">
          <label>New Password:</label>
          <input
            {...register('password', { 
              required: 'Password is required', 
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })} 
            type="password" 
            className="form-control" 
          />
          {errors.password && <div className='text-danger'>* {errors.password.message}</div>}
        </div>

        {/* שדה אימות סיסמה */}
        <div className="mb-3">
          <label>Confirm New Password:</label>
          <input
            {...register('confirmPassword', { 
              required: 'Please confirm your password', 
              validate: (val) => val === getValues('password') || 'Passwords do not match'
            })} 
            type="password" 
            className="form-control" 
          />
          {errors.confirmPassword && <div className='text-danger'>* {errors.confirmPassword.message}</div>}
        </div>

        {/* כפתור לשליחה */}
        <button type="submit" className="btn btn-primary mt-3">Reset Password</button>
      </form>
    </div>
  );
}
