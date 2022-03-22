function CMsgBox(oParentContainer){
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oText;
    var _oButYes;
    var _oButNo;
    var _oListenerDown;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oListenerDown = _oContainer.on("click",function(){});
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
        
        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        oFade.alpha = 0.7;
        _oContainer.addChild(oFade);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box')
        var oBg = createBitmap(oSprite);
        oBg.regX = oSprite.width/2;
        oBg.regY = oSprite.height/2;
        oBg.x = CANVAS_WIDTH/2;
        oBg.y = CANVAS_HEIGHT/2;
        _oContainer.addChild(oBg);
        
        var iWidth = 420;
        var iHeight = 180;
        var iX = CANVAS_WIDTH/2;
        var iY = CANVAS_HEIGHT/2-50;
        _oText = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    40, "center", "#fff", SECONDARY_FONT, 1,
                    2, 2,
                    " ",
                    true, true, true,
                    false );
        
        _oButYes = new CGfxButton(CANVAS_WIDTH/2 + 175,400,s_oSpriteLibrary.getSprite("but_yes"),_oContainer);
        _oButYes.addEventListener(ON_MOUSE_UP,this._onReleaseYes,this);
        
        _oButNo = new CGfxButton(CANVAS_WIDTH/2 - 175,400,s_oSpriteLibrary.getSprite("but_exit"),_oContainer);
        _oButNo.addEventListener(ON_MOUSE_UP,this._onReleaseNo,this);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.unload = function(){
        _oContainer.off("click",_oListenerDown);
        _oButNo.unload();
        _oButYes.unload();
    };
    
    this.show = function(szText){
        _oText.refreshText( szText );
        _oContainer.visible = true;
        _oContainer.alpha = 0;
        createjs.Tween.get(_oContainer).to({alpha: 1}, 500,createjs.Ease.cubicOut);
    };
    
    this.hide = function(){
        _oContainer.visible = false;
    };
    
    this._onReleaseYes = function(){
        if(_aCbCompleted[ON_RELEASE_YES]){
            _aCbCompleted[ON_RELEASE_YES].call(_aCbOwner[ON_RELEASE_YES]);
        }
    };
    
    this._onReleaseNo = function(){
        if(_aCbCompleted[ON_RELEASE_NO]){
            _aCbCompleted[ON_RELEASE_NO].call(_aCbOwner[ON_RELEASE_NO]);
        }
        _oContainer.visible = false;
    };
    
    _oParentContainer = oParentContainer;
    this._init(oParentContainer);
}