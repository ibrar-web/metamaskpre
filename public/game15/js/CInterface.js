function CInterface(){
   
    var _oAudioToggle;
    var _oButExit;
    var _oButRestart;
    var _oButHelp;
    var _oButFullscreen;
  
    var _oTimeNum;
    var _oContainerTime;
  
    var _pStartPosExit;
    var _pStartPosRestart;
    var _pStartPosHelp;
    var _pStartPosAudio;
    var _pStartPosTime;
    var _pStartPosFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    this._init = function(){  
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.width/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        var oSprite = s_oSpriteLibrary.getSprite("but_restart");
        _pStartPosRestart = {x:_pStartPosExit.x - oSprite.width - 10,y:_pStartPosExit.y};
        _oButRestart = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,s_oStage);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestartRelease, this);
        
        oSprite = s_oSpriteLibrary.getSprite("but_help");
        _pStartPosHelp = {x:_pStartPosRestart.x - oSprite.width - 10 ,y:_pStartPosRestart.y};
        _oButHelp = new CGfxButton(_pStartPosHelp.x,_pStartPosHelp.y,oSprite,s_oStage);
        _oButHelp.addEventListener(ON_MOUSE_UP, this._onHelpRelease, this);
        
        var oSpriteFullscreen = s_oSpriteLibrary.getSprite('but_fullscreen');
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _pStartPosAudio = {x:oSprite.width/2 +10 ,y:_pStartPosRestart.y }
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,s_oSpriteLibrary.getSprite('audio_icon'),s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            _pStartPosFullscreen = {x: _pStartPosAudio.x + oSpriteFullscreen.width/2 + 10,y:_pStartPosAudio.y};
        }else{
            _pStartPosFullscreen = {x:oSprite.width/2 +10 ,y:_pStartPosRestart.y }
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
        
      
    
        _pStartPosTime = {x:CANVAS_WIDTH/2,y:50};
        _oContainerTime = new createjs.Container();
        _oContainerTime.x = _pStartPosTime.x;
        _oContainerTime.y = _pStartPosTime.y;
        s_oStage.addChild(_oContainerTime);
        
        var oTimeIcon = createBitmap(s_oSpriteLibrary.getSprite("time_icon"));
        _oContainerTime.addChild(oTimeIcon);

        _oTimeNum = new CTLText(_oContainerTime, 
                    70, 20, 150, 40, 
                    40, "left", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    "00:00",
                    true, true, false,
                    false );
                    
  
        
        
        _oContainerTime.regX = _oContainerTime.getBounds().width/2;
        _oContainerTime.regY = _oContainerTime.getBounds().height/2;
        
        this.refreshButtonPos();
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        
        
        _oButExit.unload();
        _oButRestart.unload();
        _oButHelp.unload();
        
        s_oInterface = null;
    };
    
    this.refreshButtonPos = function(){
        _oContainerTime.y = _pStartPosTime.y+s_iOffsetY;

        _oButExit.setPosition(_pStartPosExit.x - s_iOffsetX,s_iOffsetY + _pStartPosExit.y);
        _oButRestart.setPosition(_pStartPosRestart.x - s_iOffsetX,s_iOffsetY + _pStartPosRestart.y);
        _oButHelp.setPosition(_pStartPosHelp.x - s_iOffsetX,_pStartPosHelp.y + s_iOffsetY);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x + s_iOffsetX,s_iOffsetY + _pStartPosAudio.y);
        }   
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX,_pStartPosFullscreen.y + s_iOffsetY);
        }
    };
    
    this.reset = function(iTimeElaps){
        this.refreshTime(iTimeElaps);
    };
    
    
    this.refreshTime = function(iTimeElaps){
        _oTimeNum.refreshText(formatTime(iTimeElaps));
    };

    this._onNextCardInPile = function(){
        s_oGame.moveCardInWaste();
    };

    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        s_oGame.onTryExit();
    };

    this._onRestartRelease = function(){
        s_oGame.onTryRestart();
    };
    
    this._onHelpRelease = function(){
        s_oGame.showHelp();
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
    
    this._init();
    
    return this;
}

var s_oInterface = null;