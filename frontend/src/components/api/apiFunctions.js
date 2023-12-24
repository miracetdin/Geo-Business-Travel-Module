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

export { loginApi, profileApi };