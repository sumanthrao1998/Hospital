// src/services/AuthService.js
const BASIC_AUTH = btoa("your-username:your-password");

const request = async (url, method = "GET", data = null) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${BASIC_AUTH}`,  // Add basic auth headers
  };

  const options = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  return response.json();
};

export default request;
