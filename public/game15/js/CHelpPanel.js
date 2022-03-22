function CHelpPanel(){
    var NUM_PAGES = 2;
    var _iHeight;
    var _iCurPage;
    var _aContainerPages;
    var _oListenerDown;
    var _oThis = this;
    
    var _oFade;
    var _oButRight;
    var _oButLeft;
    var _oButPlay;
    var _oText;
    var _oContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oListenerDown = _oFade.on("click",function(){});
        _oContainer.addChild(_oFade);
        
        _aContainerPages = new Array();
        
        for(var i=0;i<NUM_PAGES;i++){
            this._createPage(i);
        }
        
        
        _oButRight = new CGfxButton(CANVAS_WIDTH/2 + 300,470,s_oSpriteLibrary.getSprite("help_arrow_right"),_oContainer);
        _oButRight.addEventListener(ON_MOUSE_UP,this._onRight,this);
        
        _oButLeft = new CGfxButton(CANVAS_WIDTH/2 - 300,470,s_oSpriteLibrary.getSprite("help_arrow_left"),_oContainer);
        _oButLeft.addEventListener(ON_MOUSE_UP,this._onLeft,this);
        
        _oButPlay = new CGfxButton(CANVAS_WIDTH/2 ,580,s_oSpriteLibrary.getSprite("but_play"),_oContainer);
        _oButPlay.setScale(0.4);
        _oButPlay.addEventListener(ON_MOUSE_UP,this._onPlay,this);
        
        _aContainerPages[0].visible = true;
        _iCurPage = 0;
    };
    
    this.unload = function(){
        _oFade.off("click",_oListenerDown);
        _oButLeft.unload();
        _oButRight.unload();
        _oButPlay.unload();
      
        s_oStage.removeChild(_oContainer);
    };
    
    this.show = function(){
        _oContainer.y = -_iHeight;
        _oFade.alpha = 0;
        
        _oContainer.visible= true;

        createjs.Tween.get(_oFade).to({alpha: 0.7}, 1000,createjs.Ease.cubicOut);
        createjs.Tween.get(_oContainer).to({y: CANVAS_HEIGHT/2}, 1000,createjs.Ease.backOut);
    };
    
    this._createPage = function(iPage){
        var oContainerPage = new createjs.Container();
        oContainerPage.visible = false;
        _oContainer.addChild(oContainerPage);
        
        _aContainerPages.push(oContainerPage);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        var oBg = createBitmap(oSpriteBg);
        oContainerPage.addChild(oBg);

        _oText = new CTLText(oContainerPage, 
                    oSpriteBg.width/2-350, 30, 700, 120, 
                    30, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    window["TEXT_HELP_PAGE"+(iPage+1)][s_iMode].format(NUM_SCROLLING_DECK),
                    true, true, true,
                    false );
                    

        var oSpriteHelpImage = s_oSpriteLibrary.getSprite("image_help_"+iPage+"_"+s_iMode);
        var oImage = createBitmap(oSpriteHelpImage);
        oImage.regX = oSpriteHelpImage.width/2;
        oImage.regY = oSpriteHelpImage.height;
        oImage.x = oSpriteBg.width/2;
        oImage.y = 420;
        oContainerPage.addChild(oImage);
        
        oContainerPage.regX = oSpriteBg.width/2;
        oContainerPage.regY = oSpriteBg.height/2;
        oContainerPage.x = CANVAS_WIDTH/2;
        oContainerPage.y = CANVAS_HEIGHT/2;
        
        _iHeight = oSpriteBg.height;
    };
    
    this._onRight = function(){
        _aContainerPages[_iCurPage].visible = false;
        _iCurPage++;
        if(_iCurPage === NUM_PAGES){
            _iCurPage = 0;
        }
        
        _aContainerPages[_iCurPage].visible = true;
    };
    
    this._onLeft = function(){
        _aContainerPages[_iCurPage].visible = false;
        _iCurPage--;
        if(_iCurPage <0){
            _iCurPage = NUM_PAGES-1;
        }
        
        _aContainerPages[_iCurPage].visible = true;
    };
    
    this._onPlay = function(){
        _oThis.unload();
        s_oGame.onExitHelp();
    };
    this._init();
}