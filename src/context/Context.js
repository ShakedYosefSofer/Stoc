import { createContext, useLayoutEffect, useState } from "react";

export const AppContext = createContext(null);

export default function ContextProvider(props) {
  const [counter, setCounter] = useState(99);
  const [showEdit, setShowEdit] = useState(false);
  const [currentEditItem, setCurrentEdit] = useState({});
  const [currentEditItems, setCurrentEdits] = useState({});
  const [showEditStudents, setShowStudentEdits] = useState(false);
  const [showEditJobs, setShowJobEdits] = useState(false);

  const [shop_ar, setShopAr] = useState([]);
  const [student_ar, setStudentAr] = useState([]);
  const [job_ar, setJobAr] = useState([]);

  useLayoutEffect(() => {
    // Reading data from LocalStorage
    const storedShopAr = localStorage.getItem("shop_ar");
    if (storedShopAr) {
      setShopAr(JSON.parse(storedShopAr));
    }
    
    const storedStudentAr = localStorage.getItem("student_ar");
    if (storedStudentAr) {
      setStudentAr(JSON.parse(storedStudentAr));
    }

    const storedJobAr = localStorage.getItem("job_ar");
    if (storedJobAr) {
      setJobAr(JSON.parse(storedJobAr));
    }
  }, []);

  // Functions for products
  const addProduct = (newItem) => {
    const updatedShopAr = [...shop_ar, newItem];
    setShopAr(updatedShopAr);
    localStorage.setItem("shop_ar", JSON.stringify(updatedShopAr));
  };

  const resetAllProducts = () => {
    setShopAr([]);
    localStorage.setItem("shop_ar", JSON.stringify([]));
  };

  const deleteProduct = (del_id) => {
    const updatedShopAr = shop_ar.filter(item => item.id !== del_id);
    setShopAr(updatedShopAr);
    localStorage.setItem("shop_ar", JSON.stringify(updatedShopAr));
  };

  const updateProduct = (updateItem) => {
    const updatedShopAr = shop_ar.map(item =>
      item.id === updateItem.id ? updateItem : item
    );
    setShopAr(updatedShopAr);
    localStorage.setItem("shop_ar", JSON.stringify(updatedShopAr));
  };

  // Functions for students
  const addStudent = (newItem) => {
    const updatedStudentAr = [...student_ar, newItem];
    setStudentAr(updatedStudentAr);
    localStorage.setItem("student_ar", JSON.stringify(updatedStudentAr));
  };

  const resetAllStudent = () => {
    setStudentAr([]);
    localStorage.setItem("student_ar", JSON.stringify([]));
  };

  const deleteStudent = (del_id) => {
    const updatedStudentAr = student_ar.filter(item => item.id !== del_id);
    setStudentAr(updatedStudentAr);
    localStorage.setItem("student_ar", JSON.stringify(updatedStudentAr));
  };

  const updateStudent = (updateStudent) => {
    const updatedStudentAr = student_ar.map(item =>
      item.id === updateStudent.id ? updateStudent : item
    );
    setStudentAr(updatedStudentAr);
    localStorage.setItem("student_ar", JSON.stringify(updatedStudentAr));
  };

  // Functions for jobs
  const addJob = (newItem) => {
    const updatedJobAr = [...job_ar, newItem];
    setJobAr(updatedJobAr);
    localStorage.setItem("job_ar", JSON.stringify(updatedJobAr));
  };

  const resetAllJobs = () => {
    setJobAr([]);
    localStorage.setItem("job_ar", JSON.stringify([]));
  };

  const deleteJob = (del_id) => {
    const updatedJobAr = job_ar.filter(item => item.id !== del_id);
    setJobAr(updatedJobAr);
    localStorage.setItem("job_ar", JSON.stringify(updatedJobAr));
  };

  const updateJob = (updateJob) => {
    const updatedJobAr = job_ar.map(item =>
      item.id === updateJob.id ? updateJob : item
    );
    setJobAr(updatedJobAr);
    localStorage.setItem("job_ar", JSON.stringify(updatedJobAr));
  };

  const globalValue = {
    counter, setCounter,
    shop_ar, addProduct, resetAllProducts, deleteProduct, updateProduct,
    showEdit, setShowEdit, currentEditItem, setCurrentEdit,
    student_ar, addStudent, resetAllStudent, deleteStudent, updateStudent,
    showEditStudents, setShowStudentEdits, currentEditItems, setCurrentEdits,
    job_ar, addJob, resetAllJobs, deleteJob, updateJob,
    showEditJobs, setShowJobEdits
  };

  return (
    <AppContext.Provider value={globalValue}>
      {props.children}
    </AppContext.Provider>
  );
}