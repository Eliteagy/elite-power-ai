# Run your application locally
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](local-development.md) / [Following source section](launch-your-app-from-discord.md)

<a id="source-local-development-1"></a> <a id="source-run-your-application-locally"></a>

### Local Development

### Run Your Application Locally

Run a local development application.

<a id="source-local-development-mobile"></a> <a id="source-overview"></a> <a id="source-run-your-application-locally"></a> <a id="source-run-your-application-locally-1"></a>

# Local Development, Mobile

> Discord Developers reference. Original prose; identifiers preserved verbatim.

## Overview

Covers: Run Your Application Locally; Supported Platforms: Web, iOS, Android.

## Run Your Application Locally

### Run Your Application Locally

 You can open an application from a localhost port or another unique URL. For web and desktop Discord, that URL must be reachable over HTTPS; mobile does not require HTTPS. With this approach, traffic from the app bypasses Discord's proxy, so requests must use complete URLs rather than ["mapped"](https://docs.discord.com/developers/activities/development-guides/local-development#url-mapping) URLs. To test a local web server, use [Launching your Application from the Discord Client](https://docs.discord.com/developers/activities/development-guides/local-development#launch-your-application-from-the-discord-client) and set Application URL Override to the web server address for the application.
