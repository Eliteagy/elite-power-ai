# Calling your backend server from your client
[Source](project-and-authentication-index.md) / [Continued source contract](calling-your-backend-server-from-your-client.md) / [Previous source section](calling-external-resources-from-your-activity.md)

<a id="source-calling-your-backend-server-from-your-client"></a>

### Calling your backend server from your client

 The client now needs to call the server so the OAuth process can start and produce an access token. **What is vite.config.js?** Vite needs a proxy from `/api/*` to the Express backend on port 3001 so the frontend can call it. The [Vite](https://vitejs.dev/) docs explain the tool in more depth.

Calling the backend server

Code for authorizing and authenticating

Copy this code into `getting-started-activity/client/main.js`:

<a id="source-building-an-activity-part-2"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

The complete program is in the [upstream source](https://raw.githubusercontent.com/discord/discord-api-docs/aaef8ae4c3398fcdabeec0d1dd5a3e69be587ad8/developers/activities/building-an-activity.mdx).

 After relaunching the app, Discord prompts for authorization with the `identify`, `guilds`, and `applications.commands` scopes. (Figure: Prompt to authorize Activity) **Safe storage of tokens**Access tokens and refresh tokens grant meaningful access, so protect them like passwords or other sensitive secrets. Store both token types securely and encrypted.

Step 5 Checkpoint

Before leaving Step 5, confirm that you have:
- Changed `client/main.js` so it calls the backend for user authorization and authentication support
- Verified that opening the Activity lets your app complete the authorization flow successfully

---
