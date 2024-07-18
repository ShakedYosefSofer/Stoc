import React from 'react'
import {useForm} from "react-hook-form"

export default function Form1() {
  // register - נוסיף לאינפוטים שנרצה לאסוף את המידע מהם בטופס ולתת להם תנאי וולדזציה
  // handleSubmit - יעטוף את הפונקציה שיגור שלנו , ולפני שיפעיל אותה יבדוק שהתנאים של הריג'סטר של האינפוטים תקניים
  //errors - אובייקט שמקבל לפי שמות הריגסטר של האלמנטים אם יש בהם שגיאה לפי הוולדזציה
  // getValues - מאפשר לאסוף מידע של אינפוט שעשינו לו ריג'סטר לבדיקה התאמה בין אינפוטים
  // setValue - מאפשר לשנות אינפוט עם ריג'סטר
  const {register , handleSubmit ,  formState: { errors } , getValues, setValue } = useForm();

  const onSub = (data) => {
    // יימחוק את המאפיין פון 2
    delete data.phone2;
    console.log(data);
    setValue("name","");

  }

  return (
    <div className='container'>
      <h1>Form sign up</h1>
      <form onSubmit={handleSubmit(onSub)} className='col-md-6'>
        <label>Name:</label>
        <input {...register("name",{required:true,minLength:2})} type="text" className='form-control' />
        {errors.name && <div className='text-danger'>* Enter valid name (min 2 chars)</div>}
        <label>Phone:</label>
        <input {...register("phone",{required:true,minLength:9})} type="text" className='form-control' />
        {errors.phone && <div className='text-danger'>* Enter valid phone (min 9 chars)</div>}
        <label>Enter phone again</label>
        <input {...register("phone2",{required:true,validate:(val) => val == getValues("phone") })} type="text" className='form-control' />
        {errors.phone2 && <div className='text-danger'>* Phones inputs not match</div>}
        <label>Email:</label>
        <input {...register("email",{required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} 
        type="text" className='form-control' />
        {errors.email && <div className='text-danger'>* Enter valid Email</div>}
        <button className='btn btn-dark mt-4'>Sign up</button>
      </form>
    </div>
  )
}
