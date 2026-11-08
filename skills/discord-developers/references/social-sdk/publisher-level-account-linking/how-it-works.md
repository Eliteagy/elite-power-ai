# How it works
Context: Discord developer reference: How it works
[Source](publisher-level-account-linking-index.md) / [Previous source section](relationships-exist-at-the-publisher-level-not-per-game.md) / [Following source section](prerequisites.md)
<a id="source-how-it-works"></a>

### How It Works

 The Publisher Authentication model uses two application roles:
1. **Publisher application (parent)**: Runs OAuth2 account linking and owns user authorization
2. **Game application (child)**: Receives child access tokens from the parent and uses them for Social SDK calls
 The flow works as follows:
1. The user authorizes once through the publisher application with standard OAuth2
2. The developer exchanges the parent access token at `/partner-sdk/child-token` to receive a child access token
3. The child token initializes the Discord Social SDK for the selected game
4. Subsequent Social SDK operations run under that child token
 The table below separates responsibilities between the Publisher application and the game application:
| **Action** | **Publisher Application (Parent)** | **Game Application (Child)** |
| --- | --- | --- |
| Discord account authentication | ✅ | ❌ |
| Provisional account authentication | ✅ | ❌ |
| Creates parent access tokens and refresh tokens | ✅ | ❌ |
| Trades parent tokens for a child token | ✅ | ❌ |
| Used when connecting to the Social SDK | ❌ | ✅ |
| Runs within the context of a single game | ❌ | ✅ |

---

