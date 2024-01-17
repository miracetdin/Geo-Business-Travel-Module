import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./styles.module.css";
import {
    createPlanApi,
  } from "../api/apiFunctions";
import TokenContext from "../../contexts/tokenContext";

const CreatePopup = ({ accessToken, onClose, meData, employeeList }) => {
  const apiUrl = "http://localhost:4000";
  const { accessToken2, refreshToken } = useContext(TokenContext);

  const [employeeUsername, setEmployeeUsername] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tempDate, setTempDate] = useState("");

  let formattedDate = null;
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const planData = {
      employeeUsername: employeeUsername,
      travelDate: travelDate,
      endLocation: endLocation,
      accountantUsername: meData.username
    };

    await createPlanApi(
      accessToken,
      planData
    );
  };

  const options = employeeList
    .filter((employee) => employee.role === "employee")
    .map((employee) => ({
      value: employee.username,
      label: `${employee.name} ${employee.surname} (${employee.email})`,
    }));

  return createPortal(
    <div className={style.popupOverlay}>
      <div className={style.popupCard}>
        <form onSubmit={handleFormSubmit}>
        <div className="employeeUsername">
            Employee
            <Select
              className="form-control"
              id="employeeUsername"
              name="employeeUsername"
              value={selectedEmployee}
              // onChange={setSelectedEmployee}
              onChange={(selectedOption) => {
                setSelectedEmployee(selectedOption);
                setEmployeeUsername(selectedOption ? selectedOption.value : "");
              }}
              options={[
                { value: null, label: "Select Employee", isDisabled: true },
                ...options,
              ]}
              isSearchable
            />
          </div>
          <div className="travelDate mt-2">
            Travel Date
            <br />
            <DatePicker
              className="form-control"
              selected={tempDate}
              onChange={(date) => (
                setTempDate(date),
                formattedDate = date.toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric'
                }),
                setTravelDate(formattedDate)
                )}
              placeholderText="Select Travel Date"
              dateFormat="dd/MM/yyyy"
            />
            {/* <input
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              type="text"
              id="travelDate"
              name="travelDate"
              placeholder="Travel Date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
            /> */}
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
              Create
            </button>
          </div>
        </form>
        <button className={style.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("popup-create")
  );
};

export default CreatePopup;