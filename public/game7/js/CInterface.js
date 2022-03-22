function CInterface(){
    var _oAudioToggle;
    var _oButExit;
    var _oHelpPanel=null;
    var _oBestScoreText;
    var _oBestScoreNum;
    var _oCurScoreText;
    var _oCurScoreNum;
    var _oChooseTextBack;
    var _oChooseText;
    var _oChooseContainer;  
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    
    this._init = function(){                
        var oExitX;
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = CANVAS_WIDTH - (oSprite.width/2) - 80;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
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
            _pStartPosFullscreen = {x:oSprite.width/4 + 10,y:oSprite.height/2 + 10};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
       var oBestScorePanel = createBitmap(s_oSpriteLibrary.getSprite('score_panel'));
        oBestScorePanel.x = 520;
        oBestScorePanel.y = 600;
        s_oStage.addChild(oBestScorePanel);


        _oBestScoreText = new CTLText(s_oStage, 
                    526, 610, 180, 20, 
                    20, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BEST_SCORE,
                    true, true, false,
                    false );

        
        _oBestScoreNum = new CTLText(s_oStage, 
                    526, 640, 180, 24, 
                    24, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    "0",
                    true, true, false,
                    false );

        
        var oCurScorePanel = createBitmap(s_oSpriteLibrary.getSprite('score_panel'));
        oCurScorePanel.x = 1200;
        oCurScorePanel.y = 600;
        s_oStage.addChild(oCurScorePanel);
        


        _oCurScoreText = new CTLText(s_oStage, 
                    1206, 610, 180, 20, 
                    20, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_CUR_SCORE,
                    true, true, false,
                    false );
                    
        
        
        
        _oCurScoreNum = new CTLText(s_oStage, 
                    1206, 640, 180, 24, 
                    24, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    "0",
                    true, true, false,
                    false );
 
        
        _oChooseContainer = new createjs.Container();
        _oChooseContainer.x = CANVAS_WIDTH/2;
        _oChooseContainer.y = 90;
        _oChooseContainer.visible = false;
        s_oStage.addChild(_oChooseContainer);
        
        _oChooseTextBack = new CTLText(_oChooseContainer, 
                    -396, 4, 800, 100, 
                    50, "center", "#000", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_CHOOSE,
                    true, true, true,
                    false );
                    
       
        
        _oChooseText = new CTLText(_oChooseContainer, 
                    -400, 0, 800, 100, 
                    50, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_CHOOSE,
                    true, true, true,
                    false );

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,_pStartPosExit.y +iNewY);       
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,_pStartPosAudio.y+iNewY);
        }   
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        
        _oButExit.unload();

        if(_oHelpPanel!==null){
            _oHelpPanel.unload();
        }
        s_oInterface = null;
    };

    this.refreshBestScore = function(iValue){

        _oBestScoreNum.refreshText(iValue);
    };

    this.refreshCurScore = function(iValue){
        _oCurScoreNum.refreshText(iValue);
    };

    this.showText = function(bVisible, szText){
        _oChooseContainer.visible = bVisible;
        _oChooseText.refreshText(szText);
        _oChooseTextBack.refreshText(szText);
    };
    
    this._onButRestartRelease = function(){
        $(s_oMain).trigger("restart_level",1);
        
        s_oGame.restartGame();
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        $(s_oMain).trigger("end_session");  
        $(s_oMain).trigger("end_level",1);
        s_oGame.onExit();  
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
    
    s_oInterface = this;
    this._init();
    
    return this;
}

var s_oInterface = null;