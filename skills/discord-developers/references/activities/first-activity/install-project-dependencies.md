# Install project dependencies
Context: Discord developer reference: Install project dependencies
[Source](project-and-authentication-index.md) / [Previous source section](setting-up-the-project.md) / [Following source section](creating-an-app.md)
<a id="source-install-project-dependencies"></a>

### Install project dependencies

 Before creating the Discord app, install the frontend dependencies. Move into the project's `client` directory, where the sample Activity frontend code is located:

```
cd getting-started-activity/client

```

 Then install the dependencies and start the sample Activity frontend:

```
# install project dependencies
npm install

# start frontend
npm run dev

```

 Opening [http://localhost:5173/](http://localhost:5173/) should show a vanilla JS frontend template running through [Vite](https://vitejs.dev/). It is minimal now, but the next steps connect it to backend services, make it launchable in Discord, and fill it with data from Discord APIs.

Step 1 Checkpoint

By the end of Step 1, confirm that you have:
- A basic understanding of Discord [Activities](https://docs.discord.com/developers/activities/overview)
- Developer Mode enabled for your Discord account
- The [sample project](https://github.com/discord/getting-started-activity) cloned into your development environment
- Frontend dependencies installed in the `client` folder

---

