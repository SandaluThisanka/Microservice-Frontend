import React, { useState } from "react";
import axios from "axios";
import "./assets/DeleteProductForm.css";

const DeleteProductForm = () => {
  const [productId, setProductId] = useState("");

  const handleInputChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/product/deleteproduct/${productId}`);
      alert("Product deleted successfully!");
      setProductId("");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formStyle">
      <h2>Delete Product</h2>

      <div className="formGroupStyle">
        <label>Enter Product ID</label>
        <input
          type="text"
          name="productId"
          value={productId}
          onChange={handleInputChange}
          className="inputStyle"
          required
        />
      </div>

      <button type="submit" className="buttonStyle">
        Delete Product
      </button>
    </form>
  );
};

export default DeleteProductForm;