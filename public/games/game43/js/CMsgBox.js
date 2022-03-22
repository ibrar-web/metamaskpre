function CMsgBox(){
    var _oListenerBlock;
    var _oBlock;
    var _oBg;
    var _oMsgText;
    var _oMsgTextBack;
    var _oButExit;
    var _oGroup;
    
    this._init = function(){
        _oGroup = new createjs.Container();
        _oGroup.visible = false;
        s_oStage.addChild(_oGroup);
        
        _oBlock = new createjs.Shape();
        _oBlock.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oListenerBlock = _oBlock.on("click",function(){});
        _oGroup.addChild(_oBlock);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width/2;
        _oBg.regY = oSpriteBg.height/2;
        _oBg.x = CANVAS_WIDTH/2;
        _oBg.y = CANVAS_HEIGHT/2;
        _oGroup.addChild(_oBg);

        _oMsgTextBack = new createjs.Text("","21px "+FONT_GAME_1, "#000");
        _oMsgTextBack.x = CANVAS_WIDTH/2 +2;
        _oMsgTextBack.y = (CANVAS_HEIGHT/2)-87;
        _oMsgTextBack.lineWidth = 300;
        _oMsgTextBack.textAlign = "center";
        _oGroup.addChild(_oMsgTextBack);

        _oMsgText = new createjs.Text("","21px "+FONT_GAME_1, "#ffffff");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = (CANVAS_HEIGHT/2) - 85;
        _oMsgText.textAlign = "center";
        _oMsgText.lineWidth = 300;
        _oGroup.addChild(_oMsgText);
                                                      
        _oButExit = new CGfxButton((CANVAS_WIDTH/2) + 218,CANVAS_HEIGHT/2 - 115,s_oSpriteLibrary.getSprite('but_exit'),_oGroup);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this); 
    };
    
    this.unload = function(){
        _oBlock.off("click",_oListenerBlock);
        _oButExit.unload();
    };
    
    this.show = function(szMsg){
        _oMsgTextBack.text = szMsg;
        _oMsgText.text = szMsg;
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