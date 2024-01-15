const apiUrl = "http://localhost:4000";

const loginApi = async (username, password) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Request failed!" };
  }
};

const profileApi = async (access_token, refresh_token) => {
  try {
    const response = await fetch(`${apiUrl}/auth/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`
      },
      body: JSON.stringify({
        refresh_token: `${refresh_token}`
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Request failed!" };
  }
};

const usersApi = async (access_token, refresh_token) => {
  try {
    const response = await fetch(`${apiUrl}/auth/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`
      },
      body: JSON.stringify({
        refresh_token: `${refresh_token}`
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Request failed!" };
  }
};

const travelApi = async (access_token, page) => {
  try {
    const response = await fetch(`${apiUrl}/travel/?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Request failed!" };
  }
};

const travelDetailsApi = async (access_token, travelId) => {
  try {
    const response = await fetch(`${apiUrl}/travel/${travelId}`, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `${access_token}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Request failed!" };
  }
};

const travelApproveApi = async (access_token, travelId, aprovalStatus, date, accountant) => {
  try {

    // const dateString = "24.12.2023";
    const dateString = date;
    const dateArray = dateString.split("."); // String'i noktalara göre ayır
    const formattedDateString = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`; // Tarihi MM/DD/YYYY formatına çevir
    console.log("formattedDateString: ", formattedDateString);

    const response = await fetch(`${apiUrl}/travel/${travelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`
      },
      body: JSON.stringify({
        status: aprovalStatus,
        approveByAccountant: accountant,
        approveDate: formattedDateString
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Request failed!" };
  }
};

const signupApi = async (username, name, surname, email, password, role) => {
  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        surname: surname,
        email: email,
        password: password,
        role: role
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Request failed!" };
  }
};

const createCityApi = async (city, openingFee, feePerKm) => {
  try {
    const response = await fetch(`${apiUrl}/fee/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: city,
        openingFee: openingFee,
        feePerKm: feePerKm,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Request failed!" };  
  }
};

const getCityListApi = async (access_token, page) => {
  try {
    const response = await fetch(`${apiUrl}/fee/?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Request failed!" };
  }
};

const updateCityApi = async (access_token, city, openingFee, feePerKm) => {
  try {

    const response = await fetch(`${apiUrl}/fee/${city}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`
      },
      body: JSON.stringify({
        openingFee: openingFee,
        feePerKm: feePerKm
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Request failed!" };
  }
};

const deleteCityApi = async (access_token, city) => {
  try {
    const response = await fetch(`${apiUrl}/fee/${city}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Request failed!" };
  }
};

export { 
  loginApi, 
  profileApi,
  usersApi, 
  travelApi, 
  travelDetailsApi, 
  travelApproveApi, 
  signupApi,
  createCityApi,
  getCityListApi,
  updateCityApi,
  deleteCityApi 
};