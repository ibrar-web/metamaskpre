function CCard(iX,iY,oParentContainer, iCurLogicPos, iType){
      
    var _bTurned;   
    
    var _szType;
    
    var _iCurLogicPos;
    
    var _oCardBack;
    var _oCardFront;
    var _oHitArea;
    var _oContainer;
    var _oParentContainer;   
    var _oParent;

    

    
    this._init = function(iX,iY,oParentContainer, iCurLogicPos,iType){ 
        
        _bTurned = false;
        
        if(iType === 0){
            _szType = "hearts";
        } else if (iType === 1){
            _szType = "clubs";
        } else {
            _szType = "spades";            
        }        
        
        _iCurLogicPos = iCurLogicPos;
        
        _oParentContainer = oParentContainer;
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oContainer.regX = CARD_WIDTH/2;
        _oContainer.regY = CARD_HEIGHT/2;
        //_oContainer.shadow = new createjs.Shadow("#000000", 10, 10, 20);
        _oParentContainer.addChild(_oContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('card_back');        
        _oCardBack = createBitmap(oSprite);
        _oCardBack.visible=true;
        _oContainer.addChild(_oCardBack);
        
        
        var oSprite = s_oSpriteLibrary.getSprite(_szType);        
        _oCardFront = createBitmap(oSprite);
        _oCardFront.visible=false;
        _oContainer.addChild(_oCardFront);
    
        _oHitArea = new createjs.Shape();
    
    };
    
    this.unload = function(){
        
        _oHitArea.off("click", s_oGame.checkWin, s_oGame, false, {szCardType:_szType, iLogicPos : _iCurLogicPos});
        _oParentContainer.removeChild(_oContainer);
        
    };
    
    this.getStateTurned = function(){
        return _bTurned;
    };
    
    this.moveCard = function(iX, iY, iTime, iCurLogicPos, iDirection, iScale , iRandMove){        
        createjs.Tween.get(_oContainer).to({x:iX}, iTime, createjs.Ease.linear).
                call(function(){_oParent.setLogicPos(iCurLogicPos) ,s_oGame.checkShuffle();});
        
        if(iRandMove < 0.5){
            //circular movement
            createjs.Tween.get(_oContainer).to({y:(iY+(60*iDirection))}, iTime*0.5, createjs.Ease.cubicOut).to({y:iY}, iTime*0.5, createjs.Ease.cubicIn);
        } else {
            //jump movement
            createjs.Tween.get(_oContainer).to({scaleX: iScale, scaleY:iScale}, iTime*0.5, createjs.Ease.cubicOut).to({scaleX: 1, scaleY:1}, iTime*0.5, createjs.Ease.cubicIn);
        }
        
        

        
    };
    
    this.showDelayedCard = function(){

        createjs.Tween.get(_oContainer).wait(1000).to({scaleX:0.1}, 200).call(function(){_oParent.setValue()}).call(function(){_bTurned=true});
    };    
        
    this.showCard = function(){

        createjs.Tween.get(_oContainer ).to({scaleX:0.1}, 200).call(function(){_oParent.setValue()}).call(function(){_bTurned=true});
    };

    this.setValue = function(){
        
        playSound("card",1,false);
        
        
        _bTurned=false;
        _oCardBack.visible=false; 
        _oCardFront.visible=true;
        createjs.Tween.get(_oContainer).to({scaleX:1}, 200);
    };
    
    this.hideCard = function(){
        createjs.Tween.get(_oContainer).to({scaleX:0.1}, 200).call(function(){_oParent.setBack()});
    };    
 
    this.setBack = function(){
        
        playSound("card",1,false);
        
        _bTurned=false;
        _oCardFront.visible=false; 
        _oCardBack.visible=true;
        createjs.Tween.get(_oContainer).to({scaleX:1}, 200);
    };
    
    this.setLogicPos = function(iPos){
        _iCurLogicPos = iPos;
    };
    
    this.getLogicPos = function(){
        return _iCurLogicPos;
    };
    
    this.getSprite = function(){
        return _oContainer;
    };
    
    this.activeHitArea = function(bActive){
        if(bActive){
            _oHitArea = new createjs.Shape();
            _oHitArea.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(0,0,CARD_WIDTH, CARD_HEIGHT);        
            _oContainer.addChild(_oHitArea);
            _oHitArea.visible = true;
            _oHitArea.on("click", s_oGame.checkWin, s_oGame, false, {szCardType:_szType, iLogicPos : _iCurLogicPos});
        } else {
            _oHitArea.visible = false;
            _oContainer.removeChild(_oHitArea);
            _oHitArea.off("click", s_oGame.checkWin, s_oGame, false, {szCardType:_szType, iLogicPos : _iCurLogicPos});
        }
        
    };
    
    _oParent=this;
    this._init(iX,iY,oParentContainer,iCurLogicPos,iType);
                
}