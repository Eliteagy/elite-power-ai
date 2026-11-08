# Launching activities
[Source](activities-index.md) / [Following source section](launching-activities.md)

<a id="source-how-activities-work-overview"></a> <a id="source-overview"></a> <a id="source-launching-activities"></a>

# How Activities Work, Overview

> Discord Developers reference. Original prose; identifiers preserved verbatim.

## Overview

Covers: Launching Activities; Build Your First Discord Activity.

## Launching Activities

Activities are web apps loaded in an iframe inside Discord across desktop, mobile, and web clients. Secure communication between the Activity and Discord uses the [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) protocol. The [Embedded App SDK](https://github.com/discord/embedded-app-sdk) handles that `postMessage` work for the app. For command availability and usage details, see the [SDK Reference](https://docs.discord.com/developers/developer-tools/embedded-app-sdk). The [Sample Projects](https://docs.discord.com/developers/activities/overview#sample-projects) show practical implementations.

<a id="source-launching-activities-1"></a>

### Launching Activities

 After Activities are enabled in the Application's [Activity's settings](https://discord.com/developers/applications/select/embedded/settings), the app can start Activities in either of these ways:
1. A user runs the app's Entry Point command from the App Launcher
2. The app responds to an interaction using the `LAUNCH_ACTIVITY` callback type
 The following sections describe both options in more depth.
