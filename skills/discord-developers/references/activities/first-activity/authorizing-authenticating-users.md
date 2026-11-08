# Authorizing authenticating users
Context: Discord developer reference: Authorizing authenticating users
[Source](project-and-authentication-index.md) / [Previous source section](running-your-activity-in-discord.md) / [Following source section](calling-external-resources-from-your-activity.md)
<a id="source-step-5-authorizing--authenticating-users"></a>

### Step 5: Authorizing & authenticating users

 To authenticate users playing the Activity, finish the server-side app and connect it to the client-side app. This example uses `express`, but any backend language or framework can serve the same role.

OAuth2 Flow Diagram

This diagram shows the typical pattern for granting a user an OAuth2 access_token: (Figure: Flow diagram for Oauth2) The tutorial implements this pattern, and the sample project includes more examples:
- [Back-end code](https://github.com/discord/embedded-app-sdk-examples/blob/main/discord-activity-starter/packages/server/src/app.ts)
- [Front-end code](https://github.com/discord/embedded-app-sdk-examples/blob/main/discord-activity-starter/packages/client/src/main.ts)

```
# move into our server directory
cd server

# install dependencies
npm install

```

 The server code is not edited here. It contains one `POST` route for `/api/token`, which lets the server perform the OAuth2 flow securely.

getting-started-activity/server/server.js

The file `getting-started-activity/server/server.js` should already contain this code:

```
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config({ path: "../.env" });

const app = express();
const port = 3001;

// Allow express to parse JSON bodies
app.use(express.json());

app.post("/api/token", async (req, res) => {

  // Exchange the code for an access_token
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });

  // Retrieve the access_token from the response
  const { access_token } = await response.json();

  // Return the access_token to our client as { access_token: "..."}
  res.send({access_token});
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

```

 Now start the project's backend server:

```
npm run dev

```

 The output should resemble this:

```
> server@1.0.0 dev
> node server.js

Server listening at http://localhost:3001

```

 Run the server app and client-side app in separate terminal windows. The other [sample projects](https://docs.discord.com/developers/activities/overview#sample-projects) show alternate setups.

