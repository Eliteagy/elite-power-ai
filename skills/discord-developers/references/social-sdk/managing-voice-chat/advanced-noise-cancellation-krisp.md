# Advanced noise cancellation krisp
Context: Discord developer reference: Advanced noise cancellation krisp
[Source](managing-voice-chat-index.md) / [Previous source section](default-audio-processing-web-rtc.md) / [Following source section](excluding-krisp-to-reduce-installation-size.md)
<a id="source-advanced-noise-cancellation-krisp"></a>

### Advanced Noise Cancellation (Krisp)

 [`Client::SetNoiseCancellation`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a54aad09e8e06dc327695209b733d3f4c) turns on Krisp, which cancels a broader set of background sounds, such as typing, traffic, and barking, than WebRTC noise suppression. It is off by default. Krisp and WebRTC noise suppression cannot run together; enabling [`Client::SetNoiseCancellation`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a54aad09e8e06dc327695209b733d3f4c) also disables [`Client::SetNoiseSuppression`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ae3f6e33b956964525adfa4536bd1fe73), so you do not need a separate disable call.

```
// Enable Krisp noise cancellation
client->SetNoiseCancellation(true);

```

