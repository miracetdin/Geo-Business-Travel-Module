import React, { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { travelDetailsApi } from "../api/apiFunctions";
import TokenContext from "../../contexts/tokenContext";
import useSWR from "swr";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Navbar from "../Navbar/index";
import style from "./styles.module.css";
import PopupContext from "../../contexts/popupContext";
import Popup from "./popup";

function TravelDetails() {
  const { id } = useParams();
  const travelId = id;
  const apiUrl = "http://localhost:4000";

  const { accessToken } = useContext(TokenContext);

  const { data, isLoading } = useSWR(
    `${apiUrl}/travel/${travelId}`,
    async (url) => {
      const response = await travelDetailsApi(accessToken, travelId, "GET");
      return response;
    }
  );

  const dataArray = [data];

  const {
    invoicePhoto,
    updateInvoicePhoto,
    showInvoicePhotoPopup,
    updateShowInvoicePhotoPopup,
  } = useContext(PopupContext);

  function handleInvoicePhotoPopup(rowData) {
    updateInvoicePhoto(rowData.invoicePhoto);
    updateShowInvoicePhotoPopup(true);
  }

  const closePopup = () => {
    updateShowInvoicePhotoPopup(false);
    updateInvoicePhoto("");
  };

  const renderSuspiciousCell = (rowData) => {
    const cellStyle = {
      color: rowData.suspicious === "yes" ? "red" : "green",
    };

    return <span style={cellStyle}>{rowData.suspicious}</span>;
  };

  const renderDateCell = (rowData) => {
    const rawDate = new Date(rowData.travelDate);
    const formattedDate = rawDate.toLocaleDateString();

    return <span>{formattedDate}</span>;
  };

  const renderImageCell = (rowData) => {
    const handleImageClick = () => {
      handleInvoicePhotoPopup(rowData);
    };
    return (
      <img
        src={rowData.invoicePhoto}
        alt="Invoice"
        style={{ width: "100px", cursor: "pointer" }}
        onClick={handleImageClick}
      />
    );
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-between">
          <div className="login-card d-flex flex-column align-items-center">
            <div className="card">
              <h2 className="pt-3">Travel Details: </h2>
              {!isLoading && (
                <DataTable value={dataArray} tableStyle={{ minWidth: "50rem" }}>
                  <Column
                    className={style.customColumn}
                    field="employeeUsername"
                    header="Employee"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="travelDate"
                    header="Travel Date"
                    body={renderDateCell}
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
                  <Column
                    className={style.customColumn}
                    field="invoicePhoto"
                    header="Invoice Photo"
                    body={renderImageCell}
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="invoiceInfo"
                    header="Invoice Info"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="invoiceNote"
                    header="Invoice Note"
                  ></Column>
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
                    header="Approve By Accountant"
                  ></Column>
                  <Column
                    className={style.customColumn}
                    field="approveDate"
                    header="Approve Date"
                    body={renderDateCell}
                  ></Column>
                </DataTable>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="popup-root"></div>
      {showInvoicePhotoPopup && (
        <Popup
          message={invoicePhoto}
          onClose={closePopup}
          style={style.popupStyle}
        />
      )}
    </Fragment>
  );
}

export default TravelDetails;
