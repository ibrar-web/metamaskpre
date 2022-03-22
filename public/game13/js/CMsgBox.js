function CMsgBox(){
    
    var _oBg;
    var _oMsgText;
    var _oGroup;
    
    this._init = function(){
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        s_oStage.addChild(_oGroup);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oGroup.addChild(_oBg);


        _oMsgText = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-210, 280, 400, 200, 
                    34, "center", "#ffffff", FONT_GAME_1, 1,
                    0, 0,
                    TEXT_ARE_SURE,
                    true, true, true,
                    false );

        
        
    };
    
    this.unload = function(){
        _oGroup.off("mousedown",this._onExit);
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
    };
    
    this.show = function(szMsg){
        _oMsgText.refreshText(szMsg);

        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
        setTimeout(function(){oParent._onExit();},3000);
    };
    
    this._onExit = function(){
        if(_oGroup.visible){
            _oGroup.off("mousedown");
            _oGroup.visible = false;
        }
        
    };
    
    this._init();
    
    return this;
}