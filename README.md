# Pokemon-Jay
Pokemon-Jay README.md

This is a simple HTML JavaScript game I wrote as a gift for a friend on his fiftieth birthday. 

The live version of this game is here: http://frostbackcrow.com/pokemon-jay/

The game is handwritten by me ( Percy Tierney ) in HTML 5 and JavaScript and doesn’t use any third party libraries (not that there’s anything wrong with that – I just wanted to write it all myself).

There are four html webpages, the start ( Index.html ), the gameboard ( startgame.html ), and two pages for a win or lose ("youwin.html", "youlose.html"). Each of these pages are minimal. There is a stylesheet in the css folder for all the pages.

INDEX.HMTL – This has a simple graphic (the family on an outing), a brief text intro and a “Start” button, which navigates to the next page.
STARTGAME.HTML – There is a canvas and a hidden audio player. The JavaScript game script is automatically loaded and run. 
YOUWIN.HTML, YOULOSE.HTML – At the end of the game, the score is tallied and one of these pages is launched with the score passed in as parameters. Win / Lose each have a graphic and display the score. There is also a button to “Play Again”.

The game has a set of audio files, which are randomly played at each level. There are also backgrounds for the gameboard canvas, also randomly loaded for each level. The JavaScript game file stores the last used audio/image so you don’t get two in a row. 
In addition to the backgrounds, the img folder also has images for the player (“suzie”), the opponent (“jay”) and two family members (“delany” and “Jerrick”). 

All the action takes place in the JavaScript code, js\game.js. There are tons of comments within, so I’ll just go over the high level stuff.
In this game, you control the “player”, a medium size image. There is the “opponent”, a large image, and one or more small images, the “family”. Your job is to collide the player with each family, which scores a point and removes that family from play. If the opponent collides with a family, the opponent gets a point and the family is removed from play. If the opponent collides with the player, the opponent gets a point and the next level is started. The next level is also started when all the family are removed from play. 

The opponent and family start with a random direction and speed and will “bounce” off the edge of the canvas. The player is indirectly controlled – that image will move in the direction of the pointer – mouse or touch. Each of the five levels takes about a minute or less to play.
The window.requestAnimationFrame() is used to get callbacks for moving the game images. 

BUGS
Audio doesn’t play on Android or iPhones because they don’t support auto-play for audio.
On all phones, the “player” character has problems with touch, and generally the phone experience is not recommended.
On tablets (tested on Android and Windows), touch works fine. The best experience is on the desktop.
