import React, { useEffect, useState } from 'react'
import AuthAdmin from '../../components/admin/AuthAdmin'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from '../../services/apiService';
import PageNav from '../../components/PageNav';
import EditToysAdmin from '../../components/admin/EditToysAdmin';

export default function ToysAdmin() {
  const [ar,setAr] = useState([]);
  const [query] = useSearchParams();
  const [pages,setPages] = useState(0);
  const [showEdit,setShowEdit] = useState(false);
  const [currentEditItem,setCurrentEditItem] = useState({});


  useEffect(() => {
    doApi();
  },[query])
 
 
  const doApi = async () => {
    axios.defaults.withCredentials = true;
    try {
      // אוסף את מספר העמוד אם לא קיבלנו בקווארי הברירת מחדל תיהיה 1
      const page = query.get("page") || 1;
      const limit = 10
      // הופך את הפייג' לסקיפ מה שצד השרת מצפה לקבל
      const skip = (page - 1) * limit;
      const url = API_URL + "/toys?skip= " + skip;
      const { data } = await axios.get(url);
      console.log(data);    
      // בקשה לשרת כדי לקבל את מספר העמודים שיש להציג
      const urlPages = API_URL+"/toys/count";
      const resp = await axios.get(urlPages);
      console.log(resp.data);
      setPages(resp.data.pages);
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
      const url = API_URL + "/toys/" + _id;
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
     
      {showEdit && <EditToysAdmin doApi={doApi} currentEditItem={currentEditItem} setShowEdit={setShowEdit} /> }

      <h1>Table of toys</h1>
      <Link to="/admin/toys/add" className="btn btn-info">Add new Toy</Link>
     <div className='my-2'>
     {pages > 0 && <PageNav toPageUrl={"/admin/toys"} pageCount={pages} />}
     </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <td>#</td>
            <td>name</td>
            <td>category_id</td>
            <td>price</td>
            <td>info</td>
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
                <td>{item.category.name}</td>
                <td>{item.price}</td>
                <td title={item.info}>{item.info.substring(0,20)}</td>
                <td>
                <button onClick={() => {
                    if(window.confirm("Delete category?")){
                      deleteItem(item._id)
                    }
                  }} className='bg-danger'>delete</button>
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
