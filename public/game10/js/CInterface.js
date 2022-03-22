function CInterface(iCurBet,iTotBet,iMoney){
    
    var _oButExit;
    var _oSpinBut;
    var _oAudioToggle;
    var _oButFullscreen;
    var _oOneBetBut;
    var _oMaxBetBut;
    var _oCurBetBg;
    var _oCoinText;
    var _oButLeft;
    var _oButRight;
    var _oMoneyBg;
    var _oMoneyText;
    var _oCurBetText;
    var _oWinText;
    var _oLine;
    var _oGUIExpandible;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;
    
    this._init = function(iCurBet,iTotBet,iMoney){
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x:CANVAS_WIDTH - (oSprite.width/2) - 10,y:(oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        var oSpriteFullscreen = s_oSpriteLibrary.getSprite('but_fullscreen');
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _pStartPosAudio = {x:_oButExit.getX() - oSprite.width - 10,y:(oSprite.height/2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,s_oSpriteLibrary.getSprite('audio_icon'), s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            _pStartPosFullscreen = {x:_pStartPosAudio.x - oSpriteFullscreen.width/2 - 10,y:oSpriteFullscreen.height/2 + 10};
        }else{
            _pStartPosFullscreen = {x:_pStartPosExit.x - oSpriteFullscreen.width/2 - 10,y:oSpriteFullscreen.height/2 + 10};
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSpriteFullscreen,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('but_config');
        _oGUIExpandible = new CGUIExpandible(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oGUIExpandible.addButton(_oButExit);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oGUIExpandible.addButton(_oAudioToggle);
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oGUIExpandible.addButton(_oButFullscreen);
        }
        
        var pCurBetPos = {x:420,y:587};
        var oSprite = s_oSpriteLibrary.getSprite('current_bet');
        _oCurBetBg = createBitmap(oSprite);
        _oCurBetBg.regX = oSprite.width/2;
        _oCurBetBg.regY = oSprite.height/2;
        _oCurBetBg.x = pCurBetPos.x;
        _oCurBetBg.y = pCurBetPos.y;
        s_oStage.addChild(_oCurBetBg);
        
        var iWidth = oSprite.width-40;
        var iHeight = 40;
        var iX = pCurBetPos.x-3;
        var iY = pCurBetPos.y+12;
        _oCurBetText = new CTLText(s_oStage, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    36, "center", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    formatValue(iTotBet),
                    true, true, false,
                    false );
        var iY = pCurBetPos.y-40;
        this.setLabel(iX, pCurBetPos.y-30, iWidth, iHeight, 36, TEXT_CURRENT_BET, s_oStage);

                    
        var pCoinControl = {x:720,y:574};
        var oSprite = s_oSpriteLibrary.getSprite('but_left');
        _oButLeft = new CGfxButton(pCoinControl.x - 113,pCoinControl.y+24,oSprite,s_oStage);
        _oButLeft.addEventListener(ON_MOUSE_UP, this._onButLeft, this);
        
        var oSprite = s_oSpriteLibrary.getSprite('bet_display');
        _oMoneyBg = createBitmap(oSprite);
        _oMoneyBg.regX = oSprite.width/2;
        _oMoneyBg.regY = oSprite.height/2;
        _oMoneyBg.x = pCoinControl.x;
        _oMoneyBg.y = pCoinControl.y;
        s_oStage.addChild(_oMoneyBg);
        
        var iWidth = 50;
        var iHeight = 30;
        var iX = pCoinControl.x-3;
        var iY = pCoinControl.y-10;
        _oCoinText = new CTLText(s_oStage, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    20, "center", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    formatValue(iCurBet),
                    true, true, false,
                    false );

        var oSprite = s_oSpriteLibrary.getSprite('but_right');
        _oButRight = new CGfxButton(pCoinControl.x + 120,pCoinControl.y+24,oSprite,s_oStage);
        _oButRight.addEventListener(ON_MOUSE_UP, this._onButRight, this);
        
        oSprite = s_oSpriteLibrary.getSprite('bet_one');
        _oOneBetBut = new CGfxButton(972,582,oSprite,s_oStage);
        _oOneBetBut.addEventListener(ON_MOUSE_UP, this._onOneBet, this);
        _oOneBetBut.setLabel(TEXT_ONE_BET);
        
        oSprite = s_oSpriteLibrary.getSprite('max_bet');
        _oMaxBetBut = new CGfxButton(1110,582,oSprite,s_oStage);
        _oMaxBetBut.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
        _oMaxBetBut.setLabel(TEXT_MAX_BET);
        
        oSprite = s_oSpriteLibrary.getSprite('spin');
        _oSpinBut = new CSpinButton(1248,480,oSprite,s_oStage);
        _oSpinBut.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        _oSpinBut.setLabel(TEXT_SPIN);
        
        var iWidth = 120;
        var iHeight = 20;
        var iX = 1070;
        var iY = 180;
        _oMoneyText = new CTLText(s_oStage, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    20, "center", "#ffde00", PRIMARY_FONT, 1,
                    0, 0,
                    formatValue(iMoney),
                    true, true, false,
                    false );
        var iY = 160;
        var oMoneyLabel = new CTLText(s_oStage, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    18, "center", "#fff", SECONDARY_FONT, 1,
                    0, 0,
                    TEXT_CREDIT,
                    true, true, false,
                    false );

        var iWidth = 120;
        var iHeight = 20;
        var iX = 1220;
        var iY = 180;
        _oWinText = new CTLText(s_oStage, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    20, "center", "#ffde00", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );
        var iY = 160;
        var oWinLabel = new CTLText(s_oStage, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    18, "center", "#fff", SECONDARY_FONT, 1,
                    0, 0,
                    TEXT_CURRENT_WIN,
                    true, true, false,
                    false );

        _oLine = createBitmap(s_oSpriteLibrary.getSprite('payline'));
        _oLine.x = 410;
        _oLine.y = 363;
        s_oStage.addChild(_oLine);
        
        
        this.refreshButtonPos (s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;
        _oSpinBut.unload();
        _oSpinBut = null;
        _oOneBetBut.unload();
        _oOneBetBut = null;
        _oMaxBetBut.unload();
        _oMaxBetBut = null;
        
        if(DISABLE_SOUND_MOBILE === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        _oGUIExpandible.unload();
        
        s_oInterface = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oGUIExpandible.refreshPos(iNewX,iNewY);
    };

    this.refreshMoney = function(iMoney,val){
        //console.log();
        if(val==1){
            _oMoneyText.refreshText(iMoney); 
        }
        $.post("update10", { _token: $('meta[name=csrf-token]').attr('content'), amount: iMoney}, function (t) {
            _oMoneyText.refreshText(t);     
        });

    };
    
    this.refreshBet = function(iBet){
        _oCoinText.refreshText( formatValue(iBet) );
    };
    
    this.refreshTotalBet = function(iTotBet){
        _oCurBetText.refreshText( formatValue(iTotBet) );
    };
    
    this.resetWin = function(){
        createjs.Tween.removeTweens(_oWinText);
        _oWinText.setAlpha( 1 );
        _oWinText.refreshText(" ");
    };
    
    this.refreshWinText = function(iWin){
        _oWinText.refreshText( formatValue(iWin) );

        createjs.Tween.get(_oWinText.getText(), {loop:true}).to({alpha:0}, 200).to({alpha:1}, 200);
    };

   
    this.setLabel = function(iX, iY, iWidth, iHeight, iSize, szText, oContainer){
        var oStrokeLabel = new CTLText(oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    iSize, "center", "#fff", SECONDARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );
        oStrokeLabel.setOutline(4);
        var oStrokeLabel = new CTLText(oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    iSize, "center", "#000", SECONDARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );
        oStrokeLabel.setOutline(2);
        var oLabel = new CTLText(oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    iSize, "center", "#f52322", SECONDARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );
    };
    
    this.enableGuiButtons = function(){
        _oSpinBut.enable();
        _oMaxBetBut.enable();
        _oButRight.enable();
        _oButLeft.enable();
        _oOneBetBut.enable();
    };
	
    this.enableSpin = function(){
        _oSpinBut.enable();
        _oMaxBetBut.enable();
    };

    this.disableSpin = function(){
        _oSpinBut.disable();
        _oMaxBetBut.disable();
    };
    
    this.disableGuiButtons = function(){
        _oSpinBut.disable();
        _oMaxBetBut.disable();
        _oButRight.disable();
        _oButLeft.disable();
        _oOneBetBut.disable();
    };
    
    this._onExit = function(){
        s_oGame.onShowSafePanel();
    };
    
    this._onSpin = function(){
        s_oGame.onSpin();
    };
    
    this._onButLeft = function(){
        s_oGame.changeCoinBet("sub");
        s_oGame.removeWinShowing();
    };
    
    this._onButRight = function(){
        s_oGame.changeCoinBet("add");
        s_oGame.removeWinShowing();
    };
    
    this._onOneBet = function(){
        s_oGame.addLine();
        s_oGame.removeWinShowing();
    };
    
    this._onMaxBet = function(){
        s_oGame.onMaxBet();
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.isEnabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };

    this._onFullscreenRelease = function(){
	if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    s_oInterface = this;
    
    this._init(iCurBet,iTotBet,iMoney);
    
    return this;
}

var s_oInterface = null;