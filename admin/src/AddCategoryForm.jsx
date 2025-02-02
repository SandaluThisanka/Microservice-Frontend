import React, { useState } from "react";
import axios from "axios";
import "./assets/AddCategoryForm.css";

const AddCategoryForm = () => {
  const [category, setCategory] = useState({
    name: "",
    is_active: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategory(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post("http://localhost:8080/product/add", category, {
        headers: { "Content-Type": "application/json" },
      });
      
      alert("Category added successfully!");
      setCategory({ name: "", is_active: true });
    } catch (error) {
      console.error("Error adding category:", error);
      alert(error.response?.data || "Failed to add category.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="formStyle">
      <h2>Add Category</h2>

      <div className="formGroupStyle">
        <label>Category Name</label>
        <input
          type="text"
          name="name"
          value={category.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="formGroupStyle">
        <label>
          <input
            type="checkbox"
            name="is_active"
            checked={category.is_active}
            onChange={handleInputChange}
          />
          Is Active
        </label>
      </div>

      <button type="submit" className="buttonStyle">
        Add Category
      </button>
    </form>
  );
};

export default AddCategoryForm;