import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';


export default function PageNav({toPageUrl,pageCount,cssClass}) {
  const [page,setPage] = useState(pageCount);
  const [query] = useSearchParams();
  let currentPage = Number(query.get("page"))
  
  return (
    <div>
      <Link  to={toPageUrl+"?page="+(Math.max(currentPage-1,1))} className={cssClass || "me-2 btn btn-dark"}>Back</Link>
      {[...Array(page)].map((item,i) => {
        return(
          <Link key={i} to={toPageUrl+"?page="+(i+1)} className={cssClass || "me-2 btn btn-dark"}>{i+1}</Link>
        )
      })}
       <Link  to={toPageUrl+"?page="+(Math.min(currentPage+1,page))} className={cssClass || "me-2 btn btn-dark"}>Next</Link>
    </div>
  )
}
