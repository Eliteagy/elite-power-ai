# Subscribing to events
Context: Discord developer reference: Subscribing to events
[Source](webhook-events-index.md) / [Previous source section](webhook-events.md) / [Following source section](preparing-for-events.md)
<a id="source-subscribing-to-events"></a>

### Subscribing to Events

 To use webhook events, configure the receiving URL and choose which events the app should get. The steps below describe setup in the developer portal. API-based setup can use [Edit Current Application](https://docs.discord.com/developers/resources/application#edit-current-application). In your [app's settings](https://discord.com/developers/applications), open the [**Webhooks** page](https://discord.com/developers/applications/select/webhooks) from the left sidebar and complete these steps:
1. Under **Endpoint**, enter a public URL that can receive webhook events and acknowledge them. The [preparing for events](https://docs.discord.com/developers/events/webhook-events#preparing-for-events) section explains how to build a Webhook Events URL.
2. Turn on Events with the toggle in the **Events** section.
3. Choose the [webhook events](https://docs.discord.com/developers/events/webhook-events#event-types) the app should receive.
4. Click **Save Changes**.
 After the URL verifies successfully, Discord begins sending the selected events to the app.

