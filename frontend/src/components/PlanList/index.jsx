import React, { Fragment, useContext, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
    createPlanApi,
    getPlansListApi,
    updatePlanApi,
    deletePlanApi,
    profileApi
  } from "../api/apiFunctions";
import useSWR, { mutate } from "swr";
import TokenContext from "../../contexts/tokenContext";
import Navbar from "../Navbar/index";
import style from "./styles.module.css";
import UpdatePopup from "./updatePopup";
import CreatePopup from "./createPopup";
import { Button } from "bootstrap";

function TaxiFeeList() {
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = "http://localhost:4000";
  const { accessToken, refreshToken } = useContext(TokenContext);
  const [newOpeningFee, setNewOpeningFee] = useState(0);
  const [newFeePerKm, setNewFeePerKm] = useState(0);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [rowData, setRowData] = useState("");

  const { data, isLoading } = useSWR(
    `${apiUrl}/plan${currentPage}`,
    async (url) => {
      const response = await getPlansListApi(accessToken, currentPage, "GET");
      return response;
    }
  );

  const { meData, meIsLoading } = useSWR(`${apiUrl}/auth/me`, async (url) => {
    const response = await profileApi(accessToken, refreshToken, "POST");
    return response;
  });

  const onPageChange = (event) => {
    setCurrentPage(event.first / event.rows + 1);
  };

  const handleCreate = async () => {
    setShowCreatePopup(true);
    await mutate(`${apiUrl}/plan`);
  };

  const renderUpdateButton = (rowData) => {
    return (
      <button
        className={style.button}
        style={{ color: "green" }}
        onClick={() => handleUpdate(rowData)}
      >
        Update
      </button>
    );
  };

  const handleUpdate = async (rowData) => {
    setRowData(rowData);
    setShowUpdatePopup(true);
    await mutate(`${apiUrl}/plan/${rowData._id}`);
  };

  const closePopup = () => {
    setShowUpdatePopup(false);
    setShowCreatePopup(false);
  };

  const renderDeleteButton = (rowData) => {
    return (
      <button
        className={style.button}
        style={{ color: "red" }}
        onClick={() => handleDelete(rowData)}
      >
        Delete
      </button>
    );
  };

  const handleDelete = async (rowData) => {
    await deletePlanApi(
      accessToken,
      rowData._id,
    );
    await mutate(`${apiUrl}/plan/${rowData._id}`);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-between">
          <div className="login-card d-flex flex-column align-items-center">
            <div className="pb-3">
              <button
                className={style.button}
                style={{ color: "green", marginLeft: "250%" }}
                onClick={() => handleCreate()}
              >
              Create
              </button>
            </div>
            <div className="card">
              <h2 className="pt-3">Travel Plan List</h2>
              {/* {!isLoading && !userListIsLoading && !accountantIsLoading && ( */}
              {(
                <DataTable
                  className={style.customDatatable}
                  value={data}
                  tableStyle={{ minWidth: "50rem", maxWidth: "100%" }}
                //   rowClassName={rowClassName}
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
                    field="endLocation"
                    header="Destination"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="accountantUsername"
                    header="Assigned By Accountant"
                  ></Column>
                  <Column
                    className={style.customDetailsColumn}
                    header="Update"
                    body={renderUpdateButton}
                  ></Column>
                  <Column
                    className={style.customApproveColumn}
                    header="Delete"
                    body={renderDeleteButton}
                  ></Column>
                </DataTable>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="popup-update"></div>
      {showUpdatePopup && !meIsLoading && (
        <UpdatePopup
          onClose={closePopup}
          rowData={rowData}
          accessToken={accessToken}
          meData={meData}
          style={style.popupStyle}
        />
      )}
      <div id="popup-create"></div>
      {showCreatePopup && !meIsLoading && (
        <CreatePopup
          accessToken={accessToken}
          meData={meData}
          onClose={closePopup}
          style={style.popupStyle}
        />
      )}
    </Fragment>
  )
};

export default TaxiFeeList;