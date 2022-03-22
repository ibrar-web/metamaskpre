<!DOCTYPE html>
<html>

<head>
    <title>FORTUNE TREE</title>
    <link rel="stylesheet" href="games/game40/css/reset.css" type="text/css">
    <link rel="stylesheet" href="games/game40/css/main.css" type="text/css">
    <link rel="stylesheet" href="games/game40/css/orientation_utils.css" type="text/css">
    <link rel="stylesheet" href="games/game40/css/ios_fullscreen.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='./favicon.ico' />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />

    <script type="text/javascript" src="games/game40/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="games/game40/js/createjs.min.js"></script>
    <script type="text/javascript" src="games/game40/js/screenfull.js"></script>
    <script type="text/javascript" src="games/game40/js/howler.min.js"></script>
    <script type="text/javascript" src="games/game40/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="games/game40/js/platform.js"></script>
    <script type="text/javascript" src="games/game40/js/ctl_utils.js"></script>
    <script type="text/javascript" src="games/game40/js/sprite_lib.js"></script>
    <script type="text/javascript" src="games/game40/js/settings.js"></script>
    <script type="text/javascript" src="games/game40/js/CLang.js"></script>
    <script type="text/javascript" src="games/game40/js/CPreloader.js"></script>
    <script type="text/javascript" src="games/game40/js/CMain.js"></script>
    <script type="text/javascript" src="games/game40/js/CTextButton.js"></script>
    <script type="text/javascript" src="games/game40/js/CToggle.js"></script>
    <script type="text/javascript" src="games/game40/js/CGfxButton.js"></script>
    <script type="text/javascript" src="games/game40/js/CMenu.js"></script>
    <script type="text/javascript" src="games/game40/js/CGame.js"></script>
    <script type="text/javascript" src="games/game40/js/CVector2.js"></script>
    <script type="text/javascript" src="games/game40/js/CFormatText.js"></script>
    <script type="text/javascript" src="games/game40/js/CInterface.js"></script>
    <script type="text/javascript" src="games/game40/js/CHelpPanel.js"></script>
    <script type="text/javascript" src="games/game40/js/CEndPanel.js"></script>
    <script type="text/javascript" src="games/game40/js/CWheel.js"></script>
    <script type="text/javascript" src="games/game40/js/CLeds.js"></script>
    <script type="text/javascript" src="games/game40/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="games/game40/js/CCTLText.js"></script>

</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 40
            }, function(t) {
                load(t);
            })


            function load(t) {
                var oMain = new CMain({
                    start_credit: JSON.parse(t.data[0]['amount']), //Starting credits value
                    start_bet: JSON.parse(t.game[0]['minbet']), //Base starting bet. Will increment with multiplier in game
                    bet_offset: 5, //Bet Offset
                    max_bet: JSON.parse(t.game[0]['maxbet']), //Max multiplier value

                    bank_cash: 500, //Starting credits owned by the bank. When a player win, founds will be subtract from here. When a player lose or bet, founds will be added here. If 0 players always lose.
                    //wheel_settings sets the values and probability of each prize in the wheel ([prize, win occurence percentage]). Value*max_bet can't exceed 9999999.
                    //PAY ATTENTION: the total sum of win occurences must be 100! 
                    //prize=0 or less, is considered as "lose". So Leds will play a lose animation.
                    wheel_settings: [{
                            prize: 0.25,
                            win_occurence: 10
                        }, {
                            prize: 0.50,
                            win_occurence: 2
                        }, {
                            prize: 0.28,
                            win_occurence: 2
                        }, {
                            prize: 1,
                            win_occurence: 2
                        }, {
                            prize: 0,
                            win_occurence: 12
                        },
                        {
                            prize: 0.75,
                            win_occurence: 2
                        }, {
                            prize: 0.45,
                            win_occurence: 4
                        }, {
                            prize: 0.34,
                            win_occurence: 5
                        }, {
                            prize: 5,
                            win_occurence: 2
                        }, {
                            prize: 0,
                            win_occurence: 12
                        },
                        {
                            prize: 0.35,
                            win_occurence: 2
                        }, {
                            prize: 0.50,
                            win_occurence: 1
                        }, {
                            prize: 0.40,
                            win_occurence: 6
                        }, {
                            prize: 3,
                            win_occurence: 2
                        }, {
                            prize: 0,
                            win_occurence: 12
                        },
                        {
                            prize: 0.40,
                            win_occurence: 1
                        }, {
                            prize: 0.29,
                            win_occurence: 5
                        }, {
                            prize: 0.35,
                            win_occurence: 5
                        }, {
                            prize: 10,
                            win_occurence: 1
                        }, {
                            prize: 0,
                            win_occurence: 12
                        }
                    ],

                    anim_idle_change_frequency: 10000, //Duration (in ms) of current led idle animation, before it change with another.
                    led_anim_idle1_timespeed: 2000, //Time speed (in ms) of led animation idle 1. Less is faster.
                    led_anim_idle2_timespeed: 100, //Time speed (in ms) of led animation idle 2. Less is faster.
                    led_anim_idle3_timespeed: 150, //Time speed (in ms) of led animation idle 3. Less is faster.

                    led_anim_spin_timespeed: 50, //Time speed (in ms) of led animation spin. Less is faster.

                    led_anim_win_duration: 5000, //Duration (in ms) of current led win animation, before it change with the idle.
                    led_anim_win1_timespeed: 300, //Time speed (in ms) of led animation win 1. Less is faster.
                    led_anim_win2_timespeed: 50, //Time speed (in ms) of led animation win 2. Less is faster.

                    led_anim_lose_duration: 5000, //Duration (in ms) of led lose animation, before it change with the idle.

                    show_credits: true, //SET THIS VALUE TO FALSE IF YOU DON'T WANT TO SHOW CREDITS BUTTON
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 

                    //////////////////////////////////////////////////////////////////////////////////////////
                    ad_show_counter: 5 //NUMBER OF SPIN BEFORE AD SHOWN
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
    </div>


    <canvas id="canvas" class='ani_hack' width="1920" height="1080"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>
</body>

</html>