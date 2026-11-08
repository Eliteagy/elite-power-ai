# Interval can only be set to a value other than 1 when frequency is set to weekly 1
Context: Discord developer reference: Interval can only be set to a value other than 1 when frequency is set to weekly 1
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-object.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-recurrence-rule-object.md) / [Following source section](guild-scheduled-event-recurrence-rule-n-weekday-structure.md)
<a id="source-interval-can-only-be-set-to-a-value-other-than-1-when-frequency-is-set-to-weekly-1"></a> <a id="source-guild-scheduled-event-recurrence-rule---frequency"></a> <a id="source-guild-scheduled-event-recurrence-rule---weekday"></a>

###### `interval` can only be set to a value other than `1` when `frequency` is set to `WEEKLY` (`1`)

- Under that condition, `interval` may be set to `2`
- This allows every-other week events
- Because of `by_weekday` limits, every-other week scheduling can target only a single day.

Examples

Examples of common Recurrent Rules:

**Every weekday**

```
frequency = 3 // Frequency.DAILY
interval = 1
by_weekday = [0, 1, 2, 3, 4] // [Weekday.MONDAY, ..., Weekday.FRIDAY]

```

**Every Wednesday**

```
frequency = 2 // Frequency.WEEKLY
interval = 1
by_weekday = [2] // [Weekday.WEDNESDAY]

```

**Every other Wednesday**

```
frequency = 2 // Frequency.WEEKLY
interval = 2
by_weekday = [2] // [Weekday.WEDNESDAY]

```

**Monthly on the fourth Wednesday**

```
frequency = 1 // Frequency.MONTHLY
interval = 1
by_n_weekday = [{
  n: 4,
  day: 2 // Weekday.WEDNESDAY
}]

```

**Annually on July 24**

```
frequency = 0 // Frequency.YEARLY
interval = 1
by_month = [7] // [Month.JULY]
by_month_day = [24]

```

###### Guild Scheduled Event Recurrence Rule - Frequency

| Type | Value |
| --- | --- |
| YEARLY | 0 |
| MONTHLY | 1 |
| WEEKLY | 2 |
| DAILY | 3 |

###### Guild Scheduled Event Recurrence Rule - Weekday

| Type | Value |
| --- | --- |
| MONDAY | 0 |
| TUESDAY | 1 |
| WEDNESDAY | 2 |
| THURSDAY | 3 |
| FRIDAY | 4 |
| SATURDAY | 5 |
| SUNDAY | 6 |

