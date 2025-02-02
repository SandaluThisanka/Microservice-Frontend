import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/getproduct/${productId}`);
        const data = await response.json();
        setProduct(data);
        setTotal(data.price);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10);
    if (qty >= 1) {
      setQuantity(qty);
      setTotal(qty * product.price);
    }
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please enter your User ID.");
      return;
    }

    const orderData = {
      product_id: product.id,
      quantity: quantity,
      total_bill: total,
      user_id: userId,
    };

    try {
      const response = await fetch('http://localhost:8081/order/neworder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Order placed successfully!');
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-container">
      <div className="order-details">
        <h2>{product.name}</h2>
        <p><strong>Price per unit:</strong> ${product.price}</p>
      </div>

      <div className="order-form">
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          name="userId"
          placeholder="Enter your User ID"
          value={userId}
          onChange={handleUserIdChange}
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />

        <div className="total-section">
          <h4>Total Amount: ${total.toFixed(2)}</h4>
        </div>

        <button onClick={handleOrderSubmit} className="submit-order-button">
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
