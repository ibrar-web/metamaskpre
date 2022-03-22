function CGame() {
    var _bUpdate = false;
    var _bReadyToStop = false;
    var _bAutoSpin;
    var _bActivateFreespin;
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
    var _fBonusWin;
    var _iFreeSpinWin;
    var _iTotFreeSpin;
    var _iNumAds;
    var _aBonusId;
    var _iCurCoinIndex;
    var _aMovingColumns;
    var _aStaticSymbols;
    var _aWinningLine;
    var _aReelSequence;
    var _aFinalSymbolCombo;
    var _pStartPosLogo;


    var _oBg;
    var _oLogo;
    var _oFrontSkin;
    var _oInterface;
    var _oPayTable = null;
    var _oBonusPanel;
    var _oContainerSlot;
    var _oContainerReels;
    var _oAvatar;
    var _oFreekicksPanel;

    this._init = function () {
        _iCurState = GAME_STATE_IDLE;
        _iCurReelLoops = 0;
        _iNumReelsStopped = 0;
        _iNumAds = 0;
        _iTimeElaps = 0;
        _aReelSequence = new Array(0, 1, 2, 3, 4);
        _iNextColToStop = _aReelSequence[0];
        _iLastLineActive = NUM_PAYLINES;
        _iMoney = TOTAL_MONEY;

        _iCurBet = START_BET;
        _iCurBet = parseFloat(_iCurBet.toFixed(2));

        for (var k = 0; k < COIN_BET.length; k++) {
            if (_iCurBet === COIN_BET[k]) {
                _iCurCoinIndex = k;
                break;
            }
        }
        _iTotBet = _iCurBet * _iLastLineActive;

        _bAutoSpin = false;

        _iTotFreeSpin = 0;
        _iFreeSpinWin = 0;
        _aBonusId = [];

        s_oTweenController = new CTweenController();

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oAttachSection.addChild(_oBg);

        _oContainerSlot = new createjs.Container();
        _oContainerSlot.x = REEL_OFFSET_X;
        _oContainerSlot.y = REEL_OFFSET_Y;
        _oContainerSlot.scaleX = _oContainerSlot.scaleY = REEL_SCALE;
        s_oAttachSection.addChild(_oContainerSlot);

        var oSpriteSlotFg = s_oSpriteLibrary.getSprite('mask_slot');
        WIDTH_MASK_SLOT = oSpriteSlotFg.width;

        var oBgReel = new createjs.Shape();
        oBgReel.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(22, 16, WIDTH_MASK_SLOT - 40, (SYMBOL_HEIGHT * NUM_ROWS) + (SPACE_HEIGHT_BETWEEN_SYMBOLS * (NUM_ROWS)) + 10);
        _oContainerSlot.addChild(oBgReel);

        this._initReels();


        _oFrontSkin = createBitmap(oSpriteSlotFg);
        _oContainerSlot.addChild(_oFrontSkin);


        var oData = {   // image to use
            images: [s_oSpriteLibrary.getSprite('logo')],
            // width, height & registration point of each sprite
            frames: { width: 302, height: 80, regX: 151, regY: 0 },
            animations: { normal: 0, freespin: [1, 11] }
        };

        _pStartPosLogo = { x: CANVAS_WIDTH / 2, y: 0 };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oLogo = createSprite(oSpriteSheet, "normal", 151, 0, 302, 80);
        _oLogo.x = _pStartPosLogo.x + 70;
        _oLogo.y = _pStartPosLogo.y;
        s_oAttachSection.addChild(_oLogo);

        _oInterface = new CInterface(_iCurBet, _iTotBet, _oContainerSlot);
        this._initStaticSymbols();


        _oAvatar = new CAvatar(s_oAttachSection);

        _oPayTable = new CPayTablePanel();

        _oBonusPanel = new CBonusPanel();
        _oFreekicksPanel = new CFreekicksPanel();

        //_oFreespinPanel = new CFreespinPanel(s_oStage);
        //_oFreespinResult = new CResultFreespin(s_oStage);

        this.refreshButtonPos();


        _bUpdate = true;
    };

    this.unload = function () {

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
        s_oMsgBox.unload();
        s_oAttachSection.removeAllChildren();
        s_oGame = null;
    };

    this.refreshButtonPos = function () {
        _oInterface.refreshButtonPos();
        _oPayTable.refreshButtonPos();

        _oLogo.y = _pStartPosLogo.y + s_iOffsetY;
        _oBonusPanel.refreshButtonPos();
        _oFreekicksPanel.refreshButtonPos();

        _oAvatar.refreshButtonPos();
    };

    this._initReels = function () {
        _oContainerReels = new createjs.Container();
        _oContainerSlot.addChild(_oContainerReels);

        var iXPos = START_REEL_OFFSET_X = 34;
        var iYPos = START_REEL_OFFSET_Y = 22;

        var oMaskReel = new createjs.Shape();
        oMaskReel.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(iXPos, iYPos,
            (SYMBOL_WIDTH * NUM_REELS) + (SPACE_BETWEEN_SYMBOLS * (NUM_REELS - 1)),
            (SYMBOL_HEIGHT * NUM_ROWS) + (SPACE_HEIGHT_BETWEEN_SYMBOLS * (NUM_ROWS - 1)));
        _oContainerSlot.addChild(oMaskReel);

        this._generateLosingPattern();

        var iCurDelay = 0;
        _aMovingColumns = new Array();
        for (var i = 0; i < NUM_REELS; i++) {
            _aMovingColumns[i] = new CReelColumn(i, iXPos, iYPos, iCurDelay, new Array(_aFinalSymbolCombo[0][i], _aFinalSymbolCombo[1][i], _aFinalSymbolCombo[2][i]), _oContainerReels);
            _aMovingColumns[i + NUM_REELS] = new CReelColumn(i + NUM_REELS, iXPos, iYPos + ((SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS), iCurDelay,
                new Array(_aFinalSymbolCombo[0][i], _aFinalSymbolCombo[1][i], _aFinalSymbolCombo[2][i]), _oContainerReels);
            iXPos += SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS;
            iCurDelay += REEL_DELAY;
        }

        _oContainerReels.mask = oMaskReel;

    };

    this._initStaticSymbols = function () {
        var iXPos = REEL_OFFSET_X + START_REEL_OFFSET_X;
        var iYPos = REEL_OFFSET_Y + START_REEL_OFFSET_Y;
        _aStaticSymbols = new Array();
        for (var i = 0; i < NUM_ROWS; i++) {
            _aStaticSymbols[i] = new Array();
            for (var j = 0; j < NUM_REELS; j++) {
                var oSymbol = new CStaticSymbolCell(i, j, iXPos, iYPos, _oContainerSlot);
                _aStaticSymbols[i][j] = oSymbol;

                iXPos += (SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS) * REEL_SCALE;
            }
            iXPos = REEL_OFFSET_X + START_REEL_OFFSET_X;
            iYPos += (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * REEL_SCALE;
        }
    };



    this._generateRandSymbols = function () {
        var aRandSymbols = new Array();
        for (var i = 0; i < NUM_ROWS; i++) {
            var iRandIndex = Math.floor(Math.random() * s_aRandSymbols.length);
            aRandSymbols[i] = s_aRandSymbols[iRandIndex];
        }

        return aRandSymbols;
    };

    this.reelArrived = function (iReelIndex, iCol) {
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
            if (_bReadyToStop && iReelIndex === 0) {
                _iCurReelLoops++;
            }

        }
    };

    this.stopNextReel = function () {
        _iNumReelsStopped++;

        if (_iNumReelsStopped % 2 === 0) {
            _iNextColToStop = _aReelSequence[_iNumReelsStopped / 2];
            if (_iNumReelsStopped === (NUM_REELS * 2)) {
                this._endReelAnimation();
            }
        }
    };

    this._realEndReelAnimation = function () {

        if (_aBonusId.indexOf(BONUS_GAME) !== -1 || _iTotFreeSpin > 0) {
            this.resetAutoSpin();
            _oInterface.disableGuiButtons(_bAutoSpin, _iTotFreeSpin > 0 ? true : false);
        } else {
            if (!_bAutoSpin) {
                _oInterface.enableGuiButtons();
            } else {
                _oInterface.enableSpin(true);
            }
        }
        _oInterface.setSpinState(TEXT_SPIN);


        //INCREASE MONEY IF THERE ARE COMBOS
        if (_aWinningLine.length > 0) {

            _oAvatar.show(Math.random() > 0.5 ? 1 : 2);


            //HIGHLIGHT WIN COMBOS IN PAYTABLE
            for (var i = 0; i < _aWinningLine.length; i++) {
                if (_aWinningLine[i].value < 7) {
                    _oPayTable.highlightCombo(_aWinningLine[i].value, _aWinningLine[i].num_win);
                }
                if (_aWinningLine[i].line > 0) {
                    _oInterface.showLine(_aWinningLine[i].line);
                }


                var aList = _aWinningLine[i].list;
                for (var k = 0; k < aList.length; k++) {
                    _aStaticSymbols[aList[k].row][aList[k].col].showWinFrame();
                }


            }

            if (_iTotWin > 0) {
                _oInterface.refreshWinText(_iTotWin);
            }


            TIME_SHOW_ALL_WINS = 2000;


            _iTimeElaps = 0;
            _iCurState = GAME_STATE_SHOW_ALL_WIN;

            playSound("avatar_win", 1, false);
        } else {/*
            if(_iTotFreeSpin > 0){
                _oInterface.disableSpin(_iTotFreeSpin>0?false:true);
                this.onSpin();
            }else{
                if(_oFreekicksPanel.isVisible()){
                    _oFreespinResult.show(_iFreespinWinAmount);
                    _oLogo.gotoAndStop("normal");


                     _oInterface.enableGuiButtons();
                }*/

            if (_bAutoSpin) {
                if (_iMoney < _iTotBet && _iTotFreeSpin === 0) {

                    _oInterface.enableGuiButtons();

                    this.resetAutoSpin();
                    _oInterface.enableGuiButtons();

                    _iCurState = GAME_STATE_IDLE;
                } else {
                    this.onSpin();
                }
            } else {
                _oInterface.enableGuiButtons();
                _iCurState = GAME_STATE_IDLE;
            }
            //}   
        }

        if (_iMoney < _iTotBet && _iTotFreeSpin === 0) {
            _oInterface.enableGuiButtons();
            this.resetAutoSpin();
        } else {
            if (!_bAutoSpin) {
                if (!_oFreekicksPanel.isVisible()) {
                    if (_iTotFreeSpin > 0 || _aBonusId.indexOf(BONUS_GAME) !== -1) {
                        _oInterface.enableSpin(false);
                    } else {
                        _oInterface.enableGuiButtons();
                        _oInterface.disableBetBut(false);
                    }
                } else if (_aWinningLine.length > 0) {
                    _oInterface.enableSpin(false);
                    _oInterface.disableBetBut(true);

                }
            }


        }

    };


    this._endReelAnimation = function () {
        _bReadyToStop = false;

        _iCurReelLoops = 0;
        _iNumReelsStopped = 0;
        _iCurWinShown = 0;
        _iNextColToStop = _aReelSequence[0];

        this._realEndReelAnimation();

    };

    this.hidePayTable = function () {
        _oPayTable.hide();
    };

    this.showWin = function () {
        if (_iCurState !== GAME_STATE_SHOW_WIN) {
            return;
        }

        var iLineIndex;

        if (_iCurWinShown > 0) {
            stopSound("avatar_win");
            iLineIndex = _aWinningLine[_iCurWinShown - 1].line;

            _oInterface.hideLine(iLineIndex);

            var aList = _aWinningLine[_iCurWinShown - 1].list;
            for (var k = 0; k < aList.length; k++) {
                _aMovingColumns[aList[k].col].setVisible(aList[k].row, true);
                _aMovingColumns[aList[k].col + NUM_REELS].setVisible(aList[k].row, true);
            }
        }

        if (_iCurWinShown === _aWinningLine.length) {
            _iCurWinShown = 0;

            if (_aBonusId.indexOf(BONUS_GAME) !== -1) {

                this._hideAllWins();
                $(s_oMain).trigger("bonus_call", { bet: COIN_BET[_iCurCoinIndex] });

            } else if (_bActivateFreespin) {

                _bActivateFreespin = false;
                //_oFreespinPanel.show(_iFreeSpinWin);
                _oFreekicksPanel.show(_iFreeSpinWin);

                _iCurState = GAME_STATE_FREEKICK;
            } else if (_bAutoSpin) {
                this.onSpin();
            } else {
                _oInterface.enableGuiButtons();
                _oInterface.disableBetBut(false);
                _iCurState = GAME_STATE_IDLE;
                _oInterface.enableGuiButtons();
            }

            return;
        }

        var iCol;
        var iRow;
        iLineIndex = _aWinningLine[_iCurWinShown].line;
        var aList = _aWinningLine[_iCurWinShown].list;

        if (iLineIndex === 0) {
            var iNumSymbols = aList.length;
            var iIndex = Math.floor(iNumSymbols / 2);
            iRow = aList[iIndex].row;
            iCol = aList[iIndex].col;
        } else {

            _oInterface.showLine(iLineIndex);

            //DETECT WHICH REEL WE HAVE TO SHOW THE BIG ANIMATION
            iCol = 2;
            var bSkipCheck = false;
            if (aList.length < 3) {
                if (_aWinningLine[_iCurWinShown].value === FREESPIN_SYMBOL) {
                    iCol = aList[0].col;
                    iRow = aList[0].row;
                    bSkipCheck = true;
                } else {
                    iCol = aList.length - 1;
                    iRow = aList[iCol].row;
                }
            } else {
                iRow = aList[iCol].row;
            }

            //USUALLY WINNING ANIMS IS PLAYED IN THE THIRD REEL. IF IN THAT REEL THERE IS A WILD EXPANDED,
            //CHECK PREVIOUS REEL
            while (!bSkipCheck && (_aFinalSymbolCombo[iRow][iCol] === WILD_SYMBOL)) {
                iCol--;

                if (iCol < 0) {
                    iCol = 0;
                    iRow = aList[iCol].row;
                    break;
                } else {
                    iRow = aList[iCol].row;
                }
            }
        }

        //SET THE REGISTRATION POINT AND POSITION OF THE WINNING ANIMATION TO ALLOW A CORRECT SCALING
        var oPos = { x: 0, y: 0 };
        var oRegPoint = { x: 0, y: 0 };
        if (iRow === 0) {
            if (iCol === 0) {
                oRegPoint = { x: 0, y: 0 };
            } else if (iCol === 4) {
                oRegPoint = { x: SYMBOL_ANIM_WIDTH, y: 0 };
                oPos = { x: SYMBOL_WIDTH, y: 0 };
            } else {
                oRegPoint = { x: SYMBOL_ANIM_WIDTH / 2, y: 0 };
                oPos = { x: SYMBOL_WIDTH / 2, y: 0 };
            }
        } else if (iRow === 1) {
            if (iCol === 0) {
                oRegPoint = { x: 0, y: SYMBOL_ANIM_HEIGHT / 2 };
                oPos = { x: 0, y: SYMBOL_HEIGHT / 2 };
            } else if (iCol === 4) {
                oRegPoint = { x: SYMBOL_ANIM_WIDTH, y: SYMBOL_ANIM_HEIGHT / 2 };
                oPos = { x: SYMBOL_WIDTH, y: SYMBOL_HEIGHT / 2 };
            } else {
                oRegPoint = { x: SYMBOL_ANIM_WIDTH / 2, y: SYMBOL_ANIM_HEIGHT / 2 };
                oPos = { x: SYMBOL_WIDTH / 2, y: SYMBOL_HEIGHT / 2 };
            }
        } else {
            if (iCol === 0) {
                oRegPoint = { x: 0, y: SYMBOL_ANIM_HEIGHT };
                oPos = { x: 0, y: SYMBOL_HEIGHT };
            } else if (iCol === 4) {
                oRegPoint = { x: SYMBOL_ANIM_WIDTH, y: SYMBOL_ANIM_HEIGHT };
                oPos = { x: SYMBOL_WIDTH, y: SYMBOL_HEIGHT };
            } else {
                oRegPoint = { x: SYMBOL_ANIM_WIDTH / 2, y: WIN_BIG_ANIM_HEIGHT };
                oPos = { x: SYMBOL_WIDTH / 2, y: SYMBOL_HEIGHT };
            }
        }


        _aStaticSymbols[iRow][iCol].show(_aFinalSymbolCombo[iRow][iCol] + 1, _aWinningLine[_iCurWinShown].amount * _iCurBet, oPos, oRegPoint, (_bAutoSpin || _bActivateFreespin === false && _iTotFreeSpin > 0) ? 1 : 3);

        _iCurWinShown++;
    };

    this._hideAllWins = function () {

        for (var i = 0; i < NUM_ROWS; i++) {
            for (var j = 0; j < NUM_REELS; j++) {
                _aStaticSymbols[i][j].hideWinFrame();
            }
        }

        _oInterface.hideAllLines();
    };

    this._prepareForWinsShowing = function () {
        _iTimeElaps = TIME_SHOW_WIN;
        _iCurState = GAME_STATE_SHOW_WIN;
        this.showWin();
    };

    this.activateLines = function (iLine) {
        _iLastLineActive = iLine;
        this.removeWinShowing();

        var iNewTotalBet = _iCurBet * _iLastLineActive;

        _iTotBet = iNewTotalBet;
        _oInterface.refreshTotalBet(_iTotBet);
        _oInterface.refreshNumLines(_iLastLineActive);

        if (iNewTotalBet > _iMoney) {
            _oInterface.disableSpin(_iTotFreeSpin > 0 ? false : true);
        } else {
            _oInterface.enableSpin(_iTotFreeSpin > 0 ? false : true);
        }
    };

    this.addLine = function () {
        if (_iLastLineActive === NUM_PAYLINES) {
            _iLastLineActive = 1;
        } else {
            _iLastLineActive++;
        }

        var iNewTotalBet = _iCurBet * _iLastLineActive;

        _iTotBet = iNewTotalBet;
        _oInterface.refreshTotalBet(_iTotBet);
        _oInterface.refreshNumLines(_iLastLineActive);


        _oInterface.enableSpin(_iTotFreeSpin > 0 ? false : true);
    };

    this.resetCoinBet = function () {
        _iCurCoinIndex = 0;

        var iNewBet = COIN_BET[_iCurCoinIndex];

        var iNewTotalBet = iNewBet * _iLastLineActive;

        _iCurBet = iNewBet;
        _iTotBet = iNewTotalBet;
        _oInterface.refreshBet(_iCurBet);
        _oInterface.refreshTotalBet(_iTotBet);


        _oInterface.enableSpin(_iTotFreeSpin > 0 ? false : true);
    };

    this.changeCoinBet = function () {
        _iCurCoinIndex++;
        if (_iCurCoinIndex === COIN_BET.length) {
            _iCurCoinIndex = 0;
        }
        var iNewBet = parseFloat(COIN_BET[_iCurCoinIndex]);

        var iNewTotalBet = iNewBet * _iLastLineActive;

        _iCurBet = iNewBet;
        _iCurBet = Math.floor(_iCurBet * 100) / 100;
        _iTotBet = iNewTotalBet;
        _oInterface.refreshBet(_iCurBet);
        _oInterface.refreshTotalBet(_iTotBet);


        _oInterface.enableSpin(_iTotFreeSpin > 0 ? false : true);
    };

    this.removeWinShowing = function () {
        _oPayTable.resetHighlightCombo();

        _oInterface.resetWin();

        for (var i = 0; i < NUM_ROWS; i++) {
            for (var j = 0; j < NUM_REELS; j++) {
                _aStaticSymbols[i][j].hide();
                _aMovingColumns[j].setVisible(i, true);
                _aMovingColumns[j + NUM_REELS].setVisible(i, true);
            }
        }

        for (var k = 0; k < _aMovingColumns.length; k++) {
            _aMovingColumns[k].activate();
        }


        _iCurState = GAME_STATE_IDLE;

    };

    //THIS FUNCTION IS CALLED WHEN STOP BUTTON IS CLICKED DURING A SPIN
    this.forceStopReel = function () {

        if (_iTotFreeSpin === 0) {
            this.resetAutoSpin();
        }


        _iCurState = GAME_STATE_IDLE;
        for (var i = 0; i < NUM_REELS; i++) {
            var iNewY = REEL_OFFSET_Y + ((SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS);
            _aMovingColumns[i].forceStop(new Array(_aFinalSymbolCombo[0][i], _aFinalSymbolCombo[1][i], _aFinalSymbolCombo[2][i]), START_REEL_OFFSET_Y);
            _aMovingColumns[i + NUM_REELS].forceStop(null, iNewY);

        }

        this._endReelAnimation();
    };

    this.onSpin = function () {

        if (((_iTotFreeSpin > 0 && !_oFreekicksPanel.isVisible()) || _aBonusId.indexOf(BONUS_GAME) !== -1
            || (_iTotFreeSpin === 0 && _oFreekicksPanel.isVisible()))
            && (_iCurState === GAME_STATE_SHOW_ALL_WIN || _iCurState === GAME_STATE_SHOW_WIN)) {

            this._hideAllWins();

            this.removeWinShowing();

            _iCurWinShown = _aWinningLine.length;
            _iCurState = GAME_STATE_SHOW_WIN;
            this.showWin();
            return;
        }

        stopSound("avatar_win");

        if (_iMoney < _iTotBet && _iTotFreeSpin === 0) {
            this.resetAutoSpin();
            var oRechargePanel = new CRechargePanel();
            return;
        }



        _bReadyToStop = false;
        playSound("spin_but", 1, false);

        _oInterface.disableBetBut(true);



        if (_oFreekicksPanel.isVisible()) {
            _iTotBet = 0;
            _iTotFreeSpin--;
        } else {
            this.removeWinShowing();
            _iTotBet = _iCurBet * _iLastLineActive;
            _aBonusId = [];
            this._hideAllWins();
            _oInterface.disableGuiButtons(_bAutoSpin, _iTotFreeSpin > 0 ? true : false);


            _iMoney -= _iTotBet;
            _oInterface.refreshMoney(_iMoney, '1');

            _iCurState = GAME_STATE_SPINNING;
        }


        $(s_oMain).trigger("bet_placed", { bet: COIN_BET[_iCurCoinIndex], tot_bet: _iTotBet, payline: _iLastLineActive });
    };

    this.onSpinReceived = function (oData) {
        _iNumAds++;
        if (_iNumAds === NUM_SPIN_FOR_ADS) {
            _iNumAds = 0;
            $(s_oMain).trigger("show_interlevel_ad");
        }
        //console.log(oData)
        if (oData.win) {
            $.post("update43", { _token: $('meta[name=csrf-token]').attr('content'), amount: oData.money, type: '2' }, function (t) {

            });
        }
        if (oData.res === true) {

            _aFinalSymbolCombo = oData.pattern;
            _aWinningLine = oData.win_lines;
            var fWinAmount = parseFloat(oData.tot_win);
            var bBonusWin = oData.bonus;
            if (oData.freespin) {
                _iFreeSpinWin = parseInt(oData.num_freespin);
                _iTotFreeSpin = _iFreeSpinWin;
            } else {
                _iFreeSpinWin = 0;
            }
            _iMoney = parseFloat(oData.money);

            if (_oFreekicksPanel.isVisible()) {
                _oFreekicksPanel.playerShot(fWinAmount, _iFreeSpinWin);
                return;
            }


            if (fWinAmount > 0 || bBonusWin === true || _iTotFreeSpin > 0) {
                _bActivateFreespin = false;

                if (oData.freespin) {
                    _aBonusId.push(BONUS_FREESPIN);
                    _bActivateFreespin = true;
                }

                if (bBonusWin) {
                    _aBonusId.push(BONUS_GAME);
                }
                //GET TOTAL WIN FOR THIS SPIN	
                _iTotWin = fWinAmount;

            } else {
                _aWinningLine = new Array();

            }

            _bReadyToStop = true;
            $(s_oMain).trigger("save_score", _iMoney);

            saveItem(LOCALSTORAGE_STRING + "score", _iMoney);
        } else {
            s_oGame._generateLosingPattern();
        }

    };

    this.onBonusStart = function (oData) {

        _iMoney = parseFloat(oData.money);
        _fBonusWin = parseFloat(oData.bonus_win);
        var bFinalPrize = oData.final_prize;

        _oBonusPanel.show(oData.prize_list, bFinalPrize);
        setVolume("crowd", 0);
        _iCurState = GAME_STATE_BONUS;

        saveItem(LOCALSTORAGE_STRING + "score", _iMoney);
    };

    this.refreshMoney = function (iMoney) {
        _iMoney = iMoney;
        _oInterface.refreshMoney(_iMoney, '2');

        saveItem(LOCALSTORAGE_STRING + "score", _iMoney);
    };

    //AUTOSPIN BUTTON CLICKED
    this.onAutoSpin = function (bAutoSpin) {
        _bAutoSpin = bAutoSpin;

        if (bAutoSpin && _iCurState === GAME_STATE_IDLE) {
            this.onSpin();
        }
    };

    this.onStopAutoSpin = function () {
        this.resetAutoSpin();

        if (_iCurState !== GAME_STATE_SPINNING && _iCurState !== GAME_STATE_BONUS) {
            _oInterface.enableGuiButtons();
        }
    };

    this.resetAutoSpin = function () {
        _bAutoSpin = false;
        _oInterface.setAutoSpinState(TEXT_AUTO_SPIN);
    };

    this._generateLosingPattern = function () {
        var aFirstCol = new Array();
        for (var i = 0; i < NUM_ROWS; i++) {
            var iRandIndex = Math.floor(Math.random() * (s_aRandSymbols.length - 2));
            var iRandSymbol = s_aRandSymbols[iRandIndex];
            aFirstCol[i] = iRandSymbol;
        }

        _aFinalSymbolCombo = new Array();
        for (var i = 0; i < NUM_ROWS; i++) {
            _aFinalSymbolCombo[i] = new Array();
            for (var j = 0; j < NUM_REELS; j++) {

                if (j === 0) {
                    _aFinalSymbolCombo[i][j] = aFirstCol[i];
                } else {
                    do {
                        var iRandIndex = Math.floor(Math.random() * (s_aRandSymbols.length - 2));
                        var iRandSymbol = s_aRandSymbols[iRandIndex];
                    } while (aFirstCol[0] === iRandSymbol || aFirstCol[1] === iRandSymbol || aFirstCol[2] === iRandSymbol);
                    _aFinalSymbolCombo[i][j] = iRandSymbol;
                }
            }
        }

        _aWinningLine = new Array();
        _bReadyToStop = true;

    };

    this.onInfoClicked = function () {
        if (_iCurState === GAME_STATE_SPINNING) {
            return;
        }

        if (_oPayTable.isVisible()) {
            _oPayTable.hide();
        } else {
            _oPayTable.show();
        }
    };

    this.exitFromFreekicks = function (iFreekickWin) {
        _oInterface.refreshWinText(_iTotWin + iFreekickWin);
        _oInterface.refreshMoney(_iMoney, '3');

        _oInterface.enableGuiButtons();

        _iCurState = GAME_STATE_IDLE;

    };


    this.exitFromBonus = function () {
        _oInterface.refreshMoney(_iMoney, '4');
        _oInterface.refreshWinText(_iTotWin + _fBonusWin);

        if (_bActivateFreespin) {
            _bActivateFreespin = false;
            //_oFreespinPanel.show(_iFreeSpinWin);
            _oFreekicksPanel.show(_iFreeSpinWin);

            _iCurState = GAME_STATE_FREEKICK;
        } else if (_bAutoSpin) {
            this.onSpin();
        } else {
            _oInterface.enableGuiButtons();
            _oInterface.disableBetBut(false);
            _oInterface.enableSpin(_iTotFreeSpin > 0 ? false : true);

            _oInterface.enableGuiButtons();
        }
        setVolume("crowd", 1);

        _iCurState = GAME_STATE_IDLE;
    };

    this.onExit = function () {
        $(s_oMain).trigger("start_session");

        this.unload();
        s_oMain.gotoMenu();
    };

    this.getState = function () {
        return _iCurState;
    };

    this.update = function () {
        if (_bUpdate === false) {
            return;
        }


        switch (_iCurState) {
            case GAME_STATE_SPINNING: {
                for (var i = 0; i < _aMovingColumns.length; i++) {
                    _aMovingColumns[i].update();
                }
                break;
            }
            case GAME_STATE_SHOW_ALL_WIN: {

                _iTimeElaps += s_iTimeElaps;
                if (_iTimeElaps > TIME_SHOW_ALL_WINS) {
                    _iTimeElaps = 0;
                    this._hideAllWins();

                    if (_bAutoSpin) {
                        _iCurWinShown = _aWinningLine.length;
                    } else {
                        _iCurWinShown = 0;
                    }
                    this._prepareForWinsShowing();
                }
                break;
            }
            case GAME_STATE_SHOW_WIN: {

                break;
            }
            case GAME_STATE_BONUS: {
                _oBonusPanel.update();
                break;
            }
            case GAME_STATE_FREEKICK: {
                _oFreekicksPanel.update();
                break;
            }
        }

    };

    s_oGame = this;

    this._init();
}

var s_oGame = null;
var s_oTweenController;