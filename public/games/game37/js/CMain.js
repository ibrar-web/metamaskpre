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
            s_oStage.enableMouseOver(20);
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

        s_oGameSettings = new CGameSettings();
        _bUpdate = true;
    };

    this.preloaderReady = function() {
        this._loadImages();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
        }
    };

    this.soundLoaded = function() {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);

        _oPreloader.refreshLoader(iPerc);

        if (_iCurResource === RESOURCE_TO_LOAD) {
            _oPreloader.unload();

            this.gotoMenu();
        }
    };

    this._initSounds = function() {
        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }

        if (navigator.userAgent.indexOf("Opera") > 0 || navigator.userAgent.indexOf("OPR") > 0) {
            createjs.Sound.alternateExtensions = ["mp3"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./games/game37/sounds/card.ogg", "card");
            createjs.Sound.registerSound("./games/game37/sounds/chip.ogg", "chip");
            createjs.Sound.registerSound("./games/game37/sounds/fiche_collect.ogg", "fiche_collect");
            createjs.Sound.registerSound("./games/game37/sounds/press_but.ogg", "press_but");
            createjs.Sound.registerSound("./games/game37/sounds/win.ogg", "win");
            createjs.Sound.registerSound("./games/game37/sounds/lose.ogg", "lose");
        } else {
            createjs.Sound.alternateExtensions = ["ogg"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./games/game37/sounds/card.mp3", "card", 4);
            createjs.Sound.registerSound("./games/game37/sounds/chip.mp3", "chip", 4);
            createjs.Sound.registerSound("./games/game37/sounds/fiche_collect.mp3", "fiche_collect");
            createjs.Sound.registerSound("./games/game37/sounds/press_but.mp3", "press_but");
            createjs.Sound.registerSound("./games/game37/sounds/win.mp3", "win");
            createjs.Sound.registerSound("./games/game37/sounds/lose.mp3", "lose");
        }
        RESOURCE_TO_LOAD += 6;

    };

    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("but_menu_bg", "./games/game37/sprites/but_menu_bg.png");
        s_oSpriteLibrary.addSprite("but_game_bg", "./games/game37/sprites/but_game_bg.png");
        s_oSpriteLibrary.addSprite("but_exit", "./games/game37/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./games/game37/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("audio_icon", "./games/game37/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("bg_game", "./games/game37/sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("card_spritesheet", "./games/game37/sprites/card_spritesheet.png");
        s_oSpriteLibrary.addSprite("msg_box", "./games/game37/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("display_bg", "./games/game37/sprites/display_bg.png");
        s_oSpriteLibrary.addSprite("fiche_highlight", "./games/game37/sprites/fiche_highlight.png");
        s_oSpriteLibrary.addSprite("win_bg", "./games/game37/sprites/win_bg.png");
        s_oSpriteLibrary.addSprite("but_clear", "./games/game37/sprites/but_clear.png");
        s_oSpriteLibrary.addSprite("but_generic", "./games/game37/sprites/but_generic.png");
        s_oSpriteLibrary.addSprite("but_rebet", "./games/game37/sprites/but_rebet.png");
        s_oSpriteLibrary.addSprite("gui_bg", "./games/game37/sprites/gui_bg.png");
        s_oSpriteLibrary.addSprite("bet_ante", "./games/game37/sprites/bet_ante.png");
        s_oSpriteLibrary.addSprite("bet_raise", "./games/game37/sprites/bet_raise.png");
        s_oSpriteLibrary.addSprite("puck", "./games/game37/sprites/puck.png");
        s_oSpriteLibrary.addSprite("toggle_progressive", "./games/game37/sprites/toggle_progressive.png");
        s_oSpriteLibrary.addSprite("help_cursor", "./games/game37/sprites/help_cursor.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./games/game37/sprites/but_fullscreen.png");

        for (var i = 0; i < NUM_FICHES; i++) {
            s_oSpriteLibrary.addSprite("fiche_" + i, "./games/game37/sprites/fiche_" + i + ".png");
        }

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function() {
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);

        _oPreloader.refreshLoader(iPerc);

        if (_iCurResource === RESOURCE_TO_LOAD) {
            _oPreloader.unload();

            this.gotoMenu();
        }
    };

    this._onAllImagesLoaded = function() {

    };

    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages();
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
        createjs.Sound.setMute(true);
    };

    this.startUpdate = function() {
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display", "none");

        if (s_bAudioActive) {
            createjs.Sound.setMute(false);
        }
    };

    this._update = function(event) {
        if (!_bUpdate) {
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
    ENABLE_CHECK_ORIENTATION = _oData.check_orientation;

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
var s_oGameSettings;