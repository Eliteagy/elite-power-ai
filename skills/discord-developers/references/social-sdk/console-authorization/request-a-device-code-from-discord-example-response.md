# Request a device code from discord example response
Context: Discord developer reference: Request a device code from discord example response
[Source](../entry-points/entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Owning endpoint, event, object or procedure conditions](request-a-device-code-from-discord.md) / [Following source section](display-authorize-screen-with-qr-code-and-user-code.md)
<a id="source-example-response"></a>

#### Example Response

```
{
  "device_code": "<device code>",
  "user_code": "<user code>",
  "verification_uri": "https://discord.com/activate",
  "verification_uri_complete": "https://discord.com/activate?user_code=<user code>",
  "expires_in": 300,
  "interval": 5
}

```

