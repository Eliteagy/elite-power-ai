# Setting up an endpoint
Context: Discord developer reference: Setting up an endpoint
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](configuring-a-webhook-events-url.md) / [Following source section](adding-an-webhook-events-endpoint-url.md)
<a id="source-setting-up-an-endpoint"></a> <a id="source-acknowledging-ping-requests"></a> <a id="source-validating-security-request-headers"></a>

#### Setting Up an Endpoint

 Before adding a Webhook Events URL to the app, prepare the endpoint for two requirements:
1. Acknowledging `PING` events from Discord
2. Check the security headers `X-Signature-Ed25519` and `X-Signature-Timestamp`
 If either requirement is missing, Discord will not validate the Webhook Events URL. The sections below cover acknowledging PING events and checking security headers.

###### Acknowledging PING requests

 When you add the Webhook Events URL, Discord sends a `POST` request containing a `PING` payload with `type: 0` to the endpoint. The app must acknowledge it by returning a `204` response and no body. Responses to `PING`s must include a valid `Content-Type`. See [here](https://docs.discord.com/developers/reference#http-api) for more information.

Responding to PING Requests

Example code for acknowledging PING events

A correct `PING` acknowledgement returns `204` with an empty body:

```
@app.route('/', methods=['POST'])
def my_command():
    if request.json["type"] == 0:
        return Response(status=204)

```

###### Validating Security Request Headers

 Before an app can receive HTTP events, it **must** satisfy several security requirements. Each webhook request includes these headers:
- `X-Signature-Ed25519` containing the signature
- `X-Signature-Timestamp` containing the timestamp
 Use a trusted security library to **validate the request each time you receive an event**. If signature validation fails, respond with a `401` error code. Security-header validation examples are available in the [Interactions documentation](https://docs.discord.com/developers/interactions/overview#setting-up-an-endpoint-validating-security-request-headers). Discord checks this when you save the endpoint and continues to run automated security probes, including requests with deliberately invalid signatures. Failed validation causes Discord to remove the Webhook Events URL and notify you by email and System DM. Discord recommends the [Community Resources](https://docs.discord.com/developers/developer-tools/community-resources) and the libraries listed there.

