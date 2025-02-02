import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/getproduct/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <div className="product-container">
      <div className="product-details">
        <h1>{product.name}</h1>
        <div className="image-wrapper">
          <img 
            src={`http://localhost:8080/uploads/${product.image}`} 
            alt={product.name} 
            className="product-image" 
          />
        </div>
        <p className="description">{product.description}</p>
        <p className="price">Price: ${product.price.toLocaleString()}</p>
        <div className="button-container">
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;