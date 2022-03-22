<!DOCTYPE html>
<html>

<head>
    <title>PAI GOW POKER</title>
    <link rel="stylesheet" href="games/game25/css/reset.css" type="text/css">
    <link rel="stylesheet" href="games/game25/css/main.css" type="text/css">
    <link rel="stylesheet" href="games/game25/css/orientation_utils.css" type="text/css">
    <link rel="stylesheet" href="games/game25/css/ios_fullscreen.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='./games/game25/favicon.ico' />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />


</head>

<body ondragstart="return false;" ondrop="return false;">

    <meta name="csrf-token" content="{{ Session::token() }}">
    <script type="text/javascript" src="games/game25/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="games/game25/js/createjs.min.js"></script>
    <script type="text/javascript" src="games/game25/js/howler.min.js"></script>
    <script type="text/javascript" src="games/game25/js/screenfull.js"></script>
    <script type="text/javascript" src="games/game25/js/platform.js"></script>
    <script type="text/javascript" src="games/game25/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="games/game25/js/ctl_utils.js"></script>
    <script type="text/javascript" src="games/game25/js/sprite_lib.js"></script>
    <script type="text/javascript" src="games/game25/js/settings.js"></script>
    <script type="text/javascript" src="games/game25/js/CLang.js"></script>
    <script type="text/javascript" src="games/game25/js/CPreloader.js"></script>
    <script type="text/javascript" src="games/game25/js/CMain.js"></script>
    <script type="text/javascript" src="games/game25/js/CTextButton.js"></script>
    <script type="text/javascript" src="games/game25/js/CGfxButton.js"></script>
    <script type="text/javascript" src="games/game25/js/CToggle.js"></script>
    <script type="text/javascript" src="games/game25/js/CMenu.js"></script>
    <script type="text/javascript" src="games/game25/js/CGame.js"></script>
    <script type="text/javascript" src="games/game25/js/CInterface.js"></script>
    <script type="text/javascript" src="games/game25/js/CTweenController.js"></script>
    <script type="text/javascript" src="games/game25/js/CSeat.js"></script>
    <script type="text/javascript" src="games/game25/js/CFichesController.js"></script>
    <script type="text/javascript" src="games/game25/js/CVector2.js"></script>
    <script type="text/javascript" src="games/game25/js/CGameSettings.js"></script>
    <script type="text/javascript" src="games/game25/js/CEasing.js"></script>
    <script type="text/javascript" src="games/game25/js/CCard.js"></script>
    <script type="text/javascript" src="games/game25/js/CGameOver.js"></script>
    <script type="text/javascript" src="games/game25/js/CMsgBox.js"></script>
    <script type="text/javascript" src="games/game25/js/CHandEvaluator.js"></script>
    <script type="text/javascript" src="games/game25/js/CAnimText.js"></script>
    <script type="text/javascript" src="games/game25/js/CHelpCursor.js"></script>
    <script type="text/javascript" src="games/game25/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="games/game25/js/CFicheBut.js"></script>
    <script type="text/javascript" src="games/game25/js/CCTLText.js"></script>
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 25
            }, function(t) {
                load(t);
            });
            function load(t) {
                var oMain = new CMain({
                    win_occurrence: JSON.parse(t.game[0]['win']), //WIN OCCURRENCE PERCENTAGE. VALUES BETWEEN 0-100
                    min_bet: JSON.parse(t.game[0]['minbet']), //MINIMUM COIN FOR BET
                    max_bet: JSON.parse(t.game[0]['maxbet']),
                    money: JSON.parse(t.data[0]['amount']), //STARING CREDIT FOR THE USER
                    game_cash: 100, //GAME CASH AVAILABLE WHEN GAME STARTS
                    chip_values: [1, 5, 10, 25, 50, 100], //VALUE OF CHIPS
                    time_show_hand: 1500, //TIME (IN MILLISECONDS) SHOWING LAST HAND
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    show_credits: true, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    //////////////////////////////////////////////////////////////////////////////////////////
                    ad_show_counter: 10 //NUMBER OF HANDS PLAYED BEFORE AD SHOWN
                    //
                    //// THIS FUNCTIONALITY IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN.///////////////////////////
                    /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
                    // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421 ///////////
                });



                $(oMain).on("recharge", function(evt) {
               
                    if (s_oGame !== null) {
                        s_oGame.setMoney(0);
                    }
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

                $(oMain).on("bet_placed", function(evt, iTotBet) {
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("save_score", function(evt, iMoney) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeSaveScore({
                            score: iMoney
                        });
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
                    }
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



    <canvas id="canvas" class='ani_hack' width="1700" height="768"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>
</body>

</html>