# Exceptions when you get message content without the privileged intent
Context: Discord developer reference: Exceptions when you get message content without the privileged intent
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](who-does-this-apply-to.md) / [Previous source section](message-content-intent-capabilities.md) / [Following source section](intent-free-interaction-alternatives.md)
<a id="source-exceptions-when-you-get-message-content-without-the-privileged-intent"></a>

### Exceptions: when you get message content without the privileged intent

 The app does **not** need Message Content intent to read message content in these cases:
- **Messages your app sends**
- **Direct Messages sent to your app**
- **Messages that @mention your app**
- **Replies to your app's messages.** This covers normal bot-message replies made with Discord's reply feature when "ping on reply" is enabled for the user. It does not include replies to slash command responses.
 When the app's feature can be designed around this available access, do not request Message Content intent.

