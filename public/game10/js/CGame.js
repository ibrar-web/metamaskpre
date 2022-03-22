function CGame(oData) {
    var _bUpdate = false;
    var _iCurState;
    var _iCurReelLoops;
    var _iNextColToStop;
    var _iNumReelsStopped;
    var _iLastLineActive;
    var _iTimeElaps;
    var _iCurWinShown;
    var _iCurBet;
    var _iTotBet;
    var _iMoney;
    var _iTotWin;
    var _iAdCounter;

    var _aMovingColumns;
    var _aStaticSymbols;
    var _aWinningLine;
    var _aReelSequence;
    var _aFinalSymbolCombo;

    var _oBg;
    var _oInterface;
    var _oPayTable = null;
    var _oReelContainer;
    var _oRechargePanel;
    var _oAreYouSurePanel;

    this._init = function() {
        _iCurState = GAME_STATE_IDLE;
        _iCurReelLoops = 0;
        _iNumReelsStopped = 0;
        _aReelSequence = new Array(0, 1, 2, 3, 4);
        _iNextColToStop = _aReelSequence[0];
        _iLastLineActive = 1;
        _iMoney = TOTAL_MONEY;
        _iCurBet = BET[0];
        _iTotBet = _iCurBet * _iLastLineActive;
        _iAdCounter = 0;

        s_oTweenController = new CTweenController();

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);

        var oMask = new createjs.Shape();
        oMask.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(440, 269, 720, 197);

        _oReelContainer = new createjs.Container();
        _oReelContainer.mask = oMask;
        s_oStage.addChild(_oReelContainer);

        this._initReels();

        _oInterface = new CInterface(_iCurBet, _iTotBet, _iMoney);
        this._initStaticSymbols();
        _oPayTable = new CPayTablePanel();
        _oPayTable.show();
        _oPayTable.highlightColBg(0);

        _oRechargePanel = new CMsgBox(s_oStage);
        _oRechargePanel.addEventListener(ON_RELEASE_YES, this.onRecharge, this);

        _oAreYouSurePanel = new CMsgBox(s_oStage);
        _oAreYouSurePanel.addEventListener(ON_RELEASE_YES, this.onExit, this);

        if (_iMoney < BET[0]) {
            // _oRechargePanel.show(TEXT_RECHARGE);
        }

        _bUpdate = true;
    };

    this.unload = function() {
        stopSound("reels");

        _oInterface.unload();
        _oPayTable.unload();

        for (var k = 0; k < _aMovingColumns.length; k++) {
            _aMovingColumns[k].unload();
        }

        for (var i = 0; i < NUM_ROWS; i++) {
            for (var j = 0; j < NUM_REELS; j++) {
                _aStaticSymbols[i][j].unload();
            }
        }

        s_oStage.removeAllChildren();
    };

    this._initReels = function() {
        var iXPos = REEL_OFFSET_X;
        var iYPos = REEL_OFFSET_Y;

        var iCurDelay = 0;
        _aMovingColumns = new Array();
        for (var i = 0; i < NUM_REELS; i++) {
            _aMovingColumns[i] = new CReelColumn(i, iXPos, iYPos, iCurDelay, _oReelContainer);
            _aMovingColumns[i + NUM_REELS] = new CReelColumn(i + NUM_REELS, iXPos, iYPos + (SYMBOL_SIZE * NUM_ROWS), iCurDelay, _oReelContainer);
            iXPos += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS;
            iCurDelay += REEL_DELAY;
        }

    };

    this._initStaticSymbols = function() {
        var iXPos = REEL_OFFSET_X;
        var iYPos = REEL_OFFSET_Y;
        _aStaticSymbols = new Array();
        for (var i = 0; i < NUM_ROWS; i++) {
            _aStaticSymbols[i] = new Array();
            for (var j = 0; j < NUM_REELS; j++) {
                var oSymbol = new CStaticSymbolCell(i, j, iXPos, iYPos, _oReelContainer);
                _aStaticSymbols[i][j] = oSymbol;

                iXPos += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS;
            }
            iXPos = REEL_OFFSET_X;
            iYPos += SYMBOL_SIZE;
        }
    };

    this.generateFinalSymbols = function() {
        _aFinalSymbolCombo = new Array();
        for (var i = 0; i < NUM_ROWS; i++) {
            _aFinalSymbolCombo[i] = new Array();
            for (var j = 0; j < NUM_REELS; j++) {
                var iRandIndex = Math.floor(Math.random() * s_aRandSymbols.length);
                var iRandSymbol = s_aRandSymbols[iRandIndex];
                _aFinalSymbolCombo[i][j] = iRandSymbol;
            }
        }

        //CHECK IF THERE IS ANY COMBO
        _aWinningLine = new Array();
        _iTotWin = 0;

        var aCombos = s_aPaylineCombo;

        var aCellList = new Array();
        var iValue = _aFinalSymbolCombo[aCombos[0].row][aCombos[0].col];
        var iNumEqualSymbol = 1;
        var iStartIndex = 1;
        aCellList.push({ row: aCombos[0].row, col: aCombos[0].col, value: _aFinalSymbolCombo[aCombos[0].row][aCombos[0].col] });


        for (var t = iStartIndex; t < aCombos.length; t++) {
            if (_aFinalSymbolCombo[aCombos[t].row][aCombos[t].col] === iValue) {
                iNumEqualSymbol++;

                aCellList.push({ row: aCombos[t].row, col: aCombos[t].col, value: _aFinalSymbolCombo[aCombos[t].row][aCombos[t].col] });
            } else {
                break;
            }
        }

        if (iNumEqualSymbol > 2) {
            _iTotWin += s_aSymbolWin[iValue - 1];
            _aWinningLine.push({
                line: 1,
                amount: s_aSymbolWin[iValue - 1],
                num_win: iNumEqualSymbol,
                value: iValue,
                list: aCellList
            });
        }

        return _aWinningLine.length > 0 ? true : false;
    };

    this._generateRandSymbols = function() {
        var aRandSymbols = new Array();
        for (var i = 0; i < NUM_ROWS; i++) {
            var iRandIndex = Math.floor(Math.random() * s_aRandSymbols.length);
            aRandSymbols[i] = s_aRandSymbols[iRandIndex];
        }

        return aRandSymbols;
    };

    this.reelArrived = function(iReelIndex, iCol) {
        if (_iCurReelLoops > MIN_REEL_LOOPS) {
            if (_iNextColToStop === iCol) {
                if (_aMovingColumns[iReelIndex].isReadyToStop() === false) {
                    var iNewReelInd = iReelIndex;
                    if (iReelIndex < NUM_REELS) {
                        iNewReelInd += NUM_REELS;

                        _aMovingColumns[iNewReelInd].setReadyToStop();

                        _aMovingColumns[iReelIndex].restart(new Array(_aFinalSymbolCombo[0][iReelIndex],
                            _aFinalSymbolCombo[1][iReelIndex],
                            _aFinalSymbolCombo[2][iReelIndex]), true);

                    } else {
                        iNewReelInd -= NUM_REELS;
                        _aMovingColumns[iNewReelInd].setReadyToStop();

                        _aMovingColumns[iReelIndex].restart(new Array(_aFinalSymbolCombo[0][iNewReelInd],
                            _aFinalSymbolCombo[1][iNewReelInd],
                            _aFinalSymbolCombo[2][iNewReelInd]), true);


                    }

                }
            } else {
                _aMovingColumns[iReelIndex].restart(this._generateRandSymbols(), false);
            }

        } else {

            _aMovingColumns[iReelIndex].restart(this._generateRandSymbols(), false);
            if (iReelIndex === 0) {
                _iCurReelLoops++;
            }

        }
    };

    this.stopNextReel = function() {
        _iNumReelsStopped++;

        if (_iNumReelsStopped % 2 === 0) {

            playSound("reel_stop", 1, false);

            _iNextColToStop = _aReelSequence[_iNumReelsStopped / 2];
            if (_iNumReelsStopped === (NUM_REELS * 2)) {
                this._endReelAnimation();
            }
        }
    };

    this.tryShowAd = function() {
        _iAdCounter++;
        if (_iAdCounter === AD_SHOW_COUNTER) {
            _iAdCounter = 0;
            $(s_oMain).trigger("show_interlevel_ad");
        }
    };

    this._endReelAnimation = function() {
        stopSound("reels");

        _iCurReelLoops = 0;
        _iNumReelsStopped = 0;
        _iNextColToStop = _aReelSequence[0];

        //INCREASE MONEY IF THERE ARE COMBOS
        if (_aWinningLine.length > 0) {
            //HIGHLIGHT WIN COMBOS IN PAYTABLE
            for (var i = 0; i < _aWinningLine.length; i++) {
                _oPayTable.highlightCombo(_aWinningLine[i].value - 1, _iLastLineActive - 1);
                var aList = _aWinningLine[i].list;
                for (var k = 0; k < aList.length; k++) {
                    _aStaticSymbols[aList[k].row][aList[k].col].show(aList[k].value);
                }
            }



            if (_iTotWin > 0) {
                _oInterface.refreshMoney(_iMoney,1);
                _oInterface.refreshWinText(_iTotWin);
            }

            _iTimeElaps = 0;
            _iCurState = GAME_STATE_SHOW_WIN;

            for (var i = 0; i < _aMovingColumns.length; i++) {
                _aMovingColumns[i].hide();
            }

            playSound("win", 0.3, false);

        } else {

            for (var i = 0; i < _aMovingColumns.length; i++) {
                _aMovingColumns[i].show();
            }

            _iCurState = GAME_STATE_IDLE;
        }

        _oInterface.enableGuiButtons();

        if (_iMoney < _iTotBet) {
            _oInterface.disableSpin();
        }
    };

    this.hidePayTable = function() {
        _oPayTable.hide();
    };

    this._showWin = function() {

        var iLineIndex;

        if (_iCurWinShown > 0) {
            iLineIndex = _aWinningLine[_iCurWinShown - 1].line;

            var aList = _aWinningLine[_iCurWinShown - 1].list;
            for (var k = 0; k < aList.length; k++) {
                _aStaticSymbols[aList[k].row][aList[k].col].stopAnim();
            }
        }

        if (_iCurWinShown === _aWinningLine.length) {
            _iCurWinShown = 0;
        }

        var aList = _aWinningLine[_iCurWinShown].list;
        for (var k = 0; k < aList.length; k++) {
            _aStaticSymbols[aList[k].row][aList[k].col].show(aList[k].value);
        }


        _iCurWinShown++;

    };

    this._hideAllWins = function() {
        for (var i = 0; i < _aWinningLine.length; i++) {
            var aList = _aWinningLine[i].list;
            for (var k = 0; k < aList.length; k++) {
                _aStaticSymbols[aList[k].row][aList[k].col].stopAnim();
            }
        }

        _oInterface.hideAllLines();

        _iTimeElaps = 0;
        _iCurWinShown = 0;
        _iTimeElaps = TIME_SHOW_WIN;
        _iCurState = GAME_STATE_SHOW_WIN;
    };

    this.activateLines = function(iLine) {
        _iLastLineActive = iLine;
        this.removeWinShowing();

        var iNewTotalBet = _iCurBet * _iLastLineActive;

        _iTotBet = iNewTotalBet;
        _oInterface.refreshTotalBet(_iTotBet);
        _oPayTable.highlightColBg(_iLastLineActive - 1);


        if (iNewTotalBet > _iMoney) {
            _oInterface.disableSpin();
        } else {
            _oInterface.enableSpin();
        }
    };

    this.addLine = function() {
        if (_iLastLineActive === NUM_PAYLINES) {
            _iLastLineActive = 1;
        } else {
            _iLastLineActive++;
        }

        var iNewTotalBet = _iCurBet * _iLastLineActive;

        _iTotBet = iNewTotalBet;
        _oInterface.refreshTotalBet(_iTotBet);
        _oPayTable.highlightColBg(_iLastLineActive - 1);


        if (iNewTotalBet > _iMoney) {
            _oInterface.disableSpin();
        } else {
            _oInterface.enableSpin();
        }
    };

    this.changeCoinBet = function(szType) {
        var iIndex;
        for (var i = 0; i < BET.length; i++) {
            if (BET[i] === _iCurBet) {
                iIndex = i;
            }
        }

        if (szType === "add") {
            if (iIndex !== BET.length - 1 && BET[iIndex + 1] <= _iMoney) {
                iIndex++;
            } else {
                iIndex = 0;
            }
        } else {
            if (iIndex !== 0) {
                iIndex--;
            } else if (BET[BET.length - 1] <= _iMoney && iIndex === 0) {
                iIndex = BET.length - 1;
            }
        }

        _iCurBet = BET[iIndex];
        _iTotBet = _iLastLineActive * _iCurBet;
        _oInterface.refreshBet(_iCurBet);
        _oInterface.refreshTotalBet(_iTotBet);

    };

    this.onMaxBet = function() {
        var iNewBet = BET[BET.length - 1];
        _iLastLineActive = NUM_PAYLINES;

        var iNewTotalBet = iNewBet * _iLastLineActive;

        _iCurBet = BET[BET.length - 1];
        _iTotBet = iNewTotalBet;
        _oInterface.refreshBet(_iCurBet);
        _oInterface.refreshTotalBet(_iTotBet);
        _oPayTable.highlightColBg(_iLastLineActive - 1);

        if (iNewTotalBet > _iMoney) {
            _oInterface.disableSpin();
        } else {
            _oInterface.enableSpin();
            this.onSpin();
        }
    };

    this.removeWinShowing = function() {
        _oPayTable.resetHighlightCombo();
        _oPayTable.highlightColBg(_iLastLineActive - 1);

        _oInterface.resetWin();

        for (var i = 0; i < NUM_ROWS; i++) {
            for (var j = 0; j < NUM_REELS; j++) {
                _aStaticSymbols[i][j].hide();
            }
        }

        for (var k = 0; k < _aMovingColumns.length; k++) {
            _aMovingColumns[k].activate();
            _aMovingColumns[k].show();
        }

        _iCurState = GAME_STATE_IDLE;
    };

    this.onSpin = function() {
        if (_iMoney < BET[0]) {
            //_oRechargePanel.show(TEXT_RECHARGE);
            return;
        }
        playSound("reels", 1, false);

        this.removeWinShowing();

        _iMoney -= _iTotBet;
        _oInterface.refreshMoney(_iMoney,2);
        SLOT_CASH += _iTotBet;

        $(s_oMain).trigger("bet_placed", { bet: _iCurBet, tot_bet: _iTotBet });

        //FIND MIN WIN
        MIN_WIN = s_aSymbolWin[0];
        for (var i = 0; i < s_aSymbolWin.length; i++) {
            if (s_aSymbolWin[i] < MIN_WIN) {
                MIN_WIN = s_aSymbolWin[i];
            }
        }

        MIN_WIN *= _iLastLineActive * _iCurBet;

        //CHECK IF THERE IS MINIMUM AMOUNT FOR AT LEAST WORST WINNING
        if (SLOT_CASH < MIN_WIN) {
            //PLAYER MUST LOSE
            do {
                var bRet = this.generateFinalSymbols();
            } while (bRet === true);
        } else {
            //RANDOM TO ASSIGN A WIN OR NOT
            var iRandSpin = Math.floor(Math.random() * 101);

            if (iRandSpin > WIN_OCCURRENCE) {
                //PLAYER LOSES
                do {
                    var bRet = this.generateFinalSymbols();
                } while (bRet === true);
            } else {
                //PLAYER WINS
                do {
                    var bRet = this.generateFinalSymbols();
                } while (bRet === false || (_iTotWin * _iLastLineActive) > SLOT_CASH);
            }
        }

        _iTotWin *= _iCurBet * _iLastLineActive;
        _iMoney += 0;

        if(_iTotWin>0){
            $.post("update10", { _token: $('meta[name=csrf-token]').attr('content'), amount: _iMoney+_iTotWin,bet:_iTotBet}, function (t) {
               
            });
            _iMoney +=_iTotBet;
        }
        SLOT_CASH -= _iTotWin;

        $(s_oMain).trigger("save_score", [_iMoney]);

        _oInterface.disableGuiButtons();


        _iCurState = GAME_STATE_SPINNING;

        this.tryShowAd();
    };

    this.onInfoClicked = function() {
        if (_iCurState === GAME_STATE_SPINNING) {
            return;
        }

        if (_oPayTable.isVisible()) {
            _oPayTable.hide();
        } else {
            _oPayTable.show();
        }
    };

    this.onExit = function() {
        this.unload();

        $(s_oMain).trigger("share_event", [_iMoney]);
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad");

        s_oMain.gotoMenu();
    };

    this.getState = function() {
        return _iCurState;
    };

    this.onShowSafePanel = function() {
        _oAreYouSurePanel.show(TEXT_ARE_YOU_SURE);
    };

    this.onRecharge = function() {
        $(s_oMain).trigger("recharge");
    };

    this.setMoney = function(iMoney) {
        _iMoney = iMoney;
        _oInterface.refreshMoney(_iMoney,3);

        _oRechargePanel.hide();
    };

    this.update = function() {
        if (_bUpdate === false) {
            return;
        }

        switch (_iCurState) {
            case GAME_STATE_SPINNING:
                {
                    for (var i = 0; i < _aMovingColumns.length; i++) {
                        _aMovingColumns[i].update();
                    }
                    break;
                }

        }


    };

    s_oGame = this;

    WIN_OCCURRENCE = oData.win_occurrence;
    MIN_REEL_LOOPS = oData.min_reel_loop;
    REEL_DELAY = oData.reel_delay;
    TIME_SHOW_ALL_WINS = oData.time_show_all_wins;
    TOTAL_MONEY = oData.money;
    SLOT_CASH = oData.slot_cash;
    BET = oData.bet;

    s_aSymbolWin = oData.prize_amount;
    SYMBOL_OCCURRENCE = oData.prize_occurrence;

    AD_SHOW_COUNTER = oData.ad_show_counter;

    this._init();
}

var s_oGame;
var s_oTweenController;
var s_aSymbolWin;