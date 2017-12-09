
# Structure Organization of this folder
There is a global object called `vogula` (lower case). The API is described at the end of this document

This folder is only intended for development of the core Vogula app and contains only files required for .
If you are developing a plug-in please read _another doc_
In other words: Do not put your vendor files here

## The Plugin System

A separate document will be written at a later time, for now the idea is to have plugins reside in $HOME/.vogula/plugins/<vendor>/<product>


## Vogula API

This API is to be used for the internal modules and the plug-ins, it is provided as a "high level" API, meaning you shouldn't interact with the database object directly but instead do something like `vogula.settings.get(...)`, consequently the API is catalogued per module and all modules are named in **singular**
All of the methods return a promise, we make use only of promises

### setting

The setting module

#### vogula.setting.get(<string>)

### menu
You can manipulate the application's menu:

