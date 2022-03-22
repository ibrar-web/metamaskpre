function CSeat() {
    var _iBetAnte;
    var _iBetRaise;
    var _iPrevAnte;
    var _iCardDealedToPlayer;
    var _iCredit;
    var _aFichesOnTable;
    var _aPosCard;
    var _vAttachPos;
    var userbet = 0;
    var _oGroup;
    var _oCardOffset;

    var _aFichesController;
    var _aCbCompleted;
    var _aCbOwner;

    this._init = function () {
        _oGroup = new createjs.Container();
        _oGroup.x = CANVAS_WIDTH / 2 - 80;
        _oGroup.y = 223;

        s_oStage.addChild(_oGroup);

        _aFichesController = new Array();
        for (var k = 0; k < 2; k++) {
            _aFichesController[k] = new CFichesController();
        }

        _iCredit = 0;
        _iBetAnte = 0;
        _iBetRaise = 0;

        _aPosCard = new Array();
        _aPosCard[0] = { x: _oGroup.x, y: _oGroup.y };
        _aPosCard[1] = { x: _oGroup.x + CARD_WIDTH * 2 + 28, y: _oGroup.y };
        _aPosCard[2] = { x: _oGroup.x + CARD_WIDTH + 14, y: _oGroup.y };
        this.reset();

        _oCardOffset = new CVector2();
        _oCardOffset.set(0, 0);
        _vAttachPos = new CVector2(_oCardOffset.getX(), _oCardOffset.getY());

        _aCbCompleted = new Array();
        _aCbOwner = new Array();
    };

    this.unload = function () {
        s_oStage.removeChild(_oGroup);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.reset = function (bProgressiveActive) {
        _iCardDealedToPlayer = 0;
        if (bProgressiveActive === false) {
            for (var i = 0; i < _aFichesController.length; i++) {
                _aFichesController[i].reset();
            }

            _aFichesOnTable = new Array();

            for (var k = 0; k < 2; k++) {
                _aFichesOnTable[k] = new Array();
            }
        }
    };


    this.clearBet = function () {
        _iBetAnte = 0;
        _iBetRaise = 0;
        _aFichesOnTable = new Array();
        for (var k = 0; k < _aFichesController.length; k++) {
            _aFichesController[k].reset();
            _aFichesOnTable[k] = new Array();
        }
    };

    this.resetBet = function () {
        _iBetAnte = 0;
        _iBetRaise = 0;
        for (var i = 0; i < _aFichesController.length; i++) {
            _aFichesController[i].reset();
        }

        _aFichesOnTable = new Array();

        for (var k = 0; k < 2; k++) {
            _aFichesOnTable[k] = new Array();
        }
    };

    this.setCredit = function (iNewCredit) {
        _iCredit = iNewCredit;
    };

    this.increaseCredit = function (iCreditToAdd, val) {
        console.log('_iBetAnte', _iBetAnte);
        if (val == '1' && iCreditToAdd > 0) {
            $.post("update37", { _token: $('meta[name=csrf-token]').attr('content'), amount: _iCredit + iCreditToAdd, type: val, bet: iCreditToAdd / 2 }, function (t) {

            });
            _iCredit += iCreditToAdd / 2;
            _iCredit = parseFloat(_iCredit.toFixed(2));
            return;
        }
        _iCredit += iCreditToAdd;
        _iCredit = parseFloat(_iCredit.toFixed(2));
    };

    this.betAnte = function (iFicheValue) {
        _iBetAnte += iFicheValue;
        _aFichesController[0].createFichesPile(_iBetAnte, POS_BET[0].x, POS_BET[0].y);
    };

    this.betRaise = function () {
        _iBetRaise = _iBetAnte;

        _aFichesController[1].createFichesPile(_iBetRaise, POS_BET[1].x, POS_BET[1].y);
    };

    this.setPrevBet = function () {
        _iPrevAnte = _iBetAnte;
    };

    this.decreaseCredit = function (iCreditToSubtract) {
        _iCredit -= iCreditToSubtract;
        _iCredit = parseFloat(_iCredit.toFixed(2));
    };

    this.refreshFiches = function (iFicheValue, iFicheIndex, iXPos, iYPos, iTypeBet) {
        _aFichesOnTable[iTypeBet].push({ value: iFicheValue, index: iFicheIndex });
        _aFichesController[iTypeBet].refreshFiches(_aFichesOnTable[iTypeBet], iXPos, iYPos);
    };

    this.initMovement = function (iEndX, iEndY) {
        for (var i = 0; i < _aFichesController.length; i++) {
            _aFichesController[i].initMovement(iEndX, iEndY);
        }

    };

    this.newCardDealed = function () {
        _iCardDealedToPlayer++;
    };

    this.rebet = function () {
        _iBetRaise = 0;
        _iBetAnte = _iPrevAnte;
        this.decreaseCredit(_iPrevAnte);
        _aFichesController[BET_ANTE].createFichesPile(_iPrevAnte, POS_BET[BET_ANTE].x, POS_BET[BET_ANTE].y);

        return _iPrevAnte;
    };

    this.checkIfRebetIsPossible = function () {
        var iTotBet = 0;
        for (var i = 0; i < _aFichesController.length; i++) {
            var iValue = parseFloat(_aFichesController[i].getPrevBet().toFixed(2));
            iTotBet += iValue;
        }

        if (iTotBet > _iCredit) {
            return false;
        } else {
            return true;
        }
    };

    this.updateFichesController = function () {
        for (var i = 0; i < _aFichesController.length; i++) {
            _aFichesController[i].update();
        }
    };

    this.getAttachCardOffset = function () {
        _vAttachPos.set(_aPosCard[_iCardDealedToPlayer].x, _aPosCard[_iCardDealedToPlayer].y);

        return _vAttachPos;
    };

    this.getBetAnte = function () {
        return _iBetAnte;
    };

    this.getBetRaise = function () {
        return _iBetRaise;
    };

    this.getCredit = function () {
        return _iCredit;
    };

    this.getCardOffset = function () {
        return _oCardOffset;
    };

    this.getStartingBet = function () {
        var iValue = 0;
        for (var i = 0; i < _aFichesController.length; i++) {
            iValue += _aFichesController[i].getValue();
        }

        return iValue;
    };

    this._init();
}