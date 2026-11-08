# Ban object ban structure
Context: Discord developer reference: Ban object ban structure
[Source](guild-objects-and-configuration-index.md) / [Previous source section](integration-application-structure.md) / [Following source section](welcome-screen-structure.md)
<a id="source-ban-object"></a> <a id="source-ban-structure"></a> <a id="source-example-ban"></a>

### Ban Object

###### Ban Structure

| Field | Type | Description |
| --- | --- | --- |
| reason | ?string | the reason for the ban |
| user | user object | the banned user |

###### Example Ban

```
{
  "reason": "mentioning b1nzy",
  "user": {
    "username": "Mason",
    "discriminator": "9999",
    "id": "53908099506183680",
    "avatar": "a_bab14f271d565501444b2ca3be944b25",
    "public_flags": 131141
  }
}

```

