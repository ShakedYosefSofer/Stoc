import React from 'react'
import { useForm } from "react-hook-form"
import { API_URL } from '../../services/apiService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();

  const onSubForm = async(bodyData) => {
    console.log(bodyData);
    try{
      const url = API_URL+"/categories"
      axios.defaults.withCredentials = true;
      const {data} = await axios({
        method:"POST",
        url:url,
        data:bodyData
      })
      if(data._id){
        alert("new item added");
        nav("/admin/categories")
      }
    }
    catch(err){
      console.log(err);
      
    }
  }

  return (
    <div className='container'>
      <h1>Add new category:</h1>
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-6' >
        <label>name</label>
        <input {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.name && <div className="text-danger">* Enter valid name</div>}
        <label>category id</label>
        <input {...register("category_id", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.category_id && <div className="text-danger">* Enter valid category_id</div>}
        <label>img_url</label>
        <input {...register("img_url", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.img_url && <div className="text-danger">* Enter valid img_url</div>}
        <button className='btn btn-success mt-4'>Add</button>
      </form>
    </div>
  )
}
