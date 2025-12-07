import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BuyContext } from "./GeneralContext.js"; // For BuyCard, if needed

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      // Don't set loading to true on auto-refresh
      // setIsLoading(true); 
      const response = await fetch("http://localhost:3002/orders", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
    setIsLoading(false);
  };

  // Fetch orders on component load and set an interval to auto-refresh
  useEffect(() => {
    fetchOrders(); // Fetch immediately
    
    // Auto-refresh every 5 seconds to see new orders get executed
    const interval = setInterval(fetchOrders, 5000);
    
    return () => clearInterval(interval); // Clean up interval
  }, []);

  if (isLoading && orders.length === 0) {
    return <div>Loading orders...</div>;
  }
  
  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/market"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h3 className="title">Orders ({orders.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price.toFixed(2)}</td>
                <td className={order.mode === 'BUY' ? 'profit' : 'loss'}>
                  {order.mode}
                </td>
                <td style={{ fontWeight: 600 }}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;