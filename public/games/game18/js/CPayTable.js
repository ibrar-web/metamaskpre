function CPayTable(iX,iY){
    var _iAlphaAnim;
    var _aSelection;
    var _aPrizes;
    var _aComboText;
    var _oContainer;
    
    this._init = function(iX,iY){
        _iAlphaAnim = 0;
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        s_oStage.addChild(_oContainer);
        
        var oPayTable = createBitmap(s_oSpriteLibrary.getSprite('paytable'));
        _oContainer.addChild(oPayTable);
        
        var iXOffset = 278;
        var iYOffset = 4;
        _aSelection = new Array();
        for(var s=0;s<NUM_BETS;s++){
            var oSelection = createBitmap(s_oSpriteLibrary.getSprite('selection'));
            oSelection.visible = false;
            oSelection.x = iXOffset;
            oSelection.y = iYOffset;
            _oContainer.addChild(oSelection);
            
            _aSelection.push(oSelection);
            
            iXOffset += 100;
        }
        
        //COMBO TEXT
        iXOffset = 25;
        iYOffset = 15;
        _aComboText = new Array();
        for(var k=0;k<WIN_COMBINATIONS;k++){
            var oComboText = new CTLText(_oContainer, 
                    iXOffset, iYOffset, 250, 19, 
                    19, "right", "#fff000", FONT1, 1,
                    0, 0,
                    TEXT_COMBO[k],
                    true, true, false,
                    false );

            
            iYOffset += 20;
            
            _aComboText[k] = oComboText;
        }
        
        iXOffset = 375;
        
        //PRIZES TEXT
        _aPrizes = new Array();
        for(var i=0;i<NUM_BETS;i++){
            iYOffset = 27;
            _aPrizes[i] = new Array();
            for(var j=0;j<WIN_COMBINATIONS;j++){
                var oPrizeText = new createjs.Text(s_oPayTableSettings.getWin(i,j),"19px "+FONT1, "#fff000");
                oPrizeText.x = iXOffset;
                oPrizeText.y = iYOffset;
                oPrizeText.textAlign = "right";
                oPrizeText.textBaseline = "middle";
                _oContainer.addChild(oPrizeText);
                
                iYOffset += 20;
                _aPrizes[i][j] = oPrizeText;
            }   
            iXOffset += 100;
        }
    };
    
    this.resetHand = function(){
        createjs.Tween.removeAllTweens();
        for(var i=0;i<NUM_BETS;i++){
            for(var j=0;j<WIN_COMBINATIONS;j++){
                _aPrizes[i][j].alpha = 1;
            }
        }
        
        for(var k=0;k<WIN_COMBINATIONS;k++){
            _aComboText[k].alpha = 1;
        }
    };
    
    this.setCreditColumn = function(iCol){
        for(var i=0;i<NUM_BETS;i++){
            _aSelection[i].visible = false;
        }
        _aSelection[iCol].visible = true;
    };
    
    this.showWinAnim = function(iRow,iCol){
        createjs.Tween.get(_aPrizes[iRow][iCol],{loop:-1}).to({alpha:0}, 200).to({alpha:1}, 200);
        createjs.Tween.get(_aComboText[iCol],{loop:-1}).to({alpha:0}, 200).to({alpha:1}, 200);
    };
    
    this._init(iX,iY);
}