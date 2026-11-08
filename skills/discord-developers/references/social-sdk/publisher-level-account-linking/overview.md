# Overview
Context: Discord developer reference: Overview
[Source](publisher-level-account-linking-index.md) / [Previous source section](publisher-level-account-linking.md) / [Following source section](for-publishers.md)
<a id="source-overview"></a>

### Overview

 Publisher Level Account Linking lets a developer that operates several games use one authorization flow for the full portfolio. Players authorize through a publisher application rather than authorizing separately per game. The model uses a parent-child relationship where the publisher application is the parent and each game application is a child. After that relationship exists, the publisher application handles player authentication, while a game application is used to connect to and operate the Discord Social SDK. This guide explains how to:
- Configure publisher applications and game applications
- Trade parent tokens for child tokens
- Authenticate the Discord Social SDK with child tokens
- Understand token lifecycle and limitations

