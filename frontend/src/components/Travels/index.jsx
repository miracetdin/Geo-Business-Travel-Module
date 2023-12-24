import React, { Fragment } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const products = [
  { code: 'P001', name: 'Product 1', category: 'Category A', quantity: 10 },
  { code: 'P002', name: 'Product 2', category: 'Category B', quantity: 20 },
  { code: 'P003', name: 'Product 3', category: 'Category A', quantity: 15 },
  // ... diğer ürünler
];

function index() {
  return (
    <Fragment>
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-between">
          <div className="login-card d-flex flex-column align-items-center">
            <div className="card">
              <h2>Travels</h2>
              <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default index
