<!DOCTYPE html>
<html>

<head>
    <title>CHAMPIONS SLOT</title>
    <link rel="stylesheet" href="game10/css/reset.css" type="text/css">
    <link rel="stylesheet" href="game10/css/main.css" type="text/css">
    <link rel="stylesheet" href="game10/css/orientation_utils.css" type="text/css">
    <link rel="stylesheet" href="game10/css/ios_fullscreen.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='./game10/favicon.ico' />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />

    <script type="text/javascript" src="game10/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="game10/js/createjs.min.js"></script>
    <script type="text/javascript" src="game10/js/howler.min.js"></script>
    <script type="text/javascript" src="game10/js/screenfull.js"></script>
    <script type="text/javascript" src="game10/js/platform.js"></script>
    <script type="text/javascript" src="game10/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="game10/js/ctl_utils.js"></script>
    <script type="text/javascript" src="game10/js/sprite_lib.js"></script>
    <script type="text/javascript" src="game10/js/settings.js"></script>
    <script type="text/javascript" src="game10/js/CSlotSettings.js"></script>
    <script type="text/javascript" src="game10/js/CLang.js"></script>
    <script type="text/javascript" src="game10/js/CPreloader.js"></script>
    <script type="text/javascript" src="game10/js/CMain.js"></script>
    <script type="text/javascript" src="game10/js/CTextButton.js"></script>
    <script type="text/javascript" src="game10/js/CGfxButton.js"></script>
    <script type="text/javascript" src="game10/js/CToggle.js"></script>
    <script type="text/javascript" src="game10/js/CSpinButton.js"></script>
    <script type="text/javascript" src="game10/js/CMenu.js"></script>
    <script type="text/javascript" src="game10/js/CGame.js"></script>
    <script type="text/javascript" src="game10/js/CReelColumn.js"></script>
    <script type="text/javascript" src="game10/js/CInterface.js"></script>
    <script type="text/javascript" src="game10/js/CPayTablePanel.js"></script>
    <script type="text/javascript" src="game10/js/CStaticSymbolCell.js"></script>
    <script type="text/javascript" src="game10/js/CTweenController.js"></script>
    <script type="text/javascript" src="game10/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="game10/js/CCTLText.js"></script>
    <script type="text/javascript" src="game10/js/sprintf.js"></script>
    <script type="text/javascript" src="game10/js/CMsgBox.js"></script>
    <script type="text/javascript" src="game10/js/CGUIExpandible.js"></script>

</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">

    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 10
            }, function(t) {
                load(t);
            });


            function load(t) {
                var oMain = new CMain({
                    win_occurrence: JSON.parse(t.game[0]['win']), //WIN PERCENTAGE.SET A VALUE FROM 0 TO 100.
                    slot_cash: 2000, //THIS IS THE CURRENT SLOT CASH AMOUNT. THE GAME CHECKS IF THERE IS AVAILABLE CASH FOR WINNINGS.
                    min_reel_loop: 2, //NUMBER OF REEL LOOPS BEFORE SLOT STOPS  
                    reel_delay: 6, //NUMBER OF FRAMES TO DELAY THE REELS THAT START AFTER THE FIRST ONE
                    money: JSON.parse(t.data[0]['amount']), //STARING CREDIT FOR THE USER

                    bet: [0.25, 0.5, 1, 1.5, 2, 3, 4, 5], //SET ALL THE POSSIBLE BET

                    prize_amount: [
                        10, // WIN 1    (HIGHER PRIZE)    
                        5, // WIN 2
                        3, // WIN 3
                        2, // WIN 4
                        1, // WIN 5
                        0.50, // WIN 6
                        0.22, // WIN 7
                        0.21 // WIN 8    (LOWER PRIZE)
                    ],
                    prize_occurrence: [
                        1, //WIN OCCURRENCE PERCENTAGE FOR SYMBOL 1 (HIGHER PRIZE)
                        3, //WIN OCCURRENCE PERCENTAGE FOR SYMBOL 2
                        6, //WIN OCCURRENCE PERCENTAGE FOR SYMBOL 3
                        10, //WIN OCCURRENCE PERCENTAGE FOR SYMBOL 4
                        15, //WIN OCCURRENCE PERCENTAGE FOR SYMBOL 5
                        20, //WIN OCCURRENCE PERCENTAGE FOR SYMBOL 6
                        20, //WIN OCCURRENCE PERCENTAGE FOR SYMBOL 7
                        25 //WIN OCCURRENCE PERCENTAGE FOR SYMBOL 8 (LOWER PRIZE)
                    ],


                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    show_credits: true, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    //////////////////////////////////////////////////////////////////////////////////////////
                    ad_show_counter: 20 //NUMBER OF SPIN BEFORE AD SHOWN
                    //
                    //// THIS FUNCTIONALITY IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN.///////////////////////////
                    /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
                    // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421?s_phrase=&s_rank=27 ///////////

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

                $(oMain).on("share_event", function(evt, iMoney) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShareEvent({
                            img: TEXT_SHARE_IMAGE,
                            title: TEXT_SHARE_TITLE,
                            msg: TEXT_SHARE_MSG1 + iMoney + TEXT_SHARE_MSG2,
                            msg_share: TEXT_SHARE_SHARE1 + iMoney + TEXT_SHARE_SHARE1
                        });
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("bet_placed", function(evt, oBetInfo) {
                    var iBet = oBetInfo.bet;
                    var iTotBet = oBetInfo.tot_bet;
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("recharge", function(evt) {

                    if (s_oGame !== null) {
                        s_oGame.setMoney(0);
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
        <p class="check-font-1">ds-digitalbold</p>
        <p class="check-font-2">impact</p>
    </div>

    <canvas id="canvas" class='ani_hack' width="1600" height="640"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>

</body>

</html>