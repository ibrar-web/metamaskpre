function CGfxButton(iXPos, iYPos, oSprite, oParentContainer) {
    var _iScale;

    var _bScalable;
    var _bDisabled;

    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oParent;
    var _oTween;
    var _oListenerMouseDown;
    var _oListenerMouseUp;

    this._init = function (iXPos, iYPos, oSprite, oParentContainer) {
        _iScale = 1;
        
        _bDisabled = false;
        _bScalable = true;

        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oButton = createBitmap(oSprite);
        _oButton.x = iXPos;
        _oButton.y = iYPos;

        _oButton.regX = oSprite.width / 2;
        _oButton.regY = oSprite.height / 2;

        if (!s_bMobile)
            _oButton.cursor = "pointer";

        oParentContainer.addChild(_oButton);


        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown", _oListenerMouseDown);
        _oButton.off("pressup", _oListenerMouseUp);

        oParentContainer.removeChild(_oButton);
    };

    this.setVisible = function (bVisible) {
        _oButton.visible = bVisible;
    };

    this.setCursorType = function (szValue) {
        _oButton.cursor = szValue;
    };

    this._initListener = function () {
        _oListenerMouseDown = _oButton.on("mousedown", this.buttonDown);
        _oListenerMouseUp = _oButton.on("pressup", this.buttonRelease);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.buttonRelease = function () {
        if(_bDisabled){
            return;
        }
        
        if(_bScalable){
            _oButton.scaleX = _iScale;
            _oButton.scaleY = _iScale;
        } else {
            new createjs.Tween.get(_oButton).to({y : _oButton.y -50}, 100);
        }
        

        playSound("click", 1, false);

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };

    this.buttonDown = function () {
        if(_bDisabled){
            return;
        }

        if(_bScalable){
            _oButton.scaleX = 0.9*_iScale;
            _oButton.scaleY = 0.9*_iScale;
        } else {
            new createjs.Tween.get(_oButton).to({y : _oButton.y +50}, 100);
        }

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
        }
    };

    this.pulseAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({scaleX: 0.9*_iScale, scaleY: 0.9*_iScale}, 850, createjs.Ease.quadOut)
                .to({scaleX: _iScale, scaleY: _iScale}, 650, createjs.Ease.quadIn).call(function () {
                    _oParent.pulseAnimation();
        });
    };

    this.trembleAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({rotation: 2}, 75, createjs.Ease.quadOut).to({rotation: -2}, 140, createjs.Ease.quadIn).to({rotation: 0}, 75, createjs.Ease.quadIn).wait(750).call(function () {
            _oParent.trembleAnimation();
        });
    };

    this.setPosition = function (iXPos, iYPos) {
        _oButton.x = iXPos;
        _oButton.y = iYPos;
    };

    this.setX = function (iXPos) {
        _oButton.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oButton.y = iYPos;
    };

    this.setScalable = function(bVal){
        _bScalable = bVal;
    };

    this.setScale = function(iVal){
        _iScale = iVal;
        _oButton.scaleX = _oButton.scaleY = _iScale;
    };

    this.getButtonImage = function () {
        return _oButton;
    };

    this.getX = function () {
        return _oButton.x;
    };

    this.getY = function () {
        return _oButton.y;
    };

    this.setClickable = function(bVal){
        _bDisabled = !bVal;
    };

    this._init(iXPos, iYPos, oSprite, oParentContainer);

    _oParent = this;
    return this;
}