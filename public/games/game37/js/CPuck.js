function CPuck(iX,iY,oParentContainer){
    var _iStartX;
    var _oItem;
    var _oParentContainer;
    
    this._init = function(){
        _iStartX = iX;
        
        var oSprite = s_oSpriteLibrary.getSprite('puck');
        _oItem = createBitmap(oSprite);
        _oItem.regX = oSprite.width/2;
        _oItem.regY = oSprite.height/2;
        _oItem.x = iX;
        _oItem.y = iY;
        _oParentContainer.addChild(_oItem);
    };
    
    this.move = function(iNewX){
        createjs.Tween.get(_oItem).to({x:iNewX}, 1000,createjs.Ease.cubicOut);  
    };
    
    this.resetPosition = function(){
        createjs.Tween.get(_oItem).to({x:_iStartX}, 1000,createjs.Ease.cubicOut);  
    };
    
    _oParentContainer = oParentContainer;
    this._init(iX,iY);
}