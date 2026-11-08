# Acknowledging ping requests
Context: Discord developer reference: Acknowledging ping requests
[Source](interaction-types-index.md) / [Owning endpoint, event, object or procedure conditions](configuring-an-interactions-endpoint-url.md) / [Previous source section](setting-up-an-endpoint.md) / [Following source section](adding-an-interactions-endpoint-url.md)
<a id="source-acknowledging-ping-requests"></a> <a id="source-validating-security-request-headers"></a>

#### Acknowledging PING requests

 When you add an Interactions Endpoint URL, Discord sends a `POST` request containing a `PING` payload with `type: 1`. The app must acknowledge it with a `200` response containing a `PONG` payload, also with `type: 1`. For interaction response details, see the [Receiving and Responding documentation](https://docs.discord.com/developers/interactions/receiving-and-responding). Responses to `PING`s must include a valid `Content-Type`; see [here](https://docs.discord.com/developers/reference#http-api) for more information.

Responding to PING Requests

Code example for acknowledging `PING` interactions

A correct `PING` acknowledgement returns a `200` response and a body with `type: 1`:

```
@app.route('/', methods=['POST'])
def my_command():
    if request.json["type"] == 1:
        return jsonify({
            "type": 1
        })

```

###### Validating Security Request Headers

 Public unauthenticated endpoints need strict security handling. Before an app can receive HTTP interactions, it **must** implement the required validation steps. Every interaction request includes these headers:
- `X-Signature-Ed25519` containing the signature
- `X-Signature-Timestamp` containing the timestamp
 Use an appropriate security library and **validate the request every time an [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object) is received**. When signature validation fails, respond with a `401` error code.

Validating Security Headers

Code example for validating security request headers

The examples below demonstrate validation for interaction request headers.**JavaScript**

```
const nacl = require("tweetnacl");

// Your public key can be found on your application in the Developer Portal
const PUBLIC_KEY = "APPLICATION_PUBLIC_KEY";

const signature = req.get("X-Signature-Ed25519");
const timestamp = req.get("X-Signature-Timestamp");
const body = req.rawBody; // rawBody is expected to be a string, not raw bytes

const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, "hex"),
    Buffer.from(PUBLIC_KEY, "hex")
);

if (!isVerified) {
    return res.status(401).end("invalid request signature");
}

```

**Python**

```
from nacl.signing import VerifyKey
from nacl.exceptions import BadSignatureError

# Your public key can be found on your application in the Developer Portal
PUBLIC_KEY = 'APPLICATION_PUBLIC_KEY'

verify_key = VerifyKey(bytes.fromhex(PUBLIC_KEY))

signature = request.headers["X-Signature-Ed25519"]
timestamp = request.headers["X-Signature-Timestamp"]
body = request.data.decode("utf-8")

try:
    verify_key.verify(f'{timestamp}{body}'.encode(), bytes.fromhex(signature))
except BadSignatureError:
    abort(401, 'invalid request signature')

```

 Discord checks signature-header validation both when the endpoint is saved and through ongoing automated security probes, including deliberately invalid signatures. If validation fails, Discord removes the interactions URL and notifies you by email and System DM. The [Community Resources](https://docs.discord.com/developers/developer-tools/community-resources#interactions) page and its libraries are strongly recommended; many provide typings for Interactions data models and decorators for frameworks such as Flask and Express that simplify validation.

