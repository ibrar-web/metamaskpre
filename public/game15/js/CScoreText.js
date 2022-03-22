function CScoreText (iScore,iX,iY){
    var _oContainer;
    var _oText;
    var _oOutlineText;
    
    this._init = function(iScore,iX,iY){
        _oContainer = new createjs.Container();
        _oContainer.alpha = 0;
        _oContainer.x = iX;
        _oContainer.y = iY;
        s_oStage.addChild(_oContainer);
        
        var szText;
        if(iScore >= 0){
            szText = "+"+iScore;
        }else{
            szText = iScore;
        }
        _oOutlineText = new createjs.Text(szText,"50px "+PRIMARY_FONT, "#004e6f");
        _oOutlineText.textAlign="center"; 
        _oOutlineText.outline = 4;
        _oContainer.addChild(_oOutlineText);
        
        _oText = new createjs.Text(szText,"50px "+PRIMARY_FONT, "#fff");
        _oText.textAlign="center"; 
        _oContainer.addChild(_oText);

        var oParent = this;
        createjs.Tween.get(_oContainer).to({alpha:1}, 400, createjs.Ease.quadIn).call(function(){oParent.moveUp();});  
    };
	
    this.moveUp = function(){
        var iNewY = _oContainer.y-100;
        var oParent = this;
        createjs.Tween.get(_oContainer).to({y:iNewY}, 1000, createjs.Ease.backIn).call(function(){oParent.unload();});
        createjs.Tween.get(_oContainer).wait(500).to({alpha:0}, 500);
    };
	
    this.unload = function(){
        s_oStage.removeChild(_oContainer);
    };
	
    this._init(iScore,iX,iY);
    
}