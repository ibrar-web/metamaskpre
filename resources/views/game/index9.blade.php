<!DOCTYPE html>
<html>

<head>
    <title>BINGO</title>
    <link rel="stylesheet" href="game9/css/reset.css" type="text/css">
    <link rel="stylesheet" href="game9/css/main.css" type="text/css">
    <link rel="stylesheet" href="game9/css/orientation_utils.css" type="text/css">
    <link rel="stylesheet" href="game9/css/ios_fullscreen.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='./game9/favicon.ico' />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />

    <script type="text/javascript" src="game9/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="game9/js/createjs-2015.11.26.min.js"></script>
    <script type="text/javascript" src="game9/js/howler.min.js"></script>
    <script type="text/javascript" src="game9/js/screenfull.js"></script>
    <script type="text/javascript" src="game9/js/platform.js"></script>
    <script type="text/javascript" src="game9/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="game9/js/ctl_utils.js"></script>
    <script type="text/javascript" src="game9/js/sprite_lib.js"></script>
    <script type="text/javascript" src="game9/js/settings.js"></script>
    <script type="text/javascript" src="game9/js/CLang.js"></script>
    <script type="text/javascript" src="game9/js/CPreloader.js"></script>
    <script type="text/javascript" src="game9/js/CMain.js"></script>
    <script type="text/javascript" src="game9/js/CTextButton.js"></script>
    <script type="text/javascript" src="game9/js/CTextSpritesheetBut.js"></script>
    <script type="text/javascript" src="game9/js/CToggle.js"></script>
    <script type="text/javascript" src="game9/js/CGfxButton.js"></script>
    <script type="text/javascript" src="game9/js/CToggleText.js"></script>
    <script type="text/javascript" src="game9/js/CMenu.js"></script>
    <script type="text/javascript" src="game9/js/CGame.js"></script>
    <script type="text/javascript" src="game9/js/CInterface.js"></script>
    <script type="text/javascript" src="game9/js/CEndPanel.js"></script>
    <script type="text/javascript" src="game9/js/CAnimBalls.js"></script>
    <script type="text/javascript" src="game9/js/CCardSelection.js"></script>
    <script type="text/javascript" src="game9/js/CCard.js"></script>
    <script type="text/javascript" src="game9/js/CMsgBox.js"></script>
    <script type="text/javascript" src="game9/js/CNumberBoard.js"></script>
    <script type="text/javascript" src="game9/js/CNumberBoardCell.js"></script>
    <script type="text/javascript" src="game9/js/CBallExtracted.js"></script>
    <script type="text/javascript" src="game9/js/CPaytablePanel.js"></script>
    <script type="text/javascript" src="game9/js/CPaytableCard.js"></script>
    <script type="text/javascript" src="game9/js/CDisplayText.js"></script>
    <script type="text/javascript" src="game9/js/CAreYouSurePanel.js"></script>
    <script type="text/javascript" src="game9/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="game9/js/CCTLText.js"></script>

</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">

    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 9
            }, function(t) {
                load(t);
            });

            function load(t) {

                var oMain = new CMain({

                    bank_money: 1000,
                    start_player_money: JSON.parse(t.data[0]['amount']),
                    coin_bet: [0.25, 0.5, 1],
                    win_occurrence: [
                        JSON.parse(t.game[0]['win']), //WIN OCURRENCE PERCENTAGE FOR 45 EXTRACTIONS
                        JSON.parse(t.game[0]['win']), //WIN OCURRENCE PERCENTAGE FOR 55 EXTRACTIONS
                        JSON.parse(t.game[0]['win'])
                    ], //WIN OCURRENCE PERCENTAGE FOR 65 EXTRACTIONS
                    time_extraction: 200, //REDUCE THIS VALUE TO SPEED UP THE EXTRACTION
                    paytable: [
                        [5, 50, 100], //PAYTABLE FOR 45 EXTRACTIONS
                        [2, 10, 50], //PAYTABLE FOR 55 EXTRACTIONS
                        [1, 2, 20], //PAYTABLE FOR 65 EXTRACTIONS
                    ],
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    show_credits: true, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    //////////////////////////////////////////////////////////////////////////////////////////
                    ad_show_counter: 5 //NUMBER OF TURNS PLAYED BEFORE AD SHOWN
                    //
                    //// THIS FUNCTIONALITY IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN.///////////////////////////
                    /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
                    // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421?s_phrase=&s_rank=27 ///////////

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

                $(oMain).on("bet_placed", function(evt, iTotBet) {
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
        <p class="check-font-1">aachendeemedregular</p>
    </div>

    <canvas id="canvas" class='ani_hack' width="1920" height="1080"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>

</body>

</html>