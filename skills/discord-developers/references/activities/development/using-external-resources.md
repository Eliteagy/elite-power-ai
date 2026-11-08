# Using external resources
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](local-development.md) / [Previous source section](construct-a-full-url.md) / [Following source section](local-development-security-considerations.md)

<a id="source-using-external-resources"></a>

### Using External Resources

Permit network requests to external resources through the Discord proxy.

<a id="source-using-external-resources"></a>

### Using External Resources

 Discord activities are sandboxed through a Discord proxy. The proxy hides user IP addresses and blocks URLs associated with malicious endpoints. In the Developer Portal, applications configure [URL Mappings](https://docs.discord.com/developers/activities/development-guides/local-development#url-mapping) for this proxy behavior. One edge case is third-party NPM modules or other assets that reference external, unmapped URLs. If a module tries to request [https://foo.library.com](https://foo.library.com), for example, the request fails with `blocked:csp`. Possible ways to handle this include:
- Fork the library so it uses mapped urls
- Apply a post-install tool such as [patch-package](https://www.npmjs.com/package/patch-package)
- Call the Embedded App SDK's `patchUrlMappings` API
 For that scenario, `patchUrlMappings` is the recommended option because it helps the app move cleanly from an unsandboxed development environment to production. The call accepts an array of `mappings` that rewrite external network requests to the mappings you define. See this example:
- In this example, assume a third-party library makes an HTTP request to foo.com
- In the developer portal, define this mapping: `/foo` -> `foo.com`
- Then initialize the SDK and make the function call in your code.

```
import {patchUrlMappings} from '@discord/embedded-app-sdk';
const isProd = process.env.NODE_ENV === 'production'; // Actual dev/prod env check may vary for you

async function setupApp() {
  if (isProd) {
    patchUrlMappings([{prefix: '/foo', target: 'foo.com'}]);
  }
  // start app initialization after this....
}

```

 Note: `patchUrlMappings` changes the browser globals `fetch`, `WebSocket`, and `XMLHttpRequest.prototype.open`. Depending on the library, that helper can cause side effects. Use it only when you need it.

---
