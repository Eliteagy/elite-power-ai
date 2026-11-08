# Remix the project project structure
Context: Discord developer reference: Remix the project project structure
[Source](configuring-app-metadata-for-linked-roles-index.md) / [Owning endpoint, event, object or procedure conditions](remix-the-project.md) / [Following source section](configure-your-app.md)
<a id="source-project-structure"></a>

#### Project structure

 The project files appear on the left side. The structure is roughly:

```
├── assets     -> images used in this tutorial
├── src
├──├── config.js  -> Parsing of local configuration
├──├── discord.js -> Discord specific auth & API wrapper
├──├── register.js -> Tool to register the metadata schema
├──├── server.js  -> Main entry point for the application
├──├── storage.js -> Provider for storing OAuth2 tokens
├── .env -> your credentials and IDs
├── .gitignore
├── package.json
└── README.md

```

