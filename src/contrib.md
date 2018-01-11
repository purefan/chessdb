# Folder structure

We use MithrilJS, which means that every component contains the styling and functionality it needs.
With this in mind, we define "scenes" as a representation of a view, if you go to `/src/Scene` you will find the layout files, which define the starting point for the application.

To further explain, when you open the folder `/src/js/Scene` you have 2 sub-folders: `Content` and `Sidebar`, when you run the app the first thing you see is a _Sidebar_ navigation panel, and a main _Content_ panel next to it. If you open `/src/js/Scene/Sidebar` you will see the folders for each of the buttons that are found in the sidebar of the application
