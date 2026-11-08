# Testing the connection
Context: Discord developer reference: Testing the connection
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](token-update-connection-lifecycle.md) / [Following source section](connection-troubleshooting.md)
<a id="source-testing-the-connection"></a>

### Testing the Connection

1. Run your program
2. Watch for status messages in this order:
  - ”🔑 Token updated, connecting to Discord…”
  - Status changes should include Connecting, Connected, and Ready
  - The ready message should indicate that SDK functions can now be called

