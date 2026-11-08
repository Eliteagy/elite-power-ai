# Interaction callback
Context: Discord developer reference: Interaction callback
[Source](interaction-objects-and-responses-index.md) / [Previous source section](interaction-response-structure.md) / [Following source section](followup-messages.md)
<a id="source-interaction-callback"></a> <a id="source-interaction-callback-response-object"></a> <a id="source-interaction-callback-object"></a> <a id="source-interaction-callback-resource-object"></a> <a id="source-interaction-callback-activity-instance-resource"></a>

### Interaction Callback

 To answer a received interaction, send a `POST` request to `/interactions/<interaction_id>/<interaction_token>/callback`. `interaction_id` is the received payload's unique ID for that Interaction, and `interaction_token` is its unique token. If the Interaction arrives through the gateway, the response **must be sent over HTTP**; Interaction responses **are not gateway commands**. **When this request is sent for an HTTP-delivered interaction, answer the original HTTP request with status 202 and an empty body.**

```
import requests

url = "https://discord.com/api/v10/interactions/<interaction_id>/<interaction_token>/callback"

json = {
    "type": 4,
    "data": {
        "content": "Congrats on sending your command!"
    }
}
r = requests.post(url, json=json)

```

 Interaction `tokens` remain usable for **15 minutes** and can create followup messages, but the initial response **must be sent within 3 seconds of receiving the event**. Missing that 3 second window invalidates the token.

Inline HTTP Response Behavior

For HTTP-delivered interactions, the server may answer the incoming `POST` directly. Return a `200` status code when successful and include `type` plus `data`, forming an [Interaction Response](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object) object:

```
@app.route('/', methods=['POST'])
def my_command():
    if request.json["type"] == 1:
        return jsonify({
            "type": 1
        })

    else:
        return jsonify({
            "type": 4,
            "data": {
                "tts": False,
                "content": "Congrats on sending your command!",
                "embeds": [],
                "allowed_mentions": { "parse": [] }
            }
        })

```

###### Interaction Callback Response Object

| Field | Type | Description |
| --- | --- | --- |
| interaction | interaction callback object | Interaction object linked to the interaction response. |
| resource? | interaction resource object | Resource created by the interaction response. |

###### Interaction Callback Object

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the interaction |
| type | integer | Interaction type |
| activity_instance_id? | string | Activity instance ID when an Activity was launched or joined |
| response_message_id? | snowflake | Message ID created by the interaction |
| response_message_loading? | boolean | Whether the message is currently loading |
| response_message_ephemeral? | boolean | Whether the response message is ephemeral |

###### Interaction Callback Resource Object

| Field | Type | Description |
| --- | --- | --- |
| type | integer | Interaction callback type |
| activity_instance?* | Activity instance resource | Activity launched by this interaction. |
| message?** | message object | Message created by the interaction. |

 * Present only when type is `LAUNCH_ACTIVITY`. ** Present only when type is `CHANNEL_MESSAGE_WITH_SOURCE` or `UPDATE_MESSAGE`.

###### Interaction Callback Activity Instance Resource

| Field | Type | Description |
| --- | --- | --- |
| id | string | Activity instance ID when an Activity was launched or joined. |

