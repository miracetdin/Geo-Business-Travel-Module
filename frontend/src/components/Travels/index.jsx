import React, { Fragment, useContext, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { travelApi, travelApproveApi } from "../api/apiFunctions";
import useSWR, { mutate } from "swr";
import TokenContext from "../../contexts/tokenContext";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/index";
import style from "./styles.module.css";

function Travels() {
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = "http://localhost:4000";
  const history = useHistory();
  const { accessToken } = useContext(TokenContext);

  const { data, isLoading } = useSWR(
    `${apiUrl}/travel${currentPage}`,
    async (url) => {
      const response = await travelApi(accessToken, currentPage, "GET");
      return response;
    }
  );

  const onPageChange = (event) => {
    setCurrentPage(event.first / event.rows + 1);
  };

  const renderDetailsButton = (rowData) => {
    return (
      <button
        className={style.button}
        onClick={() => handleDetailsClick(rowData)}
      >
        Details
      </button>
    );
  };

  const handleDetailsClick = (rowData) => {
    history.push(`/travel-details/${rowData._id}`);
  };

  const renderApproveButton = (rowData) => {
    return (
      <button
        className={style.button}
        style={{ color: "green" }}
        onClick={() => handleApproveClick(rowData)}
      >
        Approve
      </button>
    );
  };

  const renderRejectButton = (rowData) => {
    return (
      <button
        className={style.button}
        style={{ color: "red" }}
        onClick={() => handleRejectClick(rowData)}
      >
        Reject
      </button>
    );
  };

  const handleApproveClick = async (rowData) => {
    const aprovalStatus = "approved";
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const date = `${day}.${month}.${year}`;
    const accountant = "tayyip";
    await travelApproveApi(
      accessToken,
      rowData._id,
      aprovalStatus,
      date,
      accountant
    );
    await mutate(`${apiUrl}/travel${currentPage}`);
  };

  const handleRejectClick = async (rowData) => {
    const aprovalStatus = "reject";
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const date = `${day}.${month}.${year}`;
    const accountant = "tayyip";
    await travelApproveApi(
      accessToken,
      rowData._id,
      aprovalStatus,
      date,
      accountant
    );
    await mutate(`${apiUrl}/travel${currentPage}`);
  };

  let counter = -1;
  const rowClassName = (rowData, rowIndex) => {
    counter++;
    return counter % 2 === 0 ? style.evenRow : style.oddRow;
  };

  const renderSuspiciousCell = (rowData) => {
    const cellStyle = {
      color: rowData.suspicious === "yes" ? "red" : "green",
    };

    return <span style={cellStyle}>{rowData.suspicious}</span>;
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-between">
          <div className="login-card d-flex flex-column align-items-center">
            <div className="card">
              <h2 className="pt-3">Travels</h2>
              {!isLoading && (
                <DataTable
                  className={style.customDatatable}
                  value={data}
                  tableStyle={{ minWidth: "50rem", maxWidth: "100%" }}
                  rowClassName={rowClassName}
                  onPage={onPageChange}
                  paginator={true}
                  rows={10}
                  totalRecords={data ? data.length : 0}
                  scrollable={""}
                >
                  <Column
                    className={style.customColumn}
                    field="employeeUsername"
                    header="Employee"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="travelDate"
                    header="Travel Date"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="startLocation"
                    header="Start Location"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="endLocation"
                    header="End Location"
                  ></Column>
                  {/* <Column className={style.customColumn} field="invoicePhoto" header="Invoice Photo"></Column> */}
                  {/* <Column className={style.customColumn} field="invoiceInfo" header="Invoice Info"></Column> */}
                  {/* <Column className={style.customColumn} field="invoiceNote" header="Invoice Note"></Column> */}
                  <Column
                    className={style.customColumn}
                    field="invoicePrice"
                    header="Invoice Price"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="priceEstimate"
                    header="Price Estimate"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="suspicious"
                    header="Suspicious"
                    body={renderSuspiciousCell}
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="status"
                    header="Status"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="approveByAccountant"
                    header="Approve/Reject By Accountant"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="approveDate"
                    header="Approve/Reject Date"
                  ></Column>
                  <Column
                    className={style.customDetailsColumn}
                    header="Details"
                    body={renderDetailsButton}
                  ></Column>
                  <Column
                    className={style.customApproveColumn}
                    header="Approve"
                    body={renderApproveButton}
                  ></Column>
                  <Column
                    className={style.customRejectColumn}
                    header="Reject"
                    body={renderRejectButton}
                  ></Column>
                </DataTable>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Travels;
