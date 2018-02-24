## Settings

The default values, and a list of available settings can be found in `/src/vendor/purefan/settings` which is admitedly a bad location.

### Boolean Settings
Currently (28/01/2018) we have support for boolean settings, these are On/Off settings.

### array_engines Settings
At this point I am working on implementing a list of chess engines as another type of setting and seeing how this _setting_ is a bit complex I created this file to explain my thinking.

#### Visual
The visual side of the `array_engines` setting must allow to:
    - Add a new engine
    - List existing engines
        - Remove an engine
        - Edit settings for an engine
            - Make default engine
            - Custom engine options (UCI `uci`)

#### UX

##### Adding a new engine
At first only 2 options will be displayed: "Path to engine" and "Name"
"Path to engine" is a file selector, when it changes (the user has selected an engine):
    - The name will be read from the engine (the gui sends the command `uci` which returns the id and options) and the option to change the name is available ("Name" is an input text)
    - Custom engine options will become available for the user to edit them

The custom engine options is a bit tricky because the protocol does not define the valid types. Stockfish shows the types:
    - check: Seems to be a boolean
    - spin: Seems to be a number
    - string
