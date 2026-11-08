# Setting up an endpoint
Context: Discord developer reference: Setting up an endpoint
[Source](interaction-types-index.md) / [Owning endpoint, event, object or procedure conditions](configuring-an-interactions-endpoint-url.md) / [Following source section](acknowledging-ping-requests.md)
<a id="source-setting-up-an-endpoint"></a>

#### Setting Up an Endpoint

 Before saving an Interactions Endpoint URL, make sure the endpoint already supports two required behaviors:
1. Acknowledging `PING` requests from Discord
2. Validate the security request headers (`X-Signature-Ed25519` and `X-Signature-Timestamp`)
 If either requirement is missing, Discord will not validate the Interactions Endpoint URL. The following sections explain `PING` acknowledgements and security-header validation.

