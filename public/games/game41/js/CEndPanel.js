function CEndPanel(oSpriteBg){
    
    var _oBg;
    var _oGroup;
    
    var _oMsgTextBack;
    var _oMsgText;
    var _oFade;
    var _oListener;
    var _oButYes;
    var _oButNo;
    var _oParent;
    
    this._init = function(oSpriteBg){
        
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        
        _oFade = new createjs.Shape();
        _oFade.alpha = 0;
        _oFade.graphics.beginFill("rgba(0,0,0,1)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        createjs.Tween.get(_oFade).to({alpha:0.7}, 500);
        _oGroup.addChild(_oFade);
        
        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width/2;
        _oBg.regY = oSpriteBg.height/2;
        _oBg.x = CANVAS_WIDTH/2;
        _oBg.y = CANVAS_HEIGHT/2;
        _oGroup.addChild(_oBg);
        
        var iYOffset = 24;       
        var iWidth = oSpriteBg.width - 70;
        var iHeight = 80;
        var iX = _oBg.x;
        var iY = _oBg.y-iYOffset;
        _oMsgTextBack = new CTLText(_oGroup, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    30, "center", "#000", THIRD_FONT, 1.2,
                    2, 2,
                    " ",
                    true, true, true,
                    false );
        _oMsgTextBack.setOutline(5);            
        _oMsgText = new CTLText(_oGroup, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    30, "center", "#fff", THIRD_FONT, 1.2,
                    2, 2,
                    " ",
                    true, true, true,
                    false );

        // _oButYes = new CGfxButton(_oBg.x + 180, _oBg.y + 130, s_oSpriteLibrary.getSprite('but_yes'), _oGroup);
        // _oButYes.addEventListener(ON_MOUSE_UP, this._onYes, this);

        _oButNo = new CGfxButton(_oBg.x -180, _oBg.y + 130, s_oSpriteLibrary.getSprite('but_no'), _oGroup);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onExit, this);
        //_oButNo.pulseAnimation();

        s_oStage.addChild(_oGroup);
    };
    
    this.unload = function(){
        _oGroup.off("mousedown",_oListener);
        //_oButYes.unload();
        _oButNo.unload();
        
        s_oStage.removeChild(_oGroup);
    };
    
    this._initListener = function(){
        _oListener = _oGroup.on("mousedown",function(){});
    };
    
    this.show = function(){
        $(s_oMain).trigger("show_interlevel_ad");
        

        _oMsgTextBack.refreshText( TEXT_GAMEOVER );
        _oMsgText.refreshText( TEXT_GAMEOVER );
        
        _oGroup.visible = true;
        
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {_oParent._initListener();});

    };
    
    this._onYes = function(){
        $(s_oMain).trigger("recharge");
        
        _oParent.unload();
        
    };
    
    this._onExit = function(){
        _oGroup.off("mousedown",_oListener);
        s_oStage.removeChild(_oGroup);
        $(s_oMain).trigger("end_session");        
        s_oGame.onExit();
    };
    this._closegame = function(){
        _oGroup.off("mousedown",_oListener);
        s_oStage.removeChild(_oGroup);
        $(s_oMain).trigger("end_session");        
        s_oGame.onExit();
    };
    this._init(oSpriteBg);
    
    _oParent = this;
    return this;
}
