import React, { useContext } from 'react'
import { AppContext } from '../context/Context'
import StudentItem from './StudentItem'

export default function StudentList() {
  const { student_ar } = useContext(AppContext)

  return (
    <div>
      <h2>List of added student:</h2>
      <div className='row'>
        {student_ar.map(item => {
          return (
            <StudentItem key={item.id} item={item} />
          )
        })}
      </div>
    </div>
  )
}
