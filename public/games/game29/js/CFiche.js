function CFiche(iXPos,iYPos,iIndexFicheSelected,oParentContainer,iScale){
    var _iValue;
    var _pStartingPoint;
    var _pEndingPoint;
    var _oSprite;
    var _oTextValue;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iXPos,iYPos,iIndexFicheSelected,iScale){
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
        _oParentContainer.addChild(_oContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite("fiche_"+iIndexFicheSelected)
        _oSprite = createBitmap(oSprite);
        
        if(iScale){
            _oSprite.scaleX = iScale;
            _oSprite.scaleY = iScale;
        }else{
            _oSprite.scaleX = 0.8;
            _oSprite.scaleY = 0.8;
            iScale=0.8;
        }
        
        _iValue = iIndexFicheSelected;
        
        _oContainer.addChild(_oSprite);
        
        var szValue = s_oGameSettings.getFicheValues(iIndexFicheSelected);

        _oTextValue = new CTLText(_oContainer, 
                    0, 0, (oSprite.width-2)*iScale, (oSprite.height-2)*iScale, 
                    50, "center",COLOR_FICHES[iIndexFicheSelected] , FONT1, 1,
                    8*iScale, 8*iScale,
                    szValue,
                    true, true, false,
                    false );
    };

    this.setEndPoint =  function(pEndX,pEndY){
        _pStartingPoint=new createjs.Point(_oContainer.x,_oContainer.y);
        _pEndingPoint=new createjs.Point(pEndX,pEndY);
    };
		
    this.updatePos = function(fLerp){
        var oPoint = new createjs.Point();
        
        oPoint = tweenVectors(_pStartingPoint, _pEndingPoint, fLerp,oPoint );
        _oContainer.x = oPoint.x;
        _oContainer.y = oPoint.y;
    };
    
    this.getSprite = function(){
        return _oContainer;
    };
    
    this.getValue = function(){
        return _iValue;
    };

    this._init(iXPos,iYPos,iIndexFicheSelected,iScale);
}