# If a game is launched what of the time do users reach different phases of the game
Context: Discord developer reference: If a game is launched what of the time do users reach different phases of the game
[Source](design-patterns-index.md) / [Previous source section](closing-activities-after-last-participant.md) / [Following source section](how-many-games-are-played-in-a-session.md)
<a id="source-if-a-game-is-launched-what--of-the-time-do-users-reach-different-phases-of-the-game"></a>

### If a game is launched, what % of the time do users reach different phases of the game?

- Track launch -> start because many users may drop between those points, especially without solo play or small-group support.
- Also track checkpoints across the game, including the percentage of started sessions that reach the end.
- If the Activity has multiple starting settings, compare popularity and success by setting; defaults may need adjustment.
  - For non-game Activities, analyze a relevant action instead, such as queueing a video or song for a co-watching or co-listening experience.

- High drop-off at one point should prompt investigation and possible flow changes.

