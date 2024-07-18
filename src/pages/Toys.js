import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL } from '../services/apiService';

export default function Toys() {
  const [toys_ar,setToysAr] = useState([]);
  const [inp,setInp] = useState("");

  const [query] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    doApi();
    // query -> כל פעם שהיו אר אל משתנה הוא משתנה גם
    // ויזמן מחדש את הפונקציה
  },[query])

  const doApi = async() => {
    const queryS = query.get("s") || "";

    const url = API_URL+"/toys?limit=20&s="+queryS;
    try {
      const resp = await fetch(url);
      const data = await resp.json();

      setToysAr(data);
    } catch (error) {
      console.log(error);
    }
  }

  const onSearch = () => {
    nav("/toys?s="+inp)
  }

  return (
    <div className='container'>
      <h1>Toys list:</h1>
      <div className='d-flex col-md-6 my-4'>
        <input onChange={(e) => setInp(e.currentTarget.value)} placeholder='Search for toys...' type="search" className='form-control' />
        <button onClick={onSearch} className='btn btn-info'>Search</button>
      </div>
      <ul>
        {toys_ar.map(item => {
          return (
            <li key={item._id}>
              {item.name} | {item.category} | {item.price} NIS
            </li>
          )
        })}
      </ul>
    </div>
  )
}
