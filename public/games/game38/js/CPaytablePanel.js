function CPaytablePanel(iX,iY,oParentContainer){
    var _pStartPosPaytable;
    var _oTextBet;
    var _oTextMult;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(iX,iY){
        _pStartPosPaytable = {x:iX,y:iY};
        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPosPaytable.x;
        _oContainer.y = _pStartPosPaytable.y;
        _oParentContainer.addChild(_oContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("paytable_bg");
        var oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(oBg);
        
        
        var szText1 = "";
        var szText2 = "";
        for(var i=0;i<PAYOUT_MULT.length;i++){
            szText1 += TEXT_EVALUATOR[i];
            szText2 += PAYOUT_MULT[i] +":1" 
            if(i<PAYOUT_MULT.length-1){
                szText1 += "\n";
                szText2 += "\n";
            }
        }
        
        
        _oTextBet =  new CTLText(_oContainer, 
                    10, 10, 200, 180, 
                    20, "left", "#ffde00", FONT_GAME_1, 1,
                    0, 0,
                    szText1,
                    true, true, true,
                    false );
                    

        
        _oTextMult = new CTLText(_oContainer, 
                    oSpriteBg.width - 90, 10, 85, 180, 
                    20, "right", "#ffde00", FONT_GAME_1, 1,
                    0, 0,
                    szText2,
                    true, true, true,
                    false );
                    

    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oContainer.x = _pStartPosPaytable.x - iNewX;
    };
    
    _oParentContainer = oParentContainer;
    this._init(iX,iY);
}