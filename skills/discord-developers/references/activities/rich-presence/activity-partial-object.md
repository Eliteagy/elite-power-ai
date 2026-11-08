# Activity partial object
Context: Discord developer reference: Activity partial object
[Source](developers-index.md) / [Owning endpoint, event, object or procedure conditions](understanding-rich-presence-data.md) / [Owning endpoint, event, object or procedure conditions](set-activity-fields.md) / [Following source section](set-activity-example.md)
<a id="source-activity-partial-object"></a>

#### Activity partial object

 Every field in the partial object is optional and nullable.
| field | type | description |
| --- | --- | --- |
| type | integer | Activity type, used to choose the header text shown for Rich Presence data |
| state | string | User’s current party status |
| details | string | The user's current action or status inside the Activity |
| timestamps | timestamps object | Unix timestamps used to show start time, end time, or both |
| assets | assets object | Images displayed in Rich Presence data, plus their hover text |
| party | party object | Details about the player's current party |

