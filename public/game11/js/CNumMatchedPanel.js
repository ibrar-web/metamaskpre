function CNumMatchedPanel(oParentContainer){
    
    var _oContainer;
    var _oNum;
    var _oParent;
    
    this._init = function(oParentContainer){
        
        _oContainer = new createjs.Container();
        _oContainer.x = CANVAS_WIDTH/2;
        _oContainer.y = CANVAS_HEIGHT/2 - 80;
        _oContainer.alpha = 0;
        oParentContainer.addChild(_oContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite("bg_nummatched");
        var oBg = createBitmap(oSprite);
        oBg.regX = oSprite.width/2;
        oBg.regY = oSprite.height/2;
        _oContainer.addChild(oBg);
        
        var iWidth = oSprite.width - 50;
        var iHeight = 210;
        var iTextX = 0;
        var iTextY = -20;
        _oNum = new CTLText(_oContainer, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    200, "center", "#fff", SECONDARY_FONT, 1,
                    2, 2,
                    "30",
                    true, true, false,
                    false );
                    
        var iWidth = oSprite.width;
        var iHeight = 110;
        var iTextX = 0;
        var iTextY = 160;
        var oMatchText = new CTLText(_oContainer, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    100, "center", "#fff", SECONDARY_FONT, 1,
                    2, 2,
                    TEXT_MATCH,
                    true, true, false,
                    false );
        
    };
    
    this.refreshPos = function(){
        if(s_bLandscape){
            _oContainer.x = CANVAS_WIDTH/2;
            _oContainer.y = CANVAS_HEIGHT/2;
        }else {
            _oContainer.x = CANVAS_WIDTH/2;
            _oContainer.y = CANVAS_HEIGHT/2 - 80;
        }
    };
    
    this.hide = function(){
        createjs.Tween.get(_oContainer).to({alpha:0}, 1000);
    };
    
    this.show = function(szText){
        playSound("num_matched", 1, false);
        _oNum.refreshText(szText);
        
        _oContainer.scaleX = _oContainer.scaleY = 0;
        createjs.Tween.get(_oContainer).to({alpha:1, scaleX:1, scaleY:1}, 1000, createjs.Ease.elasticOut).call(function(){
            _oParent.hide();
        });
    };
    
    _oParent = this;
    this._init(oParentContainer);
    
}


