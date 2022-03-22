function CWinDisplay(iX,iY,oParentContainer){
    var _iStartingX;
    var _oDescText;
    var _oWinText;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(iX,iY){
        _iStartingX = iX;
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('win_bg');
        var oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(oBg);
        
        _oDescText =  new CTLText(_oContainer, 
                    oSpriteBg.width/2 -90, oSpriteBg.height/2 - 38, 180, 33, 
                    23, "center", "#ffffff", FONT_GAME_1, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );
          
        
        _oWinText =  new CTLText(_oContainer, 
                    oSpriteBg.width/2 -90, oSpriteBg.height/2 +6, 180, 33, 
                    29, "center", "#ffffff", FONT_GAME_1, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );
          
        
     
    };
    
    this.show = function(szDesc,iWin,szTextWin){
        _oDescText.refreshText(szDesc);
        
        if(iWin > 0){
            _oWinText.setColor("#07a74f");
            _oWinText.refreshText(szTextWin + " " +iWin.toFixed(2));
        }else{
            _oWinText.setColor("#ce0909");
            _oWinText.refreshText(TEXT_NO_WIN);
        }
        
        _oContainer.visible = true;
        
        createjs.Tween.get(_oContainer).to({x:CANVAS_WIDTH/2 + 100}, 400,createjs.Ease.cubicOut);
    };
    
    this.hide = function(){
        createjs.Tween.get(_oContainer).to({x:_iStartingX}, 400,createjs.Ease.cubicOut).call(function(){_oContainer.visible = false;});
    };
    
    _oParentContainer = oParentContainer;
    
    this._init(iX,iY);
}