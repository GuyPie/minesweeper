# Minesweeper

GitHub page: https://guypie.github.io/minesweeper/

## Known issues:

* Not nearly enough tests, it was under bonus tasks so I cut myself some slack there. The few existing tests can be run with 'npm test'.
* Scrolling quickly in large grids looks choppy, due to the windowing of the game grid.
* There can be a delay after clicking on a cell in large grids, although I did spend time optimizing it. For some reason it runs much faster on Chrome than on Firefox.
* Usage of CSS is inconsistent, I use React UI's CSS utilities is some place and CSS files in others.

## Notes

I keep the current app state in local storage, this wasn't in the requirements but I noticed the example minesweeper does the same. I also consider it a win if the number of uncleared and unflagged cells is equal to the remaing flags count.
