import React, { useEffect, useState } from 'react'
import { API_URL } from '../../services/apiService';
import axios from 'axios';
import AuthAdmin from '../../components/admin/AuthAdmin';
import { Link } from 'react-router-dom';
import EditCategoryAdmin from '../../components/admin/EditCategoryAdmin';

export default function CategoriesAdmin1() {
  const [ar,setAr] = useState([]);
  // דואג אם להציג את הפופ אפ של העריכה 
  const [showEdit,setShowEdit] = useState(false);
  // יגדיר את הפריט שנרצה לערוך ככה שהפופ אפ עריכה יציג את המידע שלו
  // בתוך האינפוטים
  const [currentEditItem,setCurrentEditItem] = useState({});

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    axios.defaults.withCredentials = true;
    try {
      const url = API_URL + "/categories";
      const { data } = await axios.get(url);
      console.log(data);
      setAr(data);
    }
    catch (error) {
      // alert("Error , come back later")
      console.log(error);
    }
  }

  // מחיקה של פריט לפי איי די
  const deleteItem = async(_id) => {
    try {
      const url = API_URL + "/categories/" + _id;
      axios.defaults.withCredentials = true;
      const {data} = await axios.delete(url);
      if(data.deletedCount){
        doApi();
      }
      console.log(data);
    } catch (error) {
      
    }
  }

  const onEditItem = (item) => {
    setShowEdit(true)
    setCurrentEditItem(item)
  }

  return (
    <div className='container'>
      <AuthAdmin />
      {showEdit && <EditCategoryAdmin doApi={doApi} currentEditItem={currentEditItem} setShowEdit={setShowEdit} /> }
      <h1>Table of categories</h1>
      <Link to="/admin/categories/add" className="btn btn-info">Add new category</Link>
      <table className='table table-striped'>
        <thead>
          <tr>
            <td>#</td>
            <td>name</td>
            <td>category_id</td>
            <td>Del/Edit</td>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                {/* td -תאים בשורה / עמודות */}
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.category_id}</td>
                <td>
                  <button onClick={() => {
                    if(window.confirm("Delete category?")){
                      deleteItem(item._id)
                    }
                  }} className='bg-danger'>X</button>
                  <button onClick={() => {
                    onEditItem(item)
                  }} className='bg-info'>Edit</button>
                </td>
              </tr>
            )
          })}


        </tbody>
      </table >
    </div >
  )
}
