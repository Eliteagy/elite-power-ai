# Setting up SDK event handling
Context: Discord developer reference: Setting up SDK event handling
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](macos-library-permission.md) / [Following source section](adding-logging-support.md)
<a id="source-step-6-setting-up-sdk-event-handling"></a>

### Step 6: Setting Up SDK Event Handling

 Next, add event handlers so the application can observe the Discord connection. The setup uses two key callbacks:
1. A logging callback for SDK activity
2. A status callback that indicates when Discord features are ready

