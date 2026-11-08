# Validating proxy request headers
Context: Discord developer reference: Validating proxy request headers
[Source](participants-avatars-and-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](activity-instance-management.md) / [Owning endpoint, event, object or procedure conditions](using-the-activity-instance-api.md) / [Following source section](activity-proxy-considerations.md)
<a id="source-validating-proxy-request-headers"></a>

###### Validating Proxy Request Headers

 For applications that need extra request validation, Discord offers optional proxy authentication. When an embedded app sends traffic through Discord's proxy, requests can carry cryptographic headers proving authenticity. A proxy-authenticated request includes these headers:
- `X-Signature-Ed25519` containing the cryptographic signature
- `X-Signature-Timestamp` containing a Unix timestamp
- `X-Discord-Proxy-Payload` containing base64-encoded user context
 If you enable proxy authentication, validate those headers to confirm requests are authentic. Return `401` when signature validation fails.

Validating Proxy Headers

Example code for validating proxy authentication headers

The following code samples demonstrate validation of headers included with proxy-authenticated requests. **JavaScript**

```
const nacl = require("tweetnacl");

// Your public key can be found on your application in the Developer Portal
const PUBLIC_KEY = "APPLICATION_PUBLIC_KEY";

const signature = req.get("X-Signature-Ed25519");
const timestamp = req.get("X-Signature-Timestamp");
const payload = req.get("X-Discord-Proxy-Payload");

// Decode the base64 payload
const payloadBytes = Buffer.from(payload, "base64");
const payloadString = payloadBytes.toString("utf-8");
const payloadData = JSON.parse(payloadString);

// Verify timestamp matches payload
if (payloadData.created_at.toString() !== timestamp) {
    return res.status(401).end("invalid request timestamp");
}

// Check if token has expired
if (payloadData.expires_at < Math.floor(Date.now() / 1000)) {
    return res.status(401).end("expired proxy token");
}

// Verify the signature using tweetnacl
const isVerified = nacl.sign.detached.verify(
    payloadBytes,
    Buffer.from(signature, "base64"),
    Buffer.from(PUBLIC_KEY, "hex")
);

if (!isVerified) {
    return res.status(401).end("invalid request signature");
}

```

**Python**

```
import json
import base64
import time
from nacl.signing import VerifyKey
from nacl.exceptions import BadSignatureError

# Your public key can be found on your application in the Developer Portal
PUBLIC_KEY = 'APPLICATION_PUBLIC_KEY'

verify_key = VerifyKey(bytes.fromhex(PUBLIC_KEY))

signature = request.headers["X-Signature-Ed25519"]
timestamp = request.headers["X-Signature-Timestamp"]
payload = request.headers["X-Discord-Proxy-Payload"]

# Decode the base64 payload
payload_bytes = base64.b64decode(payload)
payload_string = payload_bytes.decode('utf-8')
payload_data = json.loads(payload_string)

# Verify timestamp matches payload
if str(payload_data['created_at']) != timestamp:
    abort(401, 'invalid request timestamp')

# Check if token has expired
if payload_data['expires_at'] < int(time.time()):
    abort(401, 'expired proxy token')

try:
    verify_key.verify(payload_bytes, bytes.fromhex(signature))
except BadSignatureError:
    abort(401, 'invalid request signature')

```

 Proxy authentication is optional and acts as an additional security layer for apps that use it. The flow diagram below shows a server returning the activity website only for valid users inside a valid activity instance: (Figure: activity-instance-validation)

