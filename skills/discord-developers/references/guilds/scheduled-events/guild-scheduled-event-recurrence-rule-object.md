# Guild scheduled event recurrence rule object
Context: Discord developer reference: Guild scheduled event recurrence rule object
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-object.md) / [Previous source section](guild-scheduled-event-user-structure.md) / [Following source section](weekly-recurrence-interval-and-frequency-values.md)
<a id="source-guild-scheduled-event-recurrence-rule-object"></a> <a id="source-guild-scheduled-event-recurrence-rule-structure"></a> <a id="source-the-following-fields-cannot-be-set-by-the-client--application"></a> <a id="source-the-following-combinations-are-mutually-exclusive"></a> <a id="source-by_weekday"></a> <a id="source-by_n_weekday"></a> <a id="source-by_month-and-by_month_day"></a>

### Guild Scheduled Event Recurrence Rule Object

 Discord recurrence rules use a limited subset of behavior from the [iCalendar RFC](https://datatracker.ietf.org/doc/html/rfc5545) and [python's dateutil rrule](https://dateutil.readthedocs.io/en/stable/rrule.html). The system currently has many constraints; see System limitations below.

###### Guild Scheduled Event Recurrence Rule Structure

| Field | Type | Description |
| --- | --- | --- |
| start | ISO8601 timestamp | start time for the recurrence interval |
| end [1] | ?ISO8601 timestamp | end time for the recurrence interval |
| frequency | recurrence rule - frequency object | How often the event occurs |
| interval | int | spacing between events, as defined by `frequency`; for example, `frequency` of `WEEKLY` with an `interval` of `2` means every-other week |
| by_weekday | ?array of recurrence rule - weekday | specific weekdays on which the event recurs |
| by_n_weekday | ?array of recurrence rule - n_weekday objects | specific days in a specific week (1-5) on which the event recurs |
| by_month | ?array of recurrence rule - month | specific months in which the event recurs |
| by_month_day | ?array of int | specific dates in a month on which the event recurs |
| by_year_day [1] | ?array of int | specific days in a year on which the event recurs (1-364) |
| count [1] | ?int | total number of recurrences allowed before the event stops |

 [1] - Cannot be set externally currently.

System limitations

Recurrence rules are powerful, but Discord applies specific restrictions.

These limitations exist because recurring event data must be displayed in the client. Discord may loosen or remove these restrictions in the future.

###### The following fields cannot be set by the client / application

- `count`
- `end`
- `by_year_day`

###### The following combinations are mutually exclusive

- `by_weekday`
- `by_n_weekday`
- `by_month` + `by_month_day`

###### `by_weekday`

- Valid only for daily and weekly events (`frequency` of `DAILY` (`0`) or `WEEKLY` (`1`))
- For daily events (`frequency` is `DAILY` (`0`))
  - Values in the `by_weekday` event must match a known set of weekdays.
  - Current allowed sets are:
    - Monday - Friday (`[0, 1, 2, 3, 4]`)
    - Tuesday - Saturday (`[1, 2, 3, 4, 5]`)
    - Sunday - Thursday (`[6, 0, 1, 2, 3]`)
    - Friday & Saturday (`[4, 5]`)
    - Saturday & Sunday (`[5, 6]`)
    - Sunday & Monday (`[6, 0]`)

- For weekly events (`frequency` is `WEEKLY` (`1`))
  - The `by_weekday` array currently can only have a length of `1`
    - Meaning: a recurring weekly event can be placed on only a single day within the week
    - To recur on multiple days within a week, use a `frequency` of `DAILY`

  - See `interval` below for every-other week behavior

###### `by_n_weekday`

- Valid only for monthly events (`frequency` of `MONTHLY` (`1`))
- The `by_n_weekday` array currently can only have a length of `1`
  - Meaning: a recurring monthly event can be placed on only a single day within the month

###### `by_month` and `by_month_day`

- Valid only for annual events (`frequency` is `YEARLY` (`0`))
- `by_month` and `by_month_day` must both be provided
- The `by_month` and `by_month_day` arrays must each have a length of `1`
  - Meaning: annual events can use only a single date

