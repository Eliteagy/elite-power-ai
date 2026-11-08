# Developing for the iframe
Context: Discord developer reference: Developing for the iframe
[Source](design-patterns-index.md) / [Previous source section](co-watching-co-listening.md) / [Following source section](developing-in-unity.md)
<a id="source-technical-considerations"></a> <a id="source-developing-for-the-iframe"></a>

### Technical Considerations

### Developing for the iframe

- Remember that the Activity shares CPU, RAM, and GPU resources with the still-running Discord Client.
- Prioritize time-to-first-interaction.
- Keep Web Assembly (WASM) usage in the Activity as small as possible.
  - Older iOS hardware is especially sensitive to WebKit's WASM optimization compilation pass during the first minutes of Activity use. The result can include visible stutter, thermal problems, and possible reduction in Discord AV quality during that early period.

- For security reasons, all network traffic goes through the Discord Proxy.
- Create separate Activity versions in the Developer Portal for development stability levels, such as Development, Staging, and Production. This lets you test and display the last stable build while continuing work in development and staging environments.

