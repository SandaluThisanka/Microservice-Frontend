import React from "react";
import { Link } from "react-router-dom";
import "./assets/Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="section">
        <h2>Product Management</h2>
        <ul className="listStyle">
          <li>
            <Link to="/addproduct" className="linkStyle">Add Product</Link>
          </li>
          <li>
            <Link to="/deleteproduct" className="linkStyle">Delete Product</Link>
          </li>
          <li>
            <Link to="/viewproducts" className="linkStyle">View Products</Link>
          </li>
        </ul>
      </div>
      <div className="section">
        <h2>Category Management</h2>
        <ul className="listStyle">
          <li>
            <Link to="/addcategory" className="linkStyle">Add Category</Link>
          </li>
          <li>
            <Link to="/deletecategory" className="linkStyle">Delete Category</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;