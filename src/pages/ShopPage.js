import React,{useContext} from 'react'
import ShopForm from '../components/ShopForm'
import ShopList from '../components/ShopList'
import ShopEdit from '../components/ShopEdit'
import { AppContext } from '../context/Context'

export default function ShopPage() {
  const {showEdit} = useContext(AppContext);

  return (
    <div className='container'>
      {/* EDIT/אם להציג את המסך עריכה */}
      { showEdit && <ShopEdit /> }
      <ShopForm />
      <ShopList />
    </div>
  )
}
