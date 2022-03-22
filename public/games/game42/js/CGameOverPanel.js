function CGameOverPanel(){
    var _oListenerBlock;
    var _oFade;
    var _oButExit;
    var _oTotWinText;
    var _oContainer;
    var _oContainerPanel;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oListenerBlock = _oFade.on("click",function(){})
        _oFade.alpha = 0;
        _oContainer.addChild(_oFade);

        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH/2;
        _oContainerPanel.y = CANVAS_HEIGHT/2;
        _oContainer.addChild(_oContainerPanel);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("msg_box");
        var oBg = createBitmap(oSpriteBg);
        _oContainerPanel.addChild(oBg);
        

        
        var oTitleText = new CTLText(_oContainerPanel, 
                    20, 170, oSpriteBg.width -40, 60, 
                    60, "center", FONT_COLOR, FONT, 1,
                    0, 0,
                    TEXT_END_GAME,
                    true, true, false,
                    false);

        
        _oTotWinText = new CTLText(_oContainerPanel, 
                    20, 300, oSpriteBg.width - 40, 100, 
                    50, "center", FONT_COLOR, FONT, 1,
                    0, 0,
                    "",
                    true, true, true,
                    false);
        
        _oButExit = new CTextButton(oSpriteBg.width/2, 560,s_oSpriteLibrary.getSprite("but_generic_small"),TEXT_EXIT,FONT,FONT_COLOR,124,_oContainerPanel);
        _oButExit.addEventListener(ON_MOUSE_UP,this._onExit,this);

        
        _oContainerPanel.regX = oSpriteBg.width/2;
        _oContainerPanel.regY = oSpriteBg.height/2;
        _oContainerPanel.scale = 0.01;

    };
    
    this.unload = function(){
        _oFade.off("click",_oListenerBlock);
    };
    
    this.show = function(iWinnings){
        playSound("gameover",1,false);
        _oContainer.visible = true;
        _oTotWinText.refreshText(TEXT_TOT_WIN+"\n"+TEXT_CURRENCY+iWinnings.toFixed(2));
        
        createjs.Tween.get(_oFade).to({alpha:0.7}, 600);  
        createjs.Tween.get(_oContainerPanel).to({scale:1}, 1000,createjs.Ease.elasticOut);  
    };
    
    this._onExit = function(){
        _oButExit.disable();
        
        s_oGame.unload();
    };
    
    
    this._init();
}