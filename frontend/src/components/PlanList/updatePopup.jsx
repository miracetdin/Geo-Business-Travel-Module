import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import style from "./styles.module.css";
import {
    updatePlanApi,
  } from "../api/apiFunctions";
  import TokenContext from "../../contexts/tokenContext";

const UpdatePopup = ({ onClose, rowData, accessToken, meData }) => {
  const apiUrl = "http://localhost:4000";
  // const { accessToken2, refreshToken } = useContext(TokenContext);
  let accessToken2 = sessionStorage.getItem("accessToken");
  let refreshToken = sessionStorage.getItem("refreshToken");

  const [employeeUsername, setEmployeeUsername] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [endLocation, setEndLocation] = useState("");
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const planData = {
      employeeUsername: employeeUsername,
      travelDate: travelDate,
      endLocation: endLocation,
      accountantUsername: meData.username
    };

    await updatePlanApi(
      accessToken,
      rowData._id,
      planData
    );
  };

  return createPortal(
    <div className={style.popupOverlay}>
      <div className={style.popupCard}>
        <form onSubmit={handleFormSubmit}>
        <div className="employeeUsername">
            Employee
            <input
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              type="text"
              id="employeeUsername"
              name="employeeUsername"
              placeholder="employee"
              value={employeeUsername}
              onChange={(e) => setEmployeeUsername(e.target.value)}
            />
          </div>
          <div className="travelDate mt-2">
            Travel Date
            <input
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              type="text"
              id="travelDate"
              name="travelDate"
              placeholder="Travel Date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
            />
          </div>
          <div className="endLocation mt-2">
            Destination
            <input
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm  type="
              id="endLocation"
              name="endLocation"
              placeholder="Destination"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />
          </div>
          <br />
          <div className="Update mb-3">
            <button type="submit" className={style.button}>
              Update
            </button>
          </div>
        </form>
        <button className={style.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("popup-update")
  );
};

export default UpdatePopup;