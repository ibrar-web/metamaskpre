function CAreYouSurePanel(oSpriteBg) {
    var _aCbCompleted;
    var _aCbOwner;

    var _oBg;
    var _oMsgText;
    var _oExplText;

    var _oGroup;
    var _oPanelContainer;
    var _oButNo;
    var _oButYes;
    var _oFade;
    var _oParent;

    this._init = function (oSpriteBg) {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible = false;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0.7;
        _oFade.on("mousedown",function(){});
        _oGroup.addChild(_oFade);

        _oPanelContainer = new createjs.Container();   
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT/2;
        _oGroup.addChild(_oPanelContainer);

        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width/2;
        _oBg.regY = oSpriteBg.height/2;
        _oPanelContainer.addChild(_oBg);

        var iWidth = 750;
        var iHeight = 100;
        var iTextX = 0;
        var iTextY = -250;
        _oMsgText = new CTLText(_oPanelContainer, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    70, "center", "#fff", SECONDARY_FONT, 1,
                    2, 2,
                    "",
                    true, true, false,
                    false );
                    
  
        var iWidth = 750;
        var iHeight = 100;
        var iTextX = 0;
        var iTextY = -80;
        _oExplText = new CTLText(_oPanelContainer, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    40, "center", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    TEXT_ARE_SURE,
                    true, true, true,
                    false );
                    
        
        var oSpriteButHome = s_oSpriteLibrary.getSprite("but_no");
        _oButNo = new CGfxButton(-200, 200, oSpriteButHome, _oPanelContainer);
        _oButNo.addEventListener(ON_MOUSE_DOWN, _oParent._onRefuse, this);
        _oButNo.pulseAnimation();

        var oSpriteButHome = s_oSpriteLibrary.getSprite("but_yes");
        _oButYes = new CGfxButton(200, 200, oSpriteButHome, _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_DOWN, _oParent._onYes, this);

        s_oStage.addChild(_oGroup);
    };

    this.smartResize = function(){
        smartResize(_oPanelContainer,60,60);
    };

    this.unload = function () {
        _oFade.removeAllEventListeners();
        s_oStage.removeChild(_oGroup);
        _oButNo.unload();
        _oButNo = null;
        _oButYes.unload();
        _oButYes = null;
    };

    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };

    this.hide = function(){
        _oGroup.visible = false;
        
        createjs.Tween.get(_oGroup).to({alpha: 0}, 500);
    };

    this.show = function () {
        _oGroup.visible = true;

        createjs.Tween.get(_oGroup).to({alpha: 1}, 500);
    };

    this._onRefuse = function () {
        _oParent.hide();
        
        var iEventToLaunch = ON_REFUSE;
        if(_aCbCompleted[iEventToLaunch]){
            _aCbCompleted[iEventToLaunch].call(_aCbOwner[iEventToLaunch]);
        }
    };

    this._onYes = function () {
        _oParent.hide();
        
        var iEventToLaunch = ON_CONFIRM;
        if(_aCbCompleted[iEventToLaunch]){
            _aCbCompleted[iEventToLaunch].call(_aCbOwner[iEventToLaunch]);
        }
    };

    _oParent = this;
    this._init(oSpriteBg);

    return this;
}