<!DOCTYPE html>
<html>

<head>
    <title></title>
    <link rel="stylesheet" href="games/game27/css/reset.css" type="text/css">
    <link rel="stylesheet" href="games/game27/css/main.css" type="text/css">
    <link rel="stylesheet" href="games/game27/css/orientation_utils.css" type="text/css">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />



</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">
    <script type="text/javascript" src="games/game27/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="games/game27/js/createjs.min.js"></script>
    <script type="text/javascript" src="games/game27/js/howler.min.js"></script>
    <script type="text/javascript" src="games/game27/js/screenfull.js"></script>
    <script type="text/javascript" src="games/game27/js/ctl_utils.js"></script>
    <script type="text/javascript" src="games/game27/js/sprite_lib.js"></script>
    <script type="text/javascript" src="games/game27/js/settings.js"></script>
    <script type="text/javascript" src="games/game27/js/CLang.js"></script>
    <script type="text/javascript" src="games/game27/js/CPreloader.js"></script>
    <script type="text/javascript" src="games/game27/js/CMain.js"></script>
    <script type="text/javascript" src="games/game27/js/CTextButton.js"></script>
    <script type="text/javascript" src="games/game27/js/CToggle.js"></script>
    <script type="text/javascript" src="games/game27/js/CGfxButton.js"></script>
    <script type="text/javascript" src="games/game27/js/CMenu.js"></script>
    <script type="text/javascript" src="games/game27/js/CGame.js"></script>
    <script type="text/javascript" src="games/game27/js/CVector2.js"></script>
    <script type="text/javascript" src="games/game27/js/CInterface.js"></script>
    <script type="text/javascript" src="games/game27/js/CHelpPanel.js"></script>
    <script type="text/javascript" src="games/game27/js/CEndPanel.js"></script>
    <script type="text/javascript" src="games/game27/js/CRow.js"></script>
    <script type="text/javascript" src="games/game27/js/CShowResult.js"></script>
    <script type="text/javascript" src="games/game27/js/CTextToggle.js"></script>
    <script type="text/javascript" src="games/game27/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="games/game27/js/CAreYouSurePanel.js"></script>
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 27
            }, function(t) {
                load(t);
            });

            function load(t) {
                var oMain = new CMain({

                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES   
                    show_credits: true, //SET THIS VALUE TO FALSE IF YOU DON'T WANT TO SHOW CREDITS BUTTON

                    bet_to_play: [1, 2, 3], //BET TO PLAY A GAME
                    player_credit: JSON.parse(t.data[0]['amount']), //PLAYER'S CREDIT

                    cash_credit: 1000, //TOTAL CREDIT IN CASH. PLAYER BET WILL INCREASE THE CASH, AND PLAYER WIN WILL DECREASE THE CASH. 
                    ///A PLAYER WILL NEVER WIN MORE THEN CURRENT CASH.

                    //// PRIZE WIN BY THE PLAYER. THE PRIZE IS MULTIPLIED BY THE BET PLAYED
                    prize: [1.00, //PRIZE FOR COMBO 1
                        2.50, //PRIZE FOR COMBO 2
                        5.00, //PRIZE FOR COMBO 2
                        15.00, //PRIZE FOR COMBO 3
                        40.00, //PRIZE FOR COMBO 4
                        90.00, //PRIZE FOR COMBO 5
                        170.00, //PRIZE FOR COMBO 6
                        400.00, //PRIZE FOR COMBO 7
                        1000.00
                    ], //PRIZE FOR COMBO 8

                    prizeprob: [30, //OCCURENCE PERCENTAGE FOR PRIZE 1
                        22, //OCCURENCE PERCENTAGE FOR PRIZE 2
                        17, //OCCURENCE PERCENTAGE FOR PRIZE 3
                        10, //OCCURENCE PERCENTAGE FOR PRIZE 4
                        8, //OCCURENCE PERCENTAGE FOR PRIZE 5
                        6, //OCCURENCE PERCENTAGE FOR PRIZE 6
                        4, //OCCURENCE PERCENTAGE FOR PRIZE 7
                        2, //OCCURENCE PERCENTAGE FOR PRIZE 8
                        1
                    ], //OCCURENCE PERCENTAGE FOR PRIZE 9

                    win_occurrence: JSON.parse(t.game[0]['win']),

                    //winpercentage MANAGES MULTIPLE WIN OCCURENCE PERCENTAGE FOR EACH GAME
                    multiple_win_percentage: [
                        70, //WIN IN 1 ROW
                        25, //WIN IN 2 ROWS
                        5 //WIN IN 3 ROWS
                    ],

                    scratch_tolerance_per_cell: 50, //AREA PERCENTAGE TO SCRATCH (FOR EACH SYMBOL) TO SHOW FINAL RESULT IN THE FRUIT ROW

                    //////////////////////////////////////////////////////////////////////////////////////////
                    ad_show_counter: 5 //NUMBER OF CARDS PLAYED BEFORE AD SHOWN
                    //
                    //// THIS FUNCTIONALITY IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN.///////////////////////////
                    /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
                    // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421///////////


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

                $(oMain).on("share_event", function(evt, iScore) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShareEvent({
                            img: TEXT_SHARE_IMAGE,
                            title: TEXT_SHARE_TITLE,
                            msg: TEXT_SHARE_MSG1 + iScore + TEXT_SHARE_MSG2,
                            msg_share: TEXT_SHARE_SHARE1 + iScore + TEXT_SHARE_SHARE1
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
    <canvas id="canvas" class='ani_hack' width="1500" height="640"> </canvas>

    <canvas id="clear-image" width="342" height="342" style="display:none;position:absolute;"></canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>



</body>

</html>