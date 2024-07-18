import React, { useContext } from 'react'
import { AppContext } from '../context/Context'
import ShopItem from './ShopItem'

export default function ShopList() {
  const { shop_ar } = useContext(AppContext)

  return (
    <div>
      <h2>List of added product:</h2>
      <div className='row'>
        {shop_ar.map(item => {
          return (
            <ShopItem key={item.id} item={item} />
          )
        })}
      </div>
    </div>
  )
}
