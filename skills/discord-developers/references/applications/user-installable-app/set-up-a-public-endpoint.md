# Set up a public endpoint
Context: Discord developer reference: Set up a public endpoint
[Source](developing-a-user-installable-app-index.md) / [Previous source section](handling-interactivity.md) / [Following source section](configuring-an-interaction-endpoint-url.md)
<a id="source-set-up-a-public-endpoint"></a>

### Set up a public endpoint

 Create a public endpoint by starting the app's [Express](https://expressjs.com/) server, then exposing it with [ngrok](https://ngrok.com/). First, go to the project folder and run this command to start the app:

```
npm run start

```

 The output should show that the app is running on port 3000, with Discord interaction handling already wired for security header verification and `PING` responses. This tutorial skips many implementation details; the [Interactions Overview](https://docs.discord.com/developers/interactions/overview#preparing-for-interactions) explains how to prepare apps for interactions. By default, the server listens on port 3000, but you can set a `PORT` variable in `.env` to change it. Next, start the ngrok tunnel. If ngrok is not installed locally, follow the [ngrok download page](https://ngrok.com/download). After installation, open a new terminal and create a public endpoint that forwards to the Express server:

```
ngrok http 3000

```

 The ngrok output includes a **Forwarding** URL. Use that public URL as the Interactions Endpoint URL in the next step.

