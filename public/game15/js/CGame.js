function CGame(){
    var _bUpdate = false;
    var _bStartingDealing;
    var _bGameOver;
    var _iCurRowCardDealing;
    var _iCurColCardDealing;
    var _iCurCardInPileShowing;
    var _iCurValueForMatching;
    var _iTimeElaps;
    var _iContCardRemoved;
    var _iCardPileOffsetX;
    var _aCardsInfo;
    var _aCardPile;
    var _aCardsBoard;
    var _aBoardRowCounter;
    var _pStartingCardOffset;
    var _pWastePileOffset;
    var _oGameSettings;
    var _oListenerBlock;
    
    var _oWasteContainer;
    var _oCardContainer;
    var _oInterface;
    var _oBlock;
    var _oAreYouSurePanel;
    var _oEndPanel = null;
    
    var _oParent;

    this._init = function(){   
        _pStartingCardOffset = new CVector2(START_BOARD_X,500);
        _pWastePileOffset    = new CVector2(START_BOARD_X+((NUM_COLS-1) * (CARD_WIDTH+CARD_OFFSET_X)),500);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg);
        
        _oGameSettings = new CGameSettings();

        _oInterface = new CInterface();  
        
        this.reset();
        
        _oWasteContainer = new createjs.Container();
        s_oStage.addChild(_oWasteContainer);
        
        _oCardContainer = new createjs.Container();
        s_oStage.addChild(_oCardContainer);

        this.extractCards();
        
        _oBlock = new createjs.Shape();
        _oBlock.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oListenerBlock = _oBlock.on("click",function(){});
        s_oStage.addChild(_oBlock);
        
        _oAreYouSurePanel = new CAreYouSurePanel(s_oStage);
        _oEndPanel = new CEndPanel();
        
        
        this.showHelp();
        
        setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME );
    };
    
    this.unload = function(){
        _oInterface.unload();
        _oEndPanel.unload();
        _oAreYouSurePanel.unload();
        
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();

        s_oGame = null;
    };
    
    this.reset = function(){
        _bStartingDealing = true;
        _bGameOver = false;
        _iContCardRemoved = 0;
        _iTimeElaps = 0;
        _iCurCardInPileShowing =  _oGameSettings.getNumCards() - NUM_CARDS_SOLITAIRE;
        _aBoardRowCounter = [1,2,3,4,5,6,7];
        
        _aCardPile = new Array();
        _aCardsBoard = new Array();

        setVolume("soundtrack",1);
    };
    
    this.restart = function(){
        _oBlock.visible = true;
        
        
        this.resetCards();
        this.reset(); 
        _oInterface.reset(_iTimeElaps);
        
        this.extractCards();
        _aCardsBoard[_iCurRowCardDealing][_iCurColCardDealing].deal();
        _bUpdate = true;
    };
    
    this.resetCards = function(){
        if(_aCardsBoard.length>0){
            for(var i=0;i<NUM_ROWS;i++){
                for(var j=0;j<NUM_COLS;j++){
                    if(_aCardsBoard[i][j] !== null){
                        _aCardsBoard[i][j].unload();
                    }
                }

            }
        }
        
        for(var j=0;j<_aCardPile.length;j++){
            _aCardPile[j].unload();
        }

        
        _aCardPile = new Array();
        _aCardsBoard = new Array();
        
        _oWasteContainer.removeAllChildren();
    };

    
    this.extractCards = function(){
        do{ 
            this.resetCards();
            _aCardsInfo = new Array();
            _aCardsInfo = _oGameSettings.getShuffledCardDeck();
            this.dealCards();
        }while(this._checkIfNoMatching());
    };

    this.dealCards = function(){
        //ATTACH CARD IN DRAW PILE
        _aCardPile = new Array();
        var iCont = 0;
        for(var k=0;k<_aCardsInfo.length-NUM_CARDS_SOLITAIRE;k++){
            var pStart = new CVector2(_pStartingCardOffset.getX() - (0.2*iCont),_pStartingCardOffset.getY() - (0.2*iCont));
            var oCard = new CCard(true,true,CARD_PILE,pStart,_aCardsInfo[iCont].fotogram,_aCardsInfo[iCont].rank,_oCardContainer);
            oCard.setClickable(false);
            oCard.addEventListener(ON_CARD_ANIMATION_ENDING,this._onCardMovedInPile);
            oCard.addEventListener(ON_CARD_SELECTED,this._onCardSelected);

            _aCardPile.push(oCard);
            iCont++;
            
        }

        
        //ATTACH CARDS IN BOARD
        _aCardsBoard = new Array();
        
        var iEndX = START_BOARD_X;
        var iEndY = START_BOARD_Y;

        for(var i=0;i<NUM_ROWS;i++){
            var iCurX = iEndX;
            _aCardsBoard[i] = new Array();
            for(var j=0;j<NUM_COLS;j++){
               
                var pStart = new CVector2(_pStartingCardOffset.getX() - (0.2*iCont),_pStartingCardOffset.getY() - (0.2*iCont));
                var oCard = new CCard(false,true,CARD_BOARD,pStart,_aCardsInfo[iCont].fotogram,_aCardsInfo[iCont].rank,_oCardContainer);
                oCard.setClickable(i===NUM_ROWS-1?true:false);
                oCard.setEndPos(new CVector2(iCurX,iEndY));
                oCard.setRowInBoard(i);
                oCard.setColInBoard(j);
                oCard.addEventListener(ON_CARD_ANIMATION_ENDING,this._onCardDealed);
                oCard.addEventListener(ON_CARD_SELECTED,this._onCardSelected);

                iCurX += CARD_WIDTH + CARD_OFFSET_X;
                
                iCont++;
                
                _aCardsBoard[i][j] = oCard;
            }
            
            iEndY += CARD_OFFSET_Y;
        }

        
        _iCurRowCardDealing = 0;
        _iCurColCardDealing = 0;
    };
    
    this._onCardDealed = function(iType,oCard){
        if(!_bStartingDealing){
            s_oGame._onCardMovedInPile(iType,oCard);
            return;
        }
        
        _iCurColCardDealing++;
        if(_iCurColCardDealing === NUM_COLS){
            _iCurColCardDealing = 0;
            _iCurRowCardDealing++;
        }
        
        if(_iCurRowCardDealing < NUM_ROWS){
            _aCardsBoard[_iCurRowCardDealing][_iCurColCardDealing].deal();
        }else{
            _bStartingDealing = false;
            s_oGame.distributeDeckOnX();
        }
    };
    
    this.distributeDeckOnX = function(){
        var iWidth = ((NUM_COLS-1) * (CARD_WIDTH+CARD_OFFSET_X) - CARD_WIDTH);
        _iCardPileOffsetX = iWidth/(_oGameSettings.getNumCards() - NUM_CARDS_SOLITAIRE-1);
        
        var iFinalX = START_BOARD_X+iWidth;
        var iFinalY = _aCardPile[0].getY();
        var iTime = 500;
        for(var k=_aCardPile.length-1;k>=0;k--){
            _aCardPile[k].move(iFinalX,iFinalY,iTime,0);
            
            iFinalX -= _iCardPileOffsetX;
        }
        
        setTimeout(function(){
                for(var k=0;k<NUM_COLS;k++){
                    _aCardsBoard[NUM_ROWS-1][k].setClickable(true);
                }
                
                
                s_oGame.moveCardInWaste(_aCardPile[_aCardPile.length-1]);
               
                _oBlock.visible = false;
            },iTime*2);
    };
    
    this._onCardMovedInPile = function(iType,oCard){

        if(iType === CARD_PILE){
            _iCurValueForMatching = oCard.getValue();
            var oNewCard = new CCard(true,false,CARD_WASTE,_pWastePileOffset,oCard.getFotogram(),oCard.getValue(),_oWasteContainer);
            oCard.unload();
            _aCardPile.pop();
            

            if(_aCardPile.length === 0){
                //GAME OVER
                if(s_oGame._checkIfNoMatching()){
                    setTimeout(function(){s_oGame._gameOver(false);},1500);
                }
                
            }else{
                _oBlock.visible = false;
                _aCardPile[_aCardPile.length-1].setClickable(true);
                
                if(_aCardPile.length < 16){
                    for(var k=0;k<_aCardPile.length;k++){
                        _aCardPile[k].moveOnX(_aCardPile[k].getX() + _iCardPileOffsetX,500,0);
                    }
                }
            }
        }else{
            _iCurValueForMatching = oCard.getValue();
     
            _aCardsBoard[oCard.getRow()][oCard.getCol()] = null;
            oCard.unload();
            var oNewCard = new CCard(true,false,CARD_WASTE,_pWastePileOffset,oCard.getFotogram(),oCard.getValue(),_oWasteContainer);
            
            if(oCard.getRow()-1 >= 0){
                _aCardsBoard[oCard.getRow()-1][oCard.getCol()].setClickable(true);
            }
            
            _iContCardRemoved++;
            if(_iContCardRemoved === NUM_CARDS_SOLITAIRE){
                //WIN
                s_oGame._gameOver(true);
            }else if(_aCardPile.length === 0 && s_oGame._checkIfNoMatching()){
                s_oGame._gameOver(false);
            }
            _oBlock.visible = false;
        }
    };
    
    this._onCardSelected = function(oCard){
        switch(oCard.getType()){
            case CARD_BOARD:{
                    if(s_oGame._checkForMatching(oCard) ){
                        s_oGame.moveCardInWaste(oCard);
                    }else{
                       oCard.tremble();
                    }
                    break;
            }
            case CARD_PILE:{
                    s_oGame.moveCardInWaste(oCard);
                    break;
            }
        }
    };
   
    this._checkForMatching = function(oCard){  
        
        var aPossibleValues = new Array();
        if(s_iMode === MODE_EASY){
            if(_iCurValueForMatching-1 < 1){
                aPossibleValues.push(13);
            }else{
                aPossibleValues.push(_iCurValueForMatching-1);
            }
            
            if(_iCurValueForMatching+1>13){
                aPossibleValues.push(1);
            }else{
                aPossibleValues.push(_iCurValueForMatching+1);
            }
        }else{
            if(_iCurValueForMatching-1 > 0){
                aPossibleValues.push(_iCurValueForMatching-1);
            }
            
            if(_iCurValueForMatching+1 <= 13){
                aPossibleValues.push(_iCurValueForMatching+1);
            }
        }
       
        if(aPossibleValues.indexOf(oCard.getValue()) === -1){
            return false;
        }
        
        
        return true;
    };
    
    this._checkIfNoMatching = function(){
        for(var i=0;i<NUM_ROWS;i++){
            for(var j=0;j<NUM_COLS;j++){
                if(_aCardsBoard[i][j] !== null && _aCardsBoard[i][j].isClickable()){
                    if(_aCardPile.length === 0){
                        if(this._checkForMatching(_aCardsBoard[i][j])){
                            //trace("MATCH FOUND BETWEEN "+_iCurValueForMatching+" AND "+_aCardsBoard[i][j].getValue() + " IN ["+i+"]["+j+"]")
                            return false;
                        }
                    }else{
                        for(var t=0;t<_aCardPile.length;t++){
                            _iCurValueForMatching = _aCardPile[t].getValue();
                            if(this._checkForMatching(_aCardsBoard[i][j])){
                                //trace("MATCH FOUND BETWEEN "+_iCurValueForMatching+" AND "+_aCardsBoard[i][j].getValue() + " IN ["+i+"]["+j+"]")
                                return false;
                            }
                        }
                    }
                    
                    
                }
                
            }
        }
        
        return true;
    };

    
    this._gameOver = function(bWin){
        _oBlock.visible = true;
        var iTimeScore = 0;
        if(bWin){
            //CALCULATE BONUS SCORE
            iTimeScore = Math.floor((MAX_TIME_SCORE - _iTimeElaps)/1000);
            if(iTimeScore < 0){
                iTimeScore = 0;
            }
        }

        _bGameOver = true;
        
        var iCardClearedScore = _iContCardRemoved*10;
        var iCardLeftScore = _aCardPile.length*100;
        var iTotScore = iCardClearedScore+iTimeScore+iCardLeftScore;
        _oEndPanel.show(bWin,iCardClearedScore,iTimeScore,iCardLeftScore,iTotScore);
    };

    
    this.moveCardInWaste = function(oCard){
        oCard.setEndPos(_pWastePileOffset);
        oCard.deal();
    };
      
    this.setUpdate = function(bValue){
        _bUpdate = bValue;
    };
    
    this.showHelp = function(){
        this.setUpdate(false);
        new CHelpPanel();
    };
    
    this.onExitHelp = function(){
        if(_bStartingDealing){
            _aCardsBoard[_iCurRowCardDealing][_iCurColCardDealing].deal();
        }
        this.setUpdate(true);
    };
    
    this.onTryExit = function(){
        this.setUpdate(false);
        
        _oAreYouSurePanel.show(TEXT_ARE_YOU_SURE_EXIT);
        _oAreYouSurePanel.addEventListener(ON_RELEASE_YES,this._onExitYes);
        _oAreYouSurePanel.addEventListener(ON_RELEASE_NO,this._onExitNo);
    };
    
    this._onExitYes = function(){
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad");
        s_oGame.onExit();
    };
    
    this._onExitNo = function(){
        s_oGame.setUpdate(true);
    };
    
    this.onTryRestart = function(){
        this.setUpdate(false);
        _oAreYouSurePanel.show(TEXT_ARE_YOU_SURE_RESTART);
        _oAreYouSurePanel.addEventListener(ON_RELEASE_YES,this._onRestartYes);
        _oAreYouSurePanel.addEventListener(ON_RELEASE_NO,this._onRestartNo);
    };
    
    this._onRestartYes = function(){
        _oAreYouSurePanel.hide();
        
        s_oGame.restart();
    };
    
    this._onRestartNo = function(){
        s_oGame.setUpdate(true);
    };
    
    this.onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
    };

    this._updateCards = function(){
        for(var i=0;i<NUM_ROWS;i++){
            for(var j=0;j<NUM_COLS;j++){
                if(_aCardsBoard[i][j] !== null){
                    _aCardsBoard[i][j].update();
                }
            }
        }

        
        for(var j=0;j<_aCardPile.length;j++){
            _aCardPile[j].update();
        }

    };

    this.update = function(){
        if(_bUpdate){
            this._updateCards();
            
            if(_bGameOver === false){
                _iTimeElaps += s_iTimeElaps;
                _oInterface.refreshTime(_iTimeElaps);
            }
            
          
        }
    };

    s_oGame=this;
    
    _oParent=this;
    this._init();
}

var s_oGame;