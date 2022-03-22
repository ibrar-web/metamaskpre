function CInterface(iCurBet, iTotBet, iMoney) {
    var _aLinesBut;
    var _aPayline;
    var _oButExit;
    var _oSpinBut;
    var _oInfoBut;
    var _oAddLineBut;
    var _oAudioToggle;
    var _oBetCoinBut;
    var _oMaxBetBut;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosSpin;
    var _pStartPosMaxBet;
    var _pStartPosCoin;
    var _pStartPosLines;
    var _pStartPosInfo;
    var _pStartPosMoney;
    var _pStartPosBet;
    var _pStartPosFullscreen;
    var _pStartPosFreespinText;

    var _oMoneyText;
    var _oTotalBetText;
    var _oWinText;
    var _oFreeSpinNumText;

    this._init = function(iCurBet, iTotBet, iMoney) {

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = { x: CANVAS_WIDTH - (oSprite.width / 2) - 2, y: (oSprite.height / 2) + 2 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oAttachSection);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon')
            _pStartPosAudio = { x: _pStartPosExit.x - (oSprite.width / 2) - 2, y: (oSprite.height / 2) + 2 };
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oAttachSection);
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
            _pStartPosFullscreen = { x: oSprite.width / 4 + 2, y: oSprite.height / 2 + 2 };
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSprite, s_bFullscreen, s_oAttachSection);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        this._initPaylines();

        oSprite = s_oSpriteLibrary.getSprite('info_but');
        _pStartPosInfo = { x: 420, y: CANVAS_HEIGHT - oSprite.height / 2 - 80 };
        _oInfoBut = new CTextButton(_pStartPosInfo.x, _pStartPosInfo.y, oSprite, TEXT_PAYTABLE, FONT_GAME_1, "#ffffff", 24, "center", 0, s_oAttachSection);
        _oInfoBut.addEventListener(ON_MOUSE_UP, this._onInfo, this);

        oSprite = s_oSpriteLibrary.getSprite('but_lines_bg');
        _pStartPosLines = { x: 640, y: CANVAS_HEIGHT - oSprite.height / 2 - 80 };
        _oAddLineBut = new CTextButton(_pStartPosLines.x, _pStartPosLines.y, oSprite, TEXT_LINES + " " + NUM_PAYLINES, FONT_GAME_1, "#ffffff", 24, "center", 0, s_oAttachSection);
        _oAddLineBut.addEventListener(ON_MOUSE_UP, this._onAddLine, this);

        oSprite = s_oSpriteLibrary.getSprite('coin_but');
        _pStartPosCoin = { x: 860, y: CANVAS_HEIGHT - oSprite.height / 2 - 80 };
        _oBetCoinBut = new CTextButton(_pStartPosCoin.x, _pStartPosCoin.y, oSprite, TEXT_COIN + " " + iCurBet.toFixed(2), FONT_GAME_1, "#ffffff", 24, "center", 0, s_oAttachSection);
        _oBetCoinBut.addEventListener(ON_MOUSE_UP, this._onBet, this);

        oSprite = s_oSpriteLibrary.getSprite('but_maxbet_bg');
        _pStartPosMaxBet = { x: 1080, y: CANVAS_HEIGHT - oSprite.height / 2 - 80 };
        _oMaxBetBut = new CTextButton(_pStartPosMaxBet.x, _pStartPosMaxBet.y, oSprite, TEXT_MAX_BET, FONT_GAME_1, "#ffffff", 25, "center", 0, s_oAttachSection);
        _oMaxBetBut.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);

        oSprite = s_oSpriteLibrary.getSprite('but_spin');
        _pStartPosSpin = { x: CANVAS_WIDTH - 100, y: CANVAS_HEIGHT - oSprite.height / 2 };
        _oSpinBut = new CSpinBut(_pStartPosSpin.x - s_iOffsetX, _pStartPosSpin.y - s_iOffsetY, oSprite, oSprite.width / 5, oSprite.height, s_oAttachSection);
        _oSpinBut.addEventListener(ON_MOUSE_UP, this._onSpin, this);

        _pStartPosMoney = { x: 320, y: CANVAS_HEIGHT - 162 };
        _oMoneyText = new CTLText(s_oAttachSection,
            _pStartPosMoney.x, _pStartPosMoney.y, 230, 24,
            24, "center", "#ffde00", FONT_GAME_2, 1,
            0, 0,
            TEXT_MONEY + ": " + iMoney.toFixed(2) + TEXT_CURRENCY,
            true, true, false,
            false);

        _pStartPosBet = { x: 600, y: CANVAS_HEIGHT - 162 };
        _oTotalBetText = new CTLText(s_oAttachSection,
            _pStartPosBet.x, _pStartPosBet.y, 300, 24,
            24, "center", "#ffde00", FONT_GAME_2, 1,
            0, 0,
            TEXT_BET + ": " + iTotBet.toFixed(2) + TEXT_CURRENCY,
            true, true, false,
            false);


        _oWinText = new CTLText(s_oAttachSection,
            910, CANVAS_HEIGHT - 162, 305, 24,
            24, "center", "#ffde00", FONT_GAME_2, 1,
            0, 0,
            TEXT_WIN + ": 0" + TEXT_CURRENCY,
            true, true, false,
            false);


        _pStartPosFreespinText = { x: CANVAS_WIDTH - 108, y: CANVAS_HEIGHT - 108 };
        _oFreeSpinNumText = new createjs.Text("", "70px " + FONT_GAME_1, "#ffde00");
        _oFreeSpinNumText.x = _pStartPosFreespinText.x - s_iOffsetX;
        _oFreeSpinNumText.y = _pStartPosFreespinText.y - s_iOffsetY;
        _oFreeSpinNumText.textAlign = "center";
        _oFreeSpinNumText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oFreeSpinNumText);

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function() {
        console.log('unload');
        _oButExit.unload();
        _oButExit = null;
        _oSpinBut.unload();
        _oSpinBut = null;
        _oInfoBut.unload();
        _oInfoBut = null;
        _oAddLineBut.unload();
        _oAddLineBut = null;
        _oBetCoinBut.unload();
        _oBetCoinBut = null;
        _oMaxBetBut.unload();
        _oMaxBetBut = null;

        if (DISABLE_SOUND_MOBILE === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }


        for (var i = 0; i < NUM_PAYLINES; i++) {
            _aLinesBut[i].unload();
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.unload();
        }

        s_oInterface = null;
    };

    this.refreshButtonPos = function(iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }

        if ((_pStartPosSpin.x - iNewX) > CANVAS_WIDTH - 300) {
            _oSpinBut.setPosition(_pStartPosSpin.x - iNewX, _pStartPosSpin.y - iNewY);
            _oFreeSpinNumText.x = _pStartPosFreespinText.x - iNewX;
            _oFreeSpinNumText.y = _pStartPosFreespinText.y - iNewY;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX, _pStartPosFullscreen.y + iNewY);
        }


    };

    this._initPaylines = function() {
        var oSprite = s_oSpriteLibrary.getSprite('bet_but4');
        _aLinesBut = new Array();

        var iHalfButHeight = oSprite.height / 2;
        var iPadding = 6;
        var iSpriteHeight = 44;
        var iYOffset = 77 + iHalfButHeight;


        //LINE 4
        var oBut = new CBetBut(200 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but4'), "4", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
        _aLinesBut[3] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 2
        oBut = new CBetBut(200 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but2'), "2", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
        _aLinesBut[1] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 20
        oBut = new CBetBut(200 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but20'), "20", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 20);
        _aLinesBut[19] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 17
        oBut = new CBetBut(200 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but17'), "17", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 17);
        _aLinesBut[16] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 10
        oBut = new CBetBut(200 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but10'), "10", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 10);
        _aLinesBut[9] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 1
        oBut = new CBetBut(200 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but1'), "1", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
        _aLinesBut[0] = oBut;

        iYOffset += iSpriteHeight + iPadding + 1;

        //LINE 11
        oBut = new CBetBut(200 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but11'), "11", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 11);
        _aLinesBut[10] = oBut;

        iYOffset += iSpriteHeight + iPadding;


        //LINE 16
        oBut = new CBetBut(200 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but16'), "16", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 16);
        _aLinesBut[15] = oBut;

        iYOffset += iSpriteHeight + iPadding;
        //LINE 3
        oBut = new CBetBut(200 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but3'), "3", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        _aLinesBut[2] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 5
        oBut = new CBetBut(200 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but5'), "5", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
        _aLinesBut[4] = oBut;

        iYOffset = 77 + iHalfButHeight;

        //LINE 12
        oBut = new CBetBut(1175 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but12'), "12", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 12);
        _aLinesBut[11] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 14
        var oBut = new CBetBut(1175 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but14'), "14", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 14);
        _aLinesBut[13] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 9
        oBut = new CBetBut(1175 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but9'), "9", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 9);
        _aLinesBut[8] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 18
        oBut = new CBetBut(1175 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but18'), "18", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 18);
        _aLinesBut[17] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 6;
        oBut = new CBetBut(1175 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but6'), "6", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 6);
        _aLinesBut[5] = oBut;

        iYOffset += iSpriteHeight + iPadding + 1;

        //LINE 7;
        oBut = new CBetBut(1175 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but7'), "7", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 7);
        _aLinesBut[6] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 19;
        oBut = new CBetBut(1175 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but19'), "19", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 19);
        _aLinesBut[18] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 8
        oBut = new CBetBut(1175 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but8'), "8", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 8);
        _aLinesBut[7] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 13
        oBut = new CBetBut(1175 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but13'), "13", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 13);
        _aLinesBut[12] = oBut;

        iYOffset += iSpriteHeight + iPadding;

        //LINE 15
        oBut = new CBetBut(1175 + oSprite.width / 2, iYOffset, s_oSpriteLibrary.getSprite('bet_but15'), "15", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 15);
        _aLinesBut[14] = oBut;

        _aPayline = new Array();
        for (var k = 0; k < NUM_PAYLINES; k++) {
            var oBmp = createBitmap(s_oSpriteLibrary.getSprite('payline_' + (k + 1)));
            oBmp.visible = false;
            s_oAttachSection.addChild(oBmp);
            _aPayline[k] = oBmp;
        }
    }

    this.refreshMoney = function(iMoney,val) {
        //console.log(val);
        if(val==1){
            _oMoneyText.refreshText(TEXT_MONEY + ": " + iMoney.toFixed(2) + TEXT_CURRENCY);
            return;
        }
        $.post("update31", { _token: $('meta[name=csrf-token]').attr('content'), amount: iMoney }, function(t) {
            _oMoneyText.refreshText(TEXT_MONEY + ": " + iMoney.toFixed(2) + TEXT_CURRENCY);
        });
    };

    this.refreshBet = function(iBet) {
        _oBetCoinBut.changeText(TEXT_COIN + " " + iBet.toFixed(2));
    };

    this.refreshTotalBet = function(iTotBet) {
        _oTotalBetText.refreshText(TEXT_BET + ": " + iTotBet.toFixed(2) + TEXT_CURRENCY);
    };

    this.refreshNumLines = function(iLines) {
        _oAddLineBut.changeText(TEXT_LINES + " " + iLines);

        for (var i = 0; i < NUM_PAYLINES; i++) {
            if (i < iLines) {
                _aLinesBut[i].setOn();
                _aPayline[i].visible = true;
            } else {
                _aLinesBut[i].setOff();
            }
        }

        setTimeout(function() {
            for (var i = 0; i < NUM_PAYLINES; i++) {
                _aPayline[i].visible = false;
            }
        }, 1000);
    };

    this.resetWin = function() {
        _oWinText.refreshText(TEXT_WIN + ": 0" + TEXT_CURRENCY);
    };

    this.refreshWinText = function(iWin) {
        _oWinText.refreshText(TEXT_WIN + ": " + iWin.toFixed(2) + TEXT_CURRENCY);
    };

    this.refreshFreeSpinNum = function(iNum) {
        _oFreeSpinNumText.text = iNum;
    };

    this.showLine = function(iLine) {
        _aPayline[iLine - 1].visible = true;
    };

    this.hideLine = function(iLine) {
        _aPayline[iLine - 1].visible = false;
    };

    this.hideAllLines = function() {
        for (var i = 0; i < NUM_PAYLINES; i++) {
            _aPayline[i].visible = false;
        }
    };

    this.disableBetBut = function(bDisable) {
        for (var i = 0; i < NUM_PAYLINES; i++) {
            _aLinesBut[i].disable(bDisable);
        }
    };

    this.enableGuiButtons = function() {
        _oSpinBut.enable();
        _oMaxBetBut.enable();
        _oBetCoinBut.enable();
        _oAddLineBut.enable();
        _oInfoBut.enable();
    };

    this.enableSpin = function() {
        _oSpinBut.enable();
        _oMaxBetBut.enable();
    };

    this.disableSpin = function() {
        _oSpinBut.disable();
        _oMaxBetBut.disable();
    };

    this.disableGuiButtons = function() {
        if (_oSpinBut.getState() !== SPIN_BUT_STATE_FREESPIN) {
            _oSpinBut.setState(SPIN_BUT_STATE_STOP)
        }

        _oMaxBetBut.disable();
        _oBetCoinBut.disable();
        _oAddLineBut.disable();
        _oInfoBut.disable();
    };

    this.toggleAutoSpinImage = function() {
        _oSpinBut.toggleAutoSpinImage();
    };

    this.setSpinState = function(szSpinState) {
        _oSpinBut.setState(szSpinState);
    };

    this._onBetLineClicked = function(iLine) {
        this.refreshNumLines(iLine);

        s_oGame.activateLines(iLine);
    };

    this._onExit = function() {
        this._onAudioToggle();
        s_oMain.gotoMenu();
    };

    this._onSpin = function(szAnimation) {
        if (szAnimation === SPIN_BUT_STATE_AUTOSPIN) {
            s_oGame.onAutoSpin();
        } else if (szAnimation === SPIN_BUT_STATE_SPIN || szAnimation === SPIN_BUT_STATE_AUTOSPIN) {
            s_oGame.onSpin();
        } else if (szAnimation === SPIN_BUT_STATE_SKIP) {
            s_oGame.onSkip();
        } else {
            s_oGame.forceStopReel();
        }
    };

    this._onAddLine = function() {
        s_oGame.addLine();
    };

    this._onInfo = function() {
        s_oGame.onInfoClicked();
    };

    this._onBet = function() {
        s_oGame.changeCoinBet();
    };

    this._onMaxBet = function() {
        s_oGame.onMaxBet();
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

    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.update = function() {
        _oSpinBut.update();
    };

    s_oInterface = this;

    this._init(iCurBet, iTotBet, iMoney);

    return this;
}

var s_oInterface = null;