function CInterface(oParentContainer) {
    var _oGUIExpandible;
    var _oButExit;
    var _oAudioToggle;
    var _oButFullscreen;
    var _oButPaytable;
    
    var _oAreYouSurePanel;
    var _oPlayedNumberInfoPanel;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _pStartPosPaytable; 
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;

    this._init = function (oParentContainer) {
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, oParentContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);


        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _pStartPosExit.x - oSprite.height - 10, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, oParentContainer);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            _pStartPosFullscreen = {x:_pStartPosAudio.x - oSprite.width/2 - 10,y:_pStartPosAudio.y};
        }else{
            _pStartPosFullscreen = {x:_pStartPosExit.x - oSprite.width/2 - 10,y:_pStartPosExit.y};
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
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,oParentContainer);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        var oSprite = s_oSpriteLibrary.getSprite('but_settings');
        _oGUIExpandible = new CGUIExpandible(oSprite.width/2 + 10, _pStartPosExit.y, oSprite, oParentContainer);
        _oGUIExpandible.addButton(_oButExit);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oGUIExpandible.addButton(_oAudioToggle);
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oGUIExpandible.addButton(_oButFullscreen);
        }

        var oSprite = s_oSpriteLibrary.getSprite('but_paytable');
        _pStartPosPaytable = {x: (oSprite.height / 2) + 10, y: CANVAS_HEIGHT - (oSprite.height / 2) - 10};
        _oButPaytable = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, oParentContainer);
        _oButPaytable.addEventListener(ON_MOUSE_UP, this._onPayTable, this);

        var oSprite = s_oSpriteLibrary.getSprite('numbers_played_info_panel');
        var iX = CANVAS_WIDTH - oSprite.width/2 - 12;
        var iY = oSprite.height/2 + 12;
        _oPlayedNumberInfoPanel = new CPlayedNumbersInfoPanel(oSprite, iX, iY, oParentContainer);
        _oPlayedNumberInfoPanel.hide();

        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oAreYouSurePanel = new CAreYouSurePanel(oSprite);
        _oAreYouSurePanel.addEventListener(ON_CONFIRM, s_oGame.onExit, s_oGame);
        _oAreYouSurePanel.addEventListener(ON_REFUSE, this._onContinueToPlay, this);
        

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function () {
        _oGUIExpandible.refreshPos();
        
        _oPlayedNumberInfoPanel.refreshButtonPos();
        
        _oAreYouSurePanel.smartResize();
        
        _oButPaytable.setPosition(_pStartPosPaytable.x + s_iOffsetX, _pStartPosPaytable.y - s_iOffsetY);
        
        if(s_bLandscape && s_iOffsetY > 300){
            var iScale = linearFunction(s_iOffsetY, 300, EDGEBOARD_Y, 1, 0.91);
            _oGUIExpandible.scale(iScale);
            _oButPaytable.setScale(iScale);
        }
    };

    this.unload = function () {
        _oButExit.unload();
        _oButExit = null;
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        _oGUIExpandible.unload();
        
        _oAreYouSurePanel.unload();
        _oAreYouSurePanel = null;
        s_oInterface = null;
    };

    this.setPlayedNumbers = function(aNumbersList){
        _oPlayedNumberInfoPanel.show();
        
        _oPlayedNumberInfoPanel.setNumbers(aNumbersList);
    };  

    this.litPlayedNumber = function(iNumber){
        _oPlayedNumberInfoPanel.litNumber(iNumber);
    };

    this.getNumbersInfo = function(){
        return _oPlayedNumberInfoPanel.getNumbersState();
    };

    this._onPayTable = function(){
        s_oGame.showPaytable();
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        _oAreYouSurePanel.show();
        s_oGame.pause(true);
    };

    this._onContinueToPlay = function(){
        s_oGame.pause(false);
    };

    this._onRestart = function () {
        s_oGame.restartLevel();
    };

    this.resetFullscreenBut = function(){
	_oButFullscreen.setActive(s_bFullscreen);
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

    this._init(oParentContainer);

    return this;
}

var s_oInterface = null;