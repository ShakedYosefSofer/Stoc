import React,{useContext} from 'react'
import StudentForm from '../components/StudentForm'
import StudentList from '../components/StudentList'
import StudentEdit from '../components/StudentEdit'
import { AppContext } from '../context/Context'

export default function StudentPage() {
  const {showEditStudents} = useContext(AppContext);

  return (
    <div className='container'>
      {/* EDIT/אם להציג את המסך עריכה */}
      { showEditStudents && 
      <StudentEdit /> }
      <StudentForm />
      <StudentList />

    </div>
  );
}
