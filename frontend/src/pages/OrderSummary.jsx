import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderSummary = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/orders/${orderId}`);
        setOrderDetails(res.data);
      } catch (err) {
        console.error("Error fetching order details:", err);
      }
    };

    if (orderId) fetchOrderDetails();
  }, [orderId]);

  const getFirstImage = (imageString) => {
    if (!imageString) return ''; // Handle undefined/null case
    
    try {
      const images = JSON.parse(imageString);
      return Array.isArray(images) ? images[0] || '' : '';
    } catch (err) {
      console.error("Error parsing image JSON:", err);
      return '';
    }
  };

  const renderImage = (item) => {
    const imagePath = getFirstImage(item.image);
    if (!imagePath) {
      return (
        <div 
          className="order-item-placeholder"
          style={{ 
            width: '100px', 
            height: '100px', 
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          No Image
        </div>
      );
    }

    return (
      <img 
        src={`http://localhost:8888/images/${imagePath}`}
        alt={item.prod_name}
        className="order-item-image"
        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'placeholder-image-url.jpg'; // You can add a placeholder image URL
          e.target.style.backgroundColor = '#f0f0f0';
        }}
      />
    );
  };

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      <div className="order-details">
        <p>Order ID: #{orderId}</p>
        <p>Date: {new Date(orderDetails[0].created_at).toLocaleDateString()}</p>
        <p>Status: {orderDetails[0].status}</p>
      </div>

      <div className="order-items">
        <h3>Items</h3>
        {orderDetails.map((item) => (
          <div key={item.id} className="order-item">
            {renderImage(item)}
            <div className="item-details">
              <h4>{item.prod_name}</h4>
              <p>Brand: {item.brand}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₱{item.price_at_time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="order-total">
        <h3>Total Amount: ₱{orderDetails[0].total_amount}</h3>
      </div>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  );
};

export default OrderSummary;