import React from 'react'
import { useForm } from "react-hook-form"
import { API_URL } from '../../services/apiService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddToys() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();

  const onSubForm = async(bodyData) => {
    console.log(bodyData);
    try{
      const url = API_URL+"/toys"
      axios.defaults.withCredentials = true;
      const {data} = await axios({
        method:"POST",
        url:url,
        data:bodyData
      })
      if(data._id){
        alert("new item added");
        nav("/admin/toys")
      }
    }
    catch(err){
      console.log(err);
      
    }
  }
// need enter all input from node.js on Model
  return (
    <div className='container'>
      <h1>Add new toys:</h1>
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-6' >
        <label>name</label>
        <input {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.name && <div className="text-danger">* Enter valid name</div>}
   
        <label>info</label>
        <input {...register("info", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.info && <div className="text-danger">* Enter valid info</div>}
   
        <label>category</label>
        <input {...register("category", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.category && <div className="text-danger">* Enter valid category</div>}
   
        <label>img_url</label>
        <input {...register("img_url", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.img_url && <div className="text-danger">* Enter valid img_url</div>}
      
        <label>price</label>
        <input {...register("price", { required: true, minLength: 1 })} className="form-control" type="text" />
        {errors.price && <div className="text-danger">* Enter valid price</div>}
   
        <button className='btn btn-success mt-4'>Add</button>
      </form>
    </div>
  )
}
