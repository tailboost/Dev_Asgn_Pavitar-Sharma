const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();
const app = express();
const port = 8000;

// The OAuth client ID from the integration page!
const notionClientId = process.env.OAUTH_CLIENT_ID;

// The OAuth client secret from the integration page!
const notionClientSecret = process.env.OAUTH_CLIENT_SECRET;
app.use(cors());
app.use(express.json());

app.get("/login/:code", async (req, res) => {
  const { code } = req.params;

  // Generate an access token with the code we got earlier and the client_id and client_secret we retrived earlier
  const resp = await axios({
    method: "POST",
    url: "https://api.notion.com/v1/oauth/token",
    auth: { username: notionClientId, password: notionClientSecret },
    headers: { "Content-Type": "application/json" },
    data: { code, grant_type: "authorization_code" },
  });

//   // You want to save resp.data.workspace_id and resp.data.access_token if you want to make requests later with this Notion account (otherwise they'll need to reauthenticate)

//   // Use the access token we just got to search the user's workspace for databases
//   const { data } = await axios({
//     method: "POST",
//     url: "https://api.notion.com/v1/search",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${resp.data.access_token}`,
//       "Notion-Version": "2022-02-22",
//     },
//     data: { filter: { property: "object", value: "database" } },
//   });

  res.json(resp.data.access_token);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
