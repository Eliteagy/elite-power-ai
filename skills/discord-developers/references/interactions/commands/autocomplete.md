# Autocomplete
Context: Discord developer reference: Autocomplete
[Source](subcommands-and-localization-index.md) / [Previous source section](default-entry-point-command.md) / [Following source section](localization.md)
<a id="source-autocomplete"></a>

### Autocomplete

 Autocomplete interactions let an application return option suggestions dynamically while a user types. An autocomplete interaction **may include partial data** for option values. Your app receives partial data for current user input when that input passes client-side validation; partial strings may arrive, while invalid numbers will not. The option currently being edited includes `focused: true`; options already completed by the user are also included, but without `focused`. Required options may be absent in this flow if the user has not filled them yet. This validation happens **only on the client side**.

```
{
  "type": 4,
  "data": {
    "id": "816437322781949972",
    "name": "airhorn",
    "type": 1,
    "version": "847194950382780532",
    "options": [
      {
        "type": 3,
        "name": "variant",
        "value": "data a user is typ",
        "focused": true
      }
    ]
  }
}

```

