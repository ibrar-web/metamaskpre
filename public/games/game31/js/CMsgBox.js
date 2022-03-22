function CMsgBox(){
    
    var _oBg;
    var _oMsgText;
    var _oButExit;
    var _oGroup;
    
    this._init = function(){
        _oGroup = new createjs.Container();
        _oGroup.visible = false;
        s_oStage.addChild(_oGroup);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oGroup.addChild(_oBg);

        _oMsgText = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-220, (CANVAS_HEIGHT/2) - 50, 440, 120, 
                    30, "center", "#fff", FONT_GAME_1, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false);

                                                      
        _oButExit = new CGfxButton((CANVAS_WIDTH/2) + 210,CANVAS_HEIGHT/2 - 110,s_oSpriteLibrary.getSprite('but_exit_info'),_oGroup);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this); 
    };
    
    this.show = function(szMsg){
        _oMsgText.refreshText(szMsg);
        _oGroup.visible = true;
    };
    
    this.hide = function(){
        _oGroup.visible = false;
    };
    
    this._onExit = function(){
        this.hide();
    };
    
    this._init();
    
    return this;
}