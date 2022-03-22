function CInterface(iMoney) {
    var _iFicheValue;
    var _iFicheIndex;
    var _aFiches;
    var _aWinText;
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosHistory;
    var _pStartPosFullscreen;

    var _oButExit;
    var _oClearBetBut;
    var _oRebetBut;
    var _oDealBut;
    var _oAudioToggle = null;
    var _oMoneyText;
    var _oCurDealerCardValueText;
    var _oCurPlayerCardValueText;
    var _oDisplayText1;
    var _oDisplayText2;
    var _oBetTie;
    var _oBetBanker;
    var _oBetPlayer;
    var _oHistory;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    this._init = function (iMoney) {
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

        if (_fRequestFullScreen && screenfull.isEnabled) {
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

        _oBetPlayer = new CGfxButton(CANVAS_WIDTH / 2, 590, s_oSpriteLibrary.getSprite('bet_player'), s_oStage);
        _oBetPlayer.addEventListener(ON_MOUSE_UP, this._onButPlayerRelease, this);

        _oBetBanker = new CGfxButton(CANVAS_WIDTH / 2, 482, s_oSpriteLibrary.getSprite('bet_banker'), s_oStage);
        _oBetBanker.addEventListener(ON_MOUSE_UP, this._onButBankerRelease, this);

        _oBetTie = new CGfxButton(CANVAS_WIDTH / 2, 400, s_oSpriteLibrary.getSprite('bet_tie'), s_oStage);
        _oBetTie.addEventListener(ON_MOUSE_UP, this._onButTieRelease, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_clear');
        _oClearBetBut = new CGuiButton(939, CANVAS_HEIGHT - 31, oSprite, TEXT_CLEAR, FONT_GAME_1, "#ffffff", 17, s_oStage);
        _oClearBetBut.addEventListener(ON_MOUSE_UP, this._onButClearRelease, this);

        oSprite = s_oSpriteLibrary.getSprite('but_rebet');
        _oRebetBut = new CGuiButton(1112, CANVAS_HEIGHT - oSprite.height / 2, oSprite, TEXT_REBET, FONT_GAME_1, "#ffffff", 17, s_oStage);
        _oRebetBut.disable();
        _oRebetBut.addEventListener(ON_MOUSE_UP, this._onButRebetRelease, this);

        _oDisplayText1 = new CTLText(s_oStage,
            412, 12, 190, 50,
            24, "left", "#ffde00", FONT_GAME_2, 1,
            0, 0,
            " ",
            true, true, true,
            false);



        _oDisplayText2 = new CTLText(s_oStage,
            412, 64, 190, 40,
            19, "left", "#ffde00", FONT_GAME_2, 1,
            0, 0,
            " ",
            true, true, true,
            false);



        _oCurDealerCardValueText = new createjs.Text("", "20px " + FONT_GAME_1, "#fff");
        _oCurDealerCardValueText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oCurDealerCardValueText.x = 910;
        _oCurDealerCardValueText.y = 180;
        _oCurDealerCardValueText.textAlign = "right";
        s_oStage.addChild(_oCurDealerCardValueText);

        _oCurPlayerCardValueText = new createjs.Text("", "20px " + FONT_GAME_1, "#fff");
        _oCurPlayerCardValueText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oCurPlayerCardValueText.x = 658;
        _oCurPlayerCardValueText.y = 180;
        _oCurPlayerCardValueText.textAlign = "right";
        s_oStage.addChild(_oCurPlayerCardValueText);

        var oMoneyText = new CTLText(s_oStage,
            350, CANVAS_HEIGHT - 90, 110, 40,
            30, "right", "#ffde00", FONT_GAME_2, 1,
            0, 0,
            TEXT_MONEY + ":",
            true, true, false,
            false);



        _oMoneyText = new CTLText(s_oStage,
            470, CANVAS_HEIGHT - 90, 190, 40,
            30, "left", "#ffde00", FONT_GAME_2, 1,
            0, 0,
            formatValue(iMoney),
            true, true, false,
            false);


        oSprite = s_oSpriteLibrary.getSprite('but_deal');
        _oDealBut = new CGuiButton(1282, CANVAS_HEIGHT - oSprite.height / 2, oSprite, TEXT_DEAL, FONT_GAME_1, "#ffffff", 26, s_oStage);
        _oDealBut.addEventListener(ON_MOUSE_UP, this._onButDealRelease, this);

        _aWinText = new Array();
        _aWinText[BET_TIE] = new CWinDisplay(CANVAS_WIDTH + 100, 360, s_oStage);
        _aWinText[BET_BANKER] = new CWinDisplay(CANVAS_WIDTH + 100, 460, s_oStage);
        _aWinText[BET_PLAYER] = new CWinDisplay(CANVAS_WIDTH + 100, 580, s_oStage);


        POS_BET[BET_TIE] = { x: _oBetTie.getX(), y: _oBetTie.getY() + 15 };
        POS_BET[BET_BANKER] = { x: _oBetBanker.getX(), y: _oBetBanker.getY() + 35 };
        POS_BET[BET_PLAYER] = { x: _oBetPlayer.getX(), y: _oBetPlayer.getY() + 35 };

        //SET FICHES BUTTON
        var aPos = [{ x: 387, y: CANVAS_HEIGHT - 24 }, { x: 467, y: CANVAS_HEIGHT - 24 }, { x: 547, y: CANVAS_HEIGHT - 24 }, { x: 627, y: CANVAS_HEIGHT - 24 }, { x: 707, y: CANVAS_HEIGHT - 24 }, { x: 787, y: CANVAS_HEIGHT - 24 }];
        _aFiches = new Array();


        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i] = new CFiche(aPos[i].x, aPos[i].y, i, FICHES_VALUE[i], 1, true, s_oStage);
            _aFiches[i].addEventListenerWithParams(ON_MOUSE_UP, this._onFicheClicked, this, [FICHES_VALUE[i], i]);
        }

        _iFicheValue = FICHES_VALUE[0];
        _iFicheIndex = 0;

        FICHE_WIDTH = oSprite.width;

        _pStartPosHistory = { x: 10, y: 265 };
        _oHistory = new CHistory(_pStartPosHistory.x, _pStartPosHistory.y, s_oStage);

        this.disableButtons();

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function () {
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
        _oBetBanker.unload();
        _oBetPlayer.unload();
        _oBetTie.unload();
        _oDealBut.unload();
        _oRebetBut.unload();

        s_oInterface = null;
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX, _pStartPosFullscreen.y + iNewY);
        }
        _oHistory.setPosition(_pStartPosHistory.x + iNewX, _pStartPosHistory.y);
    };

    this.reset = function () {
        this.disableButtons();
    };

    this.enableBetFiches = function (bRebet) {
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i].enable();
        }
        _oClearBetBut.enable();

        if (bRebet) {
            _oRebetBut.enable();
        }

        _oBetTie.enable();
        _oBetBanker.enable();
        _oBetPlayer.enable();
    };

    this.disableBetFiches = function () {
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i].disable();
        }
        _oClearBetBut.disable();
        _oRebetBut.disable();

        _oBetTie.disable();
        _oBetBanker.disable();
        _oBetPlayer.disable();
    };

    this.disableButtons = function () {
        _oDealBut.disable();
    };

    this.enable = function (bDealBut) {
        if (bDealBut) {
            _oDealBut.enable();
        } else {
            _oDealBut.disable();
        }

    };

    this.refreshCredit = function (iMoney,betamount, val) {
        $.post("update2", { _token: $('meta[name=csrf-token]').attr('content'), amount: iMoney, type: val,bet:betamount }, function (t) {
            _oMoneyText.refreshText(
                + t
            );
        });
    };

    this.refreshCardValue = function (iDealerValue, iPlayerValue) {
        _oCurDealerCardValueText.text = "" + iDealerValue;
        _oCurPlayerCardValueText.text = "" + iPlayerValue;
    };

    this.displayMsg = function (szMsg, szMsgBig) {

        _oDisplayText1.refreshText(szMsg);
        _oDisplayText2.refreshText(szMsgBig);
    };

    this.clearCardValueText = function () {
        _oCurDealerCardValueText.text = "";
        _oCurPlayerCardValueText.text = "";
    };

    /*
    this._onFicheClicked = function(aParams){
        this.hideAllWins();
        //_oFicheHighlight.x = _aFiches[aParams[1]].getX();
        //_oFicheHighlight.y = _aFiches[aParams[1]].getY();
        
        _iFicheValue = aParams[0];
        _iFicheIndex = aParams[1];
    };*/

    this._onFicheClicked = function (aParams) {
        for (var k = 0; k < _aFiches.length; k++) {
            _aFiches[k].select(false);
        }
        _aFiches[aParams[1]].select(true);
        _iFicheValue = aParams[0];
        _iFicheIndex = aParams[1];
    };

    this.showWin = function (iIndex, iWin, szTextWin) {
        _aWinText[iIndex].show(TEXT_SHOW_WIN[iIndex], iWin, szTextWin);
    };

    this.hideAllWins = function () {
        for (var i = 0; i < _aWinText.length; i++) {
            _aWinText[i].hide();
        }
    };

    this.addHistoryRow = function (iPlayerValueCard, iDealerValueCard, iWinningBet) {
        _oHistory.addHistoryRow(iPlayerValueCard, iDealerValueCard, iWinningBet);
    };

    this._onButTieRelease = function () {
        this.hideAllWins();
        s_oGame.setBet(_iFicheValue, _iFicheIndex, BET_TIE);
    };

    this._onButBankerRelease = function () {
        this.hideAllWins();
        s_oGame.setBet(_iFicheValue, _iFicheIndex, BET_BANKER);
    };

    this._onButPlayerRelease = function () {
        this.hideAllWins();
        s_oGame.setBet(_iFicheValue, _iFicheIndex, BET_PLAYER);
    };

    this._onButClearRelease = function () {
        s_oGame.clearBets();
    };

    this._onButRebetRelease = function () {
        this.hideAllWins();
        _oRebetBut.disable();
        s_oGame.rebet();
    };

    this._onButDealRelease = function () {
        this.disableBetFiches();
        this.disableButtons();
        s_oGame.onDeal();
    };

    this._onExit = function () {
        s_oGame.onExit();
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
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

    this._init(iMoney);

    return this;
}

var s_oInterface = null;