<!DOCTYPE html>
<html>

<head>
    <title>HIGH OR LOW</title>
    <link rel="stylesheet" href="games/game22/css/reset.css" type="text/css">
    <link rel="stylesheet" href="games/game22/css/main.css" type="text/css">
    <link rel="stylesheet" href="games/game22/css/orientation_utils.css" type="text/css">
    <link rel="stylesheet" href="games/game22/css/ios_fullscreen.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='./games/game22/favicon.ico' />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />

</head>

<body ondragstart="return false;" ondrop="return false;">

    <meta name="csrf-token" content="{{ Session::token() }}">
    <script type="text/javascript" src="games/game22/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="games/game22/js/createjs.min.js"></script>
    <script type="text/javascript" src="games/game22/js/howler.min.js"></script>
    <script type="text/javascript" src="games/game22/js/screenfull.js"></script>
    <script type="text/javascript" src="games/game22/js/platform.js"></script>
    <script type="text/javascript" src="games/game22/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="games/game22/js/ctl_utils.js"></script>
    <script type="text/javascript" src="games/game22/js/sprite_lib.js"></script>
    <script type="text/javascript" src="games/game22/js/settings.js"></script>
    <script type="text/javascript" src="games/game22/js/CLang.js"></script>
    <script type="text/javascript" src="games/game22/js/CPreloader.js"></script>
    <script type="text/javascript" src="games/game22/js/CMain.js"></script>
    <script type="text/javascript" src="games/game22/js/CTextButton.js"></script>
    <script type="text/javascript" src="games/game22/js/CToggle.js"></script>
    <script type="text/javascript" src="games/game22/js/CGfxButton.js"></script>
    <script type="text/javascript" src="games/game22/js/CMenu.js"></script>
    <script type="text/javascript" src="games/game22/js/CGame.js"></script>
    <script type="text/javascript" src="games/game22/js/CInterface.js"></script>
    <script type="text/javascript" src="games/game22/js/CHelpPanel.js"></script>
    <script type="text/javascript" src="games/game22/js/CEndPanel.js"></script>
    <script type="text/javascript" src="games/game22/js/CCard.js"></script>
    <script type="text/javascript" src="games/game22/js/CGameSettings.js"></script>
    <script type="text/javascript" src="games/game22/js/CFichesController.js"></script>
    <script type="text/javascript" src="games/game22/js/CWinText.js"></script>
    <script type="text/javascript" src="games/game22/js/CGiveupPanel.js"></script>
    <script type="text/javascript" src="games/game22/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="games/game22/js/CCTLText.js"></script>
    <script type="text/javascript" src="games/game22/js/CFiche.js"></script>
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
 
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 22
            }, function(t) {
                load(t);
            });
            function load(t) {
                var oMain = new CMain({

                    win_occurrence: JSON.parse(t.game[0]['win']), //Win occurrence percentage (100 = always win)

                    starting_money: JSON.parse(t.data[0]['amount']), //STARING CREDIT FOR THE USER
                    starting_cash: 500, //GAME CASH AVAILABLE WHEN GAME STARTS
                    fiches_value: [1, //Value of first fiche
                        5, //Value of second fiche
                        10, //Value of third fiche
                        25, //Value of fourth fiche
                        100 //Value of fifth fiche                                             
                    ],

                    turn_card_speed: 400, //Time speed to completely turn a card (in ms)
                    showtext_timespeed: 3500, // Time speed duration of win/lose text (in ms) 
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    show_credits: true, //SET THIS VALUE TO FALSE IF YOU DON'T TO SHOW CREDITS BUTTON
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    //////////////////////////////////////////////////////////////////////////////////////////
                    ad_show_counter: 10 //NUMBER OF TURNS PLAYED BEFORE AD SHOWN
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

                $(oMain).on("bet_placed", function(evt, iTotBet) {
                    //...ADD YOUR CODE HERE EVENTUALLY

                });

                $(oMain).on("save_score", function(evt, iScore, szMode) {

                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeSaveScore({
                            score: iScore,
                            mode: szMode
                        });
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("start_level", function(evt, iLevel) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeStartLevel({
                            level: iLevel
                        });
                    }
                    //...ADD YOUR CODE HERE EVENTUALLY
                });

                $(oMain).on("end_level", function(evt, iLevel) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeEndLevel({
                            level: iLevel
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



    <canvas id="canvas" class='ani_hack' width="1600" height="768"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>

</body>

</html>