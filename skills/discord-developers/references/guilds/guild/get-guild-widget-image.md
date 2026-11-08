# Get guild widget image
Context: Discord developer reference: Get guild widget image
[Source](roles-pruning-and-guild-settings-index.md) / [Previous source section](get-guild-vanity-url.md) / [Following source section](get-guild-welcome-screen.md)
<a id="source-get-guild-widget-image"></a> <a id="source-query-string-params-1"></a> <a id="source-widget-style-options"></a>

### Get Guild Widget Image

  Return the guild widget as a PNG image. Authentication and permissions are not required, and every parameter is optional.

###### Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| style | string | widget image style to return; see the options below | shield |

###### Widget Style Options

| Value | Description | Example |
| --- | --- | --- |
| shield | shield-style widget showing the Discord icon and the online guild member count | Example |
| banner1 | large widget image with the guild icon, guild name, online count, and `POWERED BY DISCORD` in the footer | Example |
| banner2 | compact widget with guild icon, name, and online count, plus a right-side split area containing the Discord logo | Example |
| banner3 | large widget image showing guild icon, name, and online count, with the Discord logo on the footer's left and `Chat Now` on the right | Example |
| banner4 | widget with a large Discord logo at the top, the guild icon, name, and online count in the center, and a `JOIN MY SERVER` button at the bottom | Example |

