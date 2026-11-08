# Adding an interaction endpoint url
Context: Discord developer reference: Adding an interaction endpoint url
[Source](app-registration-and-commands-index.md) / [Previous source section](set-up-a-public-endpoint.md) / [Following source section](handling-slash-command-requests.md)
<a id="source-adding-an-interaction-endpoint-url"></a>

### Adding an interaction endpoint URL

 Open your [app's settings](https://discord.com/developers/applications), then on the [**General Information** page](https://discord.com/developers/applications/select/information), paste the ngrok forwarding URL under **Interaction Endpoint URL** and append `/interactions`. (Figure: Interactions Endpoint URL) Click **Save Changes** and confirm the endpoint verifies. If verification fails, check that ngrok and the app are using the same port and that the ngrok URL was copied correctly. The sample app handles verification in two ways:
- It uses `PUBLIC_KEY` and the [discord-interactions package](https://github.com/discord/discord-interactions-js#usage) with a wrapper function imported from `utils.js`, matching [Express's `verify` interface](http://expressjs.com/en/5x/api.html#express.json). This runs for every incoming request.
- It answers incoming `PING` requests.
 The interactions documentation explains more about preparing an app to receive interactions: [the interactions documentation](https://docs.discord.com/developers/interactions/overview#preparing-for-interactions).

