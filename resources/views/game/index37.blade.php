<!DOCTYPE html>
<html>

<head>
    <title>red dog</title>
    <link rel="stylesheet" href="games/game37/css/reset.css" type="text/css">
    <link rel="stylesheet" href="games/game37/css/main.css" type="text/css">
    <link rel="stylesheet" href="games/game37/css/orientation_utils.css" type="text/css">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />

    <script type="text/javascript" src="games/game37/js/jquery-2.0.3.min.js"></script>
    <script type="text/javascript" src="games/game37/js/createjs-2013.12.12.min.js"></script>
    <script type="text/javascript" src="games/game37/js/ctl_utils.js"></script>
    <script type="text/javascript" src="games/game37/js/sprite_lib.js"></script>
    <script type="text/javascript" src="games/game37/js/settings.js"></script>
    <script type="text/javascript" src="games/game37/js/CLang.js"></script>
    <script type="text/javascript" src="games/game37/js/CPreloader.js"></script>
    <script type="text/javascript" src="games/game37/js/CMain.js"></script>
    <script type="text/javascript" src="games/game37/js/CTextButton.js"></script>
    <script type="text/javascript" src="games/game37/js/CGfxButton.js"></script>
    <script type="text/javascript" src="games/game37/js/CToggle.js"></script>
    <script type="text/javascript" src="games/game37/js/CMenu.js"></script>
    <script type="text/javascript" src="games/game37/js/CGame.js"></script>
    <script type="text/javascript" src="games/game37/js/CInterface.js"></script>
    <script type="text/javascript" src="games/game37/js/CTweenController.js"></script>
    <script type="text/javascript" src="games/game37/js/CSeat.js"></script>
    <script type="text/javascript" src="games/game37/js/CFichesController.js"></script>
    <script type="text/javascript" src="games/game37/js/CVector2.js"></script>
    <script type="text/javascript" src="games/game37/js/CGameSettings.js"></script>
    <script type="text/javascript" src="games/game37/js/CEasing.js"></script>
    <script type="text/javascript" src="games/game37/js/CCard.js"></script>
    <script type="text/javascript" src="games/game37/js/CGameOver.js"></script>
    <script type="text/javascript" src="games/game37/js/CMsgBox.js"></script>
    <script type="text/javascript" src="games/game37/js/CHandEvaluator.js"></script>
    <script type="text/javascript" src="games/game37/js/CAnimText.js"></script>
    <script type="text/javascript" src="games/game37/js/CPuck.js"></script>
    <script type="text/javascript" src="games/game37/js/CHelpCursor.js"></script>

</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 37
            }, function(t) {
                load(t);
            })
            function load(t) {
                var oMain = new CMain({
                    win_occurrence: JSON.parse(t.game[0]['win']), //WIN OCCURRENCE PERCENTAGE. VALUES BETWEEN 0-100
                    min_bet: JSON.parse(t.game[0]['minbet']), //MINIMUM COIN FOR BET
                    max_bet: JSON.parse(t.game[0]['maxbet']), //MAX BET PLAYABLE BY USER. 
                    money: JSON.parse(t.data[0]['amount']), //STARING CREDIT FOR THE USER
                    game_cash: 1500, //GAME CASH AVAILABLE WHEN GAME STARTS
                    payout: [
                        100, //MULTIPLIER FOR ROYAL FLUSH
                        50, //MULTIPLIER FOR STRAIGHT FLUSH
                        20, //MULTIPLIER FOR FOUR OF A KIND
                        7, //MULTIPLIER FOR FULL HOUSE
                        5, //MULTIPLIER FOR FLUSH
                        4, //MULTIPLIER FOR STRAIGHT
                        3, //MULTIPLIER FOR THREE OF A KIND
                        2, //MULTIPLIER FOR TWO PAIR  
                        1 //MULTIPLIER FOR ONE PAIR OR LESS
                    ],
                    progressive_bet: false, //SET THIS TRUE IF YOU WANT PROGRESSIVE ANTE BET BY DEFAULT
                    progressive_limit: 100, //LIMIT AMOUNT FOR PROGRESSIVE ANTE BET
                    time_show_hand: 1500, //TIME (IN MILLISECONDS) SHOWING LAST HAND
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    //////////////////////////////////////////////////////////////////////////////////////////
                    ad_show_counter: 10 //NUMBER OF HANDS PLAYED BEFORE AD SHOWN
                    //
                   });



                $(oMain).on("recharge", function(evt) {
                    alert("recharge");
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