# Connection troubleshooting
Context: Discord developer reference: Connection troubleshooting
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](testing-the-connection.md) / [Following source section](connection-program.md)
<a id="source-troubleshooting-1"></a>

### Troubleshooting

 If Ready never appears:
- Check whether the access token is valid
- Ensure you have internet connectivity
- Inspect error messages reported by the status callback
- Verify that `APPLICATION_ID` is correct
 Once the client reaches a ready state, you can begin adding Discord social features.

main.cpp with SDK connection

