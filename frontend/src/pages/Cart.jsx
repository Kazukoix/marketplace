import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext"; // Import UserContext
import "../css/cart.styled.css";

const Cart = () => {
  const { user } = useContext(UserContext); // Access user info
  const [cartItems, setCartItems] = useState([]);

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
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.cart_id, Number(e.target.value))}
            />
            <span className="delete-quantity-link" onClick={() => handleDelete(item.cart_id)}>
              Delete
            </span>
          </div>
        </div>
      ))}
      <button>Buy</button>
    </main>
  );
};

export default Cart;
