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

const travelApproveApi = async (access_token, travelId) => {
  try {

    const dateString = "24.12.2023";
    const dateArray = dateString.split("."); // String'i noktalara göre ayır
    const formattedDateString = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`; // Tarihi MM/DD/YYYY formatına çevir

    const dateObject = new Date(formattedDateString);
    const response = await fetch(`${apiUrl}/travel/${travelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`
      },
      body: JSON.stringify({
        status: "approved",
        approveByAccountant: "tayyip",
        approveDate: dateObject
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

export { loginApi, profileApi, travelApi, travelDetailsApi, travelApproveApi };