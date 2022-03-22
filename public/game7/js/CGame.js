function CGame(oData){
    var _bStartGame;
    var _bInfoPhase1;
    var _bInfoPhase2;
    
    var _iScore;
    var _iGameState;
    var _iTimeElapse;
    var _iContNumShuffle;
    var _iCheckShuffle;
    var _iCurLevel;
    var _iMaxNumShuffle;
    
    var _aStartPoints;
    var _aRandPos;
    var _aCards;

    var _oInterface;
    var _oHelpPanel;
    var _oEndPanel = null;
    var _oParent;
    var _oCardContainer;
    
    this._init = function(){
        
        _bStartGame=true;
        _bInfoPhase1 = true;
        _bInfoPhase2 = false;
        
        _iScore=0;
        _iTimeElapse = 0;
        
        _iContNumShuffle = 0;
        _iCheckShuffle = 0;
        _iCurLevel = 0;
        _iMaxNumShuffle = START_NUM_SHUFFLE;
        
        _aCards = new Array();
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg); //Draws on canvas

        _oCardContainer = new createjs.Container();
        s_oStage.addChild(_oCardContainer);

        _oInterface = new CInterface();
        _oInterface.refreshBestScore(s_iBestScore);
    
        _aStartPoints = new Array();
        var iOffset = 60;
        _aStartPoints[0] = {x: CANVAS_WIDTH/2 - iOffset - CARD_WIDTH, y: CANVAS_HEIGHT/2};
        _aStartPoints[1] = {x: CANVAS_WIDTH/2, y: CANVAS_HEIGHT/2};
        _aStartPoints[2] = {x: CANVAS_WIDTH/2 + iOffset + CARD_WIDTH, y: CANVAS_HEIGHT/2};
    
        this._shuffleCards();
        _oHelpPanel = new CHelpPanel();
    };    
    
    this._shuffleCards = function(){
        
        _aRandPos = new Array();
        for(var i=0; i<3; i++){
            _aRandPos[i]=i;
        }
        shuffle(_aRandPos);
    
        for(var i=0; i<3; i++){
            _aCards[i] = new CCard(_aStartPoints[_aRandPos[i]].x, _aStartPoints[_aRandPos[i]].y, _oCardContainer, _aRandPos[i], i);
        }
    };               
    
    this.updateScore = function(iVal){
        _iScore += iVal;
        if(_iScore < 0){
            _iScore = 0;
        }
        _oInterface.refreshCurScore(_iScore);
    };
    
    this.unload = function(){
        _bStartGame = false;
        
        _oInterface.unload();
        if(_oEndPanel !== null){
            _oEndPanel.unload();
        }
        for(var i=0; i<_aCards.length; i++){
            _aCards[i].unload();
        }
        
        
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
           
    };
 
    this.onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
	$(s_oMain).trigger("show_interlevel_ad");
    };
    
    this._onExitHelp = function () {
         _bStartGame = true;
         _iGameState = INFO_PHASE;
    };
    
    this.gameOver = function(iData){  
        
        _iGameState = null;
        
        for(var i=0; i<_aCards.length; i++){
            if(_aCards[i].getLogicPos() !== iData.iLogicPos){
                _aCards[i].showDelayedCard();
            }
            
        }
        
        _oEndPanel = CEndPanel(s_oSpriteLibrary.getSprite('msg_box'));
        _oEndPanel.show(_iScore);
        if(_iScore > s_iBestScore){
            s_iBestScore = _iScore;
        }
        
    };

    this._infoPhase = function(){
        
        _iTimeElapse += s_iTimeElaps;
        if(_iTimeElapse >= INFO_PHASE_DURATION/4 && _iTimeElapse < INFO_PHASE_DURATION*2/4 && _bInfoPhase1){
            _bInfoPhase1 = false;
            _bInfoPhase2 = true;
            _oInterface.showText(true, TEXT_INFO);

            for(var i=0; i<_aCards.length; i++){
                if(!_aCards[i].getStateTurned()){
                    _aCards[i].showCard();
                }                
            }
        } else if (_iTimeElapse >= INFO_PHASE_DURATION*3/4 && _iTimeElapse < INFO_PHASE_DURATION && _bInfoPhase2){
            _bInfoPhase2 = false;
            _oInterface.showText(false, TEXT_INFO);

            for(var i=0; i<_aCards.length; i++){
                _aCards[i].hideCard();
            }
        } else if (_iTimeElapse >= INFO_PHASE_DURATION){
            _iTimeElapse = 0;
            _bInfoPhase1 = true;
            _bInfoPhase2 = true;
            _iGameState = null;
            _oInterface.showText(true, TEXT_SHUFFLE);
            this._shufflePhase();
        }
        
    };
    
    this.checkShuffle = function(){
        _iCheckShuffle++;
           

        if(_iCheckShuffle === 2){
            _iCheckShuffle = 0;
            _iContNumShuffle++;
            if (_iContNumShuffle < _iMaxNumShuffle){
                this._shufflePhase();
            } else {
                _iContNumShuffle = 0;
                _oInterface.showText(false, TEXT_SHUFFLE);
                this._choosePhase();
            }           
        }
    };
    
    this._shufflePhase = function(){

        
        playSound("shuffle",1,false);
        
        
        shuffle(_aRandPos);
        
        var iFirstCardLogicPos = _aCards[_aRandPos[0]].getLogicPos();
        var iSecondCardLogicPos = _aCards[_aRandPos[1]].getLogicPos();
        
        _oCardContainer.setChildIndex(_aCards[_aRandPos[2]].getSprite(), 0);
        
        var iRandMove = Math.random();        
        
        var iScale0;
        var iScale1;        
        if(_oCardContainer.getChildIndex(_aCards[_aRandPos[0]].getSprite()) > _oCardContainer.getChildIndex(_aCards[_aRandPos[1]].getSprite()) ){
            iScale0 = 1.1;
            iScale1 = 1;      
        } else {
            iScale0 = 1;
            iScale1 = 1.1;
        }
        
        var iTime = START_TIMESPEED_SHUFFLE + _iCurLevel*DECREASE_TIMESPEED_SHUFFLE;
        if (iTime < MINIMUM_TIMESPEED ) {
            iTime = 200;
        }
        
        var iRandNum = Math.random();
        var iDirection; 
        if(iRandNum < 0.5){
            iDirection = 1; //down
        } else {
            iDirection = -1; //up
        }
        
        
        
        _aCards[_aRandPos[0]].moveCard(_aStartPoints[iSecondCardLogicPos].x, _aStartPoints[iSecondCardLogicPos].y, 
                iTime, iSecondCardLogicPos, iDirection, iScale0, iRandMove);
        _aCards[_aRandPos[1]].moveCard(_aStartPoints[iFirstCardLogicPos].x, _aStartPoints[iFirstCardLogicPos].y,
                iTime, iFirstCardLogicPos, -iDirection, iScale1, iRandMove);
    };
    
    this._choosePhase = function(){
        _oInterface.showText(true, TEXT_CHOOSE);
        for(var i=0; i<_aCards.length; i++){
            _aCards[i].activeHitArea(true);
        }
    };
    
    this.checkWin = function(evt, iData){

        _oInterface.showText(false, TEXT_CHOOSE);
        for(var i=0; i<_aCards.length; i++){
            if(_aCards[i].getLogicPos() === iData.iLogicPos){
                _aCards[i].showCard();
            }
            _aCards[i].activeHitArea(false);
        }
        if(iData.szCardType === "hearts"){
            _oInterface.showText(true, TEXT_WIN);
            this.updateScore(POINTS_TO_WIN);
            _iGameState = END_PHASE;
        } else {
            this.gameOver(iData);
        }
        
        
        
    };
    
    this._endPhase = function(){
        _iCurLevel++;
        
        var iIncrNumShuffle = _iCurLevel%NUM_LEVEL_TO_INCREASE_NUM_SHUFFLE
        if(iIncrNumShuffle === 0){
            _iMaxNumShuffle++;
        }        
        
        _iGameState = INFO_PHASE;
    };
    
    this.update = function(){
        if(_bStartGame){
            switch(_iGameState) {
                case INFO_PHASE: {

                    this._infoPhase();               
                    break;
                } case END_PHASE: {

                    this._endPhase();    
                    break;
                }    
            }
        }
        
    };

    s_oGame=this;
    
    POINTS_TO_LOSE = oData.points_to_lose;
    POINTS_TO_WIN = oData.points_to_win;
    
    START_NUM_SHUFFLE = oData.start_num_shuffle;
    NUM_LEVEL_TO_INCREASE_NUM_SHUFFLE = oData.num_level_to_increase_num_shuffle;
    START_TIMESPEED_SHUFFLE = oData.start_timespeed_shuffle;
    DECREASE_TIMESPEED_SHUFFLE = oData.decrease_timespeed_shuffle;
    MINIMUM_TIMESPEED = oData.minimum_timespeed;
    
    _oParent=this;
    this._init();
}

var s_oGame;
