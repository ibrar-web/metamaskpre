function CGame(oData){
    var _bBlock;
    var _bWinCurHand;
    var _iMoney;
    var _iGameCash;
    var _iState;
    var _iCurBet;
    var _iCurWin;
    var _iCurBetIndex;
    var _iCurCreditIndex;
    var _iCurIndexDeck;
    var _iCurState;
    var _iHandCont;
    var _iHandResult;
    var _iCurIndexForDoubleDeck;
    var _aDeckForDouble;
    var _aCurHand = new Array();
    var _aCardDeck;
    var _oGameSettings;
    var _oHandEvaluator;
    
    var _oBg;
    var _oSpriteSheetCard;
    var _oInterface;
    var _oPayTable;
    var _oDoubleUpPanel;
    var _oAlertPanel;
    var _oCardAttach;

    this._init = function(){
        s_oPayTableSettings = new CPayTableSettings();
        _iMoney  = TOTAL_MONEY;
        _iGameCash = GAME_CASH;

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);

        _oCardAttach = new createjs.Container();
        _oCardAttach.x = 600;
        _oCardAttach.y = 530;
        s_oStage.addChild(_oCardAttach);
        
        _oPayTable = new CPayTable(550,140);

        _bBlock = false;
        _iCurBetIndex = 0;
        _iCurCreditIndex = 0;
        
        _iHandCont = 0;
        _iCurBet = parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
		
		
        _oPayTable.setCreditColumn(_iCurCreditIndex);
        
        _iCurState = STATE_GAME_WAITING_FOR_BET;

        _oInterface = new CInterface(_iMoney,BET_TYPE[_iCurBetIndex]);

	_oAlertPanel = new CAlertPanel();

        _oGameSettings=new CGameSettings();
        _oHandEvaluator = new CHandEvaluator();
        
        _iCurIndexDeck = 0;
        _aCardDeck = new Array();
        _aCardDeck = _oGameSettings.getShuffledCardDeck();
        
        _iCurIndexForDoubleDeck = 0;
        _aDeckForDouble = _oGameSettings.getShuffledDeckForDouble();
        
        //FIND MIN WIN
        MIN_WIN = (COMBO_PRIZES[COMBO_PRIZES.length-1] * _iCurBet) * (_iCurCreditIndex+1);

        this.placeFakeCardForStarting();
        
        _oDoubleUpPanel = new CDoubleUpPanel(_oSpriteSheetCard);
        
        
        setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME );
        
        
    };
    
    this.unload = function(){
        _oInterface.unload();
	_oAlertPanel.unload();
        s_oStage.removeAllChildren();
    };
    
    this.resetHand = function(){
        _iCurWin = 0;
        //SHUFFLE CARD DECK EVERYTIME A NEW HAND STARTS
        _iCurIndexDeck = 0;
        _aCardDeck = new Array();
        _aCardDeck = _oGameSettings.getShuffledCardDeck();
        
        for(var i=0;i<_aCurHand.length;i++){
            _aCurHand[i].reset();
        }
        _oInterface.resetHand();
        _oPayTable.resetHand();
        
        this.checkMoney();
        
        _bBlock = false;
        _iCurState = STATE_GAME_WAITING_FOR_BET;
        
        
    };
    
    this.checkMoney = function(){
        if(_iMoney < _iCurBet){
            //NOT ENOUGH MONEY
            _iCurBetIndex = 0;
            _iCurCreditIndex = 0;
            _iCurBet = parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
            
            if(_iMoney < _iCurBet){
                this._showAlertPanel(TEXT_NO_MONEY);
            }else{
                _oInterface.refreshMoney(_iMoney,_iCurBet,1);
                _oInterface.refreshBet(BET_TYPE[_iCurBetIndex]);
            }
            
        }
    };
    
    this.changeState = function(iState){
        _iState=iState;

        switch(_iState){
            case STATE_GAME_DEALING:{
                
                break;
            }
        }
    };
    
    this.placeFakeCardForStarting = function(){
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
                                       card_4_8:[46], card_4_9:[47],card_4_10:[48],card_4_J:[49],card_4_Q:[50],card_4_K:[51],joker:[52],back:[53]}
                        
        };
        
        _oSpriteSheetCard = new createjs.SpriteSheet(oData);
        
        var iX = 0;
        var iY = 0;
        for(var i=0;i<5;i++){
            
            var oBackCard = createSprite(_oSpriteSheetCard,"back",CARD_WIDTH/2,CARD_HEIGHT/2,CARD_WIDTH,CARD_HEIGHT);
            oBackCard.x = iX;
            oBackCard.y = iY;
            oBackCard.shadow = new createjs.Shadow("#000000", 5, 5, 5);
            _oCardAttach.addChild(oBackCard);
            
            iX += 180;
        }
    };

    this.dealCards = function(){
        if(_bBlock){
            return;
        }
        if(_iMoney <= 0){
            return;
        }
        
        _bBlock = true;
        $(s_oMain).trigger("bet_placed",_iCurBet);
        
        _oCardAttach.removeAllChildren();
        _iCurWin = 0;
        
        var iRandWin;
        //IF THERE ARE NO ENOUGH MONEY IN THE GAME CASH, USER MUST LOSE
        if(_iGameCash < MIN_WIN){
            iRandWin = WIN_OCCURRENCE+1;
        }else{
            iRandWin = Math.floor(Math.random()*100);
        }

        if(iRandWin > WIN_OCCURRENCE){
            //LOSE
            do{
                this._createCard();
            }while( _oHandEvaluator.evaluate(_aCurHand) < HIGH_CARD);
            _bWinCurHand = false;
        }else{
            //WIN
            var iCont = 0;
            do{
                this._createCard();
                
                var iRet = _oHandEvaluator.evaluate(_aCurHand);
                var iWin = 0;
                if(iRet < HIGH_CARD){
                    iWin = s_oPayTableSettings.getWin(_iCurCreditIndex,iRet) * _iCurBet;
                }
                
                iCont++;
            }while(_iGameCash < iWin && iCont < 5000);
            
            if(iCont >= 5000){
                //USER MUST LOSE BECAUSE CAN'T FIND ANY WINNING HAND
                do{
                    this._createCard();
                }while( _oHandEvaluator.evaluate(_aCurHand) < HIGH_CARD);
                _bWinCurHand = false;
            }else{
                _bWinCurHand = true;
            }
            
        }
        
        //DECREASE MONEY
        _iMoney -= _iCurBet;
        _iMoney = parseFloat(_iMoney.toFixed(2));
        _iGameCash += _iCurBet;
        _iGameCash = parseFloat(_iGameCash.toFixed(2));
        _oInterface.refreshMoney(_iMoney,_iCurBet,2);

        playSound("card",1,false);
        
        _iCurState = STATE_GAME_DEAL;
    };
    
    this._createCard = function(){
        
        for(var j=0;j<_aCurHand.length;j++){
            _aCurHand[j].unload();
        }
        
        var iX = 0;
        var iY = 0;
        _aCurHand = new Array();
        for(var i=0;i<5;i++){
            var oCard = new CCard(iX,iY,_oSpriteSheetCard,_oCardAttach,_aCardDeck[_iCurIndexDeck].fotogram,_aCardDeck[_iCurIndexDeck].rank,_aCardDeck[_iCurIndexDeck].suit);
            oCard.addEventListener(ON_CARD_SHOWN,this._onCardShown,this);
            oCard.addEventListener(ON_CARD_HIDE,this._onCardHide,this);
            oCard.addEventListener(ON_CARD_SELECTED,this._onCardSelected,this);
            _aCurHand.push(oCard);
            _iCurIndexDeck++;
            this._checkDeckLength();
            iX += 180;
            
            oCard.showCard();
        }
    };
    
    this.drawCards = function(){
        if(_bBlock){
            return;
        }
        
        _bBlock = true;
        
        playSound("card",1,false);
        
        var iNumHold = _aCurHand.length;
        for(var i=0;i<_aCurHand.length;i++){
            if(_aCurHand[i].isHold() === false){
                _aCurHand[i].hideCard();
                iNumHold--;
            }
        }
        
        if(iNumHold === _aCurHand.length){
            _iCurState = STATE_GAME_DRAW;
            this._onCardShown();
        } 
    };
    
    this._checkDeckLength = function(){
        if(_iCurIndexDeck >= _aCardDeck.length){
            _aCardDeck = _oGameSettings.getShuffledCardDeck();
            _iCurIndexDeck = 0;
        }
    };
    
    this.setDoubleBet = function(){
        var bWin;

        if(_iCurIndexForDoubleDeck+5 >= _aDeckForDouble.length){
            _iCurIndexForDoubleDeck = 0;
            _aDeckForDouble = _oGameSettings.getShuffledDeckForDouble();
        }
        
        var aCards = new Array();
        for(var i=0;i<5;i++){
            aCards[i] = _aDeckForDouble[_iCurIndexForDoubleDeck];
            _iCurIndexForDoubleDeck++;
        }
        
        aCards.sort(_oHandEvaluator.compareRank);
        
        var iRandDealerCard = Math.floor(Math.random() * (aCards.length - 3)) + 1;
        
        var iRandWin;
        if(_iGameCash < _iCurWin*2){
            //USER MUST LOSE
            iRandWin = DOUBLE_OCCURRENCE+1;
        }else{
            iRandWin = Math.floor(Math.random()*100);
        }
        
        if(iRandWin < DOUBLE_OCCURRENCE){
            bWin = true;
            _iCurWin *= 2;
            _iCurWin = parseFloat(_iCurWin.toFixed(2));
        }else{
            _iCurWin = 0;
            bWin = false;
        }

        return {win:bWin,cards:aCards,dealer_index:iRandDealerCard};
    };
    
    this.setDoubleHalfBet = function(){
        var bWin;
        if(_iCurIndexForDoubleDeck+5 >= _aDeckForDouble.length){
            _iCurIndexForDoubleDeck = 0;
            _aDeckForDouble = _oGameSettings.getShuffledDeckForDouble();
        }
        
        var aCards = new Array();
        for(var i=0;i<5;i++){
            aCards[i] = _aDeckForDouble[_iCurIndexForDoubleDeck];
            _iCurIndexForDoubleDeck++;
        }
        
        aCards.sort(_oHandEvaluator.compareRank);
        
        var iRandDealerCard = Math.floor(Math.random() * (aCards.length - 3)) + 1;
        
        var iWinToStore = _iCurWin/2;
        _iMoney += iWinToStore;
        _iMoney = parseFloat(_iMoney.toFixed(2));
        _iGameCash -= iWinToStore;
        _iGameCash = parseFloat(_iGameCash.toFixed(2));
        
        var iRandWin;
        if(_iGameCash < _iCurWin*1.5){
            //USER MUST LOSE
            iRandWin = DOUBLE_HALF_OCCURRENCE+1;
        }else{
            iRandWin = Math.floor(Math.random()*100);
        }
        
        if(iRandWin < DOUBLE_HALF_OCCURRENCE){
            bWin = true;
        }else{
            bWin = false;
            _iCurWin = 0;
        }
        
        return {win:bWin,cards:aCards,dealer_index:iRandDealerCard};
    };
    
    this.assignWin = function(){
        playSound("win",1,false);

        var aSortedHand = _oHandEvaluator.getSortedHand();

        for(var i=0;i<_aCurHand.length;i++){
            for(var j=0;j<aSortedHand.length;j++){ 
                if(aSortedHand[j].rank === _aCurHand[i].getRank() && aSortedHand[j].suit === _aCurHand[i].getSuit()){
                    _aCurHand[i].highlight();
                    break;
                }
            }
        }
        
        _oPayTable.showWinAnim(_iCurCreditIndex,_iHandResult);
        _iCurWin = s_oPayTableSettings.getWin(_iCurCreditIndex,_iHandResult) * BET_TYPE[_iCurBetIndex];
     };
     
    this.recharge = function(){
        
        _oAlertPanel.hide(); 
    };
    
    this.setMoney = function(iMoney){
        _iMoney = iMoney;
        
        _oPayTable.setCreditColumn(_iCurCreditIndex);
        
        
        this.checkMoney();
        _oInterface.refreshMoney(_iMoney,_iCurBet,3);
        _oInterface.refreshBet(BET_TYPE[_iCurBetIndex]);
        
        _oInterface.enableGUI();
    };
     
    this._showAlertPanel = function(szText){
        _oAlertPanel.show(szText);
    };
    
    this._onCardSelected = function(oCard,iTest){
        if(_iCurState !== STATE_GAME_CHOOSE_HOLD){
            return;
        }

        oCard.toggleHold();
    };
    
    this._onCardShown = function(){
        if(_iCurState === STATE_GAME_CHOOSE_HOLD){
            return;
        }
        
        switch(_iCurState){
            case STATE_GAME_DEAL:{
                    _iCurState = STATE_GAME_CHOOSE_HOLD;
                    _oInterface.setState(_iCurState);
                    _oInterface.enableDeal();
                    break;
            }
            case STATE_GAME_DRAW:{

                    _iHandResult = _oHandEvaluator.evaluate(_aCurHand);
                    _oInterface.setState(_iCurState);
                    

                    if(_iHandResult !== HIGH_CARD){
                        s_oGame.assignWin();
                        setTimeout(function(){_oDoubleUpPanel.show(_iCurWin,_iCurWin*2,_iCurWin*1.5);},3000);
                        _iCurState = STATE_GAME_EVALUATE;
                    }else{
                        playSound("lose",1,false);
                        _oInterface.showLosePanel();
                        _oInterface.enableGUI();
                        _iCurState = STATE_GAME_EVALUATE;
                    }
                    
                    if(!_bWinCurHand){
                        $(s_oMain).trigger("save_score",[_iMoney]);
                    }
                    
                    _iHandCont++;
                    if(_iHandCont === NUM_HAND_FOR_ADS){
                        _iHandCont = 0;
                        
                        
                        $(s_oMain).trigger("show_interlevel_ad");
                    }
                    break;
            } 
            case STATE_GAME_EVALUATE:{
                _oInterface.setState(_iCurState);
                break;
            }
        }
        
        _bBlock = false;
    };
    
    this.exitFromDoublePanel = function(){
        _iMoney += 0;
        _iCurWin=parseFloat(_iCurWin.toFixed(2));
        _iMoney = parseFloat(_iMoney.toFixed(2));
        _iGameCash -= _iCurWin;
        _iGameCash = parseFloat(_iGameCash.toFixed(2));
        
      
        if(_iCurWin>0){
            $.post("update20", { _token: $('meta[name=csrf-token]').attr('content'), amount: iMoney+_iCurWin,bet:_iCurBet}, function(t) {
            });
            _oInterface.refreshWin(_iCurWin);
            _iMoney += _iCurBet;
            _iMoney = parseFloat(_iMoney.toFixed(2));
            _oInterface.refreshMoney(_iMoney,_iCurBet,4);
        }
        _iCurState = STATE_GAME_EVALUATE;
        _oInterface.setState(_iCurState);
        _oInterface.enableGUI();
        
        $(s_oMain).trigger("save_score",[_iMoney]);
    };
    
    this.exitFromAlertPanel = function(){
        _bBlock = false;
    };
    
    this._onCardHide = function(){
        
        if(_iCurState === STATE_GAME_DRAW){
            return;
        }
        
        _iCurState = STATE_GAME_DRAW;

        if(_bWinCurHand){
            var iCont = 0;
            do{
                s_oGame._changeCardValue();
                var iRet = _oHandEvaluator.evaluate(_aCurHand);
                
                var iWin;
                if(iRet === HIGH_CARD){
                    iWin = 0;
                }else{
                    iWin = s_oPayTableSettings.getWin(_iCurCreditIndex,iRet) * _iCurBet;
                }
                iCont++;

            }while( (iRet === HIGH_CARD ||  _iGameCash <  iWin ) && iCont<1000);
            
            if(iCont >= 1000){
                //USER MUST LOSE BECAUSE CAN'T FIND ANY WINNING HAND
                do{
                    s_oGame._changeCardValue();
                    var iRet = _oHandEvaluator.evaluate(_aCurHand);
                }while( iRet < HIGH_CARD);
                _bWinCurHand = false;
            }
        }else{
            do{
                s_oGame._changeCardValue();
                var iRet = _oHandEvaluator.evaluate(_aCurHand);
            }while(iRet < HIGH_CARD);
        }
        
        for(var i=0;i<5;i++){
            _aCurHand[i].setHold(false);
        }
    };
    
    this._changeCardValue = function(){
        for(var i=0;i<5;i++){
            if(_aCurHand[i].isHold() === false){
                _aCurHand[i].changeInfo(_aCardDeck[_iCurIndexDeck].fotogram,_aCardDeck[_iCurIndexDeck].rank,_aCardDeck[_iCurIndexDeck].suit);
                _aCurHand[i].showCard();
                _iCurIndexDeck++;    
                this._checkDeckLength();
            }
        }
    };

    this._onButDealRelease = function(){
        switch(_iCurState){
            case STATE_GAME_WAITING_FOR_BET:{
                    this.dealCards();
                    break;
            }
            case STATE_GAME_CHOOSE_HOLD:{
                    this.drawCards();
                    break;
            }
            case STATE_GAME_EVALUATE:{
                    this.resetHand();
                    this.dealCards();
                    break;
            }
        }
    };
    
    this._onButLeftRelease = function(){
        if(_iCurBetIndex === 0 || _bBlock || (_iCurState !== STATE_GAME_WAITING_FOR_BET && _iCurState !== STATE_GAME_EVALUATE)){
            return;
        }
        
        _iCurBetIndex--;
        var iNewBet= parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
        if(_iMoney < iNewBet){
            _iCurBetIndex++;
            //this._showAlertPanel(TEXT_NO_MONEY);
            return;
        }
        
        _iCurBet = iNewBet;
        _oInterface.refreshMoney(_iMoney,_iCurBet,5);
        _oInterface.refreshBet(BET_TYPE[_iCurBetIndex]);
        
        MIN_WIN = (COMBO_PRIZES[COMBO_PRIZES.length-1] * _iCurBet) * (_iCurCreditIndex+1);

    };
    
    this._onButRightRelease = function(){
        if(_iCurBetIndex === BET_TYPE.length-1 || _bBlock || (_iCurState !== STATE_GAME_WAITING_FOR_BET && _iCurState !== STATE_GAME_EVALUATE)){
            return;
        }
        
        _iCurBetIndex++;
        var iNewBet= parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
        if(_iMoney < iNewBet){
            _iCurBetIndex--;
            //this._showAlertPanel(TEXT_NO_MONEY);
            return;
        }
        
        _iCurBet = iNewBet;
        _oInterface.refreshMoney(_iMoney,_iCurBet,6);
        _oInterface.refreshBet(BET_TYPE[_iCurBetIndex]);
        
        MIN_WIN = (COMBO_PRIZES[COMBO_PRIZES.length-1] * _iCurBet) * (_iCurCreditIndex+1);

    };
    
    this._onButBetOneRelease = function(){
        if(_bBlock || (_iCurState !== STATE_GAME_WAITING_FOR_BET && _iCurState !== STATE_GAME_EVALUATE)){
            return;
        }
        
        _iCurCreditIndex++;
        if(_iCurCreditIndex === NUM_BETS){
            _iCurCreditIndex = 0;
        }
        
        
        var iNewBet = parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
        if(_iMoney < iNewBet){
            //this._showAlertPanel(TEXT_NO_MONEY);
            
            _iCurCreditIndex = 0;
            iNewBet = parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
        }
        
        _iCurBet = iNewBet;
        _oInterface.refreshMoney(_iMoney,_iCurBet,7);
        
        _oPayTable.setCreditColumn(_iCurCreditIndex);
        
        MIN_WIN = (COMBO_PRIZES[COMBO_PRIZES.length-1] * _iCurBet) * (_iCurCreditIndex+1);
    };
    
    this._onButBetMaxRelease = function(){
        if(_bBlock || (_iCurState !== STATE_GAME_WAITING_FOR_BET && _iCurState !== STATE_GAME_EVALUATE) ){
            return;
        }
	_bBlock = true;
		
        _iCurCreditIndex = NUM_BETS-1;
        var iNewBet= parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
        if(_iMoney < iNewBet){
            this._showAlertPanel(TEXT_NO_MONEY);
            return;
        }
        
        _iCurBet = iNewBet;
        _oInterface.refreshMoney(_iMoney,_iCurBet,8);
        _oPayTable.setCreditColumn(_iCurCreditIndex);
        
        MIN_WIN = (COMBO_PRIZES[COMBO_PRIZES.length-1] * _iCurBet) * (_iCurCreditIndex+1);
        
	this.resetHand();
        this.dealCards();
    };
    
    this.onExit = function(){
        this.unload();

        s_oMain.gotoMenu();
        
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event",[_iMoney]);
    };
    
    this.getCurWin = function(){
        return _iCurWin;
    };
    
    this.update = function(){

    };
    
    s_oGame = this;
    
    WIN_OCCURRENCE = oData.win_occurrence;
    DOUBLE_OCCURRENCE = oData.double_occurrence;
    DOUBLE_HALF_OCCURRENCE = oData.double_half_occurrence;
    GAME_CASH = oData.game_cash;
    BET_TYPE = oData.bets;
    COMBO_PRIZES = oData.combo_prizes;
    TOTAL_MONEY = oData.money;
    AUTOMATIC_RECHARGE = oData.recharge;
    NUM_HAND_FOR_ADS = oData.num_hand_before_ads;
    
    this._init();
}

var s_oGame;
 var s_oPayTableSettings;