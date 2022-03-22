function CScoreTextFreekicks(iScore,x,y, oParentContainer, szColor){
    
    var _oScoreHit;
    
    
    this._init = function(iScore,x,y, oParentContainer){
        _oScoreHit = new createjs.Text(iScore," 54px "+FONT_GAME_1, "#17294d");
        _oScoreHit.textAlign="center";
        _oScoreHit.color = szColor;
        _oScoreHit.x = x;
        _oScoreHit.y = y;
        _oScoreHit.alpha = 0;
        oParentContainer.addChild(_oScoreHit);
        
        var oParent = this;
        createjs.Tween.get(_oScoreHit).to({alpha:1}, 400, createjs.Ease.quadIn).call(function(){oParent.moveUp();});  
    };
	
    this.moveUp = function(){
        var iNewY = _oScoreHit.y-100;
        var oParent = this;
        createjs.Tween.get(_oScoreHit).to({y:iNewY}, 1000, createjs.Ease.sineIn).call(function(){oParent.unload();});
        createjs.Tween.get(_oScoreHit).wait(500).to({alpha:0}, 500);
    };
	
    this.unload = function(){
        oParentContainer.removeChild(_oScoreHit);
    };
	
    this._init(iScore,x,y, oParentContainer);
    
}