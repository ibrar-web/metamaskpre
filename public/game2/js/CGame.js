function CGame(oData){
    var _bUpdate = false;
    var _bRebetActive;
    var _iTimeElaps;
    var _iMaxBet;
    var _iState;
    var _iCardIndexToDeal;
    var _iPlayerValueCard;
    var _iDealerValueCard;
    var _iGameCash;
    var _iAdsCounter;
    
    var _aCardsDealing;
    var _aCardsInCurHandForDealer;
    var _aCardDeck;
    var _aCardsInCurHandForPlayer;
    var _aCurActiveCardOffset;
    var _aBetOccurrences;
    var _pStartingPointCard;
    
    var _oStartingCardOffset;
    var _oDealerCardOffset;
    var _oReceiveWinOffset;
    var _oFichesDealerOffset;
    var _oRemoveCardsOffset;
    var _oCardContainer;
    
    var _oBg;
    var _oInterface;
    var _oSeat;
    var _oMsgBox;
    var _oGameOverPanel;
    var winamount=0;
    var betamount=0;
    this._init = function(){
        _iMaxBet = MAX_BET;
        _iState = -1;
        _iTimeElaps = 0;
        _iAdsCounter = 0;
        _aBetOccurrences = new Array();
        for(var i=0;i<BET_OCCURRENCE.length;i++){
            for(var j=0;j<BET_OCCURRENCE[i];j++){
                _aBetOccurrences.push(i);
            }
        }

        s_oTweenController = new CTweenController();
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);
        
        var oSpriteGui = s_oSpriteLibrary.getSprite('gui_bg');
        var oGuiBg = createBitmap(oSpriteGui);
        oGuiBg.y = CANVAS_HEIGHT - oSpriteGui.height;
        s_oStage.addChild(oGuiBg);
        
        _oCardContainer = new createjs.Container();
        s_oStage.addChild(_oCardContainer);
        
        _oInterface = new CInterface(TOTAL_MONEY);
        _oInterface.displayMsg(TEXT_DISPLAY_MSG_WAITING_BET,TEXT_MIN_BET+": "+MIN_BET + "\n" + TEXT_MAX_BET+": "+MAX_BET);
        
        _oSeat = new CSeat();
        _oSeat.setCredit(TOTAL_MONEY);
        
        
        this.reset(false);

        _oStartingCardOffset = new CVector2();
        _oStartingCardOffset.set(1214,228);
        
        _oDealerCardOffset = new CVector2();
        _oDealerCardOffset.set(CANVAS_WIDTH/2 + 100,230);
        
        _oReceiveWinOffset = new CVector2();
        _oReceiveWinOffset.set(418,820);
        
        _oFichesDealerOffset = new CVector2();
        _oFichesDealerOffset.set(0,-CANVAS_HEIGHT);
        
        _oRemoveCardsOffset = new CVector2(454,230);
        
        _aCurActiveCardOffset=new Array(_oSeat.getCardOffset(),_oDealerCardOffset);

	_oGameOverPanel = new CGameOver();
	
        if(_oSeat.getCredit()<FICHES_VALUE[0]){
            this._gameOver();
            this.changeState(-1);
        }else{
            _bUpdate = true;
        }
        
        _pStartingPointCard = new CVector2(_oStartingCardOffset.getX(),_oStartingCardOffset.getY());
        
        _oMsgBox = new CMsgBox();
        
        this.changeState(STATE_GAME_WAITING_FOR_BET);
    };
    
    this.unload = function(){
	_bUpdate = false;

        for(var i=0;i<_aCardsDealing.length;i++){
            _aCardsDealing[i].unload();
        }
        
        _oInterface.unload();
        _oGameOverPanel.unload();
        _oMsgBox.unload();
        s_oStage.removeAllChildren();
    };
    
    this.reset = function(bRebet){
        _bRebetActive = false;
        _iTimeElaps=0;
        _iCardIndexToDeal=0;

        _iDealerValueCard=0;
        _iPlayerValueCard = 0;
        _oSeat.reset();

        _aCardsDealing=new Array();
        _aCardsDealing.splice(0);

        _oInterface.reset();
        _oInterface.enableBetFiches(bRebet);

        this.shuffleCard();
    };
    
    this.setMoney = function(iMoney){
        _oSeat.setCredit(iMoney);
        _oInterface.refreshCredit(iMoney,betamount,'1');
        _oGameOverPanel.hide();
    };
    
    this.shuffleCard = function(){
        _aCardDeck=new Array();
        _aCardDeck=s_oGameSettings.getShuffledCardDeck();
    };
    
    this.changeState = function(iState){
        _iState=iState;
        if(_iState === STATE_GAME_DEALING){
                    
            //CHECK IF THERE IS AVAILABLE GAME CASH
            var iRand;
            if(_iGameCash < (_oSeat.getTotBet() * 2) ){
                //USER MUST LOSE
                iRand = WIN_OCCURRENCE;
            }else{
                //DECIDE IF PLAYER MUST LOSE
                iRand = Math.random() * 100;
            }

             var aBetPlayer = _oSeat.getBetArray();
             
            var iNumBets = 0;
            for(var k=0;k<aBetPlayer.length;k++){
                if(aBetPlayer[k] > 0){
                    iNumBets++;
                }
            }
                
            if(iRand < WIN_OCCURRENCE){
                //PLAYER WINS
                var iWinningBet;
                
                if(iNumBets === 1){
                    
                    for(var k=0;k<aBetPlayer.length;k++){
                        var iIndex = 0;
                        if(aBetPlayer[k] !== 0){
                            iIndex = k;
                            break;
                        }
                    }
                    
                    iWinningBet = iIndex;
                }else{
                    
                    do{
                        var iRandBet = Math.floor(Math.random()*_aBetOccurrences.length);
                        iWinningBet = _aBetOccurrences[iRandBet];
                    }while(aBetPlayer[iWinningBet] === 0);
                }


                do{
                    if(_aCardDeck.length < 6){
                        this.shuffleCard(); 
                    }
                    var aTmpPlayerCards = new Array();
                    aTmpPlayerCards.push(_aCardDeck.splice(0,1));
                    aTmpPlayerCards.push(_aCardDeck.splice(0,1));

                    var aTmpDealerCards = new Array();
                    aTmpDealerCards.push(_aCardDeck.splice(0,1));
                    aTmpDealerCards.push(_aCardDeck.splice(0,1));

                    var iRet = this._simulateHand(aTmpPlayerCards,aTmpDealerCards);
                }while(iWinningBet !== iRet);

                _aCardsInCurHandForPlayer = new Array();
                for(var k=0;k<aTmpPlayerCards.length;k++){
                    _aCardsInCurHandForPlayer[k] = aTmpPlayerCards[k];
                }

                _aCardsInCurHandForDealer = new Array();
                for(var k=0;k<aTmpDealerCards.length;k++){
                    _aCardsInCurHandForDealer[k] = aTmpDealerCards[k];
                }
            }else{
                //PLAYER LOSES
                var iLosingBet;

                
                if(iNumBets === 3){
                    //PLAYER PUT FICHES ON ALL BETS
                    //CHOOSE WORST BET BETWEEN BANKER OR PLAYER
                    var iRand = Math.random();
                    iLosingBet = iRand > 0.5?BET_BANKER:BET_PLAYER;
                }else{
                    var aMissingBets = new Array();
                    for(var t=0;t<aBetPlayer.length;t++){
                        if(aBetPlayer[t] === 0){
                            aMissingBets.push(t);
                        }
                    }

                    var iRand = Math.floor(Math.random()*aMissingBets.length);
                    iLosingBet = aMissingBets[iRand];
                }


                do{
                    if(_aCardDeck.length < 6){
                        this.shuffleCard(); 
                    }
                    var aTmpPlayerCards = new Array();
                    aTmpPlayerCards.push(_aCardDeck.splice(0,1));
                    aTmpPlayerCards.push(_aCardDeck.splice(0,1));

                    var aTmpDealerCards = new Array();
                    aTmpDealerCards.push(_aCardDeck.splice(0,1));
                    aTmpDealerCards.push(_aCardDeck.splice(0,1));

                    var iRet = this._simulateHand(aTmpPlayerCards,aTmpDealerCards);
                }while(iLosingBet !== iRet);

                _aCardsInCurHandForPlayer = new Array();
                for(var k=0;k<aTmpPlayerCards.length;k++){
                    _aCardsInCurHandForPlayer[k] = aTmpPlayerCards[k];
                }

                _aCardsInCurHandForDealer = new Array();
                for(var k=0;k<aTmpDealerCards.length;k++){
                    _aCardsInCurHandForDealer[k] = aTmpDealerCards[k];
                }
            }

            _oInterface.disableButtons();
            _oInterface.displayMsg(TEXT_DISPLAY_MSG_DEALING,"");
            this._dealing();
        }
    };
    
    this._simulateHand = function(aPlayerCard,aDealerCard){
        var iPlayerValue = 0;
        var iDealerValue = 0;
        for(var i=0;i<aPlayerCard.length;i++){
            iPlayerValue += s_oGameSettings.getCardValue(aPlayerCard[i]);
            iDealerValue += s_oGameSettings.getCardValue(aDealerCard[i]);
        }
        
        iPlayerValue = iPlayerValue%10;
        iDealerValue = iDealerValue%10;
        
        var szWin;
        if(iDealerValue > 7){
            if(iDealerValue > iPlayerValue){
                szWin = WIN_DEALER;
            }else if(iDealerValue === iPlayerValue){
                szWin = WIN_TIE;
            }else{
                szWin = WIN_PLAYER;
            }
            
            return szWin;
        }
        
        var bDealToDealer = false;
        if(iPlayerValue > 7){
            return WIN_PLAYER;
        }else if(iPlayerValue < 6){
            //PLAYER MUST GET ANOTHER CARD
            var iCard = _aCardDeck.splice(0,1);
            var iThirdCardValue = s_oGameSettings.getCardValue(iCard);
            aPlayerCard.push(iCard);
            iPlayerValue += iThirdCardValue;
            iPlayerValue = iPlayerValue%10;
            
            //BANKER TURN
            if(iDealerValue < 3){
                bDealToDealer = true;
            }else if(iDealerValue === 3 && iThirdCardValue !==8){
                bDealToDealer = true;
            }else if(iDealerValue === 4 && (iThirdCardValue > 1 && iThirdCardValue < 8) ){
                bDealToDealer = true;
            }else if(iDealerValue === 5 && (iThirdCardValue > 3 && iThirdCardValue <8) ){
                bDealToDealer = true;
            }else if(iDealerValue === 6 && (iThirdCardValue === 6 || iThirdCardValue === 7) ){
                bDealToDealer = false;
            }
            
            if(bDealToDealer){
                var iCard = _aCardDeck.splice(0,1);
                aDealerCard.push(iCard);
                iDealerValue += s_oGameSettings.getCardValue(iCard);
                iDealerValue = iDealerValue%10;
            }
            
        }else{
            if(iDealerValue < 6){
                //DEALER MUST TAKE ANOTHER CARD
                var iCard = _aCardDeck.splice(0,1);
                aDealerCard.push(iCard);
                iDealerValue += s_oGameSettings.getCardValue(iCard);
                iDealerValue = iDealerValue%10;
            }
        }
        
        if(iDealerValue === iPlayerValue){
            return WIN_TIE;
        }else if(iDealerValue > iPlayerValue){
            return WIN_DEALER;
        }else{
            return WIN_PLAYER;
        }
    };


    this.cardFromDealerArrived = function(oCard,bDealerCard,iCount){

        if(bDealerCard === false){
            _iPlayerValueCard += oCard.getValue();
        }else{
            _iDealerValueCard += oCard.getValue();
        }
        
        if(iCount<3){
                s_oGame._dealing();
        }else{
            _iPlayerValueCard = _iPlayerValueCard%10;
            _iDealerValueCard = _iDealerValueCard%10;
            _oInterface.refreshCardValue(_iDealerValueCard,_iPlayerValueCard);
            if(_aCardsInCurHandForPlayer.length === 1){
                //DEAL THE THIRD CARD FOR PLAYER                
                var iFotogram = _aCardsInCurHandForPlayer.splice(0,1)[0];
                var oNewCard = new CCard(_oStartingCardOffset.getX(),_oStartingCardOffset.getY(),_oCardContainer);
                oNewCard.setInfo(_pStartingPointCard,_oSeat.getAttachCardOffset(),iFotogram,
                                                    s_oGameSettings.getCardValue(iFotogram),false,_iCardIndexToDeal);
                
                oNewCard.addEventListener(ON_CARD_ANIMATION_ENDING,s_oGame.cardFromDealerArrived);
                
                _oSeat.newCardDealed();
                _iCardIndexToDeal++;
                _aCardsDealing.push(oNewCard);
            }else if(_aCardsInCurHandForDealer.length === 1){
                //DEAL CARD FOR DEALER
                _iCardIndexToDeal++;
                var pEndingPoint=new CVector2(_oDealerCardOffset.getX()+ ((CARD_WIDTH/2)*2),_oDealerCardOffset.getY());

                var iFotogram = _aCardsInCurHandForDealer.splice(0,1);
                var oNewCard = new CCard(_oStartingCardOffset.getX(),_oStartingCardOffset.getY(),_oCardContainer);
               
                oNewCard.setInfo(_pStartingPointCard,pEndingPoint,iFotogram,s_oGameSettings.getCardValue(iFotogram),true,_iCardIndexToDeal);
                oNewCard.addEventListener(ON_CARD_ANIMATION_ENDING,s_oGame.cardFromDealerArrived);
                _aCardsDealing.push(oNewCard);
            }else{
                s_oGame._showWin();
            }
        }
    };
    
    this._showWin = function(){
        var iWinningBet;
        if(_iDealerValueCard === _iPlayerValueCard){
            //TIE
            iWinningBet = BET_TIE;
        }else if(_iDealerValueCard > _iPlayerValueCard){
            //BANKER WIN
            iWinningBet = BET_BANKER;
        }else{
            //PLAYER WIN
            iWinningBet = BET_PLAYER;
        }
        
        
        var aBets = _oSeat.getBetArray();
        var bAnyWin = false;
        
        if(iWinningBet === BET_TIE){
            if(aBets[BET_TIE]>0){
                var iWin = _oSeat.getPotentialWin(BET_TIE);
                this._playerWin(iWin,iWinningBet,true);
                this._playerWin(aBets[BET_BANKER],BET_BANKER,false);
                this._playerWin(aBets[BET_PLAYER],BET_PLAYER,false);

                bAnyWin = true;
                _oInterface.showWin(BET_TIE,iWin,TEXT_WIN);
            }else{
                var iAmount = aBets[BET_BANKER]+aBets[BET_PLAYER];
                _oSeat.increaseCredit(iAmount,'1');
                _iGameCash -= iAmount;
            }
            
            _oInterface.showWin(BET_BANKER,aBets[BET_BANKER],TEXT_PUSH);
            _oInterface.showWin(BET_PLAYER,aBets[BET_PLAYER],TEXT_PUSH);
        }else{    
            for(var i=0;i<aBets.length;i++){
                if(aBets[i] > 0){
                    var iWin = 0;
                    if(iWinningBet === i){
                        //MUST ASSIGN WIN
                        this._playerWin(_oSeat.getPotentialWin(i),iWinningBet,true);
                        iWin = _oSeat.getPotentialWin(i);
                        bAnyWin = true;
                    }else{
                        this._playerLose(i,false);
                    }
 
                    _oInterface.showWin(i,iWin,iWin>0?TEXT_WIN:TEXT_NO_WIN);
                }
            }
        }
        
        if(bAnyWin){
            playSound("win", 1, false);
        }else{
            playSound("lose", 1, false);
            this._playerLose(iWinningBet,true);
        }
        
        setTimeout(function(){s_oGame._onEndHand(iWinningBet);},TIME_END_HAND);
    };
    
    this._playerWin = function(iTotWin,iBet,bShowMsg){
        betamount= _oSeat.getbetamount();
        _oSeat.increaseCredit(iTotWin,'2');
        _iGameCash -= iTotWin;
        winamount=iTotWin;
        if(bShowMsg){
            _oInterface.displayMsg(TEXT_DISPLAY_MSG_PLAYER_WIN,TEXT_BET[iBet] === BET_TIE?TEXT_DISPLAY_TIE:TEXT_OUTCOME+" "+TEXT_BET[iBet]);
        }
        _oSeat.initMovement(iBet,_oReceiveWinOffset.getX(),_oReceiveWinOffset.getY());
    };

    this._playerLose = function(iBet,bShowMsg){
        if(bShowMsg){
            _oInterface.displayMsg(TEXT_DISPLAY_MSG_PLAYER_LOSE,TEXT_BET[iBet] === BET_TIE?TEXT_DISPLAY_TIE:TEXT_OUTCOME+" "+TEXT_BET[iBet]);
        }else{
            _oSeat.initMovement(iBet,_oFichesDealerOffset.getX(),_oFichesDealerOffset.getY());
        }
        
    };
    
    this._dealing = function(){
        if(_iCardIndexToDeal<_aCurActiveCardOffset.length*2){
                var oCard = new CCard(_oStartingCardOffset.getX(),_oStartingCardOffset.getY(),_oCardContainer);

                
                var pEndingPoint;

                //THIS CARD IS FOR THE DEALER
                if((_iCardIndexToDeal%_aCurActiveCardOffset.length) === 1){
                    pEndingPoint=new CVector2(_oDealerCardOffset.getX()+(CARD_WIDTH/2)*(_iCardIndexToDeal > 1?1:0),_oDealerCardOffset.getY());

                    var iFotogram = _aCardsInCurHandForDealer.splice(0,1)[0];
                    oCard.setInfo(_pStartingPointCard,pEndingPoint,iFotogram,s_oGameSettings.getCardValue(iFotogram),true,_iCardIndexToDeal);

                }else{
                    var iFotogram = _aCardsInCurHandForPlayer.splice(0,1)[0];
                    oCard.setInfo(_pStartingPointCard,_oSeat.getAttachCardOffset(),iFotogram,
                                                    s_oGameSettings.getCardValue(iFotogram),
                                                                    false,_iCardIndexToDeal);
                    
                    _oSeat.newCardDealed();
	
                }

                _aCardsDealing.push(oCard);
                _iCardIndexToDeal++;

                oCard.addEventListener(ON_CARD_ANIMATION_ENDING,this.cardFromDealerArrived);
                oCard.addEventListener(ON_CARD_TO_REMOVE,this._onRemoveCard);

                playSound("card", 1, false); 
        }
    };
    
    this._onEndHand = function(iWinningBet){
        _oInterface.addHistoryRow(_iPlayerValueCard,_iDealerValueCard,iWinningBet);
        
        var pRemoveOffset=new CVector2(_oRemoveCardsOffset.getX(),_oRemoveCardsOffset.getY());
        for(var i=0;i<_aCardsDealing.length;i++){
            _aCardsDealing[i].initRemoving(pRemoveOffset);
            _aCardsDealing[i].hideCard();
        }

        _oInterface.clearCardValueText();
        _iTimeElaps=0;
        s_oGame.changeState(STATE_GAME_SHOW_WINNER);

        playSound("fiche_collect", 1, false);
        
        _iAdsCounter++;
        if(_iAdsCounter === AD_SHOW_COUNTER){
            _iAdsCounter = 0;
            $(s_oMain).trigger("show_interlevel_ad");
        }
		
	$(s_oMain).trigger("save_score",[_oSeat.getCredit()]);
    };
    
    this.setBet = function(iFicheValue,iFicheIndex,iTypeBet){
        if(_bRebetActive){
            _bRebetActive = false;
            this.clearBets();
        }
        
        var iTotBet=_oSeat.getTotBet();
        if( (iTotBet+iFicheValue) <= _iMaxBet && iFicheValue <= _oSeat.getCredit() ){
            iTotBet+=iFicheValue;
            iTotBet=Number(iTotBet.toFixed(2));
            _oSeat.decreaseCredit(iFicheValue);
            _iGameCash += iFicheValue;
            _oSeat.bet(iFicheValue,iTypeBet,iFicheIndex);
            _oInterface.enable(true,false,false,false,false);
            _oInterface.refreshCredit(_oSeat.getCredit(),betamount,'2');
        }
    };

    this._gameOver = function(){
        _oGameOverPanel.show();
    };

    this.onDeal = function(){
        if(_oSeat.getTotBet() < MIN_BET){
            _oMsgBox.show(TEXT_ERROR_MIN_BET);
            _oInterface.enableBetFiches(false);
            _oInterface.enable(true);
            return;
        }
        
        $(s_oMain).trigger("bet_placed",_oSeat.getTotBet());
        
        _oSeat.calculatePotentialWins();
        this.changeState(STATE_GAME_DEALING);
    };
    
    this.clearBets = function(){
        var iCurBet = _oSeat.getStartingBet();

        if(iCurBet>0){
            _oSeat.clearBet();
            _oSeat.increaseCredit(iCurBet,'3');
            _iGameCash -= iCurBet;betamount=0;
            _oInterface.refreshCredit(_oSeat.getCredit(),betamount,'3');
            var bRebet = _oSeat.checkIfRebetIsPossible();
            _oInterface.enableBetFiches(bRebet);
            
            $(s_oMain).trigger("clear_bet",iCurBet);
        }
    };
    
    this.rebet = function(){
        this.clearBets();
        var iCurBet = _oSeat.rebet();
        _iGameCash -= iCurBet;
        
        _oInterface.enable(true,false,false,false,false);
        _oInterface.refreshCredit(_oSeat.getCredit(),betamount,'4');
        _iTimeElaps = BET_TIME;
        _bRebetActive = true;
    };
            
    this._onRemoveCard = function(oCard){
        oCard.unload();
        _oInterface.displayMsg(TEXT_DISPLAY_MSG_WAITING_BET,TEXT_MIN_BET+": "+MIN_BET + "\n" + TEXT_MAX_BET+": "+MAX_BET);
    };
    
    this.onExit = function(){
        this.unload();
        
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event",_oSeat.getCredit());
        s_oMain.gotoMenu();
        
    };
    
    this.getState = function(){
        return _iState;
    };
    
    this._updateDealing = function(){
        for(var i=0;i<_aCardsDealing.length;i++){
            _aCardsDealing[i].update();
        }
    };
    
    this._updateShowWinner = function(){
        _oSeat.updateFichesController(s_iTimeElaps);

        for(var k=0;k<_aCardsDealing.length;k++){
                _aCardsDealing[k].update();
        }

        _iTimeElaps+=s_iTimeElaps;
        if(_iTimeElaps>TIME_END_HAND){
            _iTimeElaps=0;
            var bRebet = _oSeat.checkIfRebetIsPossible();

            this.reset(bRebet);
            _oInterface.reset();

            if(_oSeat.getCredit()<FICHES_VALUE[0]){
                    this._gameOver();
                    this.changeState(-1);
            }else{
                    this.changeState(STATE_GAME_WAITING_FOR_BET);
            }

            _oInterface.refreshCredit(_oSeat.getCredit()+winamount,betamount,'5');
            winamount=0;
        }
    };
    

    this.update = function(){
        if(_bUpdate === false){
            return;
        }

        switch(_iState){
            case STATE_GAME_DEALING:{
                    this._updateDealing();
                    break;
            }
            case STATE_GAME_SHOW_WINNER:{
                    this._updateShowWinner();
                    break;
            }
        }
        
	
    };
    
    s_oGame = this;

    TOTAL_MONEY      = oData.money;
    MIN_BET          = oData.min_bet;
    MAX_BET          = oData.max_bet;
    MULTIPLIERS      = oData.multiplier;
    BET_TIME         = oData.bet_time;
    BLACKJACK_PAYOUT = oData.blackjack_payout;
    WIN_OCCURRENCE   = oData.win_occurrence;
    BET_OCCURRENCE   = oData.bet_occurrence;
    _iGameCash       = oData.game_cash;
    TIME_END_HAND    = oData.time_show_hand;
    AD_SHOW_COUNTER  = oData.ad_show_counter; 
    
    this._init();
}

var s_oGame;
var s_oTweenController;