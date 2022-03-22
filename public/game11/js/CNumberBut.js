function CNumberBut(iXPos,iYPos,oSprite, iIndex, oParentContainer){
    var _bActive;
    var _bDisabled;
    
    var _iScaleFactor;
    var _iIndex;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    
    var _oButton;
    var _oFgContainer;

    var _oNumber = null;
    var _oBg;
    var _oTween;
    var _oParent;
    var _oListenerMouseDown;
    var _oListenerMouseMove;
    var _oListenerMouseUp;
    
    this._init =function(iXPos,iYPos, oSprite, iIndex, oParentContainer){
        _bDisabled = false;
        _bActive = false;
        
        _iScaleFactor = 1;
        _iIndex = iIndex;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos; 
        _oButton.scaleX = _oButton.scaleY = _iScaleFactor;
        oParentContainer.addChild(_oButton);       
        
        _oFgContainer = new createjs.Container();
        _oFgContainer.x = iXPos;
        _oFgContainer.y = iYPos; 
        _oFgContainer.scaleX = _oButton.scaleY = _iScaleFactor;
        oParentContainer.addChild(_oFgContainer);     

        var iWidth = oSprite.width/2;
        var iHeight = oSprite.height;
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth, height: iHeight, regX: iWidth/2, regY: iHeight/2}, 
                        animations: {off:[0], on:[1]}
                   };
                   
         var oSpriteSheet = new createjs.SpriteSheet(oData);
	_oBg = createSprite(oSpriteSheet, "on",iWidth/2,iHeight/2,iWidth,iHeight); 
        _oButton.addChild(_oBg);
        
        if(_bActive){
            _oBg.gotoAndStop("on");
        } else {
            _oBg.gotoAndStop("off");
        }

        var szFont = SECONDARY_FONT
        _oNumber = new createjs.Text(_iIndex+1+""," 30px "+szFont, "#ffd800");
        _oNumber.y = 2;
        _oNumber.textAlign = "center";
        _oNumber.textBaseline = "middle";
        _oNumber.lineWidth = 200;
        _oButton.addChild(_oNumber);
        
        this._initListener();
    };
    
    this.unload = function(){
        if(s_bMobile){
            _oButton.off("mousedown", _oListenerMouseDown);
            _oButton.off("pressup" , _oListenerMouseUp);
        } else {
            _oButton.off("mousedown", _oListenerMouseDown);
            _oButton.off("mouseover", _oListenerMouseMove);
            _oButton.off("pressup" , _oListenerMouseUp);
        }
        
       oParentContainer.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this.active = function(){
        _oBg.gotoAndStop("on");
        _bActive = true;
        if(_oNumber !== null){
            _oNumber.color = "#fff";
        }
    };
    
    this.deactive = function(){
        _bActive = false;
        _oBg.gotoAndStop("off");
        if(_oNumber !== null){
            _oNumber.color = "#71a8d7";
        }
    };
    
    this.setClickable = function(bVal){
        _bDisabled = !bVal;
        
        if(bVal){
            this._initListener();
        }else {
            if(s_bMobile){
                _oButton.off("mousedown", _oListenerMouseDown);
                _oButton.off("pressup" , _oListenerMouseUp);
            } else {
                _oButton.off("mousedown", _oListenerMouseDown);
                _oButton.off("mouseover", _oListenerMouseMove);
                _oButton.off("pressup" , _oListenerMouseUp);
            }
        }
    };
    
    this._initListener = function(){
        
        if(s_bMobile){
            _oListenerMouseDown = _oButton.on("mousedown", this.buttonDown);
            _oListenerMouseUp = _oButton.on("pressup" , this.buttonRelease);
        } else {
            _oListenerMouseDown = _oButton.on("mousedown", this.buttonDown);
            _oListenerMouseMove = _oButton.on("mouseover", this.buttonOver);
            _oListenerMouseUp = _oButton.on("pressup" , this.buttonRelease);
        }     
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.addEventListenerWithParams = function(iEvent,cbCompleted, cbOwner,aParams){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };
    
    this.buttonRelease = function(evt){
        if(_bDisabled){
            return;
        }
        _oButton.scaleX = _iScaleFactor;
        _oButton.scaleY = _iScaleFactor;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _aParams);
        }
    };
    
    this.buttonDown = function(evt){
        if(_bDisabled){
            return;
        }
        playSound("click",1, false);
        _oButton.scaleX = _iScaleFactor*0.9;
        _oButton.scaleY = _iScaleFactor*0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN], _aParams);
       }
    };
    
    this.buttonOver = function(evt){
        if(!s_bMobile){
            if(_bDisabled){
                return;
            }
            evt.target.cursor = "pointer";
        }  
    };
    
    this.pulseAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({scaleX: _iScaleFactor*0.9, scaleY: _iScaleFactor*0.9}, 850, createjs.Ease.quadOut).to({scaleX: _iScaleFactor, scaleY: _iScaleFactor}, 650, createjs.Ease.quadIn).call(function () {
            _oParent.pulseAnimation();
        });
    };

    this.trembleAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({rotation: 5}, 75, createjs.Ease.quadOut).to({rotation: -5}, 140, createjs.Ease.quadIn).to({rotation: 0}, 75, createjs.Ease.quadIn).wait(750).call(function () {
            _oParent.trebleAnimation();
        });
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setScale = function(iScale){
        _iScaleFactor = iScale;
        _oButton.scaleX = _oButton.scaleY = iScale;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.setTextNumber = function(szNumber){
        _oNumber.text = szNumber;
    };
    
    this.setIndex = function(iIndex){
        _iIndex = iIndex;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };

    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this.getPosition = function(){
         return {x: _oButton.x, y: _oButton.y};
    };

    this.getIndex = function(){
        return _iIndex;
    };

    this.isActive = function(){
        return _bActive;
    };

    _oParent = this;
    this._init(iXPos,iYPos,oSprite, iIndex, oParentContainer);
    
    return this;
}


