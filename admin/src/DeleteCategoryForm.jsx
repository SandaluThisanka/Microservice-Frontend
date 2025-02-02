import React, { useState, useEffect } from "react";
import axios from "axios";
import "./assets/DeleteCategoryForm.css";

const DeleteCategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/product/all");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      alert("Please select a category to delete.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/product/delete/${categoryId}`);
      alert("Category deleted successfully!");

      
      setCategories(categories.filter((category) => category.id !== parseInt(categoryId)));
      setCategoryId("");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formStyle">
      <h2>Delete Category</h2>

      <div className="formGroupStyle">
        <label>Select Category</label>
        <select name="categoryId" value={categoryId} onChange={handleInputChange} className="inputStyle" required>
          <option value="">-- Select Category --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="buttonStyle">
        Delete Category
      </button>
    </form>
  );
};

export default DeleteCategoryForm;
