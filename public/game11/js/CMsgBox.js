function CMsgBox(szText,oParentContainer){
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oMsgText;
    var _oButYes;
    var _oThis;
    var _oFade;
    var _oPanelContainer;
    var _oGroup;

    this._init = function () {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oGroup = new createjs.Container();
        oParentContainer.addChild(_oGroup);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0.7;
        _oFade.on("mousedown",function(){});
        _oGroup.addChild(_oFade);

        _oPanelContainer = new createjs.Container();   
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT/2;
        _oGroup.addChild(_oPanelContainer);

        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oBg = createBitmap(oSprite);
        oBg.regX = oSprite.width/2;
        oBg.regY = oSprite.height/2;
        _oPanelContainer.addChild(oBg);

        var iWidth = 750;
        var iHeight = 350;
        var iTextX = 0;
        var iTextY = -100;
        _oMsgText = new CTLText(_oPanelContainer, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    70, "center", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, true,
                    false );

        var oSpriteButHome = s_oSpriteLibrary.getSprite("but_yes");
        _oButYes = new CGfxButton(0, 200, oSpriteButHome, _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_DOWN, _oThis._onButOk, this);

        s_oStage.addChild(_oGroup);
        
        smartResize(_oPanelContainer,60,60);
        
    };

    this._onButOk = function () {
        _oThis.unload();
    };

    this.unload = function () {
        _oButYes.unload();
        oParentContainer.removeChild(_oGroup);
        _oFade.removeAllEventListeners();
    };
    
    _oThis = this;

    this._init(szText);
}