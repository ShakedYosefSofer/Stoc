import React, { useState, useContext } from 'react'
import { AppContext } from '../context/Context'

export default function StudentForm() {
  const [nameVal,setNameVal] = useState("")
  const [gradetVal,setGradeVal] = useState(1)

  const {addStudent, resetAllStudent} = useContext(AppContext);

  const onSub = (e) => {
    e.preventDefault();
    const newItem = {
      name: nameVal,
      grade:gradetVal,
      id:Date.now()
    }
    console.log(newItem);
    // בודק שיש לפחות אות אחת בשם של המוצר
    if(newItem.name.length > 1){
      addStudent(newItem);
    }
    // שמירת מידע בלוקל לניסוי
    localStorage.setItem("test_local",nameVal)
  }

  return (
    <div className='col-md-6 py-4'>
      <h2>Students list form</h2>
      <form onSubmit={onSub}>
        <label>Name:</label>
        <input onChange={(e) => setNameVal(e.currentTarget.value)} type="search" className='form-control' />
        <label>Grade:</label>
        <input onChange={(e) => setGradeVal(e.currentTarget.value)} value={gradetVal} type="number" className='form-control' />
        <button className='btn btn-success mt-4'>Add student</button>
        {/* type="button" - דואג שהכפתור לא יהיה קשור
         לשיגור הטופס למרות שהוא בתוכו */}
        <button onClick={() => {
          if(window.confirm("Delete all?")){
            resetAllStudent();
          }
        }} type="button" className='btn btn-danger mt-4 ms-2'>Delete all</button>

      </form>
    </div>
  )
}
