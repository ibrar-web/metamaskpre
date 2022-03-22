function CFichesController(){
    var _bFichesUpdate;
    var _iTimeElaps;
    var _iValue;
    var _iPrevValue;
    var _pFicheStartPos;
    var _pStartingPoint;
    var _pEndingPoint;

    var _oFichesAttach;
    var _oTextAttach;
    var _oBetAmountText;
    
    var _aCbCompleted;
    var _aCbOwner;
    
    this._init= function(){
        _oFichesAttach = new createjs.Container();
        s_oStage.addChild(_oFichesAttach);

	_pFicheStartPos=new CVector2();
        _pFicheStartPos.set(_oFichesAttach.x,_oFichesAttach.y);
        
        _oTextAttach  = new createjs.Container();
        s_oStage.addChild(_oTextAttach);
        
        _oBetAmountText =  new createjs.Text("","28px "+FONT_GAME_1, "#fff");
        _oBetAmountText.textAlign = "center";
        _oBetAmountText.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        _oTextAttach.addChild(_oBetAmountText);

        _iTimeElaps=0;
        _iValue = _iPrevValue = 0;
        _bFichesUpdate = false;

        _aCbCompleted=new Array();
        _aCbOwner =new Array();
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.reset = function(){
        _bFichesUpdate=false;

        _iValue=0;

        _oFichesAttach.removeAllChildren();

        _oFichesAttach.x=_pFicheStartPos.getX();
        _oFichesAttach.y=_pFicheStartPos.getY();

        _oBetAmountText.text = "";
    };
    
    this.setPrevValue = function(iValue){
        _iPrevValue = iValue;
    };
    
    this.refreshFiches = function(aFiches,iXPos,iYPos){
        aFiches = aFiches.sortOn('value','index');

        var iXOffset=iXPos;
        var iYOffset=iYPos + 10;

        _iValue = 0;

        var iCont=0;
        for(var i=0;i<aFiches.length;i++){
            
                var oSpriteChip = new CFicheBut(aFiches[i].index,iXOffset,iYOffset,1,_oFichesAttach);
                oSpriteChip.disable();
                
                iYOffset -= 5;
                iCont++;
                if(iCont>9 ){
                    iCont=0;
                    iXOffset += FICHE_WIDTH;
                    iYOffset=iYPos;	
                }

                _iValue+=aFiches[i].value;
        }
        
        playSound("chip", 1, false);
        
        
        _oBetAmountText.x = iXPos;
        _oBetAmountText.y = iYPos + 40;
        _oBetAmountText.text = formatValue(_iValue);
    };
		
    this.createFichesPile = function(iAmount,iX,iY){
        this.reset();
        var aFichesValue = CHIP_VALUES;
        var aFichesPile = new Array();

        do{
            var iMinValue=aFichesValue[aFichesValue.length-1];
            var iCont=aFichesValue.length-1;
            while(iMinValue>iAmount){
                    iCont--;
                    iMinValue=aFichesValue[iCont];
            }

            var iNumFiches=Math.floor(iAmount/iMinValue);
            for(var i=0;i<iNumFiches;i++){
                    aFichesPile.push({value:iMinValue,index:s_oGameSettings.getIndexForFiches(iMinValue)});
            }
            var iRestAmount=(iAmount%iMinValue).toFixed(1);
            iAmount=iRestAmount;
        }while(iRestAmount>0);			

        this.refreshFiches(aFichesPile,iX,iY);
    };
	
    this.initMovement = function(iXEnd,iYEnd){
        _iPrevValue = _iValue;
        _pStartingPoint=new CVector2(_oFichesAttach.x,_oFichesAttach.y);
        _pEndingPoint=new CVector2(iXEnd,iYEnd);
        
        _oBetAmountText.text = "";
        
        _bFichesUpdate = true;
    };
		
    this.getValue = function(){
        return _iValue;
    };
    
    this.getPrevBet = function(){
        return _iPrevValue;
    };
	
    this.update = function(){
        if(!_bFichesUpdate){
                return;
        }

        _iTimeElaps+=s_iTimeElaps;
        if(_iTimeElaps>TIME_FICHES_MOV){
            _iTimeElaps=0;
            _bFichesUpdate=false;
            
        }else{

            var fLerp = easeInOutCubic( _iTimeElaps, 0, 1, TIME_FICHES_MOV);
            var oPoint = new CVector2();
            var oPoint = tweenVectors(_pStartingPoint, _pEndingPoint, fLerp,oPoint);

            _oFichesAttach.x=oPoint.getX();
            _oFichesAttach.y=oPoint.getY();
        }
    };
    
    this._init();
    
}