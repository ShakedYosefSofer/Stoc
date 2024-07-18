import React from 'react'
import "../../css/editPopup.css"
import { useForm } from "react-hook-form"
import axios from 'axios';
import { API_URL } from '../../services/apiService';

export default function EditToysAdmin({setShowEdit,currentEditItem,doApi}) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = async(bodyData) => {
    console.log(bodyData);
    try{
      const url = API_URL+"/toys/"+currentEditItem._id;
      axios.defaults.withCredentials = true;
      const {data} = await axios({
        method:"PUT",
        url,
        data:bodyData
      })
      console.log(data);
      if(data.modifiedCount){
        setShowEdit(false);
        doApi();
      }
    }
    catch(err){
      console.log(err);
      
    }
  }

  return (
    <div className='popup_window'>
      <div className='popup_window_inside'>
        <h2>Update toys:</h2>
        <form onSubmit={handleSubmit(onSubForm)} className='col-md-10' >
        
          <label>name</label>
          <input defaultValue={currentEditItem.name} {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
          {errors.name && <div className="text-danger">* Enter valid name</div>}
        
          <label>info</label>
          <input defaultValue={currentEditItem.info} {...register("info", { required: true, minLength: 2 })} className="form-control" type="text" />
          {errors.info && <div className="text-danger">* Enter valid info</div>}
        
          <label>category</label>
          <input  defaultValue={currentEditItem.category} {...register("category", { required: true, minLength: 2 })} className="form-control" type="text" />
          {errors.category && <div className="text-danger">* Enter valid category</div>}
       
          <label>img_url</label>
          <input defaultValue={currentEditItem.img_url} {...register("img_url", { required: false, minLength: 2 })} className="form-control" type="text" />
          {errors.img_url && <div className="text-danger">* Enter valid img_url</div>}
        
          <label>price</label>
          <input defaultValue={currentEditItem.price} {...register("price", { required: false, minLength:1 })} className="form-control" type="text" />
          {errors.price && <div className="text-danger">* Enter valid price</div>}
        
        
          <button className='btn btn-info mt-4'>Update</button>
          <button onClick={() => {
            setShowEdit(false)
          }} type="button" className='btn btn-danger ms-2 mt-4'>cancel</button>
        </form>
      </div>
    </div>
  )
}
