function CMenu() {
    var _oBg;
    var _oBall;
    var _oBallContainer;
    var _oButPlay;
    var _oButContinue;
    var _oFade;
    var _oAudioToggle;
    var _oMinigolfText;
    var _oWorldText;
    var _oCreditsBut;
    var _oButFullscreen;
    var _oCreditsPanel;
    var _oListenerMouseDown;
    var _oLogo;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _pStartPosAudio;
    var _pStartPosPlay;
    var _pStartPosCredits;
    var _pStartPosFullscreen;

    this._init = function () {
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('logo');
        _oLogo = createBitmap(oSprite);
        _oLogo.regX = oSprite.width/2;
        _oLogo.regY = oSprite.height/2;
        _oLogo.x = CANVAS_WIDTH/2;
        _oLogo.y = 600;
        s_oStage.addChild(_oLogo);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _pStartPosPlay = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT -100};
        _oButPlay = new CToggle(_pStartPosPlay.x, _pStartPosPlay.y, oSprite, true, s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        _oButPlay.setScaleOnClick(false);

        var oSprite = s_oSpriteLibrary.getSprite('but_info');
        _pStartPosCredits = {x: (oSprite.height/2) + 10, y: (oSprite.height/2) + 10};            
        _oCreditsBut = new CGfxButton((CANVAS_WIDTH/2),CANVAS_HEIGHT -240,oSprite, s_oStage);
        _oCreditsBut.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
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
            _pStartPosFullscreen = {x:_pStartPosCredits.x + oSprite.width/2 + 10,y:oSprite.height/2 + 10};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        this._checkPaytableErrors();
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000);

        setVolume("soundtrack", 1);
        
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oCreditsBut.setPosition(_pStartPosCredits.x + iNewX,iNewY + _pStartPosCredits.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
        
        if(s_bLandscape){
            _oButPlay.setPosition(_pStartPosPlay.x, _pStartPosPlay.y - s_iOffsetY);
            
            _oLogo.y = 580;
            smartResize(_oLogo,0,50);
        }else {
            _oButPlay.setPosition(_pStartPosPlay.x, _pStartPosPlay.y - s_iOffsetY - 200);
            
            _oLogo.y = 600;
            smartResize(_oLogo,-450,0);
        }

        if(_oCreditsPanel){
            _oCreditsPanel.smartResize();
        }
        
    };

    this._checkPaytableErrors = function(){
        var iTotProbability = 0;
        
        for(var i=0; i<PAYTABLE_SETTINGS.length; i++){
            iTotProbability += PAYTABLE_SETTINGS[i].win_occurrence;
        }
        
        if(iTotProbability>100){
            var oMsgBox = new CMsgBox(TEXT_PAYTABLE,s_oStage);
        }

    };

    this.unload = function () {
        _oButPlay.unload();
        _oButPlay = null;

        _oFade.off("mousedown", _oListenerMouseDown);
        
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }

        _oCreditsPanel = null;
        s_oStage.removeAllChildren();

        s_oMenu = null;
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onButPlayRelease = function () {
        var oParent = this;
        _oListenerMouseDown = _oFade.on("mousedown", function(){});
        createjs.Tween.get(_oFade, {override:true}).to({alpha: 1}, 500).call(function () {
            oParent.unload();
            
            $(s_oMain).trigger("start_session");
            s_oMain.gotoGame();
        });
        
    };

    this._onCreditsBut = function(){
        window.location.href="home"
        //_oCreditsPanel = new CCreditsPanel();
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

    s_oMenu = this;

    this._init();
}

var s_oMenu = null;