import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; 
import './App.css';
import Header from "./components/Header";
import Page404 from "./pages/Page404";
import ContextProvider from "./context/Context";
import JobPage from "./pages/JobPage";
// import JobFormA from './pages/admin/JobFormA';
import LoginAdmin from "./pages/admin/LoginAdmin";
import HeaderAdmin from "./components/admin/HeaderAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import FormSignUp from "./pages/FormSignUp";
import CategoriesAdmin1 from "./pages/admin/CategoriesAdmin1";
import AddCategory from "./pages/admin/AddCategory";
import JobsAdmin from "./pages/admin/JobsAdmin";
import AddJob from "./pages/admin/AddJob";


function App() {



  return (
    <ContextProvider>
      <BrowserRouter>
  {/* אזור של ההידר לפי היו אר אל יציג
      את ההידר הנכון */}
        <Routes>
          <Route path="/admin/*" element={<HeaderAdmin />} />
          <Route path="*" element={<Header />} />
        </Routes>
        <Routes>
          <Route path="/" element={<JobPage  />} />
          
          {/* <Route path="/JobFormA" element={<JobFormA  />} /> */}

          <Route path="/FormSignUp" element={<FormSignUp />} />
                      {/* admin pages */}
            <Route path="/admin" element={<LoginAdmin />} />
          <Route path="/admin/users" element={<UsersAdmin />} />
          <Route path="/admin/JobsAdmin" element={<JobsAdmin />} />
          <Route path="/admin/jobs/add" element={<AddJob />} />
          <Route path="/admin/categories" element={<CategoriesAdmin1 />} />
          <Route path="/admin/categories/add" element={<AddCategory />} />
          {/* <Route path="/admin/JobFormA" element={<JobFormA  />} /> */}
          {/* <Route path="/admin/Jobs" element={<JobPage  />} /> */}
           <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
