import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Pixa() {
  const [inp,setInp] = useState("");
  const [images_ar,setImagesAr] = useState([]);
  const [load,setLoad] = useState(true);

  const [query] = useSearchParams();
  const nav = useNavigate();
  //?s=
  const queryS = query.get("s") || "";

  useEffect(() => {
    doApi();
  },[queryS])

  const doApi = async() => {
    const url = `https://pixabay.com/api/?key=15489555-318fcca1200a48f374a1ce3ea&q=${queryS}&image_type=photo&pretty=true`
    try {
      setLoad(true);
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data.hits);
      setImagesAr(data.hits);
      setLoad(false);
      
    } catch (error) {
      console.log(error);
    }
  }

  const onSearch = () => {
    nav("/pixa?s="+inp)
  }

  return (
    <div className='container'>
    <h1>Search for images: </h1>
    <div className='d-flex col-md-6 my-4'>
      <input onChange={(e) => setInp(e.currentTarget.value)} placeholder='Search for images...' type="search" className='form-control' />
      <button onClick={onSearch} className='btn btn-dark'>Search</button>
    </div>
    <div className='row'>
      {images_ar.map(item => {
        return (
          <div key={item.id} className='col-lg-4 border p-2'>
            {/* <img src={item.previewURL} className='col-4 float-start me-2' alt={item.tags} /> */}
            <div style={{
              width:"33%",
              height:"150px",
              backgroundPosition:"center",
              backgroundSize:"cover",
              backgroundImage:`url(${item.previewURL})`
            }} className='float-start me-2 shadow'></div>
            <h4>Tags:{item.tags}</h4>
            <div>Views: {item.views}</div>
            <div>Likes: {item.likes}</div>
            <a href={item.largeImageURL} target='_blank' className='btn btn-danger'>Link</a>
          </div>
        )
      })}
    </div>
  </div>
  )
}
