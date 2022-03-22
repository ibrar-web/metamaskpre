function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oGame;

    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = false;
        createjs.Touch.enable(s_oStage, true);

        s_bMobile = isMobile();

        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
            $('body').on('contextmenu', '#canvas', function(e) {
                return false;
            });
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };

    this.preloaderReady = function() {
        s_oGameSettings = new CGameSettings(s_oSettingsData);
        s_oBetList = new CBetList();

        s_oMain._loadImages();
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            s_oMain._initSounds();
        }
        _bUpdate = true;
    };


    this.soundLoaded = function() {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);

    };

    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);


        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({ path: './games/game28/sounds/', filename: 'chip', loop: false, volume: 1, ingamename: 'chip' });
        s_aSoundsInfo.push({ path: './games/game28/sounds/', filename: 'click', loop: false, volume: 1, ingamename: 'click' });
        s_aSoundsInfo.push({ path: './games/game28/sounds/', filename: 'start_race', loop: false, volume: 1, ingamename: 'start_race' });
        s_aSoundsInfo.push({ path: './games/game28/sounds/', filename: 'photo', loop: false, volume: 1, ingamename: 'photo' });
        s_aSoundsInfo.push({ path: './games/game28/sounds/', filename: 'soundtrack', loop: true, volume: 1, ingamename: 'soundtrack' });

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
                                if (s_aSoundsInfo[i].ingamename === "soundtrack" && s_oGame !== null) {
                                    setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
                                }

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

        s_oSpriteLibrary.addSprite("bg_menu", "./games/game28/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_exit", "./games/game28/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./games/game28/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_play", "./games/game28/sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_restart", "./games/game28/sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_home", "./games/game28/sprites/but_home.png");
        s_oSpriteLibrary.addSprite("msg_box", "./games/game28/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("but_credits", "./games/game28/sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./games/game28/sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./games/game28/sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_no", "./games/game28/sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_yes", "./games/game28/sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("arrow_left", "./games/game28/sprites/arrow_left.png");
        s_oSpriteLibrary.addSprite("arrow_right", "./games/game28/sprites/arrow_right.png");
        s_oSpriteLibrary.addSprite("fiche_0", "./games/game28/sprites/fiche_0.png");
        s_oSpriteLibrary.addSprite("fiche_1", "./games/game28/sprites/fiche_1.png");
        s_oSpriteLibrary.addSprite("fiche_2", "./games/game28/sprites/fiche_2.png");
        s_oSpriteLibrary.addSprite("fiche_3", "./games/game28/sprites/fiche_3.png");
        s_oSpriteLibrary.addSprite("fiche_4", "./games/game28/sprites/fiche_4.png");
        s_oSpriteLibrary.addSprite("fiche_5", "./games/game28/sprites/fiche_5.png");
        s_oSpriteLibrary.addSprite("bg_bet_panel", "./games/game28/sprites/bg_bet_panel.jpg");
        s_oSpriteLibrary.addSprite("money_panel", "./games/game28/sprites/money_panel.png");
        s_oSpriteLibrary.addSprite("simple_bet_panel", "./games/game28/sprites/simple_bet_panel.png");
        s_oSpriteLibrary.addSprite("forecast_panel", "./games/game28/sprites/forecast_panel.png");
        s_oSpriteLibrary.addSprite("bet_place", "./games/game28/sprites/bet_place.png");
        s_oSpriteLibrary.addSprite("fiche_highlight", "./games/game28/sprites/fiche_highlight.png");
        s_oSpriteLibrary.addSprite("odd_bg", "./games/game28/sprites/odd_bg.png");
        s_oSpriteLibrary.addSprite("rank_panel", "./games/game28/sprites/rank_panel.png");
        s_oSpriteLibrary.addSprite("panel_arrival", "./games/game28/sprites/panel_arrival.png");
        s_oSpriteLibrary.addSprite("bibs", "./games/game28/sprites/bibs.png");
        s_oSpriteLibrary.addSprite("but_skip", "./games/game28/sprites/but_skip.png");
        s_oSpriteLibrary.addSprite("logo_menu", "./games/game28/sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("but_start_race", "./games/game28/sprites/but_start_race.png");
        s_oSpriteLibrary.addSprite("but_clear_bet", "./games/game28/sprites/but_clear_bet.png");
        s_oSpriteLibrary.addSprite("fiche_panel", "./games/game28/sprites/fiche_panel.png");
        s_oSpriteLibrary.addSprite("fill_bar", "./games/game28/sprites/fill_bar.png");
        s_oSpriteLibrary.addSprite("win_panel", "./games/game28/sprites/win_panel.png");
        s_oSpriteLibrary.addSprite("lose_panel", "./games/game28/sprites/lose_panel.png");

        for (var i = 0; i < NUM_GREYHOUNDS; i++) {
            s_oSpriteLibrary.addSprite("bib_gui_" + i, "./games/game28/sprites/bib_gui_" + i + ".png");
            s_oSpriteLibrary.addSprite("greyhound_" + (i + 1), "./games/game28/sprites/greyhound_" + (i + 1) + ".png");
        }

        for (var j = 0; j < NUM_TRACK_BG; j++) {
            s_oSpriteLibrary.addSprite("bg_track_" + j, "./games/game28/sprites/bg_track/bg_track_" + j + ".jpg");
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

    this._onRemovePreloader = function() {
        try {
            saveItem("ls_available", "ok");
        } catch (evt) {
            // localStorage not defined
            s_bStorageAvailable = false;
        }

        _oPreloader.unload();


        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            s_oSoundTrack = playSound("soundtrack", 1, true);
        }



        this.gotoMenu();
    };

    this.gotoMenu = function() {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoBetPanel = function() {
        new CBetPanel();
        _iState = STATE_BET_PANEL;
        $(s_oMain).trigger("start_session");
    };

    this.gotoGame = function(_iTotBet) {
        _oGame = new CGame(_iTotBet);
        _iState = STATE_GAME;
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
    s_iCurMoney = oData.money;
    s_iGameCash = oData.game_cash;
    CHIP_VALUES = oData.chip_values;
    MIN_BET = oData.min_bet;
    MAX_BET = oData.max_bet;
    WIN_OCCURRENCE = oData.win_occurrence;
    AD_SHOW_COUNTER = oData.num_levels_for_ads;

    SHOW_CREDITS = oData.show_credits;
    ENABLE_FULLSCREEN = oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;

    NUM_CHIPS = CHIP_VALUES.length;
    s_bAudioActive = oData.audio_enable_on_startup;


    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = true;
var s_bFullscreen = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_oCanvas;
var s_bStorageAvailable = true;
var s_iCurMoney;
var s_iGameCash;
var s_iAdCounter = 0;
var s_aSounds;
var s_aSoundsInfo;