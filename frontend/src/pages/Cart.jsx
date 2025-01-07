import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext";

const Cart = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/cart/${user.id}`);
        setCartItems(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    if (user) fetchCart();
  }, [user]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:8888/orders', {
        user_id: user.id,
        cart_items: cartItems,
        total_amount: calculateTotal()
      });

      // Navigate to order summary page
      navigate(`/order-summary/${response.data.order_id}`);
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      await axios.put(`http://localhost:8888/cart/${cartItemId}`, { quantity: newQuantity });
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.cart_id === cartItemId ? { ...item, quantity: newQuantity } : item))
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleDelete = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:8888/cart/${cartItemId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.cart_id !== cartItemId));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <main className="account-container">
      {cartItems.map((item) => (
        <div key={item.cart_id} className="cart-item-details">
          <div className="product-name">{item.prod_name}</div>
          <div className="product-price">&#8369;{item.price}</div>
          <div className="product-quantity">
            <span>Quantity:</span>
            <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.cart_id, Number(e.target.value))}
            />
            <span className="delete-quantity-link" onClick={() => handleDelete(item.cart_id)}> Delete </span>
          </div>
        </div>
      ))}
      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: ₱{calculateTotal()}</h3>
        </div>
        <button  className="checkout-button" onClick={handleCheckout} disabled={cartItems.length === 0}>Checkout</button>
      </div>  
    </main>
  );
};

export default Cart;
