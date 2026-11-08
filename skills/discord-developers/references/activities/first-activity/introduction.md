# Introduction
Context: Discord developer reference: Introduction
[Source](project-and-authentication-index.md) / [Previous source section](building-an-activity.md) / [Following source section](enable-developer-mode.md)
<a id="source-introduction"></a>

### Introduction

 This guide builds a Discord app with a simple Activity that authenticates users and retrieves data through the API. It assumes familiarity with [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics), [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), and frontend frameworks such as [React](https://react.dev/) and [Vue](https://vuejs.org/). If you are still learning programming fundamentals, free resources include [The Odin Project](https://www.theodinproject.com/paths/foundations/courses/foundations), [Codecademy](https://www.codecademy.com/learn/paths/web-development), and [Khan Academy](https://www.khanacademy.org/computing/computer-programming/programming).

What we'll be building

(Figure: Building Your First Activity Tutorial)

Resources used in this guide

- **[discord/getting-started-activity](https://github.com/discord/getting-started-activity)**, the starter project template
- **[@discord/embedded-app-sdk](https://github.com/discord/embedded-app-sdk)**, the SDK that lets an Activity communicate with Discord
- **[Node.js](https://nodejs.org)**, latest version
- **[Express](https://expressjs.com)**, the JavaScript web framework used here for authentication handling and app serving
- **[Vite](https://vite.dev/)**, a modern JavaScript build tool that simplifies serving the app
- **[cloudflared](https://github.com/cloudflare/cloudflared?tab=readme-ov-file#installing-cloudflared)**, used to expose the local development server to the internet

---

