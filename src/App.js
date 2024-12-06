import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; 
import './App.css';
import Header from "./components/Header";
import Page404 from "./pages/Page404";
import ContextProvider from "./context/Context";
import JobPage from "./pages/JobPage";
import LoginAdmin from "./pages/admin/LoginAdmin";
import HeaderAdmin from "./components/admin/HeaderAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import FormSignUp from "./pages/FormSignUp";
import JobsAdmin from "./pages/admin/JobsAdmin";
import AddJob from "./pages/admin/AddJob";
import ForgotPassword from "./pages/admin/ForgotPassword";
import DeveloperPage from "./pages/DeveloperPage";
import DesignerPage from "./pages/DesignerPage";
import DevOpsPage from "./pages/DevOpsPage";
import QAPage from "./pages/QAPage";
import OthersPage from "./pages/OthersPage";


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

          <Route path="/FormSignUp" element={<FormSignUp />} />
          <Route path="/developer" element={<DeveloperPage />} />
          <Route path="/designer" element={<DesignerPage />} />
          <Route path="/devops" element={<DevOpsPage />} />
          <Route path="/qa" element={<QAPage />} />
          <Route path="/others" element={<OthersPage />} />
          
                      {/* admin pages */}
            <Route path="/admin" element={<LoginAdmin />} />
          <Route path="/admin/users" element={<UsersAdmin />} />
          <Route path="/admin/JobsAdmin" element={<JobsAdmin />} />
          <Route path="/admin/jobs/add" element={<AddJob />} />
          <Route path="/admin/ForgotPassword" element={<ForgotPassword />} />
        
           <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
