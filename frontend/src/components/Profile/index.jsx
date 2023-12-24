import React, { Fragment, useContext, useEffect, useState } from "react";
import TokenContext from "../../contexts/tokenContext";
import { profileApi } from "../api/apiFunctions";
import useSWR from "swr";

function Profile() {
  const { accessToken, refreshToken } = useContext(TokenContext);

  const apiUrl = "http://localhost:4000";

  console.log(accessToken);
  console.log(refreshToken);

  const { data, isLoading } = useSWR(`${apiUrl}/auth/me`, async (url) => {
    const response = await profileApi(accessToken, refreshToken, "POST");
    return response;
  });

  console.log("data: ", data);

  return (
    <Fragment>
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-between">
          <div className="login-card d-flex flex-column align-items-center">
            <div className="card">
              <h2>Profile</h2>
              {!isLoading && (
                <div>
                  <div>
                    <strong>_id:</strong> {data._id}
                  </div>
                  <div>
                    <strong>username:</strong> {data.username}
                  </div>
                  <div>
                    <strong>name:</strong> {data.name}
                  </div>
                  <div>
                    <strong>surname:</strong> {data.surname}
                  </div>
                  <div>
                    <strong>email:</strong> {data.email}
                  </div>
                  <div>
                    <strong>role:</strong> {data.role}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
