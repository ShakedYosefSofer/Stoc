import React,{useContext} from 'react'
import { AppContext } from '../context/Context'

export default function ShopItem({item}) {
  const {deleteProduct, setShowEdit, setCurrentEdit} = useContext(AppContext);

  return (
    <div className='col-md-8 border my-1 py-2 shadow-sm'>
      
      <button className='float-end bg-danger' onClick={() => {
        deleteProduct(item.id)
      }}>X</button>
      <button className='float-end bg-info me-2' onClick={() => {
        setShowEdit(true)
        // מגדיר את האובייקט של הפריט
        // עם כל המאפיינים שאנחנו רוצים לערוך
        setCurrentEdit(item);
        // deleteProduct(item.id)
      }}>Edit</button>
      <h5>{item.name} - {item.amount}</h5>
    </div>
  )
}
