function CFreespinPanel(oParentContainer){
    var _oTextCongrats;
    var _oTextWin;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        _oContainer.addChild(oBg);
        
        _oTextCongrats = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-240, 300, 480, 50, 
                    50, "center", "#fff", FONT_GAME_1, 1,
                    0, 0,
                    TEXT_CONGRATS,
                    true, true, false,
                    false);

        
        _oTextWin = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-240, 420, 480, 50, 
                    50, "center", "#fff", FONT_GAME_1, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false);

    };
    
    this.show = function(iTotFreespin){
        _oTextWin.refreshText(TEXT_YOU_WIN + " " + iTotFreespin + " " + TEXT_FREESPINS);
        _oContainer.on("click",function(){});
        _oContainer.alpha = 0;
        _oContainer.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oContainer).to({alpha:1}, 800,createjs.Ease.cubicOut).call(function(){
                                                                                                setTimeout(function(){oParent.hide();},3000);
                                                                                    });
                                                                                    
        playSound("bonus_win",1,false);                                                                             
    };
    
    this.hide = function(){
        _oContainer.off("click",function(){});
        createjs.Tween.get(_oContainer).to({alpha:0}, 800,createjs.Ease.cubicOut).call(function(){_oContainer.visible = false;});
        
        s_oGame.exitFromFreespinPanel();
    };
    
    _oParentContainer = oParentContainer;
    this._init();
}