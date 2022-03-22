<!DOCTYPE html>
<html>
    <head>
        <title>3D LOTTERY</title>
        <link rel="stylesheet" href="game11/css/reset.css" type="text/css">
        <link rel="stylesheet" href="game11/css/main.css" type="text/css">
        <link rel="stylesheet" href="game11/css/ios_fullscreen.css" type="text/css">
        <link rel='shortcut icon' type='image/x-icon' href='./game11/favicon.ico' />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,minimal-ui" />
        <meta name="msapplication-tap-highlight" content="no"/>

        <script type="text/javascript" src="game11/js/lib/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src="game11/js/lib/createjs.min.js"></script>
        <script type="text/javascript" src="game11/js/lib/platform.js"></script>
        <script type="text/javascript" src="game11/js/lib/ios_fullscreen.js"></script>
        <script type="text/javascript" src="game11/js/lib/screenfull.js"></script>
        <script type="text/javascript" src="game11/js/lib/howler.min.js"></script>
        <script type="text/javascript" src="game11/js/lib/ctl_utils.js"></script>
        <script type="text/javascript" src="game11/js/lib/sprite_lib.js"></script>
        <script type="text/javascript" src="game11/js/lib/CTextButton.js"></script>
        <script type="text/javascript" src="game11/js/lib/CToggle.js"></script>
        <script type="text/javascript" src="game11/js/lib/CToggleExtraction.js"></script>
        <script type="text/javascript" src="game11/js/lib/CGfxButton.js"></script>
        <script type="text/javascript" src="game11/js/lib/cannon.js"></script>
        <script type="text/javascript" src="game11/js/lib/Three.js"></script>
        <script type="text/javascript" src="game11/js/lib/cannon.demo.js"></script>
        <script type="text/javascript" src="game11/js/lib/Detector.js"></script>
        <script type="text/javascript" src="game11/js/lib/smoothie.js"></script>
        <script type="text/javascript" src="game11/js/lib/Stats.js"></script>
        <script type="text/javascript" src="game11/js/lib/TrackballControls.js"></script>
        <script type="text/javascript" src="game11/js/lib/dat.gui.js"></script>
        <script type="text/javascript" src="game11/js/lib/FBXLoader.js"></script>
        
        <script type="text/javascript" src="game11/js/lib/CCTLText.js"></script>
        <script type="text/javascript" src="game11/js/lib/sprintf.js"></script>
        <script type="text/javascript" src="game11/js/lib/CGUIExpandible.js"></script>
        
        <script type="text/javascript" src="game11/js/CMain.js"></script>
        <script type="text/javascript" src="game11/js/settings.js"></script>
        <script type="text/javascript" src="game11/js/CLang.js"></script>
        <script type="text/javascript" src="game11/js/CPreloader.js"></script>
        <script type="text/javascript" src="game11/js/CMenu.js"></script>
        <script type="text/javascript" src="game11/js/CGame.js"></script>
        <script type="text/javascript" src="game11/js/CInterface.js"></script>
        <script type="text/javascript" src="game11/js/CCreditsPanel.js"></script>
        
        <script type="text/javascript" src="game11/js/CHelpPanel.js"></script>
        
        <script type="text/javascript" src="game11/js/CLosePanel.js"></script>
        <script type="text/javascript" src="game11/js/CWinPanel.js"></script>
        <script type="text/javascript" src="game11/js/CAreYouSurePanel.js"></script>
        <script type="text/javascript" src="game11/js/CBall.js"></script>
        <script type="text/javascript" src="game11/js/CScenario.js"></script>
        <script type="text/javascript" src="game11/js/CMsgBox.js"></script>
        
        <script type="text/javascript" src="game11/js/CSelectNumbersPanel.js"></script>
        <script type="text/javascript" src="game11/js/CNumberBut.js"></script>
        <script type="text/javascript" src="game11/js/CMsgBox.js"></script>
        <script type="text/javascript" src="game11/js/CPlayedNumbersInfoPanel.js"></script>
        <script type="text/javascript" src="game11/js/CNumMatchedPanel.js"></script>
        <script type="text/javascript" src="game11/js/CPaytable.js"></script>
        <script type="text/javascript" src="game11/js/CPaytableSlot.js"></script>
        
        
    </head>
    <body ondragstart="return false;" ondrop="return false;" >
    <meta name="csrf-token" content="{{ Session::token() }}"> 
        <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
        <script>
            $(document).ready(function () {
                var oMain = new CMain({
                    fullscreen:true,                //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                    audio_enable_on_startup:false,  //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
                    show_credits:true,              //ENABLE/DISABLE INFO CREDITS BUTTON

                    //PAYTABLE_SETTINGS: IN THIS FIELD YOU CAN SET THE OCCURRENCE OF EACH PRIZE BASED ON THE NUMBER OF BALLS GUESSED BY THE PLAYER
                        //      -num_balls_matched: NUMBER OF BALLS GUESSED BY THE PLAYER
                        //      -prize_img_url: THE IMAGE OF THE PRIZE FOR THAT COMBINATION OF GUESSED BALLS. 
                        //                      IF YOU DON'T WANT ANY WIN FOR THAT COMBINATION, PLEASE LEAVE THE FIELD EMPTY (e.g. prize_img_url: "")
                        //      -win_occurrence:    THE WIN OCCURRENCE OF THAT PRIZE. THE NUMBER IS BASED ON 100 DRAWS. 
                        //                          THE SUM OF ALL WIN OCCURENCES SHOULD NOT BE HIGHER THEN 100.
                        //      -label: INSERT A DESCRIPTION OF THE OBJECT. IF YOU DON'T WANT TO ADD ANY LABEL, LEAVE THE FIELD AS IT IS.
                        //      -redeemlink:    INSERT A REDEEM LINK FOR THE OBJECT. IF YOU DON'T WANT TO ADD ANY LINK, LEAVE THE FIELD AS IT IS: (redeemlink: "").
                        //                      YOU CAN ALSO ADD A LINK FOR NO PRIZE WINNING

                    paytable_settings:[
                        {num_balls_matched: 8, prize_img_url: "./game11/sprites/item_prize_images/image_5.png", win_occurrence:0.1, label: "CAR", redeem_link: "http://www.codethislab.com/"},
                        {num_balls_matched: 7, prize_img_url: "./game11/sprites/item_prize_images/image_3.png", win_occurrence:1, label: "TRAVEL", redeem_link: "http://www.codethislab.com/"},
                        {num_balls_matched: 6, prize_img_url: "./game11/sprites/item_prize_images/image_4.png", win_occurrence:2, label: "MOTORCYCLE", redeem_link: "http://www.codethislab.com/"},
                        {num_balls_matched: 5, prize_img_url: "./game11/sprites/item_prize_images/image_0.png", win_occurrence:3, label: "SMARTPHONE", redeem_link: "http://www.codethislab.com/"},
                        {num_balls_matched: 4, prize_img_url: "./game11/sprites/item_prize_images/image_1.png", win_occurrence:5, label: "SUNGLASSES", redeem_link: "http://www.codethislab.com/"},
                        {num_balls_matched: 3, prize_img_url: "./game11/sprites/item_prize_images/image_2.png", win_occurrence:10, label: "DINNER", redeem_link: "http://www.codethislab.com/"},
                        {num_balls_matched: 2, prize_img_url: "", win_occurrence:43.9, label: "", redeem_link: ""},
                        {num_balls_matched: 1, prize_img_url: "", win_occurrence:25, label: "", redeem_link: ""},
                        {num_balls_matched: 0, prize_img_url: "", win_occurrence:10, label: "", redeem_link: ""}
                    ]
                    
                });
                
                $(oMain).on("start_session", function (evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeStartSession();
                    }
                });

                $(oMain).on("end_session", function (evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeEndSession();
                    }
                });

                $(oMain).on("save_score", function(evt,iPrizeIndex) {
                           if(getParamValue('ctl-arcade') === "true"){
                               parent.__ctlArcadeSaveScore({score:iPrizeIndex});
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                $(oMain).on("show_interlevel_ad", function (evt) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShowInterlevelAD();
                    }
                });

                $(oMain).on("share_event", function (evt, iScore) {
                    if (getParamValue('ctl-arcade') === "true") {
                        parent.__ctlArcadeShareEvent({img: TEXT_SHARE_IMAGE,
                            title: TEXT_SHARE_TITLE,
                            msg: TEXT_SHARE_MSG1 + iScore + TEXT_SHARE_MSG2,
                            msg_share: TEXT_SHARE_SHARE1 + iScore + TEXT_SHARE_SHARE1});
                    }
                });


                if (isIOS()) {
                    setTimeout(function () {
                        sizeHandler();
                    }, 200);
                } else {
                    sizeHandler();
                }
            });

        </script>
        
        <div class="check-fonts">
            <p class="check-font-1">sourcesanspro-black</p>
            <p class="check-font-2">sourcesanspro-semibold</p>
        </div> 

        <canvas id="canvas" class='ani_hack' width="1200" height="1200"> </canvas>
        <div id="block_game" style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%; display:none"></div>
    </body>
</html>