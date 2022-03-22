<!DOCTYPE html>
<html>

<head>
    <title>3D Roulette</title>
    <link rel="stylesheet" href="games/game29/css/reset.css" type="text/css">
    <link rel="stylesheet" href="games/game29/css/main.css" type="text/css">
    <link rel="stylesheet" href="games/game29/css/orientation_utils.css" type="text/css">
    <link rel="stylesheet" href="games/game29/css/ios_fullscreen.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='./games/game29/favicon.ico' />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />



</head>

<body ondragstart="return false;" ondrop="return false;">

    <meta name="csrf-token" content="{{ Session::token() }}">
    <script type="text/javascript" src="games/game29/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="games/game29/js/createjs-2015.11.26.min.js"></script>
    <script type="text/javascript" src="games/game29/js/howler.min.js"></script>
    <script type="text/javascript" src="games/game29/js/screenfull.js"></script>
    <script type="text/javascript" src="games/game29/js/platform.js"></script>
    <script type="text/javascript" src="games/game29/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="games/game29/js/ctl_utils.js"></script>
    <script type="text/javascript" src="games/game29/js/sprite_lib.js"></script>
    <script type="text/javascript" src="games/game29/js/settings.js"></script>
    <script type="text/javascript" src="games/game29/js/CRouletteSettings.js"></script>
    <script type="text/javascript" src="games/game29/js/CFichesController.js"></script>
    <script type="text/javascript" src="games/game29/js/CLang.js"></script>
    <script type="text/javascript" src="games/game29/js/CPreloader.js"></script>
    <script type="text/javascript" src="games/game29/js/CMain.js"></script>
    <script type="text/javascript" src="games/game29/js/CTextButton.js"></script>
    <script type="text/javascript" src="games/game29/js/CGfxButton.js"></script>
    <script type="text/javascript" src="games/game29/js/CFicheBut.js"></script>
    <script type="text/javascript" src="games/game29/js/CBetTableButton.js"></script>
    <script type="text/javascript" src="games/game29/js/CBetTextButton.js"></script>
    <script type="text/javascript" src="games/game29/js/CToggle.js"></script>
    <script type="text/javascript" src="games/game29/js/CMenu.js"></script>
    <script type="text/javascript" src="games/game29/js/CGame.js"></script>
    <script type="text/javascript" src="games/game29/js/CInterface.js"></script>
    <script type="text/javascript" src="games/game29/js/CMsgBox.js"></script>
    <script type="text/javascript" src="games/game29/js/CTweenController.js"></script>
    <script type="text/javascript" src="games/game29/js/CSeat.js"></script>
    <script type="text/javascript" src="games/game29/js/CTableController.js"></script>
    <script type="text/javascript" src="games/game29/js/CEnlight.js"></script>
    <script type="text/javascript" src="games/game29/js/CWheelTopAnim.js"></script>
    <script type="text/javascript" src="games/game29/js/CFiche.js"></script>
    <script type="text/javascript" src="games/game29/js/CHistoryRow.js"></script>
    <script type="text/javascript" src="games/game29/js/CWheelAnim.js"></script>
    <script type="text/javascript" src="games/game29/js/CFinalBetPanel.js"></script>
    <script type="text/javascript" src="games/game29/js/CNeighborsPanel.js"></script>
    <script type="text/javascript" src="games/game29/js/CGameOver.js"></script>
    <script type="text/javascript" src="games/game29/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="games/game29/js/CCTLText.js"></script>
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 29
            }, function(t) {
                load(t);
            });

            function load(t) {
                var oMain = new CMain({
                    money: JSON.parse(t.data[0]['amount']), //STARING CREDIT FOR THE USER
                    min_bet: JSON.parse(t.game[0]['minbet']), //MINIMUM COIN FOR BET
                    max_bet: JSON.parse(t.game[0]['maxbet']),
                    time_bet: 0, //TIME TO WAIT FOR A BET IN MILLISECONDS. SET 0 IF YOU DON'T WANT BET LIMIT
                    time_winner: 3000, //TIME FOR WINNER SHOWING IN MILLISECONDS    
                    win_occurrence: JSON.parse(t.game[0]['win']), //Win occurrence percentage (100 = always win). 
                    //SET THIS VALUE TO -1 IF YOU WANT WIN OCCURRENCE STRICTLY RELATED TO PLAYER BET ( SEE DOCUMENTATION)
                    casino_cash: 4000, //The starting casino cash that is recharged by the money lost by the user
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    show_credits: true, //SET THIS VALUE TO FALSE IF YOU DON'T TO SHOW CREDITS BUTTON
                    num_hand_before_ads: 10 //NUMBER OF HANDS TO COMPLETE, BEFORE TRIGGERING SAVE_SCORE EVENT. USEFUL FOR INTER-LEVEL AD EVENTUALLY.
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

                $(oMain).on("bet_placed", function(evt, iTotBet) {
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("save_score", function(evt, iMoney, iWin) {
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

                $(oMain).on("share_event", function(evt, iMoney) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShareEvent({
                            img: "200x200.jpg",
                            title: TEXT_CONGRATULATIONS,
                            msg: TEXT_SHARE_1 + iMoney + TEXT_SHARE_2,
                            msg_share: TEXT_SHARE_3 + iMoney + TEXT_SHARE_4
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


    <canvas id="canvas" class='ani_hack' width="750" height="600"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>
</body>

</html>