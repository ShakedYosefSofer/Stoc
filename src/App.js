import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; 
import './App.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Header1 from "./components/Header1";
import Page404 from "./pages/Page404";
import CounterPage from "./pages/CounterPage";
import ContextProvider from "./context/Context";
import ShopPage from "./pages/ShopPage";
import JobPage from "./pages/JobPage";
import LoginAdmin from "./pages/admin/LoginAdmin";
import HeaderAdmin from "./components/admin/HeaderAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import Pixa from "./pages/Pixa";
import Form1 from "./pages/Form1";
import Graph1 from "./pages/Graph1";
import Graph2 from "./pages/Graph2";
import Icons from "./pages/Icons";
import MapPage from "./pages/MapPage";
import Jerusalem from "./pages/Jerusalem";
import FormSignUp from "./pages/FormSignUp";
import CategoriesAdmin1 from "./pages/admin/CategoriesAdmin1";
import AddCategory from "./pages/admin/AddCategory";
import ToysAdmin from "./pages/admin/ToysAdmin";
import AddToys from "./pages/admin/AddToys";


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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/student" element={<JobPage  />} />
          <Route path="/form1" element={<Form1 />} />
          <Route path="/icons" element={<Icons />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/jerusaelm" element={<Jerusalem />} />
          <Route path="/FormSignUp" element={<FormSignUp />} />
                      {/* admin pages */}
            <Route path="/admin" element={<LoginAdmin />} />
          <Route path="/admin/users" element={<UsersAdmin />} />
          <Route path="/admin/categories" element={<CategoriesAdmin1 />} />
          <Route path="/admin/categories/add" element={<AddCategory />} />
          <Route path="/admin/toys" element={<ToysAdmin />} />
          <Route path="/admin/toys/add" element={<AddToys />} />
          <Route path="/pixa" element={<Pixa />} />
          <Route path="/graph1" element={<Graph1 />} />
          <Route path="/graph2" element={<Graph2 />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
