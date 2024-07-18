import React,{useContext} from 'react'
import { AppContext } from '../context/Context'

export default function StudentItem({item}) {
  const { deleteStudent, setShowStudentEdits, setCurrentEdits} = useContext(AppContext);

  return (
    <div className='col-md-8 border my-1 py-2 shadow-sm'>
      
      <button className='float-end bg-danger' onClick={() => {
        deleteStudent(item.id)
      }}>delete</button>
      <button className='float-end bg-info me-2' onClick={() => {
        setShowStudentEdits(true)
        // מגדיר את האובייקט של הפריט
        // עם כל המאפיינים שאנחנו רוצים לערוך
        setCurrentEdits(item);
        // deleteProduct(item.id)
      }}>Edit</button>
      <h5>name: {item.name} <br/> 
          grade: {item.grade}</h5>
    </div>
  )
}
