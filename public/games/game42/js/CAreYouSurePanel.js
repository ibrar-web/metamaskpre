function CAreYouSurePanel(iStartX,iStartY,oEaseIn,oEaseOut,oParentContainer) {
    var _iStartY = iStartY;
    var _iStartX = iStartX;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;
    var _oEaseInInfos = oEaseIn;
    var _oEaseOutInfos = oEaseOut;
    
    var _oBg;
    var _oMsg;
    var _oButYes;
    var _oButNo;
    var _oContainer;
    var _oParentContainer;
    var _oFade;
    var _oPanelContainer;
    
    var _oThis = this;

    this._init = function (iStartX) {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;
        _oListener = _oFade.on("click", function () {});
        _oContainer.addChild(_oFade);
        
        _oPanelContainer = new createjs.Container();   
        _oContainer.addChild(_oPanelContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;
        _oPanelContainer.addChild(_oBg);
        
        _oPanelContainer.x = _iStartX;
        _oPanelContainer.y = _iStartY;    
        
        _oMsg = new CTLText(_oPanelContainer, 
                    -300, -150, 600, 160, 
                    80, "center", FONT_COLOR, FONT, 1,
                    0, 0,
                    TEXT_ARE_YOU_SURE,
                    true, true, true,
                    false );


        
        

        _oButYes = new CGfxButton(200, 140, s_oSpriteLibrary.getSprite('but_yes'), _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(-200, 140, s_oSpriteLibrary.getSprite('but_no'), _oPanelContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    };
    
    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };
    
    this.show = function () {
        _oPanelContainer.x = _iStartX;
        _oPanelContainer.y = _iStartY;
        _oContainer.visible = true;
        createjs.Tween.get(_oPanelContainer).to(_oEaseInInfos.property, _oEaseInInfos.time, _oEaseInInfos.type).call(function(){s_oMain.stopUpdateNoBlock();});
    };
    
    this._playHideAnim = function(bExit){
         s_oMain.startUpdateNoBlock();
         
        if(_oEaseOutInfos === null){
            _oThis.hide(bExit);
        }else{
            createjs.Tween.get(_oPanelContainer).to(_oEaseOutInfos.property, _oEaseOutInfos.time, _oEaseOutInfos.type).call(function(){_oThis.hide(bExit);});
        }
    };
    
    this.hide = function(bExit){
        _oContainer.visible = false;
        
        
        if (bExit && _aCbCompleted[ON_EXIT_FROM_GAME]) {
            _aCbCompleted[ON_EXIT_FROM_GAME].call(_aCbOwner[ON_EXIT_FROM_GAME]);
        }
    };

    this.unload = function () {
        _oButNo.unload();
        _oButYes.unload();
        _oFade.off("click",_oListener);
    };

    this._onButYes = function () {
        _oThis._playHideAnim(true);
        
        
    };

    this._onButNo = function () {
        
        _oThis._playHideAnim(false);
    };

    _oParentContainer = oParentContainer;

    this._init();
}