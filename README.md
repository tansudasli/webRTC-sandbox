# webRTC w/ tokbox

- **/pubsub** : index.html publishes, listen.html listens the stream (video + audio). This part contains fully implementation to be used as **backbone.**
- **.** : same as /pubsub but also contains more css and more buttons such as listen and broadcast

# How to start

- create tokbox account & dummy-project for apiKey and other related variables.

# How to run

- `git clone https://github.com/tansudasli/webRTC-sandbox.git`
- edit `pubsub.js` for
    - apiKey, sessionId. token w/ your own values.
- run w/ live web server addon on vscode. 
    - **/pubsub**: Check `localhost:5500/pubsub/index.html`, then `localhost:5500/pubsub/listen.html`.
    - **.**: `localhost:5500/broadcaster.html`, then `localhost:5500/translator.html`
- close your audio to disable feedback noise!
- open chrome developer and see console logs!