const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    // Replace with your API endpoint and Bearer token
    const API_URL = "https://api.develop.rve.ca/v1/modules/${c667ff46-9730-425e-ad48-1e950691b3f9
}/measuring-points/71ef9476-3855-4a3f-8fc5-333cfbf9e898
fd7e69ef-cd01-4b9a-8958-2aa5051428d4
b7423cbc-d622-4247-bb9a-8d125e5e2351
88f4f9b6-ce65-48c4-86e6-1969a64ad44c
df428bf7-dd2d-479c-b270-f8ac5c1398dc
7744dcfc-a059-4257-ac96-6650feef9c87
b1445e6d-3573-403a-9f8e-e82f70556f7c
ef296fba-4fcc-4dcb-8eda-e6d1772cd819
50206eae-41b8-4a84-abe4-434c7f79ae0a
de2d9680-f132-4529-b9a9-721265456a86
bd36337c-8139-495e-b026-f987b79225b8/reads?start=${start}&end=${end}";
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

