// // StudentContext.js
// import { createContext, useLayoutEffect, useState } from "react";

// export const AppContext = createContext(null);

// export default function ContextProvider(props) {
//   const [counter, setCounter] = useState(99);
//   const [showEditStudents, setShowStudentEdits] = useState(false);
//   const [currentEditItems, setCurrentEdits] = useState({});
//   const [student_ar, setStudentAr] = useState([
//     { name: "Moshe", grade: 40, id: 1 },
//     { name: "Avi", grade: 92, id: 2 },
//     { name: "Anonimus", grade: 60, id: 3 },
//   ]);

//   useLayoutEffect(() => {
//     if (localStorage.getItem("student_ar")) {
//       setStudentAr(JSON.parse(localStorage.getItem("student_ar")));
//     }
//   }, []);

//   const addStudent = (newItem) => {
//     setStudentAr([...student_ar, newItem]);
//     localStorage.setItem("student_ar", JSON.stringify([...student_ar, newItem]));
//   };

//   const resetAllStudent = () => {
//     setStudentAr([]);
//     localStorage.setItem("student_ar", JSON.stringify([]));
//   };

//   const deleteStudent = (del_id) => {
//     const filter_ar = student_ar.filter(item => item.id !== del_id);
//     setStudentAr(filter_ar);
//     localStorage.setItem("student_ar", JSON.stringify(filter_ar));
//   };

//   const updateStudent = (updateStudent) => {
//     const map_ar = student_ar.map((item) => {
//       if (item.id === updateStudent.id) {
//         item = updateStudent;
//       }
//       return item;
//     });
//     setStudentAr(map_ar);
//     localStorage.setItem("student_ar", JSON.stringify(map_ar));
//   };

//   const globalValue = {
//     counter, setCounter,
//     student_ar, addStudent, resetAllStudent, deleteStudent,
//     showEditStudents, setShowStudentEdits, currentEditItems, setCurrentEdits, updateStudent
//   };

//   return (
//     <AppContext.Provider value={globalValue}>
//       {props.children}
//     </AppContext.Provider>
//   );
// }
