function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;

    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function() {
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);
        createjs.Touch.enable(s_oStage);

        s_bMobile = jQuery.browser.mobile;
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(10);
        }


        s_iPrevTime = new Date().getTime();

        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", this._update);

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };

    this.soundLoaded = function() {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);

        _oPreloader.refreshLoader(iPerc);
    };

    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);


        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({ path: './games/game29/sounds/', filename: 'chip', loop: false, volume: 1, ingamename: 'chip' });
        s_aSoundsInfo.push({ path: './games/game29/sounds/', filename: 'click', loop: false, volume: 1, ingamename: 'click' });
        s_aSoundsInfo.push({ path: './games/game29/sounds/', filename: 'fiche_collect', loop: false, volume: 1, ingamename: 'fiche_collect' });
        s_aSoundsInfo.push({ path: './games/game29/sounds/', filename: 'fiche_select', loop: false, volume: 1, ingamename: 'fiche_select' });
        s_aSoundsInfo.push({ path: './games/game29/sounds/', filename: 'wheel_sound', loop: false, volume: 1, ingamename: 'wheel_sound' });

        RESOURCE_TO_LOAD += s_aSoundsInfo.length;

        s_aSounds = new Array();
        for (var i = 0; i < s_aSoundsInfo.length; i++) {
            this.tryToLoadSound(s_aSoundsInfo[i], false);
        }

    };

    this.tryToLoadSound = function(oSoundInfo, bDelay) {

        setTimeout(function() {
            s_aSounds[oSoundInfo.ingamename] = new Howl({
                src: [oSoundInfo.path + oSoundInfo.filename + '.mp3'],
                autoplay: false,
                preload: true,
                loop: oSoundInfo.loop,
                volume: oSoundInfo.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(szId, szMsg) {
                    for (var i = 0; i < s_aSoundsInfo.length; i++) {
                        if (szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
                            break;
                        }
                    }
                },
                onplayerror: function(szId) {
                    for (var i = 0; i < s_aSoundsInfo.length; i++) {
                        if (szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[i].ingamename].once('unlock', function() {
                                s_aSounds[s_aSoundsInfo[i].ingamename].play();
                            });
                            break;
                        }
                    }

                }
            });


        }, (bDelay ? 200 : 0));


    };



    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("bg_menu", "./games/game29/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_bg", "./games/game29/sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("but_exit", "./games/game29/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_game", "./games/game29/sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("audio_icon", "./games/game29/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("block", "./games/game29/sprites/block.png");
        s_oSpriteLibrary.addSprite("msg_box", "./games/game29/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("display_bg", "./games/game29/sprites/display_bg.png");
        s_oSpriteLibrary.addSprite("hit_area_bet0", "./games/game29/sprites/hit_area_bet0.png");
        s_oSpriteLibrary.addSprite("hit_area_simple_bet", "./games/game29/sprites/hit_area_simple_bet.png");
        s_oSpriteLibrary.addSprite("hit_area_couple_bet", "./games/game29/sprites/hit_area_couple_bet.png");
        s_oSpriteLibrary.addSprite("hit_area_small_circle", "./games/game29/sprites/hit_area_small_circle.png");
        s_oSpriteLibrary.addSprite("hit_area_triple_bet", "./games/game29/sprites/hit_area_triple_bet.png");
        s_oSpriteLibrary.addSprite("hit_area_col_bet", "./games/game29/sprites/hit_area_col_bet.png");
        s_oSpriteLibrary.addSprite("hit_area_twelve_bet", "./games/game29/sprites/hit_area_twelve_bet.png");
        s_oSpriteLibrary.addSprite("hit_area_other_bet", "./games/game29/sprites/hit_area_other_bet.png");
        s_oSpriteLibrary.addSprite("enlight_bet0", "./games/game29/sprites/enlight_bet0.png");
        s_oSpriteLibrary.addSprite("enlight_black", "./games/game29/sprites/enlight_black.png");
        s_oSpriteLibrary.addSprite("enlight_first18", "./games/game29/sprites/enlight_first18.png");
        s_oSpriteLibrary.addSprite("enlight_first_twelve", "./games/game29/sprites/enlight_first_twelve.png");
        s_oSpriteLibrary.addSprite("enlight_second_twelve", "./games/game29/sprites/enlight_second_twelve.png");
        s_oSpriteLibrary.addSprite("enlight_third_twelve", "./games/game29/sprites/enlight_third_twelve.png");
        s_oSpriteLibrary.addSprite("enlight_second18", "./games/game29/sprites/enlight_second18.png");
        s_oSpriteLibrary.addSprite("enlight_number1", "./games/game29/sprites/enlight_number1.png");
        s_oSpriteLibrary.addSprite("enlight_number3", "./games/game29/sprites/enlight_number3.png");
        s_oSpriteLibrary.addSprite("enlight_number4", "./games/game29/sprites/enlight_number4.png");
        s_oSpriteLibrary.addSprite("enlight_number12", "./games/game29/sprites/enlight_number12.png");
        s_oSpriteLibrary.addSprite("enlight_number16", "./games/game29/sprites/enlight_number16.png");
        s_oSpriteLibrary.addSprite("enlight_number25", "./games/game29/sprites/enlight_number25.png");
        s_oSpriteLibrary.addSprite("enlight_number30", "./games/game29/sprites/enlight_number30.png");
        s_oSpriteLibrary.addSprite("enlight_odd", "./games/game29/sprites/enlight_odd.png");
        s_oSpriteLibrary.addSprite("enlight_red", "./games/game29/sprites/enlight_red.png");
        s_oSpriteLibrary.addSprite("enlight_col", "./games/game29/sprites/enlight_col.png");
        s_oSpriteLibrary.addSprite("select_fiche", "./games/game29/sprites/select_fiche.png");
        s_oSpriteLibrary.addSprite("roulette_anim_bg", "./games/game29/sprites/roulette_anim_bg.png");
        s_oSpriteLibrary.addSprite("ball_spin", "./games/game29/sprites/ball_spin.png");
        s_oSpriteLibrary.addSprite("spin_but", "./games/game29/sprites/spin_but.png");
        s_oSpriteLibrary.addSprite("placeholder", "./games/game29/sprites/placeholder.png");
        s_oSpriteLibrary.addSprite("but_game_bg", "./games/game29/sprites/but_game_bg.png");
        s_oSpriteLibrary.addSprite("circle_red", "./games/game29/sprites/circle_red.png");
        s_oSpriteLibrary.addSprite("circle_green", "./games/game29/sprites/circle_green.png");
        s_oSpriteLibrary.addSprite("circle_black", "./games/game29/sprites/circle_black.png");
        s_oSpriteLibrary.addSprite("final_bet_bg", "./games/game29/sprites/final_bet_bg.png");
        s_oSpriteLibrary.addSprite("neighbor_bg", "./games/game29/sprites/neighbor_bg.jpg");
        s_oSpriteLibrary.addSprite("neighbor_enlight", "./games/game29/sprites/neighbor_enlight.png");
        s_oSpriteLibrary.addSprite("hitarea_neighbor", "./games/game29/sprites/hitarea_neighbor.png");
        s_oSpriteLibrary.addSprite("game_over_bg", "./games/game29/sprites/game_over_bg.jpg");
        s_oSpriteLibrary.addSprite("but_game_small", "./games/game29/sprites/but_game_small.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./games/game29/sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_credits", "./games/game29/sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./games/game29/sprites/logo_ctl.png");

        for (var i = 0; i < NUM_FICHES; i++) {
            s_oSpriteLibrary.addSprite("fiche_" + i, "./games/game29/sprites/fiche_" + i + ".png");
        }

        for (var j = 0; j < NUM_MASK_BALL_SPIN_FRAMES; j++) {
            s_oSpriteLibrary.addSprite("mask_ball_spin_" + j, "./games/game29/sprites/mask_ball_spin/mask_ball_spin_" + j + ".png");
        }

        for (var t = 0; t < NUM_MASK_BALL_SPIN_FRAMES; t++) {
            s_oSpriteLibrary.addSprite("wheel_anim_" + t, "./games/game29/sprites/wheel_anim/wheel_anim_" + t + ".jpg");
        }

        for (var k = 0; k < NUM_WHEEL_TOP_FRAMES; k++) {
            s_oSpriteLibrary.addSprite("wheel_top_" + k, "./games/game29/sprites/wheel_top/wheel_top_" + k + ".jpg");
        }

        for (var q = 0; q < NUM_BALL_SPIN_FRAMES; q++) {
            s_oSpriteLibrary.addSprite("ball_spin1_" + q, "./games/game29/sprites/ball_spin1/ball_spin1_" + q + ".png");
            s_oSpriteLibrary.addSprite("ball_spin2_" + q, "./games/game29/sprites/ball_spin2/ball_spin2_" + q + ".png");
            s_oSpriteLibrary.addSprite("ball_spin3_" + q, "./games/game29/sprites/ball_spin3/ball_spin3_" + q + ".png");
        }

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function() {
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);

        _oPreloader.refreshLoader(iPerc);

    };

    this._onAllImagesLoaded = function() {

    };


    this.onImageLoadError = function(szText) {

    };

    this.preloaderReady = function() {
        this._loadImages();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
        }

        _bUpdate = true;
    };

    this._allResourcesLoaded = function() {
        _oPreloader.unload();

        s_oMain.gotoMenu();
    };

    this.gotoMenu = function() {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function() {
        _oGame = new CGame(_oData);

        _iState = STATE_GAME;
    };

    this.gotoHelp = function() {
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };

    this.stopUpdate = function() {
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display", "block");

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            Howler.mute(true);
        }

    };

    this.startUpdate = function() {
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display", "none");

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            if (s_bAudioActive) {
                Howler.mute(false);
            }
        }

    };

    this._update = function(event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (_iState === STATE_GAME) {
            _oGame.update();
        }

        s_oStage.update(event);

    };

    s_oMain = this;
    _oData = oData;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    ENABLE_FULLSCREEN = oData.fullscreen;
    SHOW_CREDITS = oData.show_credits;
    s_bAudioActive = oData.audio_enable_on_startup;

    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain = null;
var s_oSpriteLibrary;
var s_bFullscreen = false;
var s_aSoundsInfo;