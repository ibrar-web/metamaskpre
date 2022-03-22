function CTextButton(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize, bStandard, oParentContainer){
    
    var _bDisable;
    var _oListenerDown;
    var _oListenerUp;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oText;
    var _oTextBack;
    var _oButtonBg;
    
    this._init =function(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize, bStandard, oParentContainer){
        _bDisable = false;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;        
        oParentContainer.addChild(_oButton);
        

        if(!bStandard){
            var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: oSprite.width/2, height: oSprite.height, regX:(oSprite.width/2)/2, regY:oSprite.height/2}, 
                        animations: {state_true:[0],state_false:[1]}
                   };
                   
            var oSpriteSheet = new createjs.SpriteSheet(oData);         
            _oButtonBg = createSprite(oSpriteSheet, "state_false",(oSprite.width/2)/2,oSprite.height/2,oSprite.width/2,oSprite.height);

            _oButton.regX = 0;
            _oButton.regY = 0;
            
        }else{
            _oButtonBg = createBitmap( oSprite);   
            
        }
        _oButton.addChild(_oButtonBg);
        
        _oTextBack = new CTLText(_oButton, 
                    -oSprite.width/4+2, -oSprite.height/2+2, oSprite.width/2-10, oSprite.height-10, 
                    iFontSize, "center", "#000", szFont, 1,
                    0, 0,
                    szText,
                    true, true, false,
                    false );


        _oText = new CTLText(_oButton, 
                    -oSprite.width/4, -oSprite.height/2, oSprite.width/2-10, oSprite.height-10, 
                    iFontSize, "center", szColor, szFont, 1,
                    0, 0,
                    szText,
                    true, true, false,
                    false );


        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown", _oListenerDown);
       _oButton.off("pressup" , _oListenerUp); 
       
       oParentContainer.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this._initListener = function(){
       _oListenerDown = _oButton.on("mousedown", this.buttonDown);
       _oListenerUp = _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.enable = function(){
        _bDisable = false;
        
        if(!bStandard){
            _oButtonBg.gotoAndStop("state_true");
        }
        

    };
    
    this.disable = function(){
        _bDisable = true;
        if(!bStandard){
            _oButtonBg.gotoAndStop("state_false");
        }

    };
    
    this.setTextPosition = function(iX, iY){
        
        var iStepShadow = Math.ceil(iFontSize/20);
        
        _oTextBack.x = iX + iStepShadow;
        _oTextBack.y = iY + iStepShadow;
        _oText.x = iX;
        _oText.y = iY;
        
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
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

    this._init(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize, bStandard, oParentContainer);
    
    return this;
    
}
