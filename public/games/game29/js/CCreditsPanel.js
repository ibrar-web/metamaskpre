function CCreditsPanel(){
    
    var _oBg;
    var _oButLogo;
    var _oButExit;
    var _oMsgText;
    
    var _oHitArea;
    
    var _oLink;
    var _oListener;
    
    var _pStartPosExit;
    
    var _oContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(_oBg);
        
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oListener = _oHitArea.on("click", this._onLogoButRelease);
        _oContainer.addChild(_oHitArea);
                
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: 205 , y: 214};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
       
        _oMsgText = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2 -120, CANVAS_HEIGHT/2 - 66, 240, 40, 
                    30, "center", "#fff", FONT1, 1,
                    2, 2,
                    TEXT_CREDITS_DEVELOPED,
                    true, true, false,
                    false );

		
        oSprite = s_oSpriteLibrary.getSprite('logo_ctl');
        _oButLogo = createBitmap(oSprite);
        _oButLogo.regX = oSprite.width/2;
        _oButLogo.regY = oSprite.height/2;
        _oButLogo.x = CANVAS_WIDTH/2;
        _oButLogo.y = CANVAS_HEIGHT/2;
        _oContainer.addChild(_oButLogo);
        
        _oLink = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2 -120, CANVAS_HEIGHT/2 +26, 240, 30, 
                    30, "center", "#fff", FONT1, 1,
                    2, 2,
                    "www.codethislab.com",
                    true, true, false,
                    false );
                    

    };

    
    this.unload = function(){
        _oHitArea.off("click", _oListener);
        
        _oButExit.unload(); 
        _oButExit = null;

        s_oStage.removeChild(_oContainer);
    };
    
    this._onLogoButRelease = function(){
        window.open("http://www.codethislab.com/index.php?&l=en","_blank");
    };
    
    this._init();
    
    
};


