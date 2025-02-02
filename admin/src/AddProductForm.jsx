import React, { useState, useEffect } from "react";
import axios from "axios";
import "./assets/Home.css";
import "./assets/AddProductForm.css";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    status: "active",
  });

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [categories, setCategories] = useState([]); 

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
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileName(file ? file.name : "No file chosen");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    try {
      console.log("Submitting form with data:", product);
      console.log("Submitting image:", image);

      const response = await axios.post(
        "http://localhost:8080/product/newproduct",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        alert("Product added successfully!");
        setProduct({
          name: "",
          description: "",
          category: "",
          price: "",
          stock: "",
          status: "active",
        });
        setImage(null);
        setFileName("No file chosen");
      } else {
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formStyle">
      <h2>Add Product</h2>

      <div className="formGroupStyle">
        <label>Enter Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          className="inputStyle"
          required
        />
      </div>

      <div className="formGroupStyle">
        <label>Enter Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          className="inputStyle"
          required
          rows="4"
        />
      </div>

      <div className="formGrid">
        <div className="formGroupStyle">
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="inputStyle"
            required
          >
            <option value="">-- select --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="formGroupStyle">
          <label>Status</label>
          <div className="radioGroup">
            <label>
              <input
                type="radio"
                name="status"
                value="active"
                checked={product.status === "active"}
                onChange={handleInputChange}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={product.status === "inactive"}
                onChange={handleInputChange}
              />
              Inactive
            </label>
          </div>
        </div>
      </div>

      <div className="formGrid">
        <div className="formGroupStyle">
          <label>Enter Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="inputStyle"
            required
          />
        </div>

        <div className="formGroupStyle">
          <label>Enter Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            className="inputStyle"
            required
          />
        </div>
      </div>

      <div className="formGroupStyle">
        <label>Upload Image</label>
        <div className="fileUpload">
          <input
            type="file"
            onChange={handleImageChange}
            id="fileInput"
            style={{ display: "none" }}
            required
          />
          <label htmlFor="fileInput" className="fileLabel">
            Choose File
          </label>
          <span className="fileName">{fileName}</span>
        </div>
      </div>

      <button type="submit" className="buttonStyle">
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
