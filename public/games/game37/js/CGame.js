function CGame(oData) {
    var _bUpdate = false;
    var _bWinCurHand;
    var _bProgressiveActive = false;
    var _bRaise;
    var _iTimeElaps;
    var _iMaxBet;
    var _iState;
    var _iCurIndexDeck;
    var _iCardIndexToDeal;
    var _iGameCash;
    var _iCurMinWin;
    var _iLastWin;
    var _iAdsCounter;
    var _oActionAfterHandReset;
    var _oHandEvaluation;

    var _aCardsDealing;
    var _aCardDeck;
    var _aPlayerCardsInfo;
    var _pStartingPointCard;

    var _oStartingCardOffset;
    var _oReceiveWinOffset;
    var _oFichesDealerOffset;
    var _oRemoveCardsOffset;
    var _oCardContainer;
    var _oHandEvaluator;

    var _oInterface;
    var _oSeat;
    var _oPuck;
    var _oHelpCursorAnte;
    var _oHelpCursorDeal;
    var _oMsgBox;
    var _oGameOverPanel;

    this._init = function() {
        _iMaxBet = MAX_BET;
        _iState = -1;
        _iTimeElaps = 0;
        _iAdsCounter = 0;
        _iCurIndexDeck = 0;

        s_oTweenController = new CTweenController();

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg);

        _oCardContainer = new createjs.Container();
        s_oStage.addChild(_oCardContainer);

        _oInterface = new CInterface(TOTAL_MONEY);

        _oHandEvaluator = new CHandEvaluator();

        _oSeat = new CSeat();
        _oSeat.setCredit(TOTAL_MONEY);

        _oPuck = new CPuck(400, 414, s_oStage);
        _oHelpCursorAnte = new CHelpCursor(515, 590, s_oSpriteLibrary.getSprite("help_cursor"), s_oStage);
        _oHelpCursorDeal = new CHelpCursor(1240, 720, s_oSpriteLibrary.getSprite("help_cursor"), s_oStage);


        this.reset(false);

        _oStartingCardOffset = new CVector2();
        _oStartingCardOffset.set(1214, 228);

        _oReceiveWinOffset = new CVector2();
        _oReceiveWinOffset.set(0, CANVAS_HEIGHT + 100);

        _oFichesDealerOffset = new CVector2();
        _oFichesDealerOffset.set(0, -CANVAS_HEIGHT);

        _oRemoveCardsOffset = new CVector2(454, 230);

        _oGameOverPanel = new CGameOver();

        if (_oSeat.getCredit() < s_oGameSettings.getFichesValueAt(0)) {
            this._gameOver();
            this.changeState(-1);
        } else {
            _bUpdate = true;
        }

        _pStartingPointCard = new CVector2(_oStartingCardOffset.getX(), _oStartingCardOffset.getY());

        _oMsgBox = new CMsgBox();
        this.changeState(STATE_GAME_WAITING_FOR_BET);
    };

    this.unload = function() {
        _bUpdate = false;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            createjs.Sound.stop();
        }

        for (var i = 0; i < _aCardsDealing.length; i++) {
            _aCardsDealing[i].unload();
        }

        _oInterface.unload();
        _oGameOverPanel.unload();
        _oMsgBox.unload();
        s_oStage.removeAllChildren();
    };

    this.reset = function(bRebet) {
        _bRaise = false;

        _iTimeElaps = 0;
        _iCurIndexDeck = 0;
        _iCardIndexToDeal = 0;
        _oSeat.reset(_bProgressiveActive);
        _bProgressiveActive = false;

        _aCardsDealing = new Array();
        _aCardsDealing.splice(0);

        _oInterface.reset();
        _oInterface.enableBetFiches(bRebet);

        this.shuffleCard();
    };

    this.shuffleCard = function() {
        _aCardDeck = new Array();
        _aCardDeck = s_oGameSettings.getShuffledCardDeck();

    };

    this.changeState = function(iState) {
        _iState = iState;

        switch (iState) {
            case STATE_GAME_WAITING_FOR_BET:
                {
                    var szMsg = TEXT_MIN_BET + ": " + MIN_BET + "\n" + TEXT_MAX_BET + ": " + MAX_BET;
                    if (s_bProgressiveAnte) {
                        szMsg += "\n" + TEXT_PROGRESSIVE_LIMIT + " " + PROGRESSIVE_LIMIT;
                    }
                    _oInterface.displayMsg(TEXT_DISPLAY_MSG_WAITING_BET, szMsg);
                    break;
                }
            case STATE_GAME_DEALING:
                {
                    _oInterface.disableButtons();
                    _oInterface.displayMsg(TEXT_DISPLAY_MSG_DEALING);
                    this._dealing();
                    break;
                }
        }
    };

    this.cardFromDealerArrived = function(oCard, iCount) {
        if (iCount !== 2) {
            oCard.showCard();
        }

        s_oGame._dealing();
    };

    this._showWin = function() {
        if (_bWinCurHand) {
            //MUST ASSIGN WIN 
            _iLastWin = _oSeat.getBetAnte() + (_oSeat.getBetAnte() * PAYOUT_MULT[_oHandEvaluation.result]) + _oSeat.getBetRaise() + (_oSeat.getBetRaise() * PAYOUT_MULT[_oHandEvaluation.result]);
            this._playerWin();
            if (s_bProgressiveAnte) {
                _oInterface.enable(true, false, false, true);
                _bProgressiveActive = true;
                return;
            } else {
                _oSeat.increaseCredit(_iLastWin,'1');
                _iGameCash -= _iLastWin;
            }
        } else {
            this._playerLose();

        }

        this.distributeFiche();

    };

    this.distributeFiche = function() {
        this.changeState(STATE_GAME_DISTRIBUTE_FICHES);
        _oInterface.refreshCredit(_oSeat.getCredit(), '1');

        playSound("fiche_collect", 1, 0);

        setTimeout(function() {
            _oSeat.resetBet();
            s_oGame.changeState(STATE_GAME_WAITING_FOR_BET);
            _oInterface.enableBetFiches(true);
        }, TIME_CARD_REMOVE * 3);
    };

    this._playerWin = function() {
        if (_oHandEvaluation.result === PAIR_RANK || _oHandEvaluation.result === CONSECUTIVE_RANK) {
            _oInterface.displayMsg(TEXT_DISPLAY_MSG_SHOWDOWN, TEXT_DISPLAY_MSG_PUSH + " " + _iLastWin.toFixed(2) + TEXT_CURRENCY);
            _oInterface.showResultText(TEXT_HAND_PUSH);
        } else {
            _oInterface.displayMsg(TEXT_DISPLAY_MSG_SHOWDOWN, TEXT_DISPLAY_MSG_PLAYER_WIN + " " + _iLastWin.toFixed(2) + TEXT_CURRENCY);
            _oInterface.showResultText(TEXT_HAND_WON_PLAYER);
        }

        _oSeat.initMovement(_oReceiveWinOffset.getX(), _oReceiveWinOffset.getY());
        playSound("win", 1, 0);
    };

    this._playerLose = function() {
        _oInterface.displayMsg(TEXT_DISPLAY_MSG_SHOWDOWN, TEXT_DISPLAY_MSG_PLAYER_LOSE);
        _oSeat.initMovement(_oFichesDealerOffset.getX(), _oFichesDealerOffset.getY());

        _oInterface.showResultText(TEXT_HAND_LOSE_PLAYER);
        playSound("lose", 1, 0);
    };

    this._standOff = function(iTotWin) {
        _oSeat.increaseCredit(iTotWin,'2');
        _iGameCash -= iTotWin;

        _oInterface.displayMsg(TEXT_DISPLAY_MSG_SHOWDOWN, TEXT_DISPLAY_MSG_STANDOFF);
        _oSeat.initMovement(_oReceiveWinOffset.getX(), _oReceiveWinOffset.getY());

        _oInterface.showResultText(TEXT_DISPLAY_MSG_STANDOFF);
    };

    this._dealing = function() {
        if (_iCardIndexToDeal < 3) {
            var oCard = new CCard(_oStartingCardOffset.getX(), _oStartingCardOffset.getY(), _oCardContainer);
            if (_iCardIndexToDeal === 2) {
                oCard.addEventListener(ON_CARD_SHOWN, this._onThirdCardShown, this);
            }

            var oInfo = _aPlayerCardsInfo.splice(0, 1);
            var iFotogram = oInfo[0].fotogram;
            var iValue = oInfo[0].rank;
            oCard.setInfo(_pStartingPointCard, _oSeat.getAttachCardOffset(), iFotogram, iValue, _iCardIndexToDeal);

            _oSeat.newCardDealed();

            _aCardsDealing.push(oCard);
            _iCardIndexToDeal++;

            oCard.addEventListener(ON_CARD_ANIMATION_ENDING, this.cardFromDealerArrived);

            playSound("card", 1, 0);
        } else {
            if (_aCardsDealing[0].getValue() > _aCardsDealing[1].getValue()) {
                //SWAP CARD POSITION AND DEPTH
                _oCardContainer.setChildIndex(_aCardsDealing[2].getSprite(), 0);
                var pCardPos1 = _aCardsDealing[0].getCurPos();
                var pCardPos2 = _aCardsDealing[1].getCurPos();
                _aCardsDealing[0].changePos(pCardPos2);
                _aCardsDealing[1].changePos(pCardPos1);
            }

            //PLACE THE PUCK
            var iResult = _oHandEvaluation.result;
            if (_oHandEvaluation.result === THREE_OF_A_KIND) {
                iResult = PAIR_RANK;
            }
            var oPuckPos = s_oGameSettings.getPuckPos(iResult);
            _oPuck.move(oPuckPos.x);

            setTimeout(function() {
                s_oGame._prepareUserActions();
            }, 2000);

        }
    };

    this._prepareUserActions = function() {

        if (_oHandEvaluation.result === CONSECUTIVE_RANK) {
            //IF WE HAVE TWO CONSECUTIVE CARDS
            _iState = STATE_GAME_SHOWDOWN;
            s_oGame._showWin();

        } else if (_oHandEvaluation.result === PAIR_RANK || _oHandEvaluation.result === THREE_OF_A_KIND) {
            //IF WE HAVE TWO EQUAL CARDS WE MUST SHOW THE THIRD CARD
            _aCardsDealing[2].showCard();
        } else {
            //THERE IS A GAP BETWEEN CARDS
            if (_oSeat.getCredit() < (_oSeat.getBetAnte() * 2)) {
                _oInterface.enable(false, false, true, false);
                _oInterface.displayMsg(TEXT_DISPLAY_MSG_USER_TURN_NO_RAISE);

            } else {
                _oInterface.enable(false, true, true, false);
                _oInterface.displayMsg(TEXT_DISPLAY_MSG_USER_TURN);
            }


            s_oGame.changeState(STATE_GAME_PLAYER_TURN);
        }
    };

    this._onThirdCardShown = function() {
        if (_oHandEvaluation.result === THREE_OF_A_KIND) {
            //MOVE PUCK
            _oPuck.move(s_oGameSettings.getPuckPos(THREE_OF_A_KIND).x);
        }

        _iState = STATE_GAME_SHOWDOWN;
        setTimeout(function() { s_oGame._showWin(); }, 1500);
    };


    this._onEndHand = function() {
        var pRemoveOffset = new CVector2(_oRemoveCardsOffset.getX(), _oRemoveCardsOffset.getY());
        for (var i = 0; i < _aCardsDealing.length; i++) {
            _aCardsDealing[i].initRemoving(pRemoveOffset);
            _aCardsDealing[i].hideCard();
        }


        _iTimeElaps = 0;
        s_oGame.changeState(STATE_GAME_SHOW_WINNER);

        _oPuck.resetPosition();

        _iAdsCounter++;
        if (_iAdsCounter === AD_SHOW_COUNTER) {
            _iAdsCounter = 0;
            $(s_oMain).trigger("show_interlevel_ad");
        }

        $(s_oMain).trigger("save_score", [_oSeat.getCredit()]);
    };

    
    this.setBet = function(iTypeBet, iFicheIndex) {
        //CHECK IF THERE IS A PREVIOUS HAND TO RESET
        if (_oInterface.isResultPanelvisible()) {
            _oInterface.hideWinnnerPanel();
            _oSeat.clearBet();
            _oActionAfterHandReset = this.setBet;
            this._onEndHand();
            return;
        }

        var aFicheValues = s_oGameSettings.getFichesValues();
        var iFicheValue = aFicheValues[iFicheIndex];
        var iTotBet;
        if (iTypeBet === BET_ANTE) {
            _iTimeElaps = 0;
            _oHelpCursorAnte.hide();
            iTotBet = _oSeat.getBetAnte() + iFicheValue;
        } else {
            iTotBet = _oSeat.getBetAnte();
        }

        if (iTotBet > _iMaxBet) {
            _oMsgBox.show(TEXT_ERROR_MAX_BET);
            return;
        }

        if (_oSeat.getCredit() - iFicheValue < 0) {
            _oInterface.displayMsg(TEXT_NO_MONEY);
            return;
        }

        if (iTypeBet === BET_ANTE) {
            _oSeat.decreaseCredit(iFicheValue);
            _iGameCash += iFicheValue;
            _oSeat.betAnte(iFicheValue);
            _oInterface.enable(true, false, false);
        } else {
            _oSeat.decreaseCredit(iTotBet);
            _iGameCash += iTotBet;
            _oSeat.betRaise();
        }

        _oInterface.refreshCredit(_oSeat.getCredit(), '2');
    };

    this.toggleProgressive = function() {
        if (_iState === STATE_GAME_WAITING_FOR_BET) {
            s_bProgressiveAnte = !s_bProgressiveAnte;
            _oInterface.toggleProgressive();
        } else {
            _oMsgBox.show(TEXT_ERROR_PROGRESSIVE);
        }
    };

    this._gameOver = function() {
        _oGameOverPanel.show();
    };

    this.onRebet = function() {
        if (_oInterface.isResultPanelvisible()) {
            _oActionAfterHandReset = this.rebet;
            _oInterface.hideWinnnerPanel();
            this._onEndHand();
            return;
        }
    };

    this.onDeal = function() {
        if (_bProgressiveActive) {
            if (_iLastWin > PROGRESSIVE_LIMIT) {
                _oMsgBox.show(TEXT_ERROR_PROG_LIMIT);
                _oInterface.enable(false, false, false, true);
                return;
            }
            _oActionAfterHandReset = this.onDeal;
            //INCREASE ANTE BET
            _oSeat.clearBet();
            _oSeat.betAnte(_iLastWin);
            _oInterface.hideWinnnerPanel();
            this._onEndHand();
            return;
        }

        _oHelpCursorDeal.hide();
        _iCurMinWin = _oSeat.getBetAnte() * PAYOUT_MULT[GAP_11];

        if (_oSeat.getBetAnte() < MIN_BET) {
            _oMsgBox.show(TEXT_ERROR_MIN_BET);
            _oInterface.enableBetFiches(false);
            _oInterface.enable(false, false, false);

            return;
        }

        _oCardContainer.removeAllChildren();

        var iRandWin;

        if (_iGameCash < _iCurMinWin) {
            iRandWin = WIN_OCCURRENCE + 1;
        } else {
            iRandWin = Math.floor(Math.random() * 101);
        }

        if (iRandWin > WIN_OCCURRENCE) {
            //LOSE

            do {
                _aPlayerCardsInfo = this._generateRandPlayerCards();

                var oRet = _oHandEvaluator.evaluate(_aPlayerCardsInfo);
            } while (oRet.win);
            _bWinCurHand = false;
        } else {
            //WIN
            do {
                _aPlayerCardsInfo = this._generateRandPlayerCards();

                var oRet = _oHandEvaluator.evaluate(_aPlayerCardsInfo);
            } while (!oRet.win);

            _bWinCurHand = true;

        }
        _oSeat.setPrevBet();
        _oHandEvaluation = oRet;

        this.changeState(STATE_GAME_DEALING);
    };

    this.onCall = function() {
        _aCardsDealing[2].showCard();
    };

    this.onRaise = function() {
        if (_iState === STATE_GAME_DISTRIBUTE_FICHES) {
            return;
        }

        this.setBet(BET_RAISE, _oInterface.getFicheSelected());
        _aCardsDealing[2].showCard();
    };

    this.onCollect = function() {
        _oSeat.increaseCredit(_iLastWin,'3');
        _iGameCash -= _iLastWin;
        this.distributeFiche();
    };

    this._generateRandPlayerCards = function() {
        var aPlayerCards = new Array();
        for (var i = 0; i < 3; i++) {

            aPlayerCards.push({ fotogram: _aCardDeck[_iCurIndexDeck].fotogram, rank: _aCardDeck[_iCurIndexDeck].rank, suit: _aCardDeck[_iCurIndexDeck].suit });

            _iCurIndexDeck++;
            this._checkDeckLength();
        }

        return aPlayerCards;
    };


    this._checkDeckLength = function() {
        if (_iCurIndexDeck >= _aCardDeck.length) {
            _aCardDeck = s_oGameSettings.getShuffledCardDeck();
            _iCurIndexDeck = 0;
        }
    };

    this.clearBets = function() {
        if (_iState !== STATE_GAME_WAITING_FOR_BET) {
            return;
        }

        _iTimeElaps = 0;
        _oInterface.enable(false, false, false);

        var iCurBet = _oSeat.getStartingBet();

        if (iCurBet > 0) {
            _oSeat.clearBet();
            _oSeat.increaseCredit(iCurBet,'4');
            _iGameCash -= iCurBet;
            _oInterface.refreshCredit(_oSeat.getCredit(), '3');
            var bRebet = _oSeat.checkIfRebetIsPossible();
            _oInterface.enableBetFiches(bRebet);
        }
    };

    this.rebet = function() {
        this.clearBets();
        var iCurBet = _oSeat.rebet();
        _iGameCash -= iCurBet;

        _oInterface.enable(true, false, false);
        _oInterface.refreshCredit(_oSeat.getCredit(), '4');
    };

    this.onExit = function() {
        this.unload();

        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", _oSeat.getCredit());
        s_oMain.gotoMenu();

    };

    this.getState = function() {
        return _iState;
    };

    this._updateDealing = function() {
        for (var i = 0; i < _aCardsDealing.length; i++) {
            _aCardsDealing[i].update();
        }
    };

    this._updateFiches = function() {
        _oSeat.updateFichesController();
    };

    this._updateShowWinner = function() {
        for (var k = 0; k < _aCardsDealing.length; k++) {
            _aCardsDealing[k].update();
        }

        _iTimeElaps += s_iTimeElaps;

        if (_iTimeElaps > TIME_END_HAND) {
            _iTimeElaps = 0;
            var bRebet = _oSeat.checkIfRebetIsPossible();

            this.reset(bRebet);
            _oInterface.reset();

            if (_oSeat.getCredit() < s_oGameSettings.getFichesValueAt(0)) {
                this._gameOver();
                this.changeState(-1);
            } else {
                if (_oSeat.getCredit() < s_oGameSettings.getFichesValueAt(0)) {
                    this._gameOver();
                    this.changeState(-1);
                } else {
                    //EXECUTE USER ACTION BEFORE END HAND
                    this.changeState(STATE_GAME_WAITING_FOR_BET);
                    _oActionAfterHandReset.call(this, 0, _oInterface.getFicheSelected());
                }

            }
        }

    };

    this.update = function() {
        if (_bUpdate === false) {
            return;
        }

        switch (_iState) {
            case STATE_GAME_WAITING_FOR_BET:
                {
                    _iTimeElaps += s_iTimeElaps;
                    if (_iTimeElaps > 6000) {
                        _iTimeElaps = 0;
                        if (_oSeat.getBetAnte() > 0 && !_oHelpCursorDeal.isVisible()) {
                            //IF ALMOST 1 CHIP HAS BEEN PLACED, SHOW CURSOR NEAR DEAL BUTTON
                            _oHelpCursorDeal.show(-1);
                        } else if (!_oHelpCursorAnte.isVisible() && _oSeat.getBetAnte() === 0) {
                            //SHOW IT NEAR ANTE BET
                            _oHelpCursorAnte.show(1);
                        }

                    }
                    break;
                }
            case STATE_GAME_DEALING:
                {
                    this._updateDealing();
                    break;
                }
            case STATE_GAME_DISTRIBUTE_FICHES:
                {
                    this._updateFiches();
                    break;
                }
            case STATE_GAME_SHOW_WINNER:
                {
                    this._updateShowWinner();
                    break;
                }
        }


    };

    s_oGame = this;

    TOTAL_MONEY = oData.money;
    MIN_BET = oData.min_bet;
    MAX_BET = oData.max_bet;
    WIN_OCCURRENCE = oData.win_occurrence;
    BET_OCCURRENCE = oData.bet_occurrence;
    _iGameCash = oData.game_cash;
    s_bProgressiveAnte = oData.progressive_bet;
    PROGRESSIVE_LIMIT = oData.progressive_limit;
    TIME_END_HAND = oData.time_show_hand;
    ENABLE_FULLSCREEN = oData.fullscreen;
    AD_SHOW_COUNTER = oData.ad_show_counter;

    this._init();
}

var s_bProgressiveAnte;
var s_oGame;
var s_oTweenController;