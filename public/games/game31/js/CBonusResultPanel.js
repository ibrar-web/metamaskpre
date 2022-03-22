function CBonusResultPanel(iPrize,oParentContainer){
    var _oFade;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(iPrize){
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oParentContainer.addChild(_oFade);
        
        _oContainer = new createjs.Container();
        _oContainer.x = -CANVAS_WIDTH/2;
        _oContainer.y = CANVAS_HEIGHT/2;
        _oParentContainer.addChild(_oContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite("bonus_panel_bg");
        var oBg = createBitmap(oSprite);
        oBg.regX = oSprite.width/2;
        oBg.regY = oSprite.height/2;
        _oContainer.addChild(oBg);
        
        var oCongratsText = new CTLText(_oContainer, 
                    -240, -110, 480, 52, 
                    52, "center", "#fff", FONT_GAME_1, 1,
                    0, 0,
                    TEXT_CONGRATS,
                    true, true, false,
                    false );

        oCongratsText.setShadow("#000", 1, 1, 1);
        
        
        var oWonText = new CTLText(_oContainer, 
                    -240, 10, 480, 100, 
                    50, "center", "#fff", FONT_GAME_1, 1,
                    0, 0,
                    TEXT_YOU_WIN+"\nX"+iPrize,
                    true, true, true,
                    false);

        oWonText.setShadow("#000", 1, 1, 1);


        createjs.Tween.get(_oContainer).to({x:CANVAS_WIDTH/2 }, 1000,createjs.Ease.cubicOut).call(function(){
                                                                        createjs.Tween.get(_oFade).to({alpha:0.6}, 400); 
                                                            }).call(function(){
                                                                        setTimeout(function(){s_oBonusPanel.unload();},2000);
                                                                            });
                                                                            
        playSound("bonus_win",1,false);                                                                    
    };
    
    this.unload = function(){
        _oParentContainer.removeChild(_oFade);
        _oParentContainer.removeChild(_oContainer);
    };
    
    _oParentContainer = oParentContainer;
    this._init(iPrize);
}