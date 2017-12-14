# Contributions

Thank you for your interest in building Vogula! This document describes the technologies and internals of Vogula

## Overview

Vogula is an electron app. In the `main` process we build the primary application, the one that loads and displays the `renderer` process.
The `renderer` process displays the main view, the one with a menu and the initial view.
Through a series of events, a _modal view_ can be displayed, this happens for example when a user clicks on the menu "Edit" and then on "Preferences": a small _sub-window_ shows up.

In _every_ folder you will find a `contrib.md` file with more detailed information about what is going on in that folder, but as a general guide:
- `/dist` You can ignore this folder, it is what electron actually loads but it is auto-generated
- `/src` This is where the actual functionality and looks are. SASS and Jade support is implemented
- `/tests` Mocha tests towards everything. The more tests the better
- `/tools` Builders that take files from `/src` and _compile_ onto `/dist`. Tip: `gulp watch`

To store settings and other internal data we use [PouchDB](http://pouchdb.com), which is implemented in the vogula.db object.

We favor promises over callbacks