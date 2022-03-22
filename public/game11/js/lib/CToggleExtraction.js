function CToggleExtraction(iXPos, iYPos, oSprite, bActive, oParentContainer) {
    var _bActive;
    var _bDisabled;
    var _bScaleOnClick;
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oButtonBG;
    var _oListenerMouseDown;
    var _oListenerMouseUp;
    var _oText;

    this._init = function (iXPos, iYPos, oSprite, bActive, oParentContainer) {
        _bDisabled = false;
        _bScaleOnClick = true;
        
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
        _oButton.addChild(_oButtonBG);

        var iWidth = oSprite.width/2-30
        var iHeight = 70;
        var iX = 0;
        var iY = -40;
        _oText = new CTLText(_oButton, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    60, "center", "#71a8d7", SECONDARY_FONT, 1,
                    2, 2,
                    TEXT_START,
                    true, true, false,
                    false );
        
        _oText.getText().scaleY = 0.7;
                    

        if (!s_bMobile)
            _oButton.cursor = "pointer";

        

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
        
        _oText.setY(-40);
        _oText.setColor("#71a8d7");
        _oText.getText().scaleY = 0.7;
    };

    this.buttonRelease = function () {
        if(_bDisabled){
            return;
        }

        playSound("click", 1, false);

        _bActive = !_bActive;
        _oButtonBG.gotoAndStop("state_" + _bActive);

        _oText.setY(-28);
        _oText.getText().scaleY = 0.65;
        _oText.setColor("#fff");

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _bActive);
        }
    };

    this.buttonDown = function () {
        if(_bDisabled){
            return;
        }


        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
        }
    };

    this.setClickable = function(bValue){
        _bDisabled = !bValue;
    };
    
    this.setScaleOnClick = function(bValue){
        _bScaleOnClick = bValue;
    };

    this.setPosition = function (iX, iY) {
        _oButton.x = iX;
        _oButton.y = iY;
    };

    this.getPosition = function(){
        return {x: _oButton.x, y: _oButton.y};
    };

    this.getButtonImage = function () {
        return _oButtonBG;
    };

    this._init(iXPos, iYPos, oSprite, bActive, oParentContainer);
}