function CHelpPanel(iStartX,iStartY,oEaseIn,oEaseOut,oParentContainer){
    var _iStartY = iStartY;
    var _iStartX = iStartX;
    var _aCbCompleted;
    var _aCbOwner;
    var _oEaseInInfos = oEaseIn;
    var _oEaseOutInfos = oEaseOut;
    var _oListener;
    
    var _oButExit;
    var _oFade;
    var _oContainer;
    var _oPanelContainer;
    var _oParentContainer = oParentContainer;
    
    var _oThis = this;
    
    this._init = function(){
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.7;
        _oListener = _oFade.on("click", function (){});
        _oContainer.addChild(_oFade);
        
        _oPanelContainer = new createjs.Container();  
        _oPanelContainer.x = _iStartX;
        _oPanelContainer.y = _iStartY;  
        _oContainer.addChild(_oPanelContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        var oBg = createBitmap(oSpriteBg);
        oBg.regX = oSpriteBg.width * 0.5;
        oBg.regY = oSpriteBg.height * 0.5;
        _oPanelContainer.addChild(oBg);
        
        
        var oMsg = new CTLText(_oPanelContainer, 
                    -350, -150, 700, 140, 
                    70, "center", FONT_COLOR, FONT, 1,
                    0, 0,
                    TEXT_HELP,
                    true, true, true,
                    false );
                    
        _oButExit = new CGfxButton(0,120,s_oSpriteLibrary.getSprite("but_yes"),_oPanelContainer);
        _oButExit.addEventListener(ON_MOUSE_UP,this._onExit,this);
    };
    
    this.unload = function(){
        _oFade.off("click",_oListener);
    };
    
    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };
    
    this.show = function(){
        _oPanelContainer.x = _iStartX;
        _oPanelContainer.y = _iStartY;
        _oContainer.visible = true;
        createjs.Tween.get(_oPanelContainer).to(_oEaseInInfos.property, _oEaseInInfos.time, _oEaseInInfos.type);
    };
    
    this._playHideAnim = function(bExit){

        if(_oEaseOutInfos === null){
            _oThis.hide(bExit);
        }else{
            createjs.Tween.get(_oPanelContainer).to(_oEaseOutInfos.property, _oEaseOutInfos.time, _oEaseOutInfos.type).call(function(){_oThis.hide(bExit);});
        }
    };
    
    this.hide = function(bExit){
        _oContainer.visible = false;
        
        
        if (_aCbCompleted[ON_EXIT_FROM_HELP]) {
            _aCbCompleted[ON_EXIT_FROM_HELP].call(_aCbOwner[ON_EXIT_FROM_HELP],bExit);
        }
    };
    
    this._onExit = function(){
        _oThis._playHideAnim();
    };
    
    this._init();
}
