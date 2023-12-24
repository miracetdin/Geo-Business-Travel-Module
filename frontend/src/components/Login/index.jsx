import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './form';
import style from './styles.module.css';

function index() {
  return (
    <Fragment>
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-between">
          <div className="login-card d-flex flex-column align-items-center mt-5">
            <div className="card">
              <div className="p-5">
                <h2 className="mb-4">Login</h2>
                <Form />
                <br />
                <div className="sign-up-div">
                  <Link to="/signup"><button className={style.button}>Sign Up</button></Link>
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
