# Connecting to web socket
Context: Discord developer reference: Connecting to web socket
[Source](connection-and-command-contracts-index.md) / [Previous source section](connecting-to-ipc-handshake-payload.md) / [Following source section](rpc-server-ports.md)
<a id="source-connecting-to-websocket"></a>

### Connecting to WebSocket

The local RPC server listens on localhost (`127.0.0.1`) and is set up to process WebSocket connections plus proxy API requests.For WebSocket connections, this connection is always `ws://127.0.0.1:PORT/?v=VERSION&client_id=CLIENT_ID&encoding=ENCODING`:
- `CLIENT_ID` is the client ID for the application accessing the RPC Server.
- `VERSION` is the version for the RPC Server.
- `PORT` is the port for the RPC Server.
- `ENCODING` is this type of encoding for this connection to use. `json` plus `etf` are supported.
To start, create an app from [your apps](https://discord.com/developers/applications) by selecting the large plus button. On the Developers site, each app must declare an “RPC Origin” and “Redirect URI” allowed to make connections and complete authorization. **The origin sent during connection and the redirect uri sent while exchanging an authorization code for an access token must match entries configured on the Developers site.** During WebSocket setup, Discord checks the Origin header to prevent client ID spoofing and disconnects immediately when it does not match. Browser-based RPC origins usually take the form `SCHEME://HOST[:PORT]`, where `SCHEME` is normally https or http, `HOST` is the domain or ip, and `PORT` is the serving webserver port, except ports 80 and 443 are omitted. For example, `https://discord.com` applies when the user connects from `https://discord.com/some/page/url`.If you connect to the RPC server from a non-browser application, such as a game, include the origin with the WebSocket upgrade request. For local testing, use an origin such as `https://localhost`. For production, use the company or game domain, such as `https://discord.com`.

