import React, { Fragment, useContext, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { travelApi, travelApproveApi } from "../api/apiFunctions";
import useSWR from "swr";
import TokenContext from "../../contexts/tokenContext";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/index";
import style from "./styles.module.css";

function Travels() {
  const page = 1;
  const apiUrl = "http://localhost:4000";
  const history = useHistory();
  const { accessToken } = useContext(TokenContext);

  const { data, isLoading } = useSWR(`${apiUrl}/travel${page}`, async (url) => {
    const response = await travelApi(accessToken, page, "GET");
    return response;
  });

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
        onClick={() => handleApproveClick(rowData)}
      >
        Approve
      </button>
    );
  };

  const handleApproveClick = async (rowData) => {
    const result = await travelApproveApi(accessToken, rowData._id);
  };

  const rowClassName = (rowData, rowIndex) => {
    console.log("row: ", rowIndex);
    return rowIndex % 2 === 0 ? style.evenRow : style.oddRow;
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-between">
          <div className="login-card d-flex flex-column align-items-center">
            <div className="card">
              <h2>Travels</h2>
              {!isLoading && (
                <DataTable
                  className={style.customDatatable}
                  value={data}
                  tableStyle={{ minWidth: "50rem" }}
                  rowClassName={rowClassName}
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
                    field="status"
                    header="Status"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="approveByAccountant"
                    header="Approve By Accountant"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="approveDate"
                    header="Approve Date"
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
