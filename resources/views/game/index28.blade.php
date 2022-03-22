<!DOCTYPE html>
<html>

<head>
    <title>GREYHOUND RACING</title>
    <link rel="stylesheet" href="games/game28/css/reset.css" type="text/css">
    <link rel="stylesheet" href="games/game28/css/main.css" type="text/css">
    <link rel="stylesheet" href="games/game28/css/orientation_utils.css" type="text/css">
    <link rel="stylesheet" href="games/game28/css/ios_fullscreen.css" type="text/css">
    <link rel='shortcut icon' type='image/x-icon' href='./games/game28/favicon.ico' />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
    <meta name="msapplication-tap-highlight" content="no" />


</head>

<body ondragstart="return false;" ondrop="return false;">
    <meta name="csrf-token" content="{{ Session::token() }}">
    <script type="text/javascript" src="games/game28/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="games/game28/js/createjs.min.js"></script>
    <script type="text/javascript" src="games/game28/js/howler.min.js"></script>
    <script type="text/javascript" src="games/game28/js/screenfull.min.js"></script>
    <script type="text/javascript" src="games/game28/js/platform.js"></script>
    <script type="text/javascript" src="games/game28/js/ios_fullscreen.js"></script>
    <script type="text/javascript" src="games/game28/js/ctl_utils.js"></script>
    <script type="text/javascript" src="games/game28/js/sprite_lib.js"></script>
    <script type="text/javascript" src="games/game28/js/greyhound_info.min.js"></script>
    <script type="text/javascript" src="games/game28/js/settings.js"></script>
    <script type="text/javascript" src="games/game28/js/CGameSettings.js"></script>
    <script type="text/javascript" src="games/game28/js/CLang.js"></script>
    <script type="text/javascript" src="games/game28/js/CPreloader.js"></script>
    <script type="text/javascript" src="games/game28/js/CMain.js"></script>
    <script type="text/javascript" src="games/game28/js/CTextButton.js"></script>
    <script type="text/javascript" src="games/game28/js/CToggle.js"></script>
    <script type="text/javascript" src="games/game28/js/CGfxButton.js"></script>
    <script type="text/javascript" src="games/game28/js/CMenu.js"></script>
    <script type="text/javascript" src="games/game28/js/CGame.js"></script>
    <script type="text/javascript" src="games/game28/js/CInterface.js"></script>
    <script type="text/javascript" src="games/game28/js/CCreditsPanel.js"></script>
    <script type="text/javascript" src="games/game28/js/CBetPanel.js"></script>
    <script type="text/javascript" src="games/game28/js/CChipPanel.js"></script>
    <script type="text/javascript" src="games/game28/js/CSimpleBetPanel.js"></script>
    <script type="text/javascript" src="games/game28/js/CForecastPanel.js"></script>
    <script type="text/javascript" src="games/game28/js/CBetList.js"></script>
    <script type="text/javascript" src="games/game28/js/CFichesController.js"></script>
    <script type="text/javascript" src="games/game28/js/CButBet.js"></script>
    <script type="text/javascript" src="games/game28/js/CVector2.js"></script>
    <script type="text/javascript" src="games/game28/js/CMsgBox.js"></script>
    <script type="text/javascript" src="games/game28/js/CTrackBg.js"></script>
    <script type="text/javascript" src="games/game28/js/CGreyhound.js"></script>
    <script type="text/javascript" src="games/game28/js/CTweenController.js"></script>
    <script type="text/javascript" src="games/game28/js/CRankingGui.js"></script>
    <script type="text/javascript" src="games/game28/js/CArrivalPanel.js"></script>
    <script type="text/javascript" src="games/game28/js/CWinPanel.js"></script>
    <script type="text/javascript" src="games/game28/js/CLosePanel.js"></script>
    <script type="text/javascript" src="games/game28/js/CButStartRace.js"></script>
    <script type="text/javascript" src="games/game28/js/CAreYouSurePanel.js"></script>
    <script type="text/javascript" src="games/game28/js/CCTLText.js"></script>
    <script type="text/javascript" src="games/game28/js/CFicheBut.js"></script>
    <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <script>
        $(document).ready(function() {
            $.post("detail", {
                _token: $('meta[name=csrf-token]').attr('content'),
                id: 28
            }, function(t) {
                load(t);
            });

            function load(t) {
                var oMain = new CMain({
                    money: JSON.parse(t.data[0]['amount']), //USER MONEY
                    min_bet: JSON.parse(t.game[0]['minbet']), //MINIMUM COIN FOR BET
                    max_bet: JSON.parse(t.game[0]['maxbet']),
                    win_occurrence: JSON.parse(t.game[0]['win']), //WIN OCCURRENCE
                    game_cash: 100, //GAME CASH. STARTING MONEY THAT THE GAME CAN DELIVER.
                    chip_values: [1, 5, 10, 25, 50, 100], //VALUE OF CHIPS
                    show_credits: true, //SET THIS VALUE TO FALSE IF YOU DON'T TO SHOW CREDITS BUTTON
                    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                    num_levels_for_ads: 2 //NUMBER OF TURNS PLAYED BEFORE AD SHOWING //
                    //////// THIS FEATURE  IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN./////////////////////////// 
                    /////////////////// YOU CAN GET IT AT: ///////////////////////////////////////////////////////// 
                    // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421///////////

                });

                $(oMain).on("recharge", function(evt) {
                    //INSERT HERE YOUR RECHARGE SCRIPT THAT RETURN MONEY TO RECHARGE
               
                    if (s_oBetPanel !== null) {
                        s_oBetPanel.setMoney(0);
                    }
                });

                $(oMain).on("start_session", function(evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeStartSession();
                    }
                });

                $(oMain).on("end_session", function(evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeEndSession();
                    }
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
                });

                $(oMain).on("show_interlevel_ad", function(evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShowInterlevelAD();
                    }
                });

                $(oMain).on("share_event", function(evt, iScore) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShareEvent({
                            img: TEXT_SHARE_IMAGE,
                            title: TEXT_SHARE_TITLE,
                            msg: TEXT_SHARE_MSG1 + iScore +
                                TEXT_SHARE_MSG2,
                            msg_share: TEXT_SHARE_SHARE1 +
                                iScore + TEXT_SHARE_SHARE1
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


    <canvas id="canvas" class='ani_hack' width="1024" height="768"> </canvas>
    <div data-orientation="landscape" class="orientation-msg-container">
        <p class="orientation-msg-text">Please rotate your device</p>
    </div>
    <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>

</body>

</html>