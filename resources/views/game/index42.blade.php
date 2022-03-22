<!DOCTYPE html>
<html>

<head>
    <title>LUCKY LEPRECHAUN</title>
    <link rel="stylesheet" href="games/game42/css/reset.css" type="text/css">
    <link rel="stylesheet" href="games/game42/css/main.css" type="text/css">
    <link rel="stylesheet" href="games/game42/css/ios_fullscreen.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='./games/game42/favicon.ico' />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />


    <script type="text/javascript" src="games/game42/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="games/game42/js/createjs.min.js"></script>
    <script type="text/javascript" src="games/game42/js/howler.min.js"></script>
    <script type="text/javascript" src="games/game42/js/screenfull.js"></script>
    <script type="text/javascript" src="games/game42/js/platform.js"></script>
    <script type="text/javascript" src="games/game42/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="games/game42/js/ctl_utils.js"></script>
    <script type="text/javascript" src="games/game42/js/sprite_lib.js"></script>
    <script type="text/javascript" src="games/game42/js/settings.js"></script>
    <script type="text/javascript" src="games/game42/js/CLang.min.js"></script>
    <script type="text/javascript" src="games/game42/js/CPreloader.js"></script>
    <script type="text/javascript" src="games/game42/js/CMain.js"></script>
    <script type="text/javascript" src="games/game42/js/CTextButton.js"></script>
    <script type="text/javascript" src="games/game42/js/CToggle.js"></script>
    <script type="text/javascript" src="games/game42/js/CGfxButton.js"></script>
    <script type="text/javascript" src="games/game42/js/CMenu.js"></script>
    <script type="text/javascript" src="games/game42/js/CGame.js"></script>
    <script type="text/javascript" src="games/game42/js/CInterface.js"></script>
    <script type="text/javascript" src="games/game42/js/CGameOverPanel.js"></script>
    <script type="text/javascript" src="games/game42/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="games/game42/js/CAreYouSurePanel.js"></script>
    <script type="text/javascript" src="games/game42/js/CCTLText.js"></script>
    <script type="text/javascript" src="games/game42/js/CGUIExpandible.js"></script>
    <script type="text/javascript" src="games/game42/js/CHelpPanel.js"></script>
    <script type="text/javascript" src="games/game42/js/CGridCell.js"></script>
    <script type="text/javascript" src="games/game42/js/CBoard.js"></script>
    <script type="text/javascript" src="games/game42/js/CTopGUI.js"></script>
    <script type="text/javascript" src="games/game42/js/CNextCardPanel.js"></script>
    <script type="text/javascript" src="games/game42/js/CPaytable.js"></script>

</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 41
            }, function(t) {
                load(t);
            })

            function load(t) {
                var oMain = new CMain({
                    win_occurence: JSON.parse(t.game[0]['win']), //WIN OCCURRENCE 
                    occurrence_per_prizes: [30, 20, 16, 10, 8, 7, 5, 3, 1], //WIN OCCURRENCE FOR EACH PRIZE
                    paytable_prizes: [1, 2, 5, 10, 20, 50, 100, 500, 1000], //ALL POSSIBLE PRIZES
                    num_cards: 3, //NUMBER OF CARDS TO SCRATCH
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    fullscreen: true //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
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

                $(oMain).on("prize_won", function(evt, iWinPrize) {
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
        <p class="check-font-1">1</p>
        <p class="check-font-2">2</p>
    </div>

    <canvas id="canvas" class='ani_hack' width="1920" height="1920"> </canvas>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>

</body>

</html>