import React from "react";

const History = ({ finishedOrders }) => {
  // Check if finishedOrders is not undefined or null before applying filter
  const doneOrders = finishedOrders && finishedOrders.filter((order) => order.status === "Done");

  return (
    <div className="history-container">
      <h2>History</h2>
      {doneOrders && doneOrders.length > 0 ? (
        doneOrders.map((order, index) => (
          <div key={index} className="finished-order">
            <h3>Order Number: {order.ticketNumber}</h3>
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
          </div>
        ))
      ) : (
        <p>No done orders yet.</p>
      )}
    </div>
  );
};

export default History;
