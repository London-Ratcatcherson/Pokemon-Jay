function playGame() {
	

	// Globals
	var win = false;		// nextLevel(), main()
	var monstersCaught = 0; // nextLevel(), render()
	var keysDown = {}; 		// setupKeys(), update() 


	// 8 songs
	var songList = [
		"audio/01 Bombay 405 Miles.mp3",
		"audio/12 Fear of a Brown Planet.mp3",
		"audio/03 Secret Agent Man Theme.mp3",
		"audio/06 The Man From U.N.C.L.E Theme.mp3",
		"audio/12 The Saint Theme.mp3",
		"audio/15 The Avengers Theme.mp3",
		"audio/16 Get Smart Theme.mp3",
		"audio/15 Swami Safari.mp3"
	];
	var song = new Audio();
	var songIndex = 0;

	// 12 faces
	var playerFaces = [
		"img/suzie1.png", 
		"img/suzie2.png", 
		"img/suzie3.png", 
		"img/suzie4.png", 
		"img/delaney1.png", 
		"img/delaney2.png", 
		"img/delaney3.png", 
		"img/delaney4.png", 
		"img/jerrick1.png", 
		"img/jerrick2.png", 
		"img/jerrick3.png", 
		"img/jerrick4.png" 
		];
	var player = {
		height: 64,
		width: 48,
		speed: 4, // movement in pixels per second
		index: 0, // last face index
		x: 0,
		y: 0,
		dX: 0,
		dY: 0,
		vX: 0,
		vY: 0
	};
	// player image
	var playerReady = false;
	var playerImage = new Image();
	playerImage.onload = function () {
		playerReady = true;
		debugWrite("player.onload");
	};

	// 8 faces
	var monsterFaces = [
			"img/jay1.png", 
			"img/jay2.png", 
			"img/jay3.png", 
			"img/jay4.png", 
			"img/jay5.png", 
			"img/jay6.png", 
			"img/jay7.png", 
			"img/jay8.png"
			];
	var monster = {
		height: 64,
		width: 48,
		speed: 16, // movement in pixels per second
		index: 0,
		x: 0,
		y: 0,
		dX: 0,
		dY: 0
	};
	// Monster image
	var monsterReady = false;
	var monsterImage = new Image();
	monsterImage.onload = function () {
		monsterReady = true;
		debugWrite("monster.onload");
	};



	// Returns a random integer between min (inclusive) and max (exclusive)
	function getRandomArbitrary(min, max) {
		var index = Math.random() * (max - min) + min;
		return index.toFixed(0);
	}

	// debug log
	var debug = false;
	var debugLog = ["No comment"];
	function debugWrite(s) {
		debugLog.push(s);
	}
	function debugRead() {
		return debugLog[debugLog.length -1];
	}


	// One time game setup
	function setupGame() {

		// Prepare play area 
		var canvas = document.getElementById("canvasGameId");
		var ctx = canvas.getContext("2d");
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// Set timer so resize events can accumulate before resetting the game 
		var timer_id = undefined;
		window.addEventListener("resize", function(e) {
			if (timer_id != undefined) {
				clearTimeout(timer_id);
				timer_id = undefined;
			}
			timer_id = setTimeout(function() {
				timer_id = undefined;
				resizeCallback()
			}, 1500);
		}, false);

		// Keyboard ui (attached to window)
		window.addEventListener("keydown", function (e) {
			keysDown[e.keyCode] = true;
		}, false);
		window.addEventListener("keyup", function (e) {
			delete keysDown[e.keyCode];
		}, false);

		// Mouse ui (attached to canvas)
		// Mouse / touch change player acceleration.
		// If the pointer x/y position is the left/top of the player 
		//   top left corner, acceleration change flag is set to 
		//   decrease.
		// If the pointer x/y position is the right/bottom of the player 
		//   top left corner, acceleration change flag is set to 
		//   increase.
		
		// The acceleration is added in function update()
		//			
		canvas.addEventListener("mousemove", function(e) {
			if (e.clientX > player.x) 
			{
				player.vX = 1;
			}
			if (e.clientX < player.x) 
			{
				player.vX = -1;
			}
			if (e.clientY > player.y) 
			{
				player.vY = 1;
			}
			if (e.clientY < player.y) 
			{
				player.vY = -1;
			}
		}, false);

		// Touch ui (attached to canvas)
		canvas.addEventListener("touchmove", function(e) {
			e.preventDefault();
			if (e.clientX > player.x) 
			{
				player.vX = 1;
			}
			if (e.clientX < player.x) 
			{
				player.vX = -1;
			}
			if (e.clientY > player.y) 
			{
				player.vY = 1;
			}
			if (e.clientY < player.y) 
			{
				player.vY = -1;
			}
			// If you just want to put the client under the users pointer,
			//   use these instead
			// player.x = e.clientX;
			// player.y = e.clientY;
		}, false);
	} // function setupGame()

	// Resize triggers the next level
	function resizeCallback() {
		nextLevel();
	}

	// Check for player win, else start the next game level
	function nextLevel() {
		song.pause();
		if (8 < ++monstersCaught) {
			// You win!
			win = true;
		} else {
			// Keep playing
			reset();
		}
	}

	// Reset the game when the player catches a monster
	var reset = function () {

		// Reset canvas dimensions in case of resize / rotation
		var canvas = document.getElementById("canvasGameId");
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;
		
		// Setup the player in the middle of the canvas
		player.x = canvas.width / 2;
		player.y = canvas.height / 2;

		// New Monster, player faces, new music
		var index;
		do {
			index = getRandomArbitrary(0, 8);
		} while  ((index == monster.index) || (index > 7));
		monster.index = index;
		monsterImage.src = monsterFaces[index];
		do {
			index = getRandomArbitrary(0, 12);
		} while  ((index == player.index) || (index > 11));
		player.index = index;
		playerImage.src = playerFaces[index];
		player.dX = 0;
		player.dY = 0;
		do {
			index = getRandomArbitrary(0, 8);
		} while  ((index == songIndex) || (index > 7));
		songIndex = index;
		song.src = songList[index];

		// Throw the monster somewhere on the screen randomly
		var x  = monster.width + (Math.random() * (canvas.width - (monster.width * 2)));
		monster.x = Math.round(x);
		var y = monster.height + (Math.random() * (canvas.height - (monster.height * 2)));
		monster.y = Math.round(y);
		// Set monster velocity
		var z;
		do {
			z = Math.round(getRandomArbitrary(-2, 2));
		} while (z == 0);
		monster.dX = z;
		do {
			z = Math.round(getRandomArbitrary(-2, 2));
		} while (z == 0);
		monster.dY = z;

		song.play();
	};

	// Update game objects
	var update = function (modifier) {
		var canvas = document.getElementById("canvasGameId");

		// Move player
		// First, update the x/y velocity
		if (38 in keysDown) { // Player holding up
			player.dY -= player.speed * modifier;
		}
		if (40 in keysDown) { // Player holding down
			player.dY += player.speed * modifier;
		}
		if (37 in keysDown) { // Player holding left
			player.dX -= player.speed * modifier;
		}
		if (39 in keysDown) { // Player holding right
			player.dX += player.speed * modifier;
		}
		// Mouse / touch moves
		if (player.vY == 1)
		{
			player.dY += player.speed * modifier;
		}
		if (player.vY == -1)
		{
			player.dY -= player.speed * modifier;
		}
		if (player.vX == 1)
		{
			player.dX += player.speed * modifier;
		}
		if (player.vX == -1)
		{
			player.dX -= player.speed * modifier;
		}
		// Second, update the player position with the new delta
		player.x += player.dX;
		player.y += player.dY;

		// Collision checks
		// Has player hit a wall?
		if (0 > player.x){ 
			player.dX *= -1;
			player.x = 0;
		}
		if (canvas.width < player.x + player.width){ 
			player.dX *= -1;
			player.x = canvas.width - player.width;
		}
		if (0 > player.y ){
			player.dY *= -1;
			player.y = 0;
		}
		if (canvas.height < player.y + player.height){
			player.dY *= -1;
			player.y = canvas.height - player.height;
		}

		// Move monster
		monster.x += monster.dX;
		monster.y += monster.dY;
		
		// If monster hits wall, bounce
		if ((0 > monster.x) || (canvas.width < monster.x + monster.width)){ 
			monster.dX *= -1;
		}
		if ((0 > monster.y ) || (canvas.height < monster.y + monster.width)){
			monster.dY *= -1;
		}

		// Are they touching?
		if (
			player.x <= (monster.x + player.width)
			&& monster.x <= (player.x + monster.width)
			&& player.y <= (monster.y + player.height)
			&& monster.y <= (player.y + monster.height)
		) {
			nextLevel();
		}
	};

	// Draw everything
	var render = function () {
		var canvas = document.getElementById("canvasGameId");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "rgb(0, 204, 0)";
		ctx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
		ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);

		if (playerReady) {
			ctx.drawImage(playerImage, player.x, player.y);
		}

		if (monsterReady) {
			ctx.drawImage(monsterImage, monster.x, monster.y);
		}

		// Score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText(monstersCaught + " Pokemon-Jay's caught!", 32, 32);

		// Debuglog
		if (debug) {
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "16px Helvetica";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText(debugRead(), 32, canvas.height -32);
		}
	};

	// The main game loop
	var main = function () {
		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
		render();

		then = now;

		// Request to do this again ASAP
		var animationThread = requestAnimationFrame(main);
		
		// Stop if we have won
		if (win) {
			cancelAnimationFrame(animationThread);
			location.href = "youwin.html";
		}
		
	};

	// Cross-browser support for requestAnimationFrame
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

	// Let's play this game!
	var then = Date.now();
	setupGame();
	reset();
	main();

}

