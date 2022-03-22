<!DOCTYPE html>
<html>

<head>
    <title>GOLF SOLITAIRE</title>
    <link rel="stylesheet" href="game15/css/reset.css" type="text/css">
    <link rel="stylesheet" href="game15/css/main.css" type="text/css">
    <link rel="stylesheet" href="game15/css/orientation_utils.css" type="text/css">
    <link rel="stylesheet" href="game15/css/ios_fullscreen.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='./game15/favicon.ico' />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />

    <script type="text/javascript" src="game15/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="game15/js/createjs.min.js"></script>
    <script type="text/javascript" src="game15/js/howler.min.js"></script>
    <script type="text/javascript" src="game15/js/screenfull.min.js"></script>
    <script type="text/javascript" src="game15/js/platform.js"></script>
    <script type="text/javascript" src="game15/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="game15/js/ctl_utils.js"></script>
    <script type="text/javascript" src="game15/js/sprite_lib.js"></script>
    <script type="text/javascript" src="game15/js/settings.js"></script>
    <script type="text/javascript" src="game15/js/CGameSettings.js"></script>
    <script type="text/javascript" src="game15/js/CLang.js"></script>
    <script type="text/javascript" src="game15/js/CPreloader.js"></script>
    <script type="text/javascript" src="game15/js/CMain.js"></script>
    <script type="text/javascript" src="game15/js/CToggle.js"></script>
    <script type="text/javascript" src="game15/js/CGfxButton.js"></script>
    <script type="text/javascript" src="game15/js/CMenu.js"></script>
    <script type="text/javascript" src="game15/js/CGame.js"></script>
    <script type="text/javascript" src="game15/js/CInterface.js"></script>
    <script type="text/javascript" src="game15/js/CEndPanel.js"></script>
    <script type="text/javascript" src="game15/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="game15/js/CAreYouSurePanel.js"></script>
    <script type="text/javascript" src="game15/js/CCard.js"></script>
    <script type="text/javascript" src="game15/js/CVector2.js"></script>
    <script type="text/javascript" src="game15/js/CEasing.js"></script>
    <script type="text/javascript" src="game15/js/CHelpPanel.js"></script>
    <script type="text/javascript" src="game15/js/CScoreText.js"></script>
    <script type="text/javascript" src="game15/js/CCTLText.js"></script>
    <script type="text/javascript" src="game15/js/CButMode.js"></script>
    <script type="text/javascript" src="game15/js/CChooseModePanel.js"></script>
</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">

    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 15
            }, function(t) {
                load(t);
            });

            function load(t) {
                var oMain = new CMain({
                    num_turn_pile: 3, //NUMBER OF AVAILABLE SCROLLING OF THE DECK OF CARDS
                    card_score: 5, //POINT TO ASSIGN FOR A MATCHING
                    score_per_row: [500, 250, 150, 100, 75, 50, 25], //BONUS SCORE TO ASSIGN WHEN ALL CARDS IN A ROW ARE REMOVED. FROM THE FIRST ROW (THE TOP OF PYRAMID) TO THE LAST ONE (THE BASE OF PYRAMID)
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                });

                $(oMain).on("start_session", function(evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeStartSession();
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("end_session", function(evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeEndSession();
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("save_score", function(evt, iScore) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeSaveScore({
                            score: iScore
                        });
                        console.log("save_score: " + iScore);
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("show_interlevel_ad", function(evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShowInterlevelAD();
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("share_event", function(evt, iScore) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShareEvent({
                            img: TEXT_SHARE_IMAGE,
                            title: TEXT_SHARE_TITLE,
                            msg: TEXT_SHARE_MSG1 + iScore + TEXT_SHARE_MSG2,
                            msg_share: TEXT_SHARE_SHARE1 + iScore + TEXT_SHARE_SHARE1
                        });
                        console.log("share_event " + iScore);
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                if (isIOS()) {
                    setTimeout(function() {
                        sizeHandler();
                    }, 200);
                } else {
                    sizeHandler();
                }
            }
        });
    </script>

    <div class="check-fonts">
        <p class="check-font-1">arialrounded</p>
    </div>

    <canvas id="canvas" class='ani_hack' width="1360" height="640"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>

</body>

</html>