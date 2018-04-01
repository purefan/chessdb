
## Libase API

All of the methods return a promise, we make use only of promises

### setting

The setting module

#### setting.get(<string>)

### engine
There is support for only one engine running at a time.
the main electron process listens to the following events:
- uciengine-init: Takes a settings object
- uciengine-analyze: Takes a fen

