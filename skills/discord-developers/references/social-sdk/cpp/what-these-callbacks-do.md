# What these callbacks do
Context: Discord developer reference: What these callbacks do
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](monitoring-connection-status.md) / [Following source section](run-callbacks.md)
<a id="source-what-these-callbacks-do"></a>

### What These Callbacks Do

- The **logging callback** exposes SDK activity that would otherwise be hidden
- The **status callback** reports when the client is connected and ready for Discord features
 At this point, the callbacks **won't get called** because client setup is incomplete. They will soon be used to print debug information and connection status. To reach [`Client::Status::Ready`], authenticate with Discord next.

---

