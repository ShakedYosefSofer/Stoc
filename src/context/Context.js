import { createContext, useLayoutEffect, useState } from "react";
export const AppContext = createContext(null);

export default function ContextProvider(props){
  const [counter,setCounter] = useState(99);
  const [showEdit,setShowEdit] = useState(false)
  const [currentEditItem,setCurrentEdit] = useState({})
  
  const [currentEditItems,setCurrentEdits] = useState({})
  const [showEditStudents,setShowStudentEdits] = useState(false)

  const [shop_ar,setShopAr] = useState([
    {name:"milk",amount:4,id:1},
    {name:"bamba",amount:2,id:2},
    {name:"shoko",amount:6,id:3},
  ]);

 
  // useEffect - כמו יוז אפקט אבל פועל לפני הרנדור של הקומפונינטה
  useLayoutEffect(() => {
    // בודקים אם יש מידע שנשמר בלוקאל ואם כן נחזיר אותו למערך
    if(localStorage.getItem("shop_ar")){
      setShopAr(JSON.parse(localStorage.getItem("shop_ar")))
    }
  },[])

  const addProduct = (newItem) => {
    setShopAr([...shop_ar,newItem]);
    // stringify - מכיוון שאנחנו רוצים לשמור ג'ייסון ולוקאל יודע
    // לעבוד רק עם סטרינג אנחנו חייבים להמיר אותו לסטרינג
    localStorage.setItem("shop_ar",JSON.stringify([...shop_ar,newItem]))
  }

  const resetAllProducts = () => {
    setShopAr([]);
    localStorage.setItem("shop_ar",JSON.stringify([]))
  }

  const deleteProduct = (del_id) => {
    const filter_ar = shop_ar.filter(item => item.id != del_id)
    setShopAr(filter_ar);
    localStorage.setItem("shop_ar",JSON.stringify(filter_ar))
  }

  const updateProduct = (updateItem) => {
    const map_ar = shop_ar.map((item) => {
      if(item.id == updateItem.id){
        item = updateItem
      }
      return item;
    }) 
    setShopAr(map_ar)
    localStorage.setItem("shop_ar",JSON.stringify(map_ar))
  }

  const [student_ar,setStudentAr] = useState([
    {name:"Moshe",grade:40,id:1},
    {name:"Avi",grade:92,id:2},
    {name:"Anonimus",grade:60,id:3},
  ]);

  useLayoutEffect(() => {
    // בודקים אם יש מידע שנשמר בלוקאל ואם כן נחזיר אותו למערך
    if(localStorage.getItem("student_ar")){
      setStudentAr(JSON.parse(localStorage.getItem("student_ar")))
    }
  },[])

  const addStudent = (newItem) => {
    setStudentAr([...student_ar,newItem]);
      // stringify - מכיוון שאנחנו רוצים לשמור ג'ייסון ולוקאל יודע
    // לעבוד רק עם סטרינג אנחנו חייבים להמיר אותו לסטרינג
    localStorage.setItem("student_ar",JSON.stringify([...student_ar,newItem]))
  }

  const resetAllStudent = () => {
    setStudentAr([]);
    localStorage.setItem("student_ar",JSON.stringify([]))

  }

 
  const deleteStudent = (del_id) => {
    const filter_ar = student_ar.filter(item => item.id != del_id)
    setStudentAr(filter_ar);
    localStorage.setItem("student_ar",JSON.stringify(filter_ar))
  }
  
  const updateStudent = (updateStudent) => {
    const map_ar = student_ar.map((item) => {
      if(item.id == updateStudent.id){
        item = updateStudent
      }
      return item;
    }) 
    setStudentAr(map_ar)
    localStorage.setItem("student_ar",JSON.stringify(map_ar))
  }

  const globalValue = {
    counter,setCounter,
    shop_ar,addProduct,resetAllProducts,deleteProduct,
    showEdit,setShowEdit,currentEditItem,setCurrentEdit,updateProduct,
        student_ar,addStudent,resetAllStudent,deleteStudent,
    showEditStudents,setShowStudentEdits,currentEditItems,setCurrentEdits,updateStudent

  }
    // Value - כל מה שיהיה מהמאפיין שנעביר לווליו
  // יהפוך להיות גלובלי לכל הקומפנינטת ש
  // APPCONTEXT PROVIDER עוטף
  return (
    <AppContext.Provider value={globalValue} >
      {props.children}
    </AppContext.Provider>
  )
}