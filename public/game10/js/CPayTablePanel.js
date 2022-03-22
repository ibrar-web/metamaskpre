function CPayTablePanel(){
    var _aNumSymbolComboText;
    var _aHighlightBg;
    var _aIconSymbol;
    var _oContainer;
    
    var _pGenericTableOffset;
    var _pTable1Pos;
    var _pTable2Pos;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        
        _pGenericTableOffset = {x:95, y:40.5};
        
        
        //LIST OF COMBO TEXT
        _pTable1Pos = {x:397, y:36}; 
        
        _aNumSymbolComboText = new Array();
        _aHighlightBg = new Array();
        _aIconSymbol = new Array();
        for(var i=0; i<4; i++){
            _aNumSymbolComboText[i] = new Array();
            _aHighlightBg[i] = new Array();
            _aIconSymbol[i+1] = new Array();
            for(var j=0; j<3; j++){
                var oSprite = s_oSpriteLibrary.getSprite('highlight');
                _aHighlightBg[i][j] = createBitmap(oSprite);
                _aHighlightBg[i][j].regX = oSprite.width/2;
                _aHighlightBg[i][j].regY = oSprite.height/2;
                _aHighlightBg[i][j].x = _pTable1Pos.x + j*_pGenericTableOffset.x;
                _aHighlightBg[i][j].y = _pTable1Pos.y + i*_pGenericTableOffset.y;
                _aHighlightBg[i][j].visible = false;
                _oContainer.addChild(_aHighlightBg[i][j]);
                
                var iWidth = oSprite.width-30;
                var iHeight = oSprite.height;
                var iX = _pTable1Pos.x + j*_pGenericTableOffset.x;
                var iY = _pTable1Pos.y + i*_pGenericTableOffset.y;
                var oText = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    24, "center", "#ff0000", PRIMARY_FONT, 1,
                    2, 2,
                    "x"+s_aSymbolWin[i]*(j+1),
                    true, true, false,
                    false );
                _aNumSymbolComboText[i][j] = oText;

                
                var szTag = 'paytable_symbol_'+(i+1);
                var oSprite = s_oSpriteLibrary.getSprite(szTag);
                _aIconSymbol[i+1][j] = createBitmap(oSprite);
                _aIconSymbol[i+1][j].regX = oSprite.width/2;
                _aIconSymbol[i+1][j].regY = oSprite.height/2;
                _aIconSymbol[i+1][j].x = _pTable1Pos.x - 70 + j*15;
                _aIconSymbol[i+1][j].y = _pTable1Pos.y - 2 + i*(40.5) + j*3;
                _oContainer.addChild(_aIconSymbol[i+1][j]);
                
            }
        }
        
        _pTable2Pos = {x:745, y:36}; 
        

        for(var i=0; i<4; i++){
            _aNumSymbolComboText[i+4] = new Array();
            _aHighlightBg[i+4] = new Array();
            _aIconSymbol[i+5] = new Array();
            for(var j=0; j<3; j++){
                var oSprite = s_oSpriteLibrary.getSprite('highlight');
                _aHighlightBg[i+4][j] = createBitmap(oSprite);
                _aHighlightBg[i+4][j].regX = oSprite.width/2;
                _aHighlightBg[i+4][j].regY = oSprite.height/2;
                _aHighlightBg[i+4][j].x = _pTable2Pos.x + j*_pGenericTableOffset.x;
                _aHighlightBg[i+4][j].y = _pTable2Pos.y + i*_pGenericTableOffset.y;
                _aHighlightBg[i+4][j].visible = false;
                _oContainer.addChild(_aHighlightBg[i+4][j]);
                
                var iWidth = oSprite.width-30;
                var iHeight = oSprite.height;
                var iX = _pTable2Pos.x + j*_pGenericTableOffset.x;
                var iY = _pTable2Pos.y + i*_pGenericTableOffset.y;
                var oText = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    24, "center", "#ff0000", PRIMARY_FONT, 1,
                    2, 2,
                    "x"+s_aSymbolWin[i+4]*(j+1),
                    true, true, false,
                    false );
                _aNumSymbolComboText[i+4][j] = oText;

               
                var szTag = 'paytable_symbol_'+(i+5);
                var oSprite = s_oSpriteLibrary.getSprite(szTag);
                _aIconSymbol[i+5][j] = createBitmap(oSprite);
                _aIconSymbol[i+5][j].regX = oSprite.width/2;
                _aIconSymbol[i+5][j].regY = oSprite.height/2;
                _aIconSymbol[i+5][j].x = _pTable2Pos.x - 70 + j*15;
                _aIconSymbol[i+5][j].y = _pTable2Pos.y - 2 + i*(40.5) + j*3;
                _oContainer.addChild(_aIconSymbol[i+5][j]);
                
            }
        }

        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);
    };
    
    this.unload = function(){
        _oContainer.removeAllEventListeners();
        
        s_oStage.removeChild(_oContainer);
    };
    
    this.show = function(){
        _oContainer.visible = true;
    };
    
    this.hide = function(){
        _oContainer.visible = false;
    };
    
    this.highlightColBg = function(iCol){
        for(var i=0;i<_aHighlightBg.length;i++){
            for(var j=0;j<_aHighlightBg[i].length;j++){
                _aHighlightBg[i][j].visible = false;
            }
        }    
            
        for(var i=0; i<_aHighlightBg.length; i++){
            _aHighlightBg[i][iCol].visible = true;
        }        
    };
    
    this.resetHighlightCombo = function(){
        
        for(var i=0;i<_aNumSymbolComboText.length;i++){
            for(var j=0;j<_aNumSymbolComboText[i].length;j++){
                createjs.Tween.removeTweens(_aHighlightBg[i][j]);
                _aHighlightBg[i][j].alpha = 1;
            }
        }
        
    };
    
    this.highlightCombo = function(iSymbolValue,iLine){
        
        for(var i=0;i<_aHighlightBg.length;i++){
            for(var j=0;j<_aHighlightBg[i].length;j++){
                _aHighlightBg[i][j].visible = false;
            }
        }  
        
        _aHighlightBg[iSymbolValue][iLine].visible = true;
        
        createjs.Tween.get(_aHighlightBg[iSymbolValue][iLine], {loop:true}).to({alpha:0}, 200).to({alpha:1}, 200);
    };

    this._onExit = function(){
        s_oGame.hidePayTable();
    };
    
    this.isVisible = function(){
        return _oContainer.visible;
    };
    
    this._init();
}