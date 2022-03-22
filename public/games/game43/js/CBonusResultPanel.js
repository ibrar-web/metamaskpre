function CBonusResultPanel(iPrize, oParentContainer){
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(iPrize){
       _oContainer = new createjs.Container();
        _oContainer.alpha = 0;
        _oParentContainer.addChild(_oContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite("msg_box");
        var oBg = createBitmap(oSprite);
        oBg.regX = oSprite.width/2;
        oBg.regY = oSprite.height/2;
        oBg.x = CANVAS_WIDTH/2;
        oBg.y = CANVAS_HEIGHT/2;
        _oContainer.addChild(oBg);
        
        var oCongratsText = new createjs.Text(TEXT_CONGRATS,"32px "+FONT_GAME_1, "#fff");
        oCongratsText.textAlign="center";
        oCongratsText.x = CANVAS_WIDTH/2;
        oCongratsText.y = CANVAS_HEIGHT/2-100;
        _oContainer.addChild(oCongratsText);
        
        var oWonText = new createjs.Text(TEXT_YOU_WIN+"\n"+formatEntries(iPrize),"35px "+FONT_GAME_1, "#fff");
        oWonText.x = CANVAS_WIDTH/2;
        oWonText.y = CANVAS_HEIGHT/2+24;
        oWonText.textAlign="center";
        oWonText.lineHeight = 35;
        oWonText.textBaseline="middle";
        _oContainer.addChild(oWonText);

        createjs.Tween.get(_oContainer).to({alpha:1 }, 1000,createjs.Ease.cubicOut).call(function(){
                                                                        setTimeout(function(){s_oBonusPanel.hide();},3000);
                                                                            });
                                                                                                                                             
                                                                                                                                               
    };
    
    this.unload = function(){
        _oParentContainer.removeChild(_oContainer);
    };
    
    _oParentContainer = oParentContainer;
    this._init(iPrize);
}