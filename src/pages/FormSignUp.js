import React from 'react'
import {useForm} from "react-hook-form"

export default function FormSignUp() {
  // register - נוסיף לאינפוטים שנרצה לאסוף את המידע מהם בטופס ולתת להם תנאי וולדזציה
  // handleSubmit - יעטוף את הפונקציה שיגור שלנו , ולפני שיפעיל אותה יבדוק שהתנאים של הריג'סטר של האינפוטים תקניים
  //errors - אובייקט שמקבל לפי שמות הריגסטר של האלמנטים אם יש בהם שגיאה לפי הוולדזציה
  // getValues - מאפשר לאסוף מידע של אינפוט שעשינו לו ריג'סטר לבדיקה התאמה בין אינפוטים
  // setValue - מאפשר לשנות אינפוט עם ריג'סטר
  const {register , handleSubmit ,  formState: { errors } , getValues, setValue } = useForm();

  const onSub = (data) => {
    // יימחוק את המאפיין פון 2
    delete data.checkEmail;
    console.log(data);
    setValue("name","");

  }

  return (
    <div className='container'>
      <br/>
      <h1>sign up</h1>
      <br/>
      <form onSubmit={handleSubmit(onSub)} className='col-md-6'>
        <label>Name:</label>
        <input {...register("name",{required:true,minLength:2,pattern:/^[A-Z]{2,}$/i})} type="text" className='form-control' />
        {errors.name && <div className='text-danger'>* Enter valid name on English (min 2 chars)</div>}
        
        <br/>
        <label>Email:</label>
        <input {...register("email",{required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} 
        type="email" className='form-control' />
        {errors.email && <div className='text-danger'>* Enter valid Email</div>}
        
        <br/>
        <label>Enter Email again</label>
        <input {...register("checkEmail",{required:true,validate:(val) => val == getValues("email") })} type="text" className='form-control' />
        {errors.checkEmail && <div className='text-danger'>* Email inputs not match</div>}
      
        <br/>
        <label>Password:</label>
        <input {...register("Password",{required:true,minLength:6})} type="password" className='form-control' />
        {errors.Password && <div className='text-danger'>* Enter valid password (min 6 chars)</div>}
      
        <br/>
        <button className='btn btn-danger mt-4'>Sign up</button>
      </form>
    </div>
  )
}
