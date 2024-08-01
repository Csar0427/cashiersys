import React, { useState, useEffect } from "react";
import { ref, child, get } from "firebase/database";
import { database } from "./firebase"; // Ensure this path is correct

const Orders = ({ ticketNumber }) => {
  const [orders, setOrders] = useState([]);
  const [startedOrders, setStartedOrders] = useState({});
  const [orderStatuses, setOrderStatuses] = useState({});
  const [error, setError] = useState("");
  const [tableNumbers, setTableNumbers] = useState({});
  const [tableSubmitted, setTableSubmitted] = useState({}); // Track table submission

  useEffect(() => {
    if (ticketNumber) {
      fetchOrderFromFirebase();
    }
  }, [ticketNumber]);

  const fetchOrderFromFirebase = async () => {
    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, "orders"));
      let foundOrder = false;
      snapshot.forEach((childSnapshot) => {
        const orderData = childSnapshot.val();
        if (orderData.ticketNumber === parseInt(ticketNumber)) {
          setOrders((prevOrders) => [...prevOrders, orderData]);
          setTableNumbers((prevTableNumbers) => ({
            ...prevTableNumbers,
            [orderData.ticketNumber]: "", // Initialize table number as empty string
          }));
          setError("");
          foundOrder = true;
          return;
        }
      });
      if (!foundOrder) {
        setError("No order found for this ticket number.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error fetching orders. Please try again.");
    }
  };

  const handleStartButtonClick = (orderId) => {
    const confirmed = window.confirm("Start preparing the order?");
    if (confirmed) {
      setStartedOrders((prevStartedOrders) => ({
        ...prevStartedOrders,
        [orderId]: true,
      }));
      setOrderStatuses((prevOrderStatuses) => ({
        ...prevOrderStatuses,
        [orderId]: "Working",
      }));
    }
  };

  const handleFinishButtonClick = (orderId) => {
    setOrderStatuses((prevOrderStatuses) => ({
      ...prevOrderStatuses,
      [orderId]: "Ready to Serve",
    }));
  };

  const handleDoneButtonClick = (orderId) => {
    const orderStatus = orderStatuses[orderId];
    if (orderStatus === "Ready to Serve") {
      setOrders((prevOrders) => prevOrders.filter((order) => order.ticketNumber !== orderId));
      setTableNumbers((prevTableNumbers) => {
        const updatedTableNumbers = { ...prevTableNumbers };
        delete updatedTableNumbers[orderId]; // Remove table number for the order
        return updatedTableNumbers;
      });
      console.log("Order marked as Done:", orderId);
    } else {
      alert("Please finish the order first before marking it as done.");
    }
  };

  const handleTableInputChange = (e, orderId) => {
    const { value } = e.target;
    setTableNumbers((prevTableNumbers) => ({
      ...prevTableNumbers,
      [orderId]: value, // Update table number for the specific order
    }));
  };

  const handleTableSubmit = (orderId) => {
    setTableSubmitted((prevTableSubmitted) => ({
      ...prevTableSubmitted,
      [orderId]: true, // Mark table submission for the specific order
    }));
  };

  return (
    <div className="orders-container">
      {error && <p className="error-message">{error}</p>}
      <div className="orders-grid">
        {orders.map((order, index) => (
          <div key={index} className="order-details">
            <h3>Order Number: {order.ticketNumber}</h3>
            <div className="table-input">
              {tableSubmitted[order.ticketNumber] ? (
                <p>Table Number: {tableNumbers[order.ticketNumber]}</p>
              ) : (
                <div>
                  <input
                    type="text"
                    value={tableNumbers[order.ticketNumber] || ""}
                    onChange={(e) => handleTableInputChange(e, order.ticketNumber)}
                    placeholder="Enter Table Number"
                  />
                  <button onClick={() => handleTableSubmit(order.ticketNumber)}>Submit</button>
                </div>
              )}
            </div>
            <p>Total Price: ₱{order.totalPrice}</p>
            <h4>Items:</h4>
            <ul>
              {Object.values(order.items).map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.name} - Quantity: {item.quantity} - Size: {item.size || "N/A"}
                </li>
              ))}
            </ul>
            <p>Special Request: {order.request || "N/A"}</p>
            <p className="status" style={{ color: getStatusColor(orderStatuses[order.ticketNumber]) }}>
              Status: {orderStatuses[order.ticketNumber] || "On Hold"}
            </p>
            <div className="orders-card-buttons">
              <button
                className="start-btn"
                onClick={() => handleStartButtonClick(order.ticketNumber)}
              >
                Start
              </button>
              <button
                className="finish-btn"
                disabled={!startedOrders[order.ticketNumber]}
                onClick={() => handleFinishButtonClick(order.ticketNumber)}
                style={{
                  backgroundColor: startedOrders[order.ticketNumber]
                    ? "#ece75f"
                    : "#ece75f7e",
                }}
              >
                Finish
              </button>
              <button
                className="done-btn"
                onClick={() => handleDoneButtonClick(order.ticketNumber)}
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Working":
      return "blue";
    case "Ready to Serve":
      return "green";
    default:
      return "red";
  }
};

export default Orders;
