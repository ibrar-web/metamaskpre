function CInterface(iMoney) {
    var _iFicheIndex;
    var _aFiches;
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;

    var _oButExit;
    var _oClearBetBut;
    var _oRebetBut;
    var _oBetAnte;
    var _oDealBut;
    var _oButSplit;
    var _oHouseWay;
    var _oAudioToggle;
    var _oMoneyText;
    var _oDisplayText1;
    var _oDisplayText2;
    var _oPlayerHighHandEvalText;
    var _oPlayerLowHandEvalText;
    var _oDealerHighHandEvalText;
    var _oDealerLowHandEvalText;
    var _oFicheHighlight;
    var _oAnimText;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    this._init = function(iMoney) {
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = { x: CANVAS_WIDTH - (oSprite.width / 2) - 10, y: (oSprite.height / 2) + 10 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        var oSpriteFullscreen = s_oSpriteLibrary.getSprite('but_fullscreen');
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _pStartPosAudio = { x: _oButExit.getX() - oSprite.width - 10, y: (oSprite.height / 2) + 10 };
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, s_oSpriteLibrary.getSprite('audio_icon'), s_bAudioActive, true);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);

            _pStartPosFullscreen = { x: _pStartPosAudio.x - oSpriteFullscreen.width / 2 - 10, y: oSpriteFullscreen.height / 2 + 10 };
        } else {
            _pStartPosFullscreen = { x: _pStartPosExit.x - oSpriteFullscreen.width / 2 - 10, y: oSpriteFullscreen.height / 2 + 10 };
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (ENABLE_FULLSCREEN === false) {
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSpriteFullscreen, s_bFullscreen, true);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        var oDisplayBg = createBitmap(s_oSpriteLibrary.getSprite('display_bg'));
        oDisplayBg.x = 290;
        oDisplayBg.y = 6;
        s_oStage.addChild(oDisplayBg);

        var oSpriteGuiBg = s_oSpriteLibrary.getSprite('gui_bg');
        var oGuiBg = createBitmap(oSpriteGuiBg);
        oGuiBg.y = CANVAS_HEIGHT - oSpriteGuiBg.height;
        s_oStage.addChild(oGuiBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_clear');
        _oClearBetBut = new CGfxButton(830, CANVAS_HEIGHT - oSprite.height / 2, oSprite, s_oStage);
        _oClearBetBut.addEventListener(ON_MOUSE_UP, this._onButClearRelease, this);

        oSprite = s_oSpriteLibrary.getSprite('but_rebet');
        _oRebetBut = new CGfxButton(890, CANVAS_HEIGHT - oSprite.height / 2, oSprite, s_oStage);
        _oRebetBut.disable();
        _oRebetBut.addEventListener(ON_MOUSE_UP, this._onButRebetRelease, this);

        oSprite = s_oSpriteLibrary.getSprite('but_generic');
        _oDealBut = new CTextButton(1012, CANVAS_HEIGHT - oSprite.height / 2, oSprite, TEXT_DEAL, FONT_GAME_1, "#ffffff", 30, s_oStage);
        _oDealBut.addEventListener(ON_MOUSE_UP, this._onButDealRelease, this);

        _oHouseWay = new CTextButton(1202, CANVAS_HEIGHT - oSprite.height / 2, oSprite, TEXT_HOUSE_WAY, FONT_GAME_1, "#ffffff", 27, s_oStage);
        _oHouseWay.addEventListener(ON_MOUSE_UP, this._onButHouseWayRelease, this);

        _oButSplit = new CGfxButton(1060, 570, s_oSpriteLibrary.getSprite('but_split'), s_oStage);
        _oButSplit.setVisible(false);
        _oButSplit.addEventListener(ON_MOUSE_UP, this._onButSplitRelease, this);

        POS_BET = { x: CANVAS_WIDTH / 2, y: 415 };

        _oBetAnte = new CGfxButton(POS_BET.x, POS_BET.y, s_oSpriteLibrary.getSprite('bet_ante'), s_oStage);
        _oBetAnte.addEventListener(ON_MOUSE_UP, this._onButAnteRelease, this);

        var oHighDealerText = new CTLText(s_oStage,
            634, 168, 200, 17,
            17, "center", "#ffde00", FONT_GAME_1, 1,
            0, 0,
            TEXT_HIGH_HAND,
            true, true, false,
            false);




        var oLowDealerText = new CTLText(s_oStage,
            868, 168, 200, 17,
            17, "center", "#ffde00", FONT_GAME_1, 1,
            0, 0,
            TEXT_LOW_HAND,
            true, true, false,
            false);



        var oHighPlayerText = new CTLText(s_oStage,
            634, 638, 200, 17,
            17, "center", "#ffde00", FONT_GAME_1, 1,
            0, 0,
            TEXT_HIGH_HAND,
            true, true, false,
            false);



        var oLowPlayerText = new CTLText(s_oStage,
            868, 638, 200, 17,
            17, "center", "#ffde00", FONT_GAME_1, 1,
            0, 0,
            TEXT_LOW_HAND,
            true, true, false,
            false);



        _oPlayerHighHandEvalText = new createjs.Text("", "17px " + FONT_GAME_1, "#fff");
        _oPlayerHighHandEvalText.x = 740;
        _oPlayerHighHandEvalText.y = 490;
        _oPlayerHighHandEvalText.textAlign = "center";
        s_oStage.addChild(_oPlayerHighHandEvalText);

        _oPlayerLowHandEvalText = new createjs.Text("", "17px " + FONT_GAME_1, "#fff");
        _oPlayerLowHandEvalText.x = 970;
        _oPlayerLowHandEvalText.y = 490;
        _oPlayerLowHandEvalText.textAlign = "center";
        s_oStage.addChild(_oPlayerLowHandEvalText);

        _oDealerHighHandEvalText = new createjs.Text("", "17px " + FONT_GAME_1, "#fff");
        _oDealerHighHandEvalText.x = 740;
        _oDealerHighHandEvalText.y = 310;
        _oDealerHighHandEvalText.textAlign = "center";
        s_oStage.addChild(_oDealerHighHandEvalText);

        _oDealerLowHandEvalText = new createjs.Text("", "17px " + FONT_GAME_1, "#fff");
        _oDealerLowHandEvalText.x = 970;
        _oDealerLowHandEvalText.y = 310;
        _oDealerLowHandEvalText.textAlign = "center";
        s_oStage.addChild(_oDealerLowHandEvalText);

        _oDisplayText1 = new CTLText(s_oStage,
            405, 18, 190, 40,
            24, "left", "#ffde00", FONT_GAME_2, 1,
            0, 0,
            " ",
            true, true, true,
            false);



        _oDisplayText2 = new CTLText(s_oStage,
            405, 60, 190, 40,
            18, "left", "#ffde00", FONT_GAME_2, 1,
            0, 0,
            " ",
            true, true, true,
            false);


        var oMoneyText = new CTLText(s_oStage,
            300, CANVAS_HEIGHT - 84, 96, 30,
            30, "left", "#ffde00", FONT_GAME_2, 1,
            0, 0,
            TEXT_MONEY + ":",
            true, true, true,
            false);



        _oMoneyText = new CTLText(s_oStage,
            400, CANVAS_HEIGHT - 84, 210, 30,
            30, "left", "#ffde00", FONT_GAME_2, 1,
            0, 0,
            formatValue(iMoney),
            true, true, true,
            false);

        //SET FICHES BUTTON
        var aPos = [{ x: 337, y: CANVAS_HEIGHT - 24 }, { x: 417, y: CANVAS_HEIGHT - 24 }, { x: 497, y: CANVAS_HEIGHT - 24 }, { x: 577, y: CANVAS_HEIGHT - 24 }, { x: 657, y: CANVAS_HEIGHT - 24 }, { x: 737, y: CANVAS_HEIGHT - 24 }];
        _aFiches = new Array();
        var aFichesValues = CHIP_VALUES;
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i] = new CFicheBut(i, aPos[i].x, aPos[i].y, 1, s_oStage);
            _aFiches[i].addEventListenerWithParams(ON_MOUSE_UP, this._onFicheClicked, this, [aFichesValues[i], i]);;
        }

        var oSpriteHighlight = s_oSpriteLibrary.getSprite('fiche_highlight');
        _oFicheHighlight = createBitmap(oSpriteHighlight);
        _oFicheHighlight.regX = oSpriteHighlight.width / 2;
        _oFicheHighlight.regY = oSpriteHighlight.height / 2;
        _oFicheHighlight.x = _aFiches[0].getX();
        _oFicheHighlight.y = _aFiches[0].getY();
        s_oStage.addChild(_oFicheHighlight);

        _iFicheIndex = 0;

        FICHE_WIDTH = oSprite.width;

        _oAnimText = new CAnimText(CANVAS_WIDTH, CANVAS_HEIGHT, s_oStage);

        this.disableButtons();

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function() {
        _oButExit.unload();
        _oButExit = null;

        if (DISABLE_SOUND_MOBILE === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.unload();
        }

        _oClearBetBut.unload();
        _oDealBut.unload();
        _oRebetBut.unload();

        s_oInterface = null;
    };

    this.refreshButtonPos = function(iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX, _pStartPosFullscreen.y + iNewY);
        }
    };

    this.reset = function() {
        this.disableButtons();
    };

    this.enableBetFiches = function(bRebet) {
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i].enable();
        }
        _oClearBetBut.enable();
        _oBetAnte.enable();

        if (bRebet) {
            _oRebetBut.enable();
        }
    };

    this.disableBetFiches = function() {
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i].disable();
        }
        _oClearBetBut.disable();
        _oRebetBut.disable();
        _oBetAnte.disable();
    };

    this.disableButtons = function() {
        _oDealBut.disable();
        _oHouseWay.disable();
        _oButSplit.setVisible(false);
    };

    this.disableDeal = function(bValue) {
        if (bValue) {
            _oDealBut.disable();
            _oHouseWay.enable();
        } else {
            _oDealBut.enable();
            _oHouseWay.disable();
        }
    };

    this.enable = function(bDealBut) {
        if (bDealBut) {
            _oDealBut.enable();
        } else {
            _oDealBut.disable();
        }
    };

    this.enableSplit = function(bEnable) {
        _oButSplit.setVisible(bEnable);
    };

    this.refreshCredit = function(iMoney) {

        $.post("update25", { _token: $('meta[name=csrf-token]').attr('content'), amount: iMoney }, function(t) {
            _oMoneyText.refreshText(t);
        });
        
    };

    this.refreshHandValueText = function(szHighPlayer, szLowPlayer, szHighDealer, szLowDealer) {
        _oPlayerHighHandEvalText.text = szHighPlayer;
        _oPlayerLowHandEvalText.text = szLowPlayer;
        _oDealerHighHandEvalText.text = szHighDealer;
        _oDealerLowHandEvalText.text = szLowDealer;
    };

    this.clearHandValueText = function() {
        _oPlayerHighHandEvalText.text = "";
        _oPlayerLowHandEvalText.text = "";
        _oDealerHighHandEvalText.text = "";
        _oDealerLowHandEvalText.text = "";
    };

    this.displayMsg = function(szMsg, szMsgBig) {
        _oDisplayText1.refreshText(szMsg);
        _oDisplayText2.refreshText(szMsgBig);
    };

    this.clearCardValueText = function() {
        _oAnimText.hide();
    };

    this._onFicheClicked = function(aParams) {
        _oFicheHighlight.x = _aFiches[aParams[1]].getX();
        _oFicheHighlight.y = _aFiches[aParams[1]].getY();

        _iFicheIndex = aParams[1];
    };

    this.showResultText = function(szText) {
        _oAnimText.show({ x: -200, y: CANVAS_HEIGHT / 2 + 140 }, { x: CANVAS_WIDTH / 2 - 450, y: CANVAS_HEIGHT / 2 + 140 }, szText);
    };

    this._onButClearRelease = function() {
        s_oGame.clearBets();
    };

    this._onButRebetRelease = function() {
        _oRebetBut.disable();
        s_oGame.onRebet();
    };

    this._onButAnteRelease = function() {
        s_oGame.setBet(_iFicheIndex);
    };

    this._onButDealRelease = function() {
        this.disableBetFiches();
        this.disableDeal(true);
        s_oGame.onDeal();
    };

    this._onButHouseWayRelease = function() {
        this.disableBetFiches();
        this.disableButtons();
        s_oGame.onHouseWay();
    };

    this._onButSplitRelease = function() {
        s_oGame.onSplitHand();
    };

    this._onExit = function() {
        s_oGame.onExit();
    };

    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.resetFullscreenBut = function() {
        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };

    this._onFullscreenRelease = function() {
        if (s_bFullscreen) {
            _fCancelFullScreen.call(window.document);
        } else {
            _fRequestFullScreen.call(window.document.documentElement);
        }

        sizeHandler();
    };

    this.getFicheSelected = function() {
        return _iFicheIndex;
    };

    this.isResultPanelvisible = function() {
        return _oAnimText.isVisible();
    };

    s_oInterface = this;

    this._init(iMoney);

    return this;
}

var s_oInterface = null;