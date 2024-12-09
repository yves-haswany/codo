const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    // Replace with your API endpoint and Bearer token
    const API_URL = "https://api.develop.rve.ca/docs#/v2/v2_list_billings_v2_billings_get";
    const BEARER_TOKEN = process.env.API_KEY; // Store API key securely in environment variables

    // Fetch data from the API
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    // Check for errors
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Process the data (e.g., calculate total kWh consumption)
    const totalKwh = data.reduce((total, entry) => total + entry.kWh, 0);

    // Return the processed data
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Success",
        totalKwh,
        rawData: data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

