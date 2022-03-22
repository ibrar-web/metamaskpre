function CInterface(iMoney){
    var _iFicheIndex;
    var _aFiches;
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;
    
    var _oButExit;
    var _oClearBetBut;
    var _oRebetBut;
    var _oBetPlus;
    var _oBetAnte;
    var _oDealBut;
    var _oPlayBut;
    var _oFoldBut;
    var _oAudioToggle = null;
    var _oMoneyText;
    var _oCurDealerCardValueText;
    var _oCurPlayerCardValueText;
    var _oDisplayText1;
    var _oDisplayText2;

    var _oAnimText;
    var _oPaytable;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    this._init = function(iMoney){
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x:CANVAS_WIDTH - (oSprite.width/2) - 10,y:(oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _pStartPosAudio = {x:_oButExit.getX() - oSprite.width - 10,y:(oSprite.height/2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,s_oSpriteLibrary.getSprite('audio_icon'), s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            if(_oAudioToggle === null){
                _pStartPosFullscreen = {x:_oButExit.getX() - oSprite.width/2 - 10,y:oSprite.height/2 + 10};
            }else{
                _pStartPosFullscreen = {x:_pStartPosAudio.x - oSprite.width/2 - 10,y:oSprite.height/2 + 10};
            }
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
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
        _oClearBetBut = new CGfxButton(830,CANVAS_HEIGHT -oSprite.height/2,oSprite,s_oStage);
        _oClearBetBut.addEventListener(ON_MOUSE_UP, this._onButClearRelease, this);
        
        oSprite = s_oSpriteLibrary.getSprite('but_rebet');
        _oRebetBut = new CGfxButton(890,CANVAS_HEIGHT - oSprite.height/2,oSprite,s_oStage);
        _oRebetBut.disable();
        _oRebetBut.addEventListener(ON_MOUSE_UP, this._onButRebetRelease, this);
        
        oSprite = s_oSpriteLibrary.getSprite('but_generic');
        _oDealBut = new CTextButton(1012,CANVAS_HEIGHT - oSprite.height/2,oSprite,TEXT_DEAL,FONT_GAME_1,"#ffffff",30,s_oStage);
        _oDealBut.addEventListener(ON_MOUSE_UP, this._onButDealRelease, this);
        
        oSprite = s_oSpriteLibrary.getSprite('but_generic');
        _oPlayBut = new CTextButton(1196,CANVAS_HEIGHT - oSprite.height/2,oSprite,TEXT_PLAY,FONT_GAME_1,"#ffffff",30,s_oStage);
        _oPlayBut.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        
        oSprite = s_oSpriteLibrary.getSprite('but_generic');
        _oFoldBut = new CTextButton(1380,CANVAS_HEIGHT - oSprite.height/2,oSprite,TEXT_FOLD,FONT_GAME_1,"#ffffff",30,s_oStage);
        _oFoldBut.addEventListener(ON_MOUSE_UP, this._onButFoldRelease, this);
        
        POS_BET[BET_PLUS] = {x:CANVAS_WIDTH/2 - 200,y:460};
        POS_BET[BET_ANTE] = {x:CANVAS_WIDTH/2, y:460};
        POS_BET[BET_PLAY] = {x:CANVAS_WIDTH/2 + 200,y:460};
        
        _oBetPlus = new CGfxButton(POS_BET[BET_PLUS].x,POS_BET[BET_PLUS].y,s_oSpriteLibrary.getSprite('bet_pair_plus'),s_oStage);
        _oBetPlus.addEventListener(ON_MOUSE_UP, this._onButPlusRelease, this);
        
        _oBetAnte = new CGfxButton(POS_BET[BET_ANTE].x,POS_BET[BET_ANTE].y,s_oSpriteLibrary.getSprite('bet_ante'),s_oStage);
        _oBetAnte.addEventListener(ON_MOUSE_UP, this._onButAnteRelease, this);
        
        var oSpritePlay = s_oSpriteLibrary.getSprite('bet_play');
        var oGfxPlay = createBitmap(oSpritePlay);
        oGfxPlay.x = POS_BET[BET_PLAY].x;
        oGfxPlay.y = POS_BET[BET_PLAY].y;
        oGfxPlay.regX = oSpritePlay.width/2;
        oGfxPlay.regY = oSpritePlay.height/2;
        s_oStage.addChild(oGfxPlay);
        
        _oDisplayText1 = new CTLText(s_oStage, 
                    412, 13, 190, 50, 
                    24, "left", "#ffde00", FONT_GAME_2, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );
                    

        
        _oDisplayText2 = new CTLText(s_oStage, 
                    412, 63, 190, 40, 
                    19, "left", "#ffde00", FONT_GAME_2, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );
                    


        _oCurDealerCardValueText = new createjs.Text("","21px "+FONT_GAME_1, "#fff");
        _oCurDealerCardValueText.x = CANVAS_WIDTH/2;
        _oCurDealerCardValueText.y = 287;
        _oCurDealerCardValueText.textAlign = "center";
        s_oStage.addChild(_oCurDealerCardValueText);
        
        _oCurPlayerCardValueText = new createjs.Text("","21px "+FONT_GAME_1, "#fff");
        _oCurPlayerCardValueText.x = CANVAS_WIDTH/2;
        _oCurPlayerCardValueText.y = 550;
        _oCurPlayerCardValueText.textAlign = "center";
        s_oStage.addChild(_oCurPlayerCardValueText);
        
        var oMoneyText = new CTLText(s_oStage, 
                    300, CANVAS_HEIGHT - 84, 155, 30, 
                    30, "left", "#ffde00", FONT_GAME_2, 1,
                    0, 0,
                    TEXT_MONEY+":",
                    true, true, false,
                    false );
                    

        
        _oMoneyText = new CTLText(s_oStage, 
                    460, CANVAS_HEIGHT - 84, 155, 30, 
                    30, "right", "#ffde00", FONT_GAME_2, 1,
                    0, 0,
                    TEXT_CURRENCY+iMoney.toFixed(3),
                    true, true, false,
                    false );
                    


        //SET FICHES BUTTON
        var aPos = [{x:337,y:CANVAS_HEIGHT - 24},{x:417,y:CANVAS_HEIGHT - 24},{x:497,y:CANVAS_HEIGHT - 24},{x:577,y:CANVAS_HEIGHT - 24},{x:657,y:CANVAS_HEIGHT - 24},{x:737,y:CANVAS_HEIGHT - 24}];
        _aFiches = new Array();

        for(var i=0;i<NUM_FICHES;i++){
            _aFiches[i] = new CFiche(aPos[i].x,aPos[i].y,i,FICHES_VALUE[i],1,true,s_oStage);
            _aFiches[i].addEventListenerWithParams(ON_MOUSE_UP, this._onFicheClicked, this,[FICHES_VALUE[i],i]);
        }
        

        _iFicheIndex = 0;
        _aFiches[_iFicheIndex].select(true);
        FICHE_WIDTH = oSprite.width;
        
        _oAnimText = new CAnimText(CANVAS_WIDTH, CANVAS_HEIGHT,s_oStage);
        _oPaytable = new CPaytablePanel(CANVAS_WIDTH - 303,400,s_oStage);

        this.disableButtons();
        
        this.refreshButtonPos (s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;

        if(DISABLE_SOUND_MOBILE === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        
        _oClearBetBut.unload();
        _oDealBut.unload();
        _oRebetBut.unload();

        s_oInterface = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }
        _oPaytable.refreshButtonPos(iNewX,iNewY);
    };
    
    this.reset = function(){
        this.disableButtons();
    };
    
    this.enableBetFiches = function(bRebet){
        for(var i=0;i<NUM_FICHES;i++){
            _aFiches[i].enable();
        }
        _oClearBetBut.enable();
        _oBetAnte.enable();
        _oBetPlus.enable();
        
        if(bRebet){
            _oRebetBut.enable();
        }
    };
    
    this.disableBetFiches = function(){
        for(var i=0;i<NUM_FICHES;i++){
            _aFiches[i].disable();
        }
        _oClearBetBut.disable();
        _oRebetBut.disable();
        _oBetAnte.disable();
        _oBetPlus.disable();
    };

    this.disableButtons = function(){
        _oDealBut.disable();
        _oFoldBut.disable();
        _oPlayBut.disable();
    };
    
    this.enable = function(bDealBut,bPlay,bFold){
        if(bDealBut){
            _oDealBut.enable();
        }else{
            _oDealBut.disable();
        }
        
        if(bPlay){
            _oPlayBut.enable();
        }else{
            _oPlayBut.disable();
        }
        
        if(bFold){
            _oFoldBut.enable();
        }else{
            _oFoldBut.disable();
        }
    };
    
    this.refreshCredit = function(iMoney,bet,type,userwin){ 
        if(type==2){
            _oMoneyText.refreshText(iMoney);
            return
        }
        $.post("update13", { _token: $('meta[name=csrf-token]').attr('content'),amount:iMoney}, function (t) {
            _oMoneyText.refreshText(t);
        });
    };
    
    this.refreshCardValue = function(iDealerValue,iPlayerValue){
        _oCurDealerCardValueText.text = ""+iDealerValue;
        _oCurPlayerCardValueText.text = ""+iPlayerValue;
    };
    
    this.displayMsg = function(szMsg,szMsgBig){
        _oDisplayText1.refreshText(szMsg);
        
        if(szMsgBig !== undefined){
            _oDisplayText2.refreshText(szMsgBig);
        }
        
    };
    
    this.clearCardValueText = function(){
        _oCurDealerCardValueText.text = "";
        _oCurPlayerCardValueText.text = "";
        _oAnimText.hide();
    };
    
    this._onFicheClicked = function(aParams){
        for(var k=0;k<_aFiches.length;k++){
            _aFiches[k].select(false);
        }
        _aFiches[aParams[1]].select(true);

        _iFicheIndex = aParams[1];
    };
    
    this.showResultText = function(szText){
        _oAnimText.show({x:-200,y:CANVAS_HEIGHT/2 + 160},{x:CANVAS_WIDTH/2 - 450,y:CANVAS_HEIGHT/2+160},szText);
    };
    
    this.showHandValue = function(iHandDealer,iHandPlayer){
        _oCurDealerCardValueText.text = TEXT_EVALUATOR[iHandDealer];
        _oCurPlayerCardValueText.text = TEXT_EVALUATOR[iHandPlayer];
    };
    
    this._onButClearRelease = function(){
        s_oGame.clearBets();
    };
    
    this._onButRebetRelease = function(){
        _oRebetBut.disable();
        s_oGame.onRebet();
    };
    
    this._onButPlusRelease = function(){
        s_oGame.setPairPlusBet(_iFicheIndex);
    };
    
    this._onButAnteRelease = function(){
        s_oGame.setBet(_iFicheIndex,BET_ANTE);
    };
    
    this._onButDealRelease = function(){
        this.disableBetFiches();
	this.disableButtons();
        s_oGame.onDeal();
    };
    
    this._onButPlayRelease = function(){
        this.disableBetFiches();
	this.disableButtons();
        s_oGame.onPlay();
    };

    this._onButFoldRelease = function(){
        this.disableBetFiches();
	this.disableButtons();
        s_oGame.onFold();
    };
    
    this._onExit = function(){
        new CAreYouSurePanel(s_oGame.onExit);
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.enabled){
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
    
    this.getFicheSelected = function(){
        return _iFicheIndex;
    };
    
    this.isResultPanelvisible = function(){
        return _oAnimText.isVisible();
    };
    
    s_oInterface = this;
    
    this._init(iMoney);
    
    return this;
}

var s_oInterface = null;