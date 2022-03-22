function CWinText (szType,iX, iAmount){
    
    var _iTextWidth;
    
    var _oText;
    var _oTextOutline;
    var _oTextContainer;
    var _oParent;
    
    this._init = function(szType,iX,iAmount){    
        
        _oTextContainer = new createjs.Container();
        _oTextContainer.x=0;
        _oTextContainer.y=CANVAS_HEIGHT/2 - 135;        
        _oTextContainer.alpha = 1;        
        s_oStage.addChild(_oTextContainer);
        
        
        _oTextOutline = new CTLText(_oTextContainer, 
                    -500, 0, 1000, 60, 
                    60, "center", "#000", PRIMARY_FONT, 1,
                    0, 0,
                    szType,
                    true, true, false,
                    false );
        
        _oTextOutline.setOutline(5);
        
        _oText = new CTLText(_oTextContainer, 
                    -500, 0, 1000, 60, 
                    60, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    szType,
                    true, true, false,
                    false );

        
        _iTextWidth = _oTextContainer.getBounds().width; 
        
        this.show(iX,iAmount);
    };
    
    this.show = function(iX){        
        createjs.Tween.get(_oTextContainer).to({x:iX}, SHOWTEXT_SPEED/4, createjs.Ease.elasticOut).wait(SHOWTEXT_SPEED/2).
                to({x:CANVAS_WIDTH + _iTextWidth}, SHOWTEXT_SPEED/4, createjs.Ease.quartOut).call(function(){
                    _oParent.unload();
                    s_oGame.tryShowAd();
                    s_oGame.refreshGame();                    
                });
    };
  
    this.unload = function(){
        s_oStage.removeChild(_oTextContainer);
    };

    _oParent = this;    
    this._init(szType,iX,iAmount);
    
}