<!DOCTYPE html>
<html>

<head>
    <title>SLOT TODDLE</title>
    <link rel="stylesheet" href="game17/css/reset.css" type="text/css">
    <link rel="stylesheet" href="game17/css/main.css" type="text/css">
    <link rel="stylesheet" href="game17/css/orientation_utils.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='.game17/favicon1.ico' />
    <link rel="stylesheet" href="game17/css/ios_fullscreen.css" type="text/css">

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />

    <script type="text/javascript" src="game17/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="game17/js/createjs.min.js"></script>
    <script type="text/javascript" src="game17/js/platform.js"></script>
    <script type="text/javascript" src="game17/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="game17/js/howler.min.js"></script>
    <script type="text/javascript" src="game17/js/screenfull.min.js"></script>
    <script type="text/javascript" src="game17/js/platform.js"></script>
    <script type="text/javascript" src="game17/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="game17/js/ctl_utils.js"></script>
    <script type="text/javascript" src="game17/js/sprite_lib.js"></script>
    <script type="text/javascript" src="game17/js/settings.js"></script>
    <script type="text/javascript" src="game17/js/CSlotSettings.js"></script>
    <script type="text/javascript" src="game17/js/CLang.js"></script>
    <script type="text/javascript" src="game17/js/CPreloader.js"></script>
    <script type="text/javascript" src="game17/js/CMain.js"></script>
    <script type="text/javascript" src="game17/js/CTextButton.js"></script>
    <script type="text/javascript" src="game17/js/CGfxButton.js"></script>
    <script type="text/javascript" src="game17/js/CToggle.js"></script>
    <script type="text/javascript" src="game17/js/CBetBut.js"></script>
    <script type="text/javascript" src="game17/js/CMenu.js"></script>
    <script type="text/javascript" src="game17/js/CGame.js"></script>
    <script type="text/javascript" src="game17/js/CReelColumn.js"></script>
    <script type="text/javascript" src="game17/js/CInterface.js"></script>
    <script type="text/javascript" src="game17/js/CPayTablePanel.js"></script>
    <script type="text/javascript" src="game17/js/CStaticSymbolCell.js"></script>
    <script type="text/javascript" src="game17/js/CTweenController.js"></script>
    <script type="text/javascript" src="game17/js/CBonusPanel.js"></script>
    <script type="text/javascript" src="game17/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="game17/js/CCTLText.js"></script>
    <script type="text/javascript" src="game17/js/CRechargePanel.js"></script>

</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>

    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 17
            }, function(t) {
                load(t);
            });

            function load(t) {
                var oMain = new CMain({
                    win_occurrence: JSON.parse(t.game[0]['win']), //WIN PERCENTAGE.SET A VALUE FROM 0 TO 100.
                    slot_cash: 100, //THIS IS THE CURRENT SLOT CASH AMOUNT. THE GAME CHECKS IF THERE IS AVAILABLE CASH FOR WINNINGS.
                    bonus_occurrence: JSON.parse(t.game[0]['bonus']), //SET BONUS OCCURRENCE PERCENTAGE IF PLAYER GET A WIN. SET A VALUE FROM 0 TO 100. (IF 100%, PLAYER GET A BONUS EVERYTIME THERE IS A WIN).
                    min_reel_loop: 1, //NUMBER OF REEL LOOPS BEFORE SLOT STOPS  
                    reel_delay: 0, //NUMBER OF FRAMES TO DELAY THE REELS THAT START AFTER THE FIRST ONE
                    time_show_win: 2000, //DURATION IN MILLISECONDS OF THE WINNING COMBO SHOWING
                    time_show_all_wins: 2000, //DURATION IN MILLISECONDS OF ALL WINNING COMBO
                    money: JSON.parse(t.data[0]['amount']), //STARING CREDIT FOR THE USER
                    min_bet: JSON.parse(t.game[0]['minbet']), //MINIMUM COIN FOR BET
                    max_bet: JSON.parse(t.game[0]['maxbet']), //MAXIMUM COIN FOR BET
                    max_hold: 3, //MAXIMUM NUMBER OF POSSIBLE HOLD ON REELS
                    perc_win_bonus_prize_1: 5, //OCCURENCE PERCENTAGE FOR PRIZE 1 IN BONUS
                    perc_win_bonus_prize_2: 3, //OCCURENCE PERCENTAGE FOR PRIZE 2 IN BONUS
                    perc_win_bonus_prize_3: 1.5, //OCCURENCE PERCENTAGE FOR PRIZE 3 IN BONUS
                    /***********PAYTABLE********************/
                    //EACH SYMBOL PAYTABLE HAS 5 VALUES THAT INDICATES THE MULTIPLIER FOR X1,X2,X3,X4 OR X5 COMBOS
                    paytable_symbol_1: [0, 0.20, 2, 20, 100], //PAYTABLE FOR SYMBOL 1
                    paytable_symbol_2: [0, 0.10, 0.80, 8, 40], //PAYTABLE FOR SYMBOL 2
                    paytable_symbol_3: [0, 0.10, 0.60, 2, 15], //PAYTABLE FOR SYMBOL 3
                    paytable_symbol_4: [0, 0.10, 0.60, 2, 15], //PAYTABLE FOR SYMBOL 4
                    paytable_symbol_5: [0, 0, 0.10, 0.80, 3], //PAYTABLE FOR SYMBOL 5
                    paytable_symbol_6: [0, 0.12, 0.10, 0.50, 2], //PAYTABLE FOR SYMBOL 6
                    paytable_symbol_7: [0, 0.20, 0.40, 1, 2], //PAYTABLE FOR SYMBOL 7
                    paytable_symbol_8: [0, 0.10, 0.20, 0.50, 2], //PAYTABLE FOR SYMBOL 8

                    /*************************************/
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    show_credits: true, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    num_spin_ads_showing: 10 //NUMBER OF SPIN TO COMPLETE, BEFORE TRIGGERING AD SHOWING.
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

                $(oMain).on("bet_placed", function(evt, oBetInfo) {
                    var iBet = oBetInfo.bet;
                    var iTotBet = oBetInfo.tot_bet;
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

                $(oMain).on("bonus_start", function(evt) {
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("bonus_end", function(evt, iMoney) {
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("show_interlevel_ad", function(evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShowInterlevelAD();
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("share_event", function(evt, oData) {
                    trace(oData)
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShareEvent(oData);
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


    <canvas id="canvas" class='ani_hack' width="1500" height="640"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none">
    </div>
</body>

</html>