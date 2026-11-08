# Set up a public endpoint
Context: Discord developer reference: Set up a public endpoint
[Source](app-registration-and-commands-index.md) / [Previous source section](handling-interactivity.md) / [Following source section](adding-an-interaction-endpoint-url.md)
<a id="source-set-up-a-public-endpoint"></a>

### Set up a public endpoint

 Create a public endpoint by starting the app's [Express](https://expressjs.com/) server and exposing it with [ngrok](https://ngrok.com/). First, open the project folder and run the command to start the app:

```
npm run start

```

 The output should indicate that the app is running on port `3000`. The sample is already prepared to handle Discord interactions by validating security request headers and answering `PING` requests. This tutorial skips many implementation details; [Interactions Overview](https://docs.discord.com/developers/interactions/overview#preparing-for-interactions) explains how to prepare apps for interactions. By default, the server listens on port 3000, but you can choose a different port by setting `PORT` in `.env`. Next, start the ngrok tunnel. If ngrok is not installed, follow the [ngrok download page](https://ngrok.com/download). Then open a new terminal and create a public endpoint that forwards traffic to the Express server:

```
ngrok http 3000

```

 The connection output should look similar to this:

```
Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://1234-someurl.ngrok.io -> localhost:3000

Connections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00

```

 Use the **Forwarding** URL as the public URL that Discord sends interaction requests to in the next step.

