// OrderSummary.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext";

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