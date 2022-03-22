<!DOCTYPE html>
<html>

<head>
    <title>BACCARAT</title>
    <link rel="stylesheet" href="game2/css/reset.css" type="text/css">
    <link rel="stylesheet" href="game2/css/main.css" type="text/css">
    <link rel="stylesheet" href="game2/css/orientation_utils.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='./game2/favicon.ico' />
    <link rel="stylesheet" href="game2/css/ios_fullscreen.css" type="text/css">

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />

    <script type="text/javascript" src="game2/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="game2/js/createjs-2015.11.26.min.js"></script>
    <script type="text/javascript" src="game2/js/howler.min.js"></script>
    <script type="text/javascript" src="game2/js/screenfull.js"></script>
    <script type="text/javascript" src="game2/js/platform.js"></script>
    <script type="text/javascript" src="game2/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="game2/js/ctl_utils.js"></script>
    <script type="text/javascript" src="game2/js/sprite_lib.js"></script>
    <script type="text/javascript" src="game2/js/settings.js"></script>
    <script type="text/javascript" src="game2/js/CLang.js"></script>
    <script type="text/javascript" src="game2/js/CPreloader.js"></script>
    <script type="text/javascript" src="game2/js/CMain.js"></script>
    <script type="text/javascript" src="game2/js/CTextButton.js"></script>
    <script type="text/javascript" src="game2/js/CGfxButton.js"></script>
    <script type="text/javascript" src="game2/js/CGuiButton.js"></script>
    <script type="text/javascript" src="game2/js/CToggle.js"></script>
    <script type="text/javascript" src="game2/js/CMenu.js"></script>
    <script type="text/javascript" src="game2/js/CGame.js"></script>
    <script type="text/javascript" src="game2/js/CInterface.js"></script>
    <script type="text/javascript" src="game2/js/CTweenController.js"></script>
    <script type="text/javascript" src="game2/js/CSeat.js"></script>
    <script type="text/javascript" src="game2/js/CFichesController.js"></script>
    <script type="text/javascript" src="game2/js/CVector2.js"></script>
    <script type="text/javascript" src="game2/js/CGameSettings.js"></script>
    <script type="text/javascript" src="game2/js/CEasing.js"></script>
    <script type="text/javascript" src="game2/js/CCard.js"></script>
    <script type="text/javascript" src="game2/js/CGameOver.js"></script>
    <script type="text/javascript" src="game2/js/CWinDisplay.js"></script>
    <script type="text/javascript" src="game2/js/CHistory.js"></script>
    <script type="text/javascript" src="game2/js/CHistoryRow.js"></script>
    <script type="text/javascript" src="game2/js/CMsgBox.js"></script>
    <script type="text/javascript" src="game2/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="game2/js/CCTLText.js"></script>
    <script type="text/javascript" src="game2/js/CFiche.js"></script>
</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 2
            }, function(t) {
                load(t);
            });
           

            function load(t) {
                var oMain = new CMain({
                    win_occurrence: JSON.parse(t.game[0]['win']), //WIN OCCURRENCE PERCENTAGE. VALUES BETWEEN 0-100
                    bet_occurrence: [ //IF PLAYER MUST WIN CURRENT HAND AND THERE ARE MULTIPLE BETS:
                        //WARNING: DON'T SET ANY OF THESE VALUES AT 100.
                        20, //OCCURRENCE FOR TIE BET
                        30, //OCCURRENCE FOR BANKER BET
                        50 //OCCURRENCE FOR PLAYER BET
                    ],
                    min_bet: JSON.parse(t.game[0]['minbet']), //MINIMUM COIN FOR BET
                    max_bet: JSON.parse(t.game[0]['maxbet']),
                    multiplier: [ //MULTIPLIER FOR EACH BET
                        8, //MULTIPLIER FOR TIE: PAYS 8 TO 1
                        1.95, //MULTIPLIER FOR BANKER: PAYS 1.95 TO 1
                        2 //MULTIPLIER FOR PLAYER: PAYS 2 TO 1
                    ],
                    money: JSON.parse(t.data[0]['amount']), //STARING CREDIT FOR THE USER
                    game_cash: 100, //GAME CASH AVAILABLE WHEN GAME STARTS
                    time_show_hand: 2500, //TIME (IN MILLISECONDS) SHOWING LAST HAND
                    show_credits: true, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 

                    //////////////////////////////////////////////////////////////////////////////////////////
                    ad_show_counter: 10 //NUMBER OF HANDS PLAYED BEFORE AD SHOWN
                    //
                    //// THIS FUNCTIONALITY IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN.///////////////////////////
                    /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
                    // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421 ///////////
                });



                $(oMain).on("recharge", function(evt) {
                    //INSERT HERE YOUR RECHARGE SCRIPT THAT RETURN MONEY TO RECHARGE
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

                $(oMain).on("clear_bet", function(evt, iTotBet) {
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("bet_placed", function(evt, iTotBet) {
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

    <div class="check-fonts">
        <p class="check-font-1">test 1</p>
        <p class="check-font-2">test 2</p>
    </div>

    <canvas id="canvas" class='ani_hack' width="1700" height="768"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>
</body>

</html>