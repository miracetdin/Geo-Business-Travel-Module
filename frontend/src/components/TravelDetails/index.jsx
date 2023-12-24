import React, { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { travelDetailsApi } from "../api/apiFunctions";
import TokenContext from "../../contexts/tokenContext";
import useSWR from "swr";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function TravelDetails() {
  const { id } = useParams(); // ID'yi al
  const travelId = id;
  const apiUrl = "http://localhost:4000";

  const { accessToken } = useContext(TokenContext);
  console.log("----------------------------")
  console.log(travelId);


  const { data, isLoading } = useSWR(`${apiUrl}/travel/${travelId}`, async (url) => {
    const response = await travelDetailsApi(accessToken, travelId, "GET");
    return response;
  });

  console.log("----------------------------")
  
  console.log(data);

  const dataArray = [data];
  console.log(dataArray);


  return (
    <Fragment>
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-between">
          <div className="login-card d-flex flex-column align-items-center">
            <div className="card">
              <h2>Travel Details: </h2>
              { !isLoading && 
              <DataTable value={dataArray} tableStyle={{ minWidth: '50rem' }}>
                <Column field="employeeUsername" header="Employee"></Column>
                <Column field="travelDate" header="Travel Date"></Column>
                <Column field="startLocation" header="Start Location"></Column>
                <Column field="invoicePhoto" header="Invoice Photo"></Column>
                <Column field="invoiceInfo" header="Invoice Info"></Column>
                <Column field="invoiceNote" header="Invoice Note"></Column>
                <Column field="invoicePrice" header="Invoice Price"></Column>
                <Column field="priceEstimate" header="Price Estimate"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="approveByAccountant" header="Approve By Accountant"></Column>
                <Column field="approveDate" header="Approve Date"></Column>
              </DataTable>
              }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TravelDetails;
