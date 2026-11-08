# Using the open API specification
Context: Discord developer reference: Using the open API specification
[Source](../marketing/integration-marketing-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](overview-user-information.md) / [Following source section](overview-best-practices.md)
<a id="source-using-the-openapi-specification"></a>

### Using the OpenAPI Specification

 The [Discord OpenAPI Spec](https://github.com/discord/discord-api-spec) can generate a client for your backend language, reducing manual work when calling Discord APIs. [https://openapi-generator.tech/](https://openapi-generator.tech/) is one suitable generator. In python, the flow can look like this:

```
import openapi_client
import os
from pprint import pprint

configuration = openapi_client.Configuration(host = "https://discord.com/api/v10")
configuration.api_key['BotToken'] = 'Bot ' + os.environ["API_KEY"]
with openapi_client.ApiClient(configuration) as api_client:
    api_instance = openapi_client.DefaultApi(api_client)

    request = openapi_client.CreateLobbyRequest()
    request.metadata={'foo':'bar'}
    pprint(api_instance.create_lobby(request))

```

---

