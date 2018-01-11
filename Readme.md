# Libase

This is a humble attempt at creating a chess database manager that is cross platform and easy to build upon.

Functionality is intentionally kept to a minimum with the following goals:
- Able to open large databases efficiently:
    - The UI must remain responsive
    - The database may be larger than 2GBs
- Able to filter games in a database
    - Filters by:
        - Date range
        - Result
        - ECO code
        - White rating
        - Black rating
        - Rating average
        - Specific position
- Able to export games to another database
- Able to view games
- Able to annotate games
    - Draw arrows
    - Draw circles
    - Write comments before and after a move
    - Save game with annotation
- Able to use a chess engine for analysis

This is the set of features that will mark the release of version 1.0. At this point we are still building the foundation (navigation) but if you are interested in this project and wish to contribute please look at the [contrib file](contrib.md)