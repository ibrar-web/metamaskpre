function CCard(bVisible,bFolded,iType,pStartingPoint,szFotogram,iValue,oParentContainer){
    var _bFolded;
    var _bClickable;
    var _iState = -1;
    var _iType;
    var _iCurRow;
    var _iCurCol;
    var _szFotogram;
    var _iValue;
    var _iTimeElaps;
    var _pStartingPoint;
    var _pEndingPoint;
    var _oListener;
    
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oThis = this;
    var _oCardSprite;
    var _oContainer;
    var _oParentContainer;
                
    this._init = function(bVisible,bFolded,iType,pStartingPoint,szFotogram,iValue){
        _bFolded = bFolded;

        _iType = iType;

        _bClickable = false;
        
        _oContainer = new createjs.Container();
        _oContainer.x = pStartingPoint.getX();
        _oContainer.y = pStartingPoint.getY();
        _oContainer.visible =bVisible;
        _oParentContainer.addChild(_oContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('card_spritesheet');
        var oData = {   // image to use
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CARD_WIDTH, height: CARD_HEIGHT, regX: CARD_WIDTH/2, regY: CARD_HEIGHT/2}, 
                        animations: {  card_1_1: [0],card_1_2:[1],card_1_3:[2],card_1_4:[3],card_1_5:[4],card_1_6:[5],card_1_7:[6],card_1_8:[7],
                                       card_1_9:[8],card_1_10:[9],card_1_J:[10],card_1_Q:[11],card_1_K:[12],
                                       card_2_1: [13],card_2_2:[14],card_2_3:[15],card_2_4:[16],card_2_5:[17],card_2_6:[18],card_2_7:[19],
                                       card_2_8:[20], card_2_9:[21],card_2_10:[22],card_2_J:[23],card_2_Q:[24],card_2_K:[25],
                                       card_3_1: [26],card_3_2:[27],card_3_3:[28],card_3_4:[29],card_3_5:[30],card_3_6:[31],card_3_7:[32],
                                       card_3_8:[33], card_3_9:[34],card_3_10:[35],card_3_J:[36],card_3_Q:[37],card_3_K:[38],
                                       card_4_1: [39],card_4_2:[40],card_4_3:[41],card_4_4:[42],card_4_5:[43],card_4_6:[44],card_4_7:[45],
                                       card_4_8:[46], card_4_9:[47],card_4_10:[48],card_4_J:[49],card_4_Q:[50],card_4_K:[51],back:[52]}
                        
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oCardSprite = createSprite(oSpriteSheet,bFolded?"back":szFotogram,CARD_WIDTH/2,CARD_HEIGHT/2,CARD_WIDTH, CARD_HEIGHT);
        _oCardSprite.stop();
        _oContainer.addChild(_oCardSprite);

        
        _oListener = _oCardSprite.on("click",this._onSelected);
        
        _iTimeElaps=0;
        _szFotogram = szFotogram;
        _iValue=iValue;

        _pStartingPoint = pStartingPoint;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
    };
    
    this.unload = function(){
        _oCardSprite.off("click",_oListener);
        _pStartingPoint=null;
        _pEndingPoint=null;
        _oParentContainer.removeChild(_oContainer);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.setEndPos = function(pEndingPoint){
        _pEndingPoint = pEndingPoint;
    };

    this.setClickable = function(bClickable){
        _bClickable = bClickable;
    };
    
    this.setRowInBoard = function(iRow){
        _iCurRow = iRow;
    };
    
    this.setColInBoard = function(iCol){
        _iCurCol = iCol;
    };
    
    this.deal = function(){
        _oContainer.visible = true;

        if(_bFolded){
            this.showCard();
        }
        
        playSound("card_dealing",1,false);

        _iState = STATE_CARD_DEALING;
    };
		
   
    this.setValue = function(){
        _oCardSprite.gotoAndStop(_szFotogram);
        var oParent = this;
        createjs.Tween.get(_oCardSprite).to({scaleX:1}, 100).call(function(){oParent.cardShown()});
    };
    
    this.setDepth = function(iDepth){
        _oParentContainer.setChildIndex(_oContainer,iDepth);
    };
    
    this.changeType = function(iType){
        _iType = iType;
    };

    this.showCard = function(){
        _bFolded = false;
        var oParent = this;
        createjs.Tween.get(_oCardSprite).to({scaleX:0.1}, 100).call(function(){oParent.setValue()});
    };
		
    this.cardShown = function(){
        if(_aCbCompleted[ON_CARD_SHOWN]){
            _aCbCompleted[ON_CARD_SHOWN].call(_aCbOwner[ON_CARD_SHOWN]);
        }
    };
    
    this.tremble = function(){
        createjs.Tween.get(_oContainer).to({rotation:10}, 40,createjs.Ease.cubicOut).to({rotation:-10},80).to({rotation:10},80).to({rotation:-10},80).to({rotation:0},40);
    };
    
    this._onSelected = function(){
        if(!_bClickable){
            return;
        }
        
        playSound("click",1,false);

        if(_aCbCompleted[ON_CARD_SELECTED]){
            _aCbCompleted[ON_CARD_SELECTED].call(_aCbOwner[ON_CARD_SELECTED],_oThis);
        }
    };

    this.moveOnX = function(iFinalX,iTime,iDelay){
        createjs.Tween.get(_oContainer).wait(iDelay).to({x: iFinalX}, iTime,createjs.Ease.cubicOut).call(function(){
            _pStartingPoint = new CVector2(_oContainer.x,_oContainer.y);
        });
    };
    
    this.move = function(iFinalX,iFinalY,iTime,iDelay){
         createjs.Tween.get(_oContainer).wait(iDelay).to({x: iFinalX,y:iFinalY}, iTime,createjs.Ease.cubicOut).call(function(){
            _pStartingPoint = new CVector2(_oContainer.x,_oContainer.y);
        });
    }
    
    this.getState = function(){
        return _iState;
    };
    
    this.getValue = function(){
        return _iValue;
    };
    
    this.getType = function(){
        return _iType;
    };

    this.getFotogram = function(){
        return _szFotogram;
    };

    this.isClickable = function(){
        return _bClickable;
    };
    
    this.getX = function(){
        return _oContainer.x;
    };
    
    this.getY = function(){
        return _oContainer.y;
    };
    
    this.getDepth = function(){
        return _oParentContainer.getChildIndex(_oContainer);
    };
    
    this.getRow = function(){
        return _iCurRow;
    };
    
    this.getCol = function(){
        return _iCurCol;
    };
    
    this._updateDealing = function(){
        _iTimeElaps+=s_iTimeElaps;

        if (_iTimeElaps >TIME_CARD_DEALING) {

                _iState=-1;
                _iTimeElaps = 0;

                _oContainer.x=_pEndingPoint.getX();
                _oContainer.y=_pEndingPoint.getY();
                
                _pStartingPoint = new CVector2(_oContainer.x,_oContainer.y);
                
                if(_aCbCompleted[ON_CARD_ANIMATION_ENDING]){
                    _aCbCompleted[ON_CARD_ANIMATION_ENDING].call(_aCbOwner[ON_CARD_ANIMATION_ENDING],_iType,_oThis);
                }      
        }else{
                this.visible=true;
                var fLerp = easeInOutCubic( _iTimeElaps, 0, 1, TIME_CARD_DEALING);
                
                var oPoint = new CVector2();

                oPoint = tweenVectors(_pStartingPoint, _pEndingPoint, fLerp,oPoint);

                _oContainer.x=oPoint.getX();
                _oContainer.y=oPoint.getY();
                
        }
    };

    this.update = function(){
        switch(_iState){
            case STATE_CARD_DEALING:{
                this._updateDealing();
                break;
            }

        }
        
        
    };
    
    _oParentContainer = oParentContainer;
    this._init(bVisible,bFolded,iType,pStartingPoint,szFotogram,iValue);
                
}