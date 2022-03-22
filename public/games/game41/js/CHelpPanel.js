function CHelpPanel(){
    var _oFade;
    var _oHelpBg;
    var _oGroup;
    var _oParent;
    var _oListener;

    this._init = function(){
        var oParent = this;
        
        _oGroup = new createjs.Container();
        s_oStage.addChild(_oGroup);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("rgba(0,0,0,1)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        createjs.Tween.get(_oFade).to({alpha:0.7}, 500);
        _oGroup.addChild(_oFade);
        
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oHelpBg = createBitmap(oSprite);
        _oHelpBg.x = CANVAS_WIDTH/2;
        _oHelpBg.y = CANVAS_HEIGHT/2;
        _oHelpBg.regX = oSprite.width/2;
        _oHelpBg.regY = oSprite.height/2;
        _oGroup.addChild(_oHelpBg);
        
        var oText1Pos = {x: CANVAS_WIDTH/2, y: (CANVAS_HEIGHT/2)+20};
        var iWidth = oSprite.width-100;
        var iHeight = 70;
        var iX = oText1Pos.x;
        var iY = oText1Pos.y;
        var oText1Stroke = new CTLText(_oGroup, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    20, "center", "#000", THIRD_FONT, 1.2,
                    2, 2,
                    TEXT_HELP1,
                    true, true, true,
                    false );
        oText1Stroke.setOutline(5);
        var oText1 = new CTLText(_oGroup, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    20, "center", "#fff", THIRD_FONT, 1.2,
                    2, 2,
                    TEXT_HELP1,
                    true, true, true,
                    false );
                    
  
        //////////////////////// BET CONTROLLER /////////////////////////
        var oControllerContainer = new createjs.Container();
        oControllerContainer.x = CANVAS_WIDTH/2;
        oControllerContainer.y = 680;
        _oGroup.addChild(oControllerContainer);

        var oSprite = s_oSpriteLibrary.getSprite('bet_panel');
        var oBetBg = createBitmap(oSprite);
        oBetBg.regX = oSprite.width/2;
        oBetBg.regY = oSprite.height/2;
        oBetBg.y = -100;
        oControllerContainer.addChild(oBetBg);

        var iWidth = oSprite.width-20;
        var iHeight = oSprite.height-20;
        var iX = oBetBg.x;
        var iY = oBetBg.y-2;
        var oBetNum = new CTLText(oControllerContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    20, "center", "#fff", THIRD_FONT, 1,
                    2, 2,
                    formatValue( START_BET ),
                    true, true, false,
                    false );

        var oSprite = s_oSpriteLibrary.getSprite('but_plus');
        var oButPlus = new CTextButton(98, -100, oSprite,TEXT_PLUS,THIRD_FONT,"#ffffff",60, false, oControllerContainer);
        oButPlus.enable();
        oButPlus.setClickable(false);

        var oSprite = s_oSpriteLibrary.getSprite('but_plus');
        var oButMin = new CTextButton(-98,-100, oSprite,TEXT_MIN,THIRD_FONT,"#ffffff",60, false, oControllerContainer);
        oButMin.enable();
        oButMin.setTextPosition(-2,10);
        oButMin.setClickable(false);

        var oText2Pos = {x: CANVAS_WIDTH/2, y: (CANVAS_HEIGHT/2) +114};
        var iWidth = 200;
        var iHeight = 70;
        var iX = oText2Pos.x;
        var iY = oText2Pos.y;
        var oText2Stroke = new CTLText(_oGroup, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    20, "center", "#000", THIRD_FONT, 1.2,
                    2, 2,
                    TEXT_HELP3,
                    true, true, true,
                    false );
        oText2Stroke.setOutline(5);
        var oText2 = new CTLText(_oGroup, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    20, "center", "#fff", THIRD_FONT, 1.2,
                    2, 2,
                    TEXT_HELP3,
                    true, true, true,
                    false );
        
        var oSpinContainer = new createjs.Container();
        oSpinContainer.x = CANVAS_WIDTH/2 - 170;
        oSpinContainer.y = 760;
        oSpinContainer.scaleX = oSpinContainer.scaleY = 0.5;
        _oGroup.addChild(oSpinContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_spin');
        var oButSpin = new CTextButton(0,0,oSprite,TEXT_SPIN,THIRD_FONT,"#ffffff",60, false, oSpinContainer);
        oButSpin.enable();
        oButSpin.setClickable(false);
        
        var oSprite = s_oSpriteLibrary.getSprite('swipe_hand');
        var oSwipe = createBitmap(oSprite);
        oSwipe.x = CANVAS_WIDTH/2 + 170;
        var iStartingPos = 745;
        oSwipe.y = iStartingPos;
        oSwipe.regX = oSprite.width/2;
        oSwipe.regY = oSprite.height/2;
        _oGroup.addChild(oSwipe);
        
        createjs.Tween.get(oSwipe, {loop:true}).to({y:iStartingPos +30}, 1000, createjs.Ease.cubicOut);

        
 
        
        _oListener = _oGroup.on("pressup",function(){oParent._onExitHelp();});
     
    };

    this.unload = function(){
        s_oStage.removeChild(_oGroup);

        var oParent = this;
        _oGroup.off("pressup",_oListener);
    };

    this._onExitHelp = function(){
        _oParent.unload();

    };

    _oParent=this;
    this._init();

}
