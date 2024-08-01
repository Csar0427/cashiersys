import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCoffee } from "@fortawesome/free-solid-svg-icons";
import Orders from "./Orders";

const TravelMugKDS = () => {
  const [ticketNumber, setTicketNumber] = useState("");

  return (
    <>
      <div className="navbar">
        <h1>
          <FontAwesomeIcon icon={faCoffee} className="coffee-icon" /> Travel Mug Cafe
        </h1>
        <div className="searchbar-container">
          <input
            type="number"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value.trim())}
            placeholder="Enter Ticket Number"
            className="search-bar"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </div>
      </div>
      <Orders ticketNumber={ticketNumber} />
    </>
  );
};

export default TravelMugKDS;
