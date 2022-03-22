function CInterface(iMoney) {
    var _iFicheIndex;
    var _aFiches;
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;

    var _oButExit;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oClearBetBut;
    var _oRebetBut;
    var _oBetAnte;
    var _oDealBut;
    var _oRaiseBut;
   var  reddog
    var _oCallBut;
    var _oCollectBut;
    var _oAudioToggle = null;
    var _oToggleProgressive;
    var _oMoneyText;
    var _oDisplayText1;
    var _oDisplayText2;
    var _oFicheHighlight;
    var _oAnimText;

    this._init = function(iMoney) {
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = { x: CANVAS_WIDTH - (oSprite.width / 2) - 10, y: (oSprite.height / 2) + 10 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _pStartPosAudio = { x: _oButExit.getX() - oSprite.width - 10, y: (oSprite.height / 2) + 10 };
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, s_oSpriteLibrary.getSprite('audio_icon'), s_bAudioActive, true);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (ENABLE_FULLSCREEN === false) {
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && inIframe() === false) {
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            if (_oAudioToggle === null) {
                _pStartPosFullscreen = { x: _oButExit.getX() - oSprite.width / 2 - 10, y: oSprite.height / 2 + 10 };
            } else {
                _pStartPosFullscreen = { x: _pStartPosAudio.x - oSprite.width / 2 - 10, y: oSprite.height / 2 + 10 };
            }
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSprite, s_bFullscreen, true);
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

        _oRaiseBut = new CTextButton(1380, CANVAS_HEIGHT - oSprite.height / 2, oSprite, TEXT_RAISE, FONT_GAME_1, "#ffffff", 30, s_oStage);
        _oRaiseBut.addEventListener(ON_MOUSE_UP, this._onButRaiseRelease, this);

        _oCallBut = new CTextButton(1196, CANVAS_HEIGHT - oSprite.height / 2, oSprite, TEXT_CALL, FONT_GAME_1, "#ffffff", 30, s_oStage);
        _oCallBut.addEventListener(ON_MOUSE_UP, this._onButCallRelease, this);

        _oCollectBut = new CTextButton(1196, CANVAS_HEIGHT - oSprite.height / 2, oSprite, TEXT_COLLECT, FONT_GAME_1, "#ffffff", 30, s_oStage);
        _oCollectBut.setVisible(false);
        _oCollectBut.addEventListener(ON_MOUSE_UP, this._onButCollectRelease, this);

        POS_BET[BET_ANTE] = { x: CANVAS_WIDTH / 2 - 100, y: 600 };
        POS_BET[BET_RAISE] = { x: CANVAS_WIDTH / 2 + 100, y: 600 };

        _oBetAnte = new CGfxButton(POS_BET[BET_ANTE].x, POS_BET[BET_ANTE].y, s_oSpriteLibrary.getSprite('bet_ante'), s_oStage);
        _oBetAnte.addEventListener(ON_MOUSE_UP, this._onButAnteRelease, this);

        var oTextProg = new createjs.Text(TEXT_PROGRESSIVE, "14px " + FONT_GAME_1, "#ffde00");
        oTextProg.x = 502;
        oTextProg.y = 496;
        oTextProg.textAlign = "left";
        s_oStage.addChild(oTextProg);

        _oToggleProgressive = new CToggle(480, 504, s_oSpriteLibrary.getSprite("toggle_progressive"), s_bProgressiveAnte, false);
        _oToggleProgressive.addEventListener(ON_MOUSE_UP, this._onToggleProgressiveRelease, this);

        var oSpriteRaise = s_oSpriteLibrary.getSprite('bet_raise');
        var oGfxRaise = createBitmap(oSpriteRaise);
        oGfxRaise.x = POS_BET[BET_RAISE].x;
        oGfxRaise.y = POS_BET[BET_RAISE].y;
        oGfxRaise.regX = oSpriteRaise.width / 2;
        oGfxRaise.regY = oSpriteRaise.height / 2;
        s_oStage.addChild(oGfxRaise);

        _oDisplayText1 = new createjs.Text("", "24px " + FONT_GAME_2, "#ffde00");
        _oDisplayText1.x = 402;
        _oDisplayText1.y = 16;
        _oDisplayText1.lineWidth = 210;
        _oDisplayText1.textAlign = "left";
        _oDisplayText1.lineHeight = 20;
        s_oStage.addChild(_oDisplayText1);

        _oDisplayText2 = new createjs.Text("", "19px " + FONT_GAME_2, "#ffde00");
        _oDisplayText2.x = 402;
        _oDisplayText2.y = 46;
        _oDisplayText2.lineWidth = 210;
        _oDisplayText2.textAlign = "left";
        _oDisplayText2.lineHeight = 18;
        s_oStage.addChild(_oDisplayText2);

        var oMoneyText = new createjs.Text(TEXT_MONEY + ":", "30px " + FONT_GAME_2, "#ffde00");
        oMoneyText.x = 320;
        oMoneyText.y = CANVAS_HEIGHT - 84;
        oMoneyText.textAlign = "left";
        s_oStage.addChild(oMoneyText);

        _oMoneyText = new createjs.Text(TEXT_CURRENCY + iMoney.toFixed(3), "30px " + FONT_GAME_2, "#ffde00");
        _oMoneyText.x = 410;
        _oMoneyText.y = CANVAS_HEIGHT - 84;
        _oMoneyText.textAlign = "left";
        s_oStage.addChild(_oMoneyText);

        //SET FICHES BUTTON
        var aPos = [{ x: 337, y: CANVAS_HEIGHT - 24 }, { x: 417, y: CANVAS_HEIGHT - 24 }, { x: 497, y: CANVAS_HEIGHT - 24 }, { x: 577, y: CANVAS_HEIGHT - 24 }, { x: 657, y: CANVAS_HEIGHT - 24 }, { x: 737, y: CANVAS_HEIGHT - 24 }];
        _aFiches = new Array();
        var aFichesValues = s_oGameSettings.getFichesValues();
        for (var i = 0; i < NUM_FICHES; i++) {

            oSprite = s_oSpriteLibrary.getSprite('fiche_' + i);
            _aFiches[i] = new CGfxButton(aPos[i].x, aPos[i].y, oSprite, s_oStage);
            _aFiches[i].addEventListenerWithParams(ON_MOUSE_UP, this._onFicheClicked, this, [aFichesValues[i], i]);
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

        _oClearBetBut.unload();
        _oDealBut.unload();
        _oRebetBut.unload();

        if (_fRequestFullScreen && inIframe() === false) {
            _oButFullscreen.unload();
        }

        s_oInterface = null;
    };

    this.refreshButtonPos = function(iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }

        if (_fRequestFullScreen && inIframe() === false) {
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
        _oCallBut.disable();
        _oRaiseBut.disable();
        _oCollectBut.disable();
    };

    this.enable = function(bDealBut, bRaise, bCall, bCollect) {
        if (bDealBut) {
            _oDealBut.enable();
        } else {
            _oDealBut.disable();
        }

        if (bRaise) {
            _oRaiseBut.enable();
        } else {
            _oRaiseBut.setVisible(false);
            _oRaiseBut.disable();
        }

        if (bCall) {
            _oCallBut.enable();
        } else {
            _oCallBut.setVisible(false);
            _oCallBut.disable();
        }

        if (bCollect) {
            _oCollectBut.enable();
        } else {
            _oCollectBut.setVisible(false);
            _oCollectBut.disable();
        }
    };

    this.refreshCredit = function(iMoney, val) {
        //console.log('iMoney', iMoney, val);
        if(val=='1'){
            _oMoneyText.text = TEXT_CURRENCY + iMoney;
            return;
        }
        $.post("update37", { _token: $('meta[name=csrf-token]').attr('content'), amount: iMoney, type: val }, function(t) {
            _oMoneyText.text = TEXT_CURRENCY + t;
        });
        
    };

    this.displayMsg = function(szMsg, szMsgBig) {
        _oDisplayText1.text = szMsg;
        _oDisplayText2.text = szMsgBig;
    };

    this.hideWinnnerPanel = function() {
        _oAnimText.hide();
    };

    this._onFicheClicked = function(aParams) {
        _oFicheHighlight.x = _aFiches[aParams[1]].getX();
        _oFicheHighlight.y = _aFiches[aParams[1]].getY();

        _iFicheIndex = aParams[1];
    };

    this.showResultText = function(szText) {
        _oAnimText.show({ x: -200, y: CANVAS_HEIGHT / 2 - 200 }, { x: CANVAS_WIDTH / 2 - 326, y: CANVAS_HEIGHT / 2 - 200 }, szText);
    };

    this.toggleProgressive = function() {
        _oToggleProgressive.setActive(s_bProgressiveAnte);
    };

    this._onButClearRelease = function() {
        s_oGame.clearBets();
    };

    this._onButRebetRelease = function() {
        _oRebetBut.disable();
        s_oGame.onRebet();
    };

    this._onButAnteRelease = function() {
        s_oGame.setBet(BET_ANTE, _iFicheIndex);
    };

    this._onButDealRelease = function() {
        this.disableBetFiches();
        this.disableButtons();
        s_oGame.onDeal();
    };

    this._onButRaiseRelease = function() {
        this.disableButtons();
        s_oGame.onRaise();
    };

    this._onButCallRelease = function() {
        this.disableButtons();
        s_oGame.onCall();
    };

    this._onButCollectRelease = function() {
        this.disableButtons();
        s_oGame.onCollect();
    };

    this._onToggleProgressiveRelease = function() {
        s_oGame.toggleProgressive();
    };

    this._onExit = function() {
        s_oGame.onExit();
    };

    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onFullscreenRelease = function() {
        if (s_bFullscreen) {
            _fCancelFullScreen.call(window.document);
            s_bFullscreen = false;
        } else {
            _fRequestFullScreen.call(window.document.documentElement);
            s_bFullscreen = true;
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