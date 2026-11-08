# Overview
Context: Discord developer reference: Overview
[Source](account-linking-on-mobile-index.md) / [Following source section](key-differences-from-desktop-authentication.md)
<a id="source-account-linking-on-mobile"></a> <a id="source-overview"></a>

# Account Linking On Mobile

> Discord Developers reference. Original prose; identifiers preserved verbatim.

### Overview

 If account linking is new to you, read the [Account Linking overview](https://docs.discord.com/developers/platform/account-linking) for the concept, behavior, and flow choices. This guide covers OAuth2 authentication for mobile users on iOS and Android so they can link Discord accounts to your game. Mobile authentication relies on **deep linking**: when the Discord mobile app is installed, the user is sent to Discord for authorization and then returned to your game through a custom URL scheme. As of Discord Social SDK 1.5, native deep-link authentication support makes mobile account linking much simpler.

