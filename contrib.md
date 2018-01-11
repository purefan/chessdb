# Contributions

Thank you for your interest in building Libase!

# Getting started

1. Fork this repo
2. `npm install`
3. `npm start` Starts webpack in watch mode
4. `electron .` Starts the app. It reloads automatically when source files are changed
## Overview

Libase is an electron app. In the `main` process we build the primary application, the one that loads and displays the `renderer` process.
The `renderer` process displays the main view, the one with a menu and the initial view.

In _every_ folder you will find a `contrib.md` file with more detailed information about what is going on in that folder, but as a general guide:
- `/dist` You can ignore this folder, it is what electron actually loads but it is auto-generated except for `index.html`
- `/src` This is where the actual functionality and looks are. We use SASS and MithrilJS along with custom modules
- `/tests` Mocha tests towards everything. The more tests the better
- `/tools` Builders that take files from `/src` and _compile_ onto `/dist`. Tip: `gulp watch`

To store settings and other internal data we use [PouchDB](http://pouchdb.com), which is implemented in the `/src/vendor/purefan/db` object.

We favor promises over callbacks.

## Code Style and related matters

We strongly encourage the use of a linter and you can find the rules we have defined in [the eslintrc file](.eslintrc).
One of the motivations for using MithrilJS is to keep complexity as low as possible, every component should do very specific tasks: display several components, display a button...
At this point the preferred way of asking for help is opening a github issue

## Current State
The foundation is layed out so it is easy to get started but the tests are outdated and basic functionality is missing
