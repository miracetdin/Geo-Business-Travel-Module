import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './form';
import style from './styles.module.css';

function index() {
  return (
    <Fragment>
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-between">
          <div className="login-card d-flex flex-column align-items-center">
            <div className="card">
                <div className="p-5">
                  <h2 className="mb-4">Sign Up</h2>
                  <Form />
                  <br />
                  <div className="login">
                    <button className={style.button}>Login</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default index;
