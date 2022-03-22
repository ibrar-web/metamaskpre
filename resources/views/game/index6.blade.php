<!DOCTYPE html>
<html>
	<head>
    	<meta charset="UTF-8" />
		<title>Caribbean-Pirates</title>
		<link rel="stylesheet" href="game6/css/reset.css" type="text/css">
		<link rel="stylesheet" href="game6/css/style.css" type="text/css">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
		<meta name="msapplication-tap-highlight" content="no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Caribbean-Pirates">
		<script src="game6/lib/jquery.min.js" type="text/javascript"></script>
		<script src="game6/lib/jstorage.js" type="text/javascript"></script>
		<script src="game6/lib/phaser.min.js" type="text/javascript"></script>
		<script src="game6/src/config.js" type="text/javascript"></script>
		<script src="game6/src/game.js" type="text/javascript"></script>
	</head>
	<body>
	<meta name="csrf-token" content="{{ Session::token() }}"> 
		<div id="game"> </div>
	</body>
</html>