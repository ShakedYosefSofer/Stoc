import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; 
import './App.css';
import Header1 from "./components/Header1";
import Page404 from "./pages/Page404";
import ContextProvider from "./context/Context";
import JobPage from "./pages/JobPage";
// import JobPage from "./pages/admin/JobPage";
import JobFormA from './pages/JobFormA';
// import JobListPage from './pages/JobListPage';
import LoginAdmin from "./pages/admin/LoginAdmin";
import HeaderAdmin from "./components/admin/HeaderAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
// import JobFormAdmin from "./pages/admin/JobFormAdmin";
import FormSignUp from "./pages/FormSignUp";
import CategoriesAdmin1 from "./pages/admin/CategoriesAdmin1";
import AddCategory from "./pages/admin/AddCategory";


function App() {



  return (
    <ContextProvider>
      <BrowserRouter>
  {/* אזור של ההידר לפי היו אר אל יציג
      את ההידר הנכון */}
        <Routes>
          <Route path="/admin/*" element={<HeaderAdmin />} />
          <Route path="*" element={<Header1 />} />
        </Routes>
        <Routes>
          <Route path="/student" element={<JobPage  />} />
          {/* <Route path="/JobFormA" element={<JobFormA  />} /> */}

          <Route path="/FormSignUp" element={<FormSignUp />} />
                      {/* admin pages */}
            <Route path="/admin" element={<LoginAdmin />} />
          <Route path="/admin/users" element={<UsersAdmin />} />
          <Route path="/admin/categories" element={<CategoriesAdmin1 />} />
          <Route path="/admin/categories/add" element={<AddCategory />} />
          <Route path="/admin/JobFormA" element={<JobFormA  />} />
          <Route path="/admin/Jobs" element={<JobPage  />} />
           <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
