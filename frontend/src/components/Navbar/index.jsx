import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import styles from './styles.module.css';
import myImage from '../../images/logo.png';

function index() {
  return (
    <>
      <nav className={styles.navbar} >
        <div className="container">
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <img src={myImage} height={"30px"} />
                </li>
                <li>
                <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/travel">Travel</Link>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="d-flex justify-content-end">
                <li className="ml-auto">
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>  
    </>
  )
};

export default index;
