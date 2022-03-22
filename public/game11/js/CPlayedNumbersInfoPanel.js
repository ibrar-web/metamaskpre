function CPlayedNumbersInfoPanel(oSprite, iX, iY, oContainer){
    
    var _aNumbers;
    
    var _oPanelContainer;
    
    var _pStartPos;
    
    this._init = function(oSprite, iX, iY, oContainer){
        _pStartPos = {x: iX, y: iY};
        
        _oPanelContainer = new createjs.Container();   
        _oPanelContainer.x = _pStartPos.x;
        _oPanelContainer.y = _pStartPos.y;
        oContainer.addChild(_oPanelContainer);
        
        var oBg = createBitmap(oSprite);
        oBg.regX = oSprite.width/2;
        oBg.regY = oSprite.height/2;
        _oPanelContainer.addChild(oBg);
        
        var iWidth = oSprite.width-20;
        var iHeight = 30;
        var iTextX = 0;
        var iTextY = -36;
        var oTitle = new CTLText(_oPanelContainer, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    26, "left", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    TEXT_YOUR_NUMBERS,
                    true, true, true,
                    false );
        
        var oNumbersContainer = new createjs.Container();   
        oNumbersContainer.y = 20;
        _oPanelContainer.addChild(oNumbersContainer);
        
        _aNumbers = new Array();
        var oToggleSprite = s_oSpriteLibrary.getSprite('toggle_num');
        
        var iWidth = 420;
        for(var i=0; i<NUMBERS_TO_PICK; i++){    
            var iNewX = -iWidth/2 + i*(iWidth/(NUMBERS_TO_PICK-1));
            var iNewY = 1;
            _aNumbers[i] = new CNumberBut(iNewX,iNewY, oToggleSprite, -1, oNumbersContainer);
            _aNumbers[i].deactive();
            _aNumbers[i].setClickable(false);
        }
    };
        
    this.refreshButtonPos = function () {
        _oPanelContainer.x = _pStartPos.x - s_iOffsetX;
        _oPanelContainer.y = _pStartPos.y + s_iOffsetY;
        _oPanelContainer.scaleX = _oPanelContainer.scaleY = 1;
        
        if(!s_bLandscape){
            if(s_iOffsetX > 270){
                var iScaleFactor = linearFunction(s_iOffsetX, 270, EDGEBOARD_X, 1, 0.83);
                
                _oPanelContainer.scaleX = _oPanelContainer.scaleY = iScaleFactor;
                _oPanelContainer.x = _pStartPos.x - s_iOffsetX + oSprite.width*(1-iScaleFactor)/2;
                _oPanelContainer.y = _pStartPos.y + s_iOffsetY - oSprite.height*(1-iScaleFactor)/2;
            }
        }
    };
    
    this.setNumbers = function(aNumbersList){
        for(var i=0; i<aNumbersList.length; i++){
            var szNumber = aNumbersList[i]+1+"";
            _aNumbers[i].setIndex(aNumbersList[i]);
            _aNumbers[i].setTextNumber(szNumber);
            _aNumbers[i].deactive();
        }
    };
    
    this.show = function(){
        _oPanelContainer.visible = true;
    };
    
    this.hide = function(){
        _oPanelContainer.visible = false;
    };
    
    this.litNumber = function(iNumber){
        var iIndexToLit;
        for(var i=0; i<_aNumbers.length; i++){
            iIndexToLit = _aNumbers[i].getIndex();
            if(iIndexToLit === iNumber){
                _aNumbers[i].active();
            }
        }
    };
    
    this.getNumbersState = function(){
        var aState = new Array();
        for(var i=0; i<_aNumbers.length; i++){
            aState[i] = {num: _aNumbers[i].getIndex(), state: false};
            if(_aNumbers[i].isActive()){
                aState[i].state = true;
            }
        }
        
        return aState;
    };
    
    this._init(oSprite, iX, iY, oContainer);
}


