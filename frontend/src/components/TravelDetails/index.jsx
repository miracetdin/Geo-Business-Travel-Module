import React, { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { travelDetailsApi } from "../api/apiFunctions";
import TokenContext from "../../contexts/tokenContext";
import useSWR from "swr";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Navbar from '../Navbar/index';
import style from "./styles.module.css";

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

  const renderSuspiciousCell = (rowData) => {
    const cellStyle = {
      color: rowData.suspicious === 'yes' ? 'red' : 'green',
    };
  
    return <span style={cellStyle}>{rowData.suspicious}</span>;
  };
  
  const renderDateCell = (rowData) => {
    const rawDate = new Date(rowData.travelDate);
    const formattedDate = rawDate.toLocaleDateString(); // Tarih formatını özelleştirebilirsiniz
  
    return <span>{formattedDate}</span>;
  };

  const renderImageCell = (rowData) => {
    return <img src={rowData.invoicePhoto} alt="Invoice" style={{ width: '100px' }} />;
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-between">
          <div className="login-card d-flex flex-column align-items-center">
            <div className="card">
              <h2 className="pt-3">Travel Details: </h2>
              { !isLoading && 
              <DataTable value={dataArray} tableStyle={{ minWidth: '50rem' }}>
                <Column field="employeeUsername" header="Employee"></Column>
                <Column field="travelDate" header="Travel Date" body={renderDateCell}></Column>
                <Column field="startLocation" header="Start Location"></Column>
                <Column field="invoicePhoto" header="Invoice Photo" body={renderImageCell}></Column>
                <Column field="invoiceInfo" header="Invoice Info"></Column>
                <Column field="invoiceNote" header="Invoice Note"></Column>
                <Column field="invoicePrice" header="Invoice Price"></Column>
                <Column field="priceEstimate" header="Price Estimate"></Column>
                <Column
                    
                    field="suspicious"
                    header="Suspicious"
                    body={renderSuspiciousCell}
                  ></Column>
                <Column field="status" header="Status"></Column>
                <Column field="approveByAccountant" header="Approve By Accountant"></Column>
                <Column field="approveDate" header="Approve Date" body={renderDateCell}></Column>
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
