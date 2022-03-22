<!DOCTYPE html>
<html>

<head>
    <title>Ultimate Football Slot Machine</title>
    <link rel="stylesheet" href="games/game43/css/reset.css" type="text/css">
    <link rel="stylesheet" href="games/game43/css/main.css" type="text/css">
    <link rel="stylesheet" href="games/game43/css/orientation_utils.css" type="text/css">
    <link rel="stylesheet" href="games/game43/css/ios_fullscreen.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='./games/game43/favicon.ico' />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />


</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script type="text/javascript" src="games/game43/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="games/game43/js/createjs.min.js"></script>
    <script type="text/javascript" src="games/game43/js/howler.min.js"></script>
    <script type="text/javascript" src="games/game43/js/screenfull.js"></script>
    <script type="text/javascript" src="games/game43/js/platform.js"></script>
    <script type="text/javascript" src="games/game43/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="games/game43/js/ctl_utils.js"></script>
    <script type="text/javascript" src="games/game43/js/sprite_lib.js"></script>
    <script type="text/javascript" src="games/game43/js/settings.js"></script>
    <script type="text/javascript" src="games/game43/js/CAPIController.js"></script>
    <script type="text/javascript" src="games/game43/js/CSlotSettings.js"></script>
    <script type="text/javascript" src="games/game43/js/CMenu.js"></script>
    <script type="text/javascript" src="games/game43/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="games/game43/js/CAreYouSurePanel.js"></script>
    <script type="text/javascript" src="games/game43/js/CCTLText.js"></script>
    <script type="text/javascript" src="games/game43/js/CLang.min.js"></script>
    <script type="text/javascript" src="games/game43/js/CPreloader.js"></script>
    <script type="text/javascript" src="games/game43/js/CMain.js"></script>
    <script type="text/javascript" src="games/game43/js/CSpriteSheetTextButton.js"></script>
    <script type="text/javascript" src="games/game43/js/CGfxButton.js"></script>
    <script type="text/javascript" src="games/game43/js/CToggle.js"></script>
    <script type="text/javascript" src="games/game43/js/CBetBut.js"></script>
    <script type="text/javascript" src="games/game43/js/CGame.js"></script>
    <script type="text/javascript" src="games/game43/js/CReelColumn.js"></script>
    <script type="text/javascript" src="games/game43/js/CInterface.js"></script>
    <script type="text/javascript" src="games/game43/js/CPayTablePanel.js"></script>
    <script type="text/javascript" src="games/game43/js/CStaticSymbolCell.js"></script>
    <script type="text/javascript" src="games/game43/js/CTweenController.js"></script>
    <script type="text/javascript" src="games/game43/js/CMsgBox.js"></script>
    <script type="text/javascript" src="games/game43/js/CBonusPanel.js"></script>
    <script type="text/javascript" src="games/game43/js/CBonusResultPanel.js"></script>
    <script type="text/javascript" src="games/game43/js/CBonusPlayer.js"></script>
    <script type="text/javascript" src="games/game43/js/CBonusOpponent.js"></script>
    <script type="text/javascript" src="games/game43/js/CScoreText.js"></script>
    <script type="text/javascript" src="games/game43/js/CAvatar.js"></script>
    <script type="text/javascript" src="games/game43/js/CRechargePanel.js"></script>
    <script type="text/javascript" src="games/game43/js/CFieldBonus.js"></script>
    <script type="text/javascript" src="games/game43/js/CFieldEndZoneBonus.js"></script>
    <script type="text/javascript" src="games/game43/js/CBallFreekicks.js"></script>
    <script type="text/javascript" src="games/game43/js/CFreekicksFinalPanel.js"></script>
    <script type="text/javascript" src="games/game43/js/CFreekicksMsgBox.js"></script>
    <script type="text/javascript" src="games/game43/js/CFreekicksPanel.js"></script>
    <script type="text/javascript" src="games/game43/js/CGoalArea.js"></script>
    <script type="text/javascript" src="games/game43/js/CPlayerFreeckicks.js"></script>
    <script type="text/javascript" src="games/game43/js/CScoreTextFreekicks.js"></script>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 43
            }, function(t) {
                load(t);
            })

            function load(t) {
                var oMain = new CMain({
                    min_reel_loop: 0, //NUMBER OF REEL LOOPS BEFORE SLOT STOPS  
                    reel_delay: 6, //NUMBER OF FRAMES TO DELAY THE REELS THAT START AFTER THE FIRST ONE
                    time_show_win: 2000, //DURATION IN MILLISECONDS OF THE WINNING COMBO SHOWING
                    time_show_all_wins: 2000, //DURATION IN MILLISECONDS OF ALL WINNING COMBO
                    restart_credit: false, //IF YOU WANT TO RESTART USER CREDIT WITH DEFAULT VALUE SET THIS TO TRUE   
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    show_credits: true, //SHOW CREDITS ON/OFF
                    num_spin_for_ads: 20 //NUMBER OF TURNS PLAYED BEFORE AD SHOWING //
                    //////// THIS FEATURE  IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN./////////////////////////// 
                    /////////////////// YOU CAN GET IT AT: ////////////////////////////////////////////////////
                    // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421
                });


                $(oMain).on("bet_placed", function(evt, oData) {
                    var fCoin = oData.bet;
                    var fTotBet = oData.tot_bet;
                    var iLinesBet = oData.payline;

                    APIAttemptSpin(fTotBet, fCoin, iLinesBet, s_oGame.onSpinReceived, s_oGame);
                });

                $(oMain).on("bonus_call", function(evt, oData) {
                    var fCoin = oData.bet;
                    apiAttemptBonus(fCoin, s_oGame.onBonusStart, s_oGame);
                });

                $(oMain).on("recharge", function(evt) {
                    //INSERT HERE YOUR RECHARGE SCRIPT THAT RETURN MONEY TO RECHARGE
                    var iMoney = START_MONEY;

                    //refreshCredit(iMoney, s_oGame.refreshMoney, s_oGame);
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
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });


                $(oMain).on("show_interlevel_ad", function(evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShowInterlevelAD();
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
    </div>

    <canvas id="canvas" class='ani_hack' width="1500" height="768"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>

</body>

</html>