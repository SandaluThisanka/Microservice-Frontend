import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddProductForm from "./AddProductForm";
import DeleteProductForm from "./DeleteProductForm";
import ViewProducts from "./ViewProducts";
import AddCategoryForm from "./AddCategoryForm";
import DeleteCategoryForm from "./DeleteCategoryForm";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProductForm />} />
        <Route path="/deleteproduct" element={<DeleteProductForm />} />
        <Route path="/viewproducts" element={<ViewProducts />} />
        <Route path="/addcategory" element={<AddCategoryForm />} />
        <Route path="/deletecategory" element={<DeleteCategoryForm />} />
      </Routes>
    </Router>
  );
};

export default App;