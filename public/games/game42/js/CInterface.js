function CInterface(){
    var _aCbCompleted;
    var _aCbOwner;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oAudioToggle;
    var _oButFullscreen;
    var _oButTimer;
    var _oButExit;
    var _oButPaytable;

    var _oGUIExpandible;
    
    var _oHelpPanel=null;

    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    var _pStartPosPaytable;
    
    this._init = function(){      
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.width/2)-10, y: (oSprite.height/2)+10 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        var oSpriteCredits = s_oSpriteLibrary.getSprite("but_credits");
        _pStartPosPaytable = {x:oSpriteCredits.width/2 + 10,y:_pStartPosExit.y};
        _oButPaytable = new CGfxButton(_pStartPosPaytable.x,_pStartPosPaytable.y,oSpriteCredits,s_oStage);
        _oButPaytable.addEventListener(ON_MOUSE_UP,this._onPaytable,this);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _oButExit.getX() - oSprite.width/2 -10, y: (oSprite.height/2)+10 };
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
            
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = {x: _pStartPosAudio.x - oSprite.width/2 - 10,y:(oSprite.height/2) + 10};
        }else{
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = {x: _oButExit.getX() - oSprite.width/2 -10, y: (oSprite.height/2)+10 };
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.isEnabled){
            
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this);
        }
        
        
        var oSprite = s_oSpriteLibrary.getSprite('but_settings');
        _oGUIExpandible = new CGUIExpandible(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oGUIExpandible.addButton(_oButExit);
        
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oGUIExpandible.addButton(_oAudioToggle);
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oGUIExpandible.addButton(_oButFullscreen);
        }

        var oSpriteBg = s_oSpriteLibrary.getSprite("bg_help");
        _oHelpPanel = new CHelpPanel(CANVAS_WIDTH/2,-oSpriteBg.height/2,{type:createjs.Ease.bounceOut,time:1000,property:{y:CANVAS_HEIGHT/2}},
                                                    {type:createjs.Ease.backIn,time:400,property:{y:-oSpriteBg.height/2}},s_oStage);
        _oHelpPanel.addEventListener(ON_EXIT_FROM_HELP,this._onExitFromHelp);
        _oHelpPanel.show();
        this.refreshButtonPos();
    };
    
    this.unload = function(){
        _oGUIExpandible.unload();
        
        if(_oHelpPanel!==null){
            _oHelpPanel.unload();
        }
        s_oInterface = null;
    };
    
    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };
        
    this.refreshButtonPos = function(){
        _oGUIExpandible.refreshPos();
        _oButPaytable.setPosition(_pStartPosPaytable.x + s_iOffsetX,_pStartPosPaytable.y + s_iOffsetY);
    };
    
    this.setButVisible = function(bVal){
        _oButTimer.setVisible(bVal);
    };

    this._onButHelpRelease = function(){
        _oHelpPanel.show();
    };
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExitFromHelp = function(bExit){
        if (_aCbCompleted[ON_EXIT_FROM_HELP]) {
            _aCbCompleted[ON_EXIT_FROM_HELP].call(_aCbOwner[ON_EXIT_FROM_HELP],bExit);
        }
    };
    
    this._onExit = function(){
        if (_aCbCompleted[ON_EXIT_FROM_GAME]) {
            _aCbCompleted[ON_EXIT_FROM_GAME].call(_aCbOwner[ON_EXIT_FROM_GAME]);
        }
    };
    
    this._onPaytable = function(){
        if (_aCbCompleted[ON_SHOW_PAYTABLE]) {
            _aCbCompleted[ON_SHOW_PAYTABLE].call(_aCbOwner[ON_SHOW_PAYTABLE]);
        }
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