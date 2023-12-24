import React, { Fragment, useContext, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { travelApi, travelApproveApi } from "../api/apiFunctions";
import useSWR from "swr";
import TokenContext from "../../contexts/tokenContext";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';

function Travels() {
  const page = 1;
  const apiUrl = "http://localhost:4000";
  console.log("selam"); 
  const history = useHistory(); // useHistory hook'u


  const { accessToken } = useContext(TokenContext);

  const { data, isLoading } = useSWR(`${apiUrl}/travel${page}`, async (url) => {
    const response = await travelApi(accessToken, page, "GET");
    return response;
  });

  // const [disabledRows, setDisabledRows] = useState([]);

  console.log("data: ", data);

  const renderDetailsButton = (rowData) => {
    return <button onClick={() => handleDetailsClick(rowData)}>Details</button>;
  };

  const handleDetailsClick = (rowData) => {
    // İstenilen sayfaya geçiş ve ID gönderimi
    history.push(`/travel-details/${rowData._id}`);
  };

  const renderApproveButton = (rowData) => {
    return <button onClick={() => handleApproveClick(rowData)} >Approve</button>;
  };

  console.log("accessToken: ", accessToken)

  const handleApproveClick = async (rowData) => {
    const result = await travelApproveApi(accessToken, rowData._id);
    // setDisabledRows((prevRows) => [...prevRows, rowData._id]);

    // try {
    //   const result = await travelApproveApi(accessToken, rowData._id);
    //   // Handle the result if needed
    // } catch (error) {
    //   // Handle errors if any
    // } finally {
    //   // Enable the button after the request is complete (whether it's successful or not)
    //   setDisabledRows((prevRows) => prevRows.filter((rowId) => rowId !== rowData._id));
    // }
  };

  return (
    <Fragment>
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-between">
          <div className="login-card d-flex flex-column align-items-center">
            <div className="card">
              <h2>Travels</h2>
              { !isLoading && 
              <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                <Column field="employeeUsername" header="Employee"></Column>
                <Column field="travelDate" header="Travel Date"></Column>
                <Column field="startLocation" header="Start Location"></Column>
                {/* <Column field="invoicePhoto" header="Invoice Photo"></Column> */}
                {/* <Column field="invoiceInfo" header="Invoice Info"></Column> */}
                {/* <Column field="invoiceNote" header="Invoice Note"></Column> */}
                <Column field="invoicePrice" header="Invoice Price"></Column>
                <Column field="priceEstimate" header="Price Estimate"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="approveByAccountant" header="Approve By Accountant"></Column>
                <Column field="approveDate" header="Approve Date"></Column>
                <Column header="Details" body={renderDetailsButton}></Column>
                <Column header="Approve" body={renderApproveButton}></Column>
              </DataTable>
              }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}


export default Travels;
