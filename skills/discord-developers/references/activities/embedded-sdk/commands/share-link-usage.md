# Share link usage
Context: Discord developer reference: Share link usage
[Source](../methods-commands-and-events-index.md) / [Owning endpoint, event, object or procedure conditions](share-link.md) / [Previous source section](share-link-required-scopes.md) / [Following source section](start-purchase.md)
<a id="source-signature-22"></a> <a id="source-usage-20"></a>

#### Signature

#### Usage

```
const { success } = await discordSdk.commands.shareLink({
  message: 'This message is shared alongside the link!',
  custom_id: 'some_custom_id',
});
success ? console.log('User shared link!') : console.log('User did not share link!');

```

---

