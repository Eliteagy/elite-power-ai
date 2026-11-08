# Relationships troubleshooting
Context: Discord developer reference: Relationships troubleshooting
[Source](cpp-relationships-and-presence-index.md) / [Previous source section](relationships-testing.md) / [Following source section](relationships-program.md)
<a id="source-troubleshooting"></a>

### Troubleshooting

 If relationship data is missing:
- Confirm the OAuth2 scopes grant relationships access
- Confirm the client is connected with `Status::Ready`
- Confirm the account has Discord friends
- Inspect the logging callback for errors
 Next, add Rich Presence so Discord can show game activity.

main.cpp with friends count

