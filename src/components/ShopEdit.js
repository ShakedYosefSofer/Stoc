import React, { useState,useContext } from 'react'
import "../css/shopEdit.css";
import { AppContext } from '../context/Context';

export default function ShopEdit() {
  const {setShowEdit,currentEditItem,updateProduct} = useContext(AppContext);
  const [nameVal,setNameVal] = useState(currentEditItem.name)
  const [amountVal,setAmountVal] = useState(currentEditItem.amount)

  const onSub = (e) => {
    e.preventDefault()
    const updateItem = {
      name:nameVal,
      amount:amountVal,
      id:currentEditItem.id
    }
    console.log(updateItem);
    updateProduct(updateItem);
    setShowEdit(false)
  }

  return (
    <div className='dark_edit'>
      <div className='dark_inside_box shadow'>
        <h2>Update product:</h2>
        <form onSubmit={onSub}>
        <label>Name:</label>
        <input onChange={(e) => setNameVal(e.currentTarget.value)} type="search" className='form-control' value={nameVal}  />
        <label>Amount:</label>
        <input onChange={(e) => setAmountVal(e.currentTarget.value)} value={amountVal} type="number" className='form-control' />
        <button className='btn btn-info mt-4'>Update</button>
        <button onClick={() => {
          setShowEdit(false)
        }} type="button" className='btn btn-danger mt-4 ms-2'>Cancel</button>
      </form>
      </div>
    </div>
  )
}
