# Responding to events
Context: Discord developer reference: Responding to events
[Source](webhook-events-index.md) / [Previous source section](adding-an-webhook-events-endpoint-url.md) / [Following source section](webhook-event-payloads.md)
<a id="source-responding-to-events"></a>

### Responding to Events

 When the Webhook Event URL receives an event, the app should acknowledge receipt by returning a `204` status code with no body **within 3 seconds**. If the app does not respond, Discord retries delivery several times with exponential backoff for up to 10 minutes. Repeated response failures cause Discord to stop sending webhook events and notify you by email.

