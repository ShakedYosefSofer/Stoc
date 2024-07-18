import React, { useState,useContext } from 'react'
import "../css/studentEdit.css";
import { AppContext } from '../context/Context'

export default function StudentEdit() {
  const {setShowStudentEdits,currentEditItems, updateStudent} = useContext(AppContext);
  const [nameVal,setNameVal] = useState(currentEditItems.name)
  const [gradeVal,setGradeVal] = useState(currentEditItems.grade)

  const onSub = (e) => {
    e.preventDefault()
    const updateItem = {
      name:nameVal,
      grade:gradeVal,
      id:currentEditItems.id
    }
    console.log(updateItem);
    updateStudent(updateItem);
    setShowStudentEdits(false)
  }

  return (
    <div className='dark_edit'>
      <div className='dark_inside_box shadow'>
        <h2>Update student:</h2>
        <form onSubmit={onSub}>
        <label>Name:</label>
        <input onChange={(e) => setNameVal(e.currentTarget.value)} type="search" className='form-control' value={nameVal}  />
        <label>Grade:</label>
        <input onChange={(e) => setGradeVal(e.currentTarget.value)} value={gradeVal} type="number" className='form-control' />
        <button className='btn btn-info mt-4'>Update</button>
        <button onClick={() => {
          setShowStudentEdits(false)
        }} type="button" className='btn btn-danger mt-4 ms-2'>Cancel</button>
      </form>
      </div>
    </div>
  )
}
