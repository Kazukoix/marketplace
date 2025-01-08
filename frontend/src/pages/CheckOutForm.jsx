import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 p-6">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-2xl font-semibold">{children}</h3>
);

const CardContent = ({ children }) => (
  <div className="p-6 pt-0">{children}</div>
);

const CheckoutForm = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [cartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('checkoutItems') || '[]');
    } catch {
      return [];
    }
  });
  
  const [formData, setFormData] = useState({
    address: '',
    phone_number: '',
    email: user?.email || '',
    shipping_method: '16days'
  });

  const getDeliveryDate = (method) => {
    const date = new Date();
    const days = method === '3days' ? 3 : method === '7days' ? 7 : 16;
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getShippingFee = (method) => {
    switch(method) {
      case '3days':
        return 120;
      case '7days':
        return 50;
      default:
        return 0;
    }
  };

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = getShippingFee(formData.shipping_method);
    return itemsTotal + shippingFee;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please log in to place an order');
      return;
    }
    
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const orderData = {
        user_id: user.id,
        cart_items: cartItems,
        total_amount: calculateTotal(),
        address: formData.address,
        phone_number: formData.phone_number,
        email: formData.email,
        delivery_date: getDeliveryDate(formData.shipping_method),
        shipping_method: formData.shipping_method,
        shipping_fee: getShippingFee(formData.shipping_method)
      };

      // Add timeout to the axios request
      const response = await axios.post('http://localhost:8888/orders', orderData, {
        timeout: 5000, // 5 second timeout
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if you're using JWT
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.order_id) {
        localStorage.removeItem('checkoutItems');
        navigate(`/order-summary/${response.data.order_id}`);
      } else {
        throw new Error('No order ID received from server');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      if (err.code === 'ECONNREFUSED') {
        setError('Unable to connect to the server. Please ensure the server is running.');
      } else if (err.response) {
        setError(err.response.data.message || 'Failed to create order. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto my-8">
        <CardContent>
          <p className="text-center py-8">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Checkout Details</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Delivery Address</label>
            <textarea 
              required
              className="w-full p-2 border rounded-md min-h-[100px]"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Phone Number</label>
            <input 
              type="tel"
              required
              className="w-full p-2 border rounded-md"
              value={formData.phone_number}
              onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <input 
              type="email"
              required
              className="w-full p-2 border rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Shipping Method</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={formData.shipping_method}
              onChange={(e) => setFormData({...formData, shipping_method: e.target.value})}
            >
              <option value="16days">16 Days Delivery (Free)</option>
              <option value="7days">7 Days Delivery (+₱50)</option>
              <option value="3days">3 Days Delivery (+₱120)</option>
            </select>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Subtotal:</span>
              <span>₱{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span>Shipping Fee:</span>
              <span>₱{getShippingFee(formData.shipping_method)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-2">
              <span>Total:</span>
              <span>₱{calculateTotal()}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-500">
              Estimated Delivery: {getDeliveryDate(formData.shipping_method)}
            </span>
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;