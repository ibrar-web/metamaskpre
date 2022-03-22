function CToggle(iXPos, iYPos, oSprite, bActive, oParentContainer) {
    var _bActive;
    var _bChangeState;
    var _bDisabled;
    var _bScaleOnClick;
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oListenerMouseDown;
    var _oListenerMouseUp;
    var _oButtonBG;
    var _oText;

    this._init = function (iXPos, iYPos, oSprite, bActive, oParentContainer) {
        _bDisabled = false;
        _bScaleOnClick = true;
        _bChangeState = true;
        
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        oParentContainer.addChild(_oButton);

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2},
            animations: {state_true: [0], state_false: [1]}
        };


        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _bActive = bActive;

        _oButtonBG = createSprite(oSpriteSheet, "state_" + _bActive, (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);
        _oButtonBG.stop();

        if (!s_bMobile)
            _oButton.cursor = "pointer";

        _oButton.addChild(_oButtonBG);

        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown", _oListenerMouseDown);
        _oButton.off("pressup", _oListenerMouseUp);

        oParentContainer.removeChild(_oButton);
    };

    this._initListener = function () {
        _oListenerMouseDown = _oButton.on("mousedown", this.buttonDown);
        _oListenerMouseUp = _oButton.on("pressup", this.buttonRelease);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.setCursorType = function (szValue) {
        _oButton.cursor = szValue;
    };

    this.setActive = function (bActive) {
        _bActive = bActive;
        _oButtonBG.gotoAndStop("state_" + _bActive);
    };

    this.buttonRelease = function () {
        if(_bDisabled){
            return;
        }
        
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        playSound("click", 1, false);
        
        if(_bChangeState){
            _bActive = !_bActive;
            _oButtonBG.gotoAndStop("state_" + _bActive);
        }

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _bActive);
        }
    };

    this.buttonDown = function () {
        if(_bDisabled){
            return;
        }
        
        if(_bScaleOnClick){
            _oButton.scaleX = 0.9;
            _oButton.scaleY = 0.9;
        }
        

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
        }
    };

    this.setClickable = function(bValue){
        _bDisabled = !bValue;
        if(_bDisabled){
            _oButton.cursor = "default";
        }else {
            _oButton.cursor = "pointer";
        }
    };
    
    this.setScaleOnClick = function(bValue){
        _bScaleOnClick = bValue;
    };

    this.setPosition = function (iX, iY) {
        _oButton.x = iX;
        _oButton.y = iY;
    };

    this.setVisible = function(bVal){
        _oButton.visible = bVal;
    };

    this.setToChangeStateAtClick = function(bVal){
        _bChangeState = bVal;
    };  

    this.getButtonImage = function () {
        return _oButton;
    };

    this.addText = function(szText, iFontSize, szColor, szFont){
        var iWidth = oSprite.width/2-30;
        var iHeight = oSprite.height;
        _oText = new CTLText(_oButton, 
                    -iWidth/2, -iHeight/2, iWidth, iHeight, 
                    iFontSize, "center", szColor, szFont, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );
    };

    this.setTextColor = function(szColor){
        _oText.setColor(szColor);
    };

    this._init(iXPos, iYPos, oSprite, bActive, oParentContainer);
}