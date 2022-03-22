<!DOCTYPE html>
<html>


<head>
    <title></title>
    <link rel="stylesheet" href="games/game44/css/reset.css" type="text/css">
    <link rel="stylesheet" href="games/game44/css/main.css" type="text/css">
    <link rel="stylesheet" href="games/game44/css/orientation_utils.css" type="text/css">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />

    <script type="text/javascript" src="games/game44/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="games/game44/js/createjs-2015.11.26.min.js"></script>
    <script type="text/javascript" src="games/game44/js/howler.min.js"></script>
    <script type="text/javascript" src="games/game44/js/screenfull.js"></script>
    <script type="text/javascript" src="games/game44/js/ctl_utils.js"></script>
    <script type="text/javascript" src="games/game44/js/sprite_lib.js"></script>
    <script type="text/javascript" src="games/game44/js/settings.js"></script>
    <script type="text/javascript" src="games/game44/js/CRouletteSettings.js"></script>
    <script type="text/javascript" src="games/game44/js/CFichesController.js"></script>
    <script type="text/javascript" src="games/game44/js/CLang.js"></script>
    <script type="text/javascript" src="games/game44/js/CPreloader.js"></script>
    <script type="text/javascript" src="games/game44/js/CMain.js"></script>
    <script type="text/javascript" src="games/game44/js/CTextButton.js"></script>
    <script type="text/javascript" src="games/game44/js/CGfxButton.js"></script>
    <script type="text/javascript" src="games/game44/js/CFicheBut.js"></script>
    <script type="text/javascript" src="games/game44/js/CBetTableButton.js"></script>
    <script type="text/javascript" src="games/game44/js/CToggle.js"></script>
    <script type="text/javascript" src="games/game44/js/CMenu.js"></script>
    <script type="text/javascript" src="games/game44/js/CGame.js"></script>
    <script type="text/javascript" src="games/game44/js/CInterface.js"></script>
    <script type="text/javascript" src="games/game44/js/CMsgBox.js"></script>
    <script type="text/javascript" src="games/game44/js/CTweenController.js"></script>
    <script type="text/javascript" src="games/game44/js/CSeat.js"></script>
    <script type="text/javascript" src="games/game44/js/CTableController.js"></script>
    <script type="text/javascript" src="games/game44/js/CEnlight.js"></script>
    <script type="text/javascript" src="games/game44/js/CFiche.js"></script>
    <script type="text/javascript" src="games/game44/js/CHistoryRow.js"></script>
    <script type="text/javascript" src="games/game44/js/CWheelAnim.js"></script>
    <script type="text/javascript" src="games/game44/js/CFinalBetPanel.js"></script>
    <script type="text/javascript" src="games/game44/js/CNeighborsPanel.js"></script>
    <script type="text/javascript" src="games/game44/js/CGameOver.js"></script>
    <script type="text/javascript" src="games/game44/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="games/game44/js/CHistory.js"></script>
    <script type="text/javascript" src="games/game44/js/CRollingTextController.js"></script>

</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 44
            }, function(t) {
                load(t);
            })

            function load(t) {
                var oMain = new CMain({
                    money: JSON.parse(t.data[0]['amount']), //STARING CREDIT FOR THE USER
                    min_bet: JSON.parse(t.game[0]['minbet']), //MINIMUM COIN FOR BET
                    max_bet: JSON.parse(t.game[0]['maxbet']),
                    time_bet: 0, //TIME TO WAIT FOR A BET IN MILLISECONDS. SET 0 IF YOU DON'T WANT BET LIMIT
                    time_winner: 1500, //TIME FOR WINNER SHOWING IN MILLISECONDS    
                    win_occurrence: JSON.parse(t.game[0]['win']), //Win occurrence percentage (100 = always win if there is enough cash). 
                    //SET THIS VALUE TO -1 IF YOU WANT WIN OCCURRENCE STRICTLY RELATED TO PLAYER BET ( SEE DOCUMENTATION)
                    casino_cash: 1000, //The starting casino cash that is recharged by the money lost by the user
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT 
                    show_credits: true, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
                    num_hand_before_ads: 10 //NUMBER OF HANDS PLAYED BEFORE AD SHOWN
                    //
                    //// THIS FUNCTIONALITY IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN.///////////////////////////
                    /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
                    // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421 ///////////
                });


                $(oMain).on("recharge", function(evt) {
                    //alert("recharge");
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
    <canvas id="canvas" class='ani_hack' width="1280" height="768"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>
</body>

</html>