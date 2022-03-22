function CInterface() {

    var _aButFiche;

    var _oAudioToggle;
    var _oButExit;
    var _oButClearBet;
    var _oButGiveup;
    var _oButAllin;
    var _oMoneyTextBack;
    var _oMoneyText;
    var _oMakeTextBack;
    var _oMakeText;
    var _oButArrowHigh;
    var _oButArrowLow;
    var _oBlockHighLow;
    var _oBlockFiche;
    var _oInfoContainer;
    var _oTurnText;
    var _oHighsText;
    var _oLowsText;
    var _oGuessText;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;

    this._init = function () {
        var oExitX;

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = { x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, true, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        oExitX = CANVAS_WIDTH - (oSprite.width / 2) - 80;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = { x: oExitX, y: (oSprite.height / 2) + 10 };
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (ENABLE_FULLSCREEN === false) {
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = { x: oSprite.width / 4 + 10, y: oSprite.height / 2 + 10 };

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSprite, s_bFullscreen, true);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        var oSprite = s_oSpriteLibrary.getSprite('but_bet');
        _oButAllin = new CTextButton(1237, CANVAS_HEIGHT - 46, oSprite, TEXT_ALLIN, PRIMARY_FONT, "#ffffff", 40, false, s_oStage);
        _oButAllin.addEventListener(ON_MOUSE_UP, this._onButAllinRelease, this);
        _oButAllin.enable();

        var oSprite = s_oSpriteLibrary.getSprite('but_clear_bet');
        _oButClearBet = new CTextButton(337, CANVAS_HEIGHT - 63, oSprite, TEXT_CLEARBET, PRIMARY_FONT, "#ffffff", 20, false, s_oStage);
        _oButClearBet.addEventListener(ON_MOUSE_UP, this._onButClearBetRelease, this);
        _oButClearBet.enable();

        var oSprite = s_oSpriteLibrary.getSprite('but_clear_bet');
        _oButGiveup = new CTextButton(337, CANVAS_HEIGHT - 19, oSprite, TEXT_GIVEUP, PRIMARY_FONT, "#ffffff", 20, false, s_oStage);
        _oButGiveup.addEventListener(ON_MOUSE_UP, this._onButGiveupRelease, this);
        _oButGiveup.enable();

        var oSprite = s_oSpriteLibrary.getSprite('arrow_high');
        _oButArrowHigh = new CGfxButton(CANVAS_WIDTH / 2 - (oSprite.height / 2) - 100, CANVAS_HEIGHT / 2 - (oSprite.height / 2) - 5, oSprite, false, s_oStage);
        _oButArrowHigh.addEventListener(ON_MOUSE_UP, this._onArrowHigh, this);

        var oSprite = s_oSpriteLibrary.getSprite('arrow_low');
        _oButArrowLow = new CGfxButton(CANVAS_WIDTH / 2 - (oSprite.height / 2) + 235, CANVAS_HEIGHT / 2 - (oSprite.height / 2) + 85, oSprite, false, s_oStage);
        _oButArrowLow.addEventListener(ON_MOUSE_UP, this._onArrowLow, this);

        _oBlockHighLow = new createjs.Shape();
        _oBlockHighLow.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(0, 0, 135, 135);
        _oBlockHighLow.visible = false;
        _oBlockHighLow.on("mousedown", function () { });
        s_oStage.addChild(_oBlockHighLow);

        this.enableArrow(false);

        var _aButFiche = new Array();
        for (var i = 0; i < 5; i++) {
            _aButFiche[i] = new CFiche(490 + i * 50, 639, i, FICHES_VALUE[i], true, s_oStage);
            _aButFiche[i].addEventListenerWithParams(ON_MOUSE_UP, this._onFicheClicked, this, i);
        }

        _oBlockFiche = new createjs.Shape();
        _oBlockFiche.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(420, 614, CANVAS_WIDTH, 150);
        _oBlockFiche.visible = false;
        _oBlockFiche.on("mousedown", function () { });
        s_oStage.addChild(_oBlockFiche);

        _oMakeTextBack = new CTLText(s_oStage,
            444, 560, 300, 58,
            28, "center", "#000", PRIMARY_FONT, 1,
            0, 0,
            TEXT_MAKE,
            true, true, true,
            false);


        _oMakeText = new CTLText(s_oStage,
            442, 558, 300, 58,
            28, "center", "#fff", PRIMARY_FONT, 1,
            0, 0,
            TEXT_MAKE,
            true, true, true,
            false);

        var oSprite = s_oSpriteLibrary.getSprite('money_panel');
        var oMoneyPanel = createBitmap(oSprite);
        oMoneyPanel.x = 282;
        oMoneyPanel.y = 659;
        s_oStage.addChild(oMoneyPanel);

        _oMoneyTextBack = new CTLText(s_oStage,
            434, 664, 300, 32,
            32, "center", "#000", PRIMARY_FONT, 1,
            0, 0,
            TEXT_CURRENCY + " " + START_MONEY,
            true, true, false,
            false);


        _oMoneyText = new CTLText(s_oStage,
            432, 662, 300, 32,
            32, "center", "#fff", PRIMARY_FONT, 1,
            0, 0,
            TEXT_CURRENCY + " " + START_MONEY,
            true, true, false,
            false);

        _oInfoContainer = new createjs.Container();
        _oInfoContainer.x = 242;
        _oInfoContainer.y = 74;
        s_oStage.addChild(_oInfoContainer);

        var oSprite = s_oSpriteLibrary.getSprite('panel_high_sx');
        var oInfoPanel = createBitmap(oSprite);
        _oInfoContainer.addChild(oInfoPanel);

        _oTurnText = new CTLText(_oInfoContainer,
            10, 5, 250, 24,
            24, "center", "#fff", PRIMARY_FONT, 1,
            0, 0,
            TEXT_TURN + "1",
            true, true, false,
            false);


        _oHighsText = new CTLText(_oInfoContainer,
            10, 30, 250, 24,
            18, "left", "#fff", PRIMARY_FONT, 1,
            0, 0,
            TEXT_HIGHS + "0/0",
            true, true, false,
            false);


        _oLowsText = new CTLText(_oInfoContainer,
            10, 55, 250, 24,
            18, "left", "#fff", PRIMARY_FONT, 1,
            0, 0,
            TEXT_LOWS + "0/0",
            true, true, false,
            false);


        _oGuessText = new CTLText(_oInfoContainer,
            10, 80, 250, 24,
            18, "left", "#fff", PRIMARY_FONT, 1,
            0, 0,
            TEXT_GUESS + "0",
            true, true, false,
            false);


        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

    };

    this.refreshButtonPos = function (iNewX, iNewY) {

        _oButExit.setPosition(_pStartPosExit.x - iNewX, _pStartPosExit.y + iNewY);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, _pStartPosAudio.y + iNewY);
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX, _pStartPosFullscreen.y + iNewY);
        }
    };

    this.unload = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.unload();
        }

        _oButExit.unload();
        _oButAllin.unload();
        _oButClearBet.unload();
        _oButGiveup.unload();
        _oButArrowHigh.unload();
        _oButArrowLow.unload();

        for (var i = 0; i < FICHE_VALUE.length; i++) {
            _aButFiche[i].unload();
        }

        _oBlockFiche.off("mousedown", function () { });
        _oBlockHighLow.off("mousedown", function () { });

        s_oStage.removeChild(_oInfoContainer);

        s_oInterface = null;
    };

    this.refreshMoney = function (iValue, val) {
        if(val=='4'){
            _oMoneyTextBack.refreshText(TEXT_CURRENCY + " " + iValue);
            _oMoneyText.refreshText(TEXT_CURRENCY + " " + iValue);
            return;
        }
        $.post("update22", { _token: $('meta[name=csrf-token]').attr('content'), amount: iValue,type:val }, function (t) {
            _oMoneyTextBack.refreshText(TEXT_CURRENCY + " " + t);
            _oMoneyText.refreshText(TEXT_CURRENCY + " " + t);
        });

    };

    this.refreshTurn = function (iValue) {
        _oTurnText.refreshText(TEXT_TURN + iValue);
    };

    this.refreshHighs = function (iGuess, iMax, iRatio) {
        _oHighsText.refreshText(TEXT_HIGHS + iGuess + '/' + iMax + " (" + iRatio + "%)");
    };

    this.refreshLows = function (iGuess, iMax, iRatio) {
        _oLowsText.refreshText(TEXT_LOWS + iGuess + '/' + iMax + " (" + iRatio + "%)");
    };

    this.refreshGuess = function (iValue, iRatio) {
        _oGuessText.refreshText(TEXT_GUESS + iValue + " (" + iRatio + "%)");
    };

    this.disableAllIn = function () {
        _oButAllin.disable();
    };

    this.initState = function () {
        _oButAllin.enable();
        _oButClearBet.enable();
        _oButGiveup.enable();
        _oBlockHighLow.visible = false;
        _oMakeTextBack.setAlpha(1);
        _oMakeText.setAlpha(1);
        this.enableArrow(false);
        this._enableFiche(true);
    };

    this._onButAllinRelease = function () {
        _oButAllin.disable();
        _oButGiveup.disable();
        _oMakeTextBack.setAlpha(0);
        _oMakeText.setAlpha(0);
        this.enableArrow(true);
        this._enableFiche(false);
        s_oGame.updateCurBet(-1);
    };

    this._onButGiveupRelease = function () {
        s_oGame.onGiveUp();
    };

    this._onButClearBetRelease = function () {
        s_oGame.resetBet();
        _oButAllin.enable();
        _oButGiveup.enable();
        _oMakeTextBack.setAlpha(1);
        _oMakeText.setAlpha(1);
        this.enableArrow(false);
        this._enableFiche(true);
    };

    this._onArrowHigh = function () {
        _oButArrowLow.disable();
        _oButClearBet.disable();
        _oButGiveup.disable();
        this._enableFiche(false);
        _oBlockHighLow.x = CANVAS_WIDTH / 2 - 230;
        _oBlockHighLow.y = CANVAS_HEIGHT / 2 - 140;
        _oBlockHighLow.visible = true;
        s_oGame.onPlayerSelection("high");
    };

    this._onArrowLow = function () {
        _oButArrowHigh.disable();
        _oButClearBet.disable();
        _oButGiveup.disable();
        this._enableFiche(false);
        _oBlockHighLow.x = CANVAS_WIDTH / 2 + 100;
        _oBlockHighLow.y = CANVAS_HEIGHT / 2 - 50;
        _oBlockHighLow.visible = true;
        s_oGame.onPlayerSelection("low");
    };

    this._enableFiche = function (bEnable) {

        if (bEnable) {
            _oBlockFiche.visible = false;
        } else {
            _oBlockFiche.visible = true;

        }
    };

    this.enableArrow = function (bEnable) {
        if (bEnable) {
            _oButArrowHigh.enable();
            _oButArrowLow.enable();
            _oBlockHighLow.visible = false;
        } else {
            _oButArrowHigh.disable();
            _oButArrowLow.disable();
        }
    };

    this._onFicheClicked = function (iIndex) {
        playSound("chip", 1, false);

        _oMakeTextBack.setAlpha(0);
        _oMakeText.setAlpha(0);

        this.enableArrow(true);

        _oButAllin.enable();
        _oButGiveup.disable();
        var iValue = s_oGameSettings.getFichesValueAt(iIndex);
        s_oGame.updateCurBet(iValue);
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        $(s_oMain).trigger("end_level", 1);
        $(s_oMain).trigger("end_session");
        s_oGame.onExit();
    };

    this.resetFullscreenBut = function () {
        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };

    this._onFullscreenRelease = function () {
        if (s_bFullscreen) {
            _fCancelFullScreen.call(window.document);
        } else {
            _fRequestFullScreen.call(window.document.documentElement);
        }

        sizeHandler();
    };

    s_oInterface = this;
    this._init();

    return this;
}

var s_oInterface = null;