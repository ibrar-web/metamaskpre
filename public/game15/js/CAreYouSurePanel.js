function CAreYouSurePanel(oParentContainer){
    var _iHeight;
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oText;
    var _oButYes;
    var _oButNo;
    var _oListenerDown;
    
    var _oFade;
    var _oMainContainer;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oMainContainer = new createjs.Container();   
        _oMainContainer.visible= false;
        _oParentContainer.addChild(_oMainContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oListenerDown = _oFade.on("click",function(){});
        _oMainContainer.addChild(_oFade);
        
        _oContainer = new createjs.Container();
        _oMainContainer.addChild(_oContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box_small');
        var oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(oBg);
        
        _oText = new CTLText(_oContainer, 
                    oSpriteBg.width/2-250, 20, 500, 120, 
                    40, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );
                    

        
        _oButYes = new CGfxButton(oSpriteBg.width/2 + 150,220,s_oSpriteLibrary.getSprite("but_yes"),_oContainer);
        _oButYes.addEventListener(ON_MOUSE_UP,this._onReleaseYes,this);
        
        _oButNo = new CGfxButton(oSpriteBg.width/2 - 150,220,s_oSpriteLibrary.getSprite("but_no"),_oContainer);
        _oButNo.addEventListener(ON_MOUSE_UP,this._onReleaseNo,this);
        
        _oContainer.regX = oSpriteBg.width/2;
        _oContainer.regY = oSpriteBg.height/2;
        _oContainer.x = CANVAS_WIDTH/2;
        _oContainer.y = CANVAS_HEIGHT/2;
        
        _iHeight = oSpriteBg.height;
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.unload = function(){
        _oFade.off("click",_oListenerDown);
        _oButNo.unload();
        _oButYes.unload();
    };
    
    this.show = function(szText){
        _oContainer.y = -_iHeight;
        _oFade.alpha = 0;
        
        _oMainContainer.visible= true;
        _oText.refreshText(szText);
        _oContainer.visible = true;

        createjs.Tween.get(_oFade).to({alpha: 0.7}, 1000,createjs.Ease.cubicOut);
        createjs.Tween.get(_oContainer).to({y: CANVAS_HEIGHT/2}, 1000,createjs.Ease.backOut);
    };
    
    this.hide = function(){
        _oMainContainer.visible = false;
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
        _oMainContainer.visible = false;
    };
    
    _oParentContainer = oParentContainer;
    this._init(oParentContainer);
}