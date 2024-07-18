import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function VipInfo() {
  const [info,setInfo] = useState({});
  const [load,setLoad] = useState(false);
  const params = useParams();
  const nav = useNavigate();

  useEffect(() => {
    doApi();
    // params - הוספנו כדי שכל פעם שהיו אר אל משתנה
    // יזמן מחדש את הפונקציה
  },[params])

  
  const doApi = async() => {
    const url = "http://fs1.co.il/bus/vip_big.php";
    try{
      setLoad(true);
      // כדי להעלים את המידע על האדם שמוצג
      // כך שיוצג רק הלואדינג עד שהמידע על האדם
      // הבא יופיע
      setInfo({});
      const resp = await fetch(url);
      const data = await resp.json();
      const item = data.find(item => item.rank == params["rank"])
      if(item){
        setInfo(item);
      }
      console.log(item);
      setLoad(false);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='container'>
      {load && <h3>Loading...</h3>}
      {/* בודקם שלאינפו יש מאפיין
      כדי להציג את המידע , על מנת למנוע אירור
      פטאלי בתחילת הטעינה שהאובייקט ריק מכיוון שאנחנו
      מדברים עם מאפיין של מאפיין */}
      {info.name && 
      <article className='text-center'>
        <h1>Info about {info.personName}</h1>
        <img src={info.person.squareImage} alt="vip" className='col-4' />
        <div>Companies: {info.source}</div>
        <div>Bio: {info.bios[0]}</div>
        <Link to="/vip">Back to list</Link>
        <br/>
        {params["rank"] < 10 &&
        <button onClick={() => {
          nav(`/vip/${Number(params["rank"]) + 1}`)
        }}>Next</button> }
      </article>
      }
    </div>
  )
}
