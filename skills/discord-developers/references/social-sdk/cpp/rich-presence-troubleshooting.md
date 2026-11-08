# Rich presence troubleshooting
Context: Discord developer reference: Rich presence troubleshooting
[Source](cpp-relationships-and-presence-index.md) / [Previous source section](rich-presence-testing.md) / [Following source section](rich-presence-program-declarations.md)
<a id="source-troubleshooting-1"></a>

### Troubleshooting

 If presence does not appear:
- Confirm the client is connected ([`Client::Status::Ready`])
- Inspect the callback for error messages
- Confirm the activity settings are valid
- Confirm your Discord status is not invisible

main.cpp complete

