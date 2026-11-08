# Payloads payload structure
Context: Discord developer reference: Payloads payload structure
[Source](connection-and-command-contracts-index.md) / [Previous source section](restrictions.md) / [Following source section](authenticating.md)
<a id="source-payloads"></a> <a id="source-payload-structure"></a>

### Payloads

###### Payload Structure

| Field | Type | Description | Present |
| --- | --- | --- | --- |
| cmd | enum | payload command | Always |
| nonce | string | unique string used once for replies from that server | In responses to commands (not subscribed events) |
| evt | enum | subscription event | In subscribed events, errors, and (un)subscribing events |
| data | object | event data | In responses from the server |
| args | object | command arguments | In commands delivered to that server |

