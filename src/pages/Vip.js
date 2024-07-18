import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Vip() {
  const [vip_ar,setVipAr] = useState([]);
  const [load,setLoad] = useState(false);

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    const url = "http://fs1.co.il/bus/vip_big.php";
    try{
      setLoad(true);
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data);
      setVipAr(data)
      setLoad(false);
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <div className='container'>
      <h1>Vip list:</h1>
      {load && <h3>Loading...</h3>}
      <div className='row'>
        {vip_ar.map(item => {
          return (
            <div key={item.rank} className='col-md-6 border p-2'>
              <img src={item.person.squareImage} alt="vip" className='w-25 float-start me-2' />
              <h3>{item.personName}</h3>
              {/* toLocaleString() - דואג כל 3 ספרות להוסיף פסיק */}
              <div>Money: {(item.finalWorth * 1000000).toLocaleString()} USD</div>
              <Link to={"/vip/"+item.rank}>More info</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
