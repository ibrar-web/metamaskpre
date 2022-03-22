function CInterface() {
    var _pStartPosFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oButFullscreen;
    var _oAudioToggle;
    var _oButExit;
    var _oButSpin;
    var _oButPlus;
    var _oButMin;
    var _oHelpPanel = null;
    var _iCurAlpha;
    var _oCreditNum;
    var _oMoneyNum;
    var _oBetNum;
    var _oParent;
    var _oTextHighLight;
    var _oNumSpin;

    var _pStartPosExit;
    var _pStartPosAudio;

    this._init = function() {
        _oParent = this;
        _iCurAlpha = 0;

        var oExitX;

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = { x: CANVAS_WIDTH - (oSprite.width / 2) - 10, y: (oSprite.height / 2) + 14 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        oExitX = CANVAS_WIDTH - (oSprite.width / 2) - 112;
        _pStartPosAudio = { x: oExitX, y: (oSprite.height / 2) + 14 };

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
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

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            oExitX = _pStartPosAudio.x - oSprite.width / 2 - 10;
        }


        if (_fRequestFullScreen && screenfull.isEnabled) {
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = { x: oExitX, y: oSprite.height / 2 + 14 };

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSprite, s_bFullscreen, true);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        var oGuiContainer = new createjs.Container();
        oGuiContainer.x = CANVAS_WIDTH / 2 + 210;
        oGuiContainer.y = 76;
        oGuiContainer.scaleX = oGuiContainer.scaleY = 0.9;
        s_oStage.addChild(oGuiContainer);

        var oSprite = s_oSpriteLibrary.getSprite('gui_panel');
        var oGuiBg = createBitmap(oSprite);
        oGuiBg.regX = oSprite.width / 2;
        oGuiBg.regY = oSprite.height / 2;
        oGuiBg.y = 760;
        oGuiContainer.addChild(oGuiBg);

        var oSprite = s_oSpriteLibrary.getSprite('logo_game');
        var oLogo = createBitmap(oSprite);
        oLogo.regX = oSprite.width / 2;
        oLogo.regY = oSprite.height / 2;
        oLogo.y = 376;
        oGuiContainer.addChild(oLogo);

        //////////////////////// BET CONTROLLER /////////////////////////
        var oControllerContainer = new createjs.Container();
        oControllerContainer.y = CANVAS_HEIGHT - 330;
        oGuiContainer.addChild(oControllerContainer);

        var oSprite = s_oSpriteLibrary.getSprite('bet_panel');
        var oBetBg = createBitmap(oSprite);
        oBetBg.regX = oSprite.width / 2;
        oBetBg.regY = oSprite.height / 2;
        oBetBg.y = -100;
        oControllerContainer.addChild(oBetBg);

        var iWidth = oSprite.width - 20;
        var iHeight = oSprite.height - 20;
        var iX = oBetBg.x;
        var iY = oBetBg.y - 2;
        _oBetNum = new CTLText(oControllerContainer,
            iX - iWidth / 2, iY - iHeight / 2, iWidth, iHeight,
            26, "center", "#fff", THIRD_FONT, 1,
            2, 2,
            formatValue(START_BET),
            true, true, false,
            false);

        var oSprite = s_oSpriteLibrary.getSprite('but_spin');
        _oButSpin = new CTextButton(0, 0, oSprite, TEXT_SPIN, THIRD_FONT, "#ffffff", 60, false, oControllerContainer);
        _oButSpin.enable();
        _oButSpin.addEventListener(ON_MOUSE_UP, this._onButSpinRelease, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_plus');
        _oButPlus = new CTextButton(98, -100, oSprite, TEXT_PLUS, THIRD_FONT, "#ffffff", 60, false, oControllerContainer);
        _oButPlus.enable();
        _oButPlus.addEventListener(ON_MOUSE_UP, this._onButPlusRelease, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_plus');
        _oButMin = new CTextButton(-98, -100, oSprite, TEXT_MIN, THIRD_FONT, "#ffffff", 60, false, oControllerContainer);
        _oButMin.enable();
        _oButMin.addEventListener(ON_MOUSE_UP, this._onButMinRelease, this);
        _oButMin.setTextPosition(-2, 10);


        ///////////////////////CREDITS PANEL///////////////////////
        var oSprite = s_oSpriteLibrary.getSprite('credits_money_panel');
        var oCreditsBg = createBitmap(oSprite);
        oCreditsBg.regX = oSprite.width / 2;
        oCreditsBg.regY = oSprite.height / 2;
        oCreditsBg.y = 600;
        oGuiContainer.addChild(oCreditsBg);

        var iYOffset = 28;
        var iWidth = 180;
        var iHeight = 40;
        var iX = oCreditsBg.x + 2;
        var iY = oCreditsBg.y - iYOffset + 2;
        var oCreditTextBack = new CTLText(oGuiContainer,
            iX - iWidth / 2, iY - iHeight / 2, iWidth, iHeight,
            30, "center", "#000", THIRD_FONT, 1,
            2, 2,
            TEXT_CREDITS,
            true, true, false,
            false);
        var iX = oCreditsBg.x;
        var iY = oCreditsBg.y - iYOffset;
        var oCreditText = new CTLText(oGuiContainer,
            iX - iWidth / 2, iY - iHeight / 2, iWidth, iHeight,
            30, "center", "#ff0", THIRD_FONT, 1,
            2, 2,
            TEXT_CREDITS,
            true, true, false,
            false);

        var iWidth = 140;
        var iHeight = 40;
        var iX = oCreditsBg.x;
        var iY = oCreditsBg.y + 20;
        _oCreditNum = new CTLText(oGuiContainer,
            iX - iWidth / 2, iY - iHeight / 2, iWidth, iHeight,
            28, "center", "#fff", THIRD_FONT, 1,
            2, 2,
            formatValue(START_CREDIT),
            true, true, false,
            false);

        ///////////////////////WIN PANEL///////////////////////
        var oSprite = s_oSpriteLibrary.getSprite('win_panel');
        var oWinBg = createBitmap(oSprite);
        oWinBg.regX = oSprite.width / 2;
        oWinBg.regY = oSprite.height / 2;
        oWinBg.y = 740;
        oGuiContainer.addChild(oWinBg);

        var iYOffset = 24;
        var iWidth = 180;
        var iHeight = 40;
        var iX = oWinBg.x + 2;
        var iY = oWinBg.y - iYOffset + 2;
        var oWinTextBack = new CTLText(oGuiContainer,
            iX - iWidth / 2, iY - iHeight / 2, iWidth, iHeight,
            30, "center", "#000", THIRD_FONT, 1,
            2, 2,
            TEXT_WIN,
            true, true, false,
            false);
        var iX = oWinBg.x;
        var iY = oWinBg.y - iYOffset;
        var oWinText = new CTLText(oGuiContainer,
            iX - iWidth / 2, iY - iHeight / 2, iWidth, iHeight,
            30, "center", "#ff0", THIRD_FONT, 1,
            2, 2,
            TEXT_WIN,
            true, true, false,
            false);

        var iWidth = 180;
        var iHeight = 40;
        var iX = oWinBg.x;
        var iY = oWinBg.y + 24;
        _oMoneyNum = new CTLText(oGuiContainer,
            iX - iWidth / 2, iY - iHeight / 2, iWidth, iHeight,
            28, "center", "#fff", THIRD_FONT, 1,
            2, 2,
            formatValue(0),
            true, true, false,
            false);

        _oTextHighLight = new CTLText(oGuiContainer,
            iX - iWidth / 2, iY - iHeight / 2, iWidth, iHeight,
            28, "center", "#ff0", THIRD_FONT, 1,
            2, 2,
            formatValue(0),
            true, true, false,
            false);
        _oTextHighLight.setAlpha(0);

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function() {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        _oButExit.unload();
        _oButSpin.unload();
        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.unload();
        }

        s_oInterface = null;
    };

    this.refreshCredit = function(iValue,val) {
        //console.log('iValue',iValue); 
        if(val==4){
            _oCreditNum.refreshText(iValue);
            return;
        }
        $.post("update41", { _token: $('meta[name=csrf-token]').attr('content'), amount: iValue }, function(t) {
            _oCreditNum.refreshText(t);
        });
    };

    this.clearMoneyPanel = function() {
        _oTextHighLight.setAlpha(0);
        createjs.Tween.removeTweens(_oTextHighLight.getText());
    };

    this.refreshMoney = function(iValue) {
        _oMoneyNum.refreshText(formatValue(iValue));
        _oTextHighLight.refreshText(formatValue(iValue));
    };

    this.refreshBet = function(iValue) {
        _oBetNum.refreshText(formatValue(iValue));
    };

    this.refreshNumSpin = function(iValue) {
        _oNumSpin.refreshText(iValue);
    };

    this.animWin = function() {
        if (_iCurAlpha === 1) {
            _iCurAlpha = 0;
            createjs.Tween.get(_oTextHighLight.getText()).to({ alpha: _iCurAlpha }, 150, createjs.Ease.cubicOut).call(function() { _oParent.animWin(); });
        } else {
            _iCurAlpha = 1;
            createjs.Tween.get(_oTextHighLight.getText()).to({ alpha: _iCurAlpha }, 150, createjs.Ease.cubicOut).call(function() { _oParent.animWin(); });
        }

    };

    this._onButSpinRelease = function() {
        s_oGame.spinWheel();
    };

    this._onButPlusRelease = function() {
        s_oGame.modifyBonus("plus");
    };

    this._onButMinRelease = function() {
        s_oGame.modifyBonus("min");
    };

    this.disableSpin = function(bDisable) {
        if (bDisable === true) {
            _oButSpin.disable();
            _oButPlus.disable();
            _oButMin.disable();
        } else {
            _oButSpin.enable();
            _oButPlus.enable();
            _oButMin.enable();
        }
    };

    this.enterInFreeSpinMode = function(iNumFreeSpin) {
        _oButMin.fadeOut();
        _oButPlus.fadeOut();

        createjs.Tween.get(_oBetNum).to({ "alpha": 0 }, 500).call(function() {
            _oBetNum.refreshText("x" + iNumFreeSpin);
            _oBetNum.setColor("#fff000");
            createjs.Tween.get(_oBetNum).to({ "alpha": 1 }, 500);
        });
    };

    this.exitFromFreeSpinMode = function(iBetValue) {
        _oButMin.fadeIn();
        _oButPlus.fadeIn();

        createjs.Tween.get(_oBetNum).to({ "alpha": 0 }, 500).call(function() {
            _oBetNum.refreshText(formatValue(iBetValue));
            _oBetNum.setColor("#FFFFFF");
            createjs.Tween.get(_oBetNum).to({ "alpha": 1 }, 500);
        });
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

    this._onExit = function() {
        /*
        $(s_oMain).trigger("end_session");
        
        s_oGame.onExit();  
        */
        new CAreYouSurePanel();
    };

    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;