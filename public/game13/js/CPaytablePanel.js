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
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("paytable_ante_bg");
        var oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(oBg);
        
        var oTextTileAnte = new CTLText(_oContainer, 
                    10, 6, oSpriteBg.width-20, 24, 
                    24, "left", "#ffde00", FONT_GAME_1, 1,
                    0, 0,
                    TEXT_ANTE_BONUS,
                    true, true, false,
                    false );

        
        var szText1 = "";
        var szText2 = "";
        for(var i=0;i<PAYOUT_ANTE.length;i++){
            szText1 += TEXT_EVALUATOR[i] + "\n";
            szText2 += PAYOUT_ANTE[i] +":1"+ "\n";
        }
        
        szText1 = szText1.substring(0, szText1.length-1);
        szText2 = szText2.substring(0, szText2.length-1);
        
        _oTextBet = new CTLText(_oContainer, 
                    10, oTextTileAnte.getY()+35, oSpriteBg.width-65, 60, 
                    20, "left", "#ffde00", FONT_GAME_1, 1,
                    0, 0,
                    szText1,
                    true, true, true,
                    false );
                    
   
        
        _oTextMult = new CTLText(_oContainer, 
                    oSpriteBg.width - 50, oTextTileAnte.getY()+35, 40, 60, 
                    20, "right", "#ffde00", FONT_GAME_1, 1,
                    0, 0,
                    szText2,
                    true, true, true,
                    false );
   
        
        //ATTACH PAIR PLUS PAYOUTS
        var oBg = createBitmap(s_oSpriteLibrary.getSprite("paytable_pair_plus_bg"));
        oBg.y = oSpriteBg.height +10;
        _oContainer.addChild(oBg);
        
        var oTextTileAnte = new CTLText(_oContainer, 
                    10, oBg.y + 6, oSpriteBg.width-20, 24, 
                    24, "left", "#ffde00", FONT_GAME_1, 1,
                    0, 0,
                    TEXT_PAIR_PLUS,
                    true, true, false,
                    false );
                    

        
        var szText1 = "";
        var szText2 = "";
        for(var i=0;i<PAYOUT_PLUS.length;i++){
            szText1 += TEXT_EVALUATOR[i] + "\n";
            szText2 += PAYOUT_PLUS[i] +":1"+ "\n";
        }
        
        szText1 = szText1.substring(0, szText1.length-1);
        szText2 = szText2.substring(0, szText2.length-1);
        
        _oTextBet = new CTLText(_oContainer, 
                    10, oTextTileAnte.getY()+32, oSpriteBg.width-65, 110, 
                    20, "left", "#ffde00", FONT_GAME_1, 1,
                    0, 0,
                    szText1,
                    true, true, true,
                    false );
                    
        
        
        _oTextMult = new CTLText(_oContainer, 
                    oSpriteBg.width - 50, oTextTileAnte.getY()+32, 40, 110, 
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