function CSpinButton(iXPos,iYPos,oSprite,oParentContainer){
    
    var _bDisable;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    var _oButton;
    var _oParentContainer;
    
    this._init =function(iXPos,iYPos,oSprite){
        _oParentContainer = oParentContainer;
        _bDisable = false;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        var oData = {   // image to use
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: oSprite.width/7, height: oSprite.height/3, regX: (oSprite.width/7)/2, regY: (oSprite.height/3)/2}, 
                        animations: {  idle:[0,20, "stop"], stop:[0,0]}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        
        _oButton = createSprite(oSpriteSheet, "idle",(oSprite.width/7)/2, (oSprite.height/3)/2, oSprite.width/7, oSprite.height/3);
        _oButton.gotoAndStop("idle");
        _oButton.x = iXPos;
        _oButton.y = iYPos; 
        _oButton.cursor = "pointer";
        _oParentContainer.addChild(_oButton);
        
        
        this._initListener();
    };
    
    this.unload = function(){
       _oButton.removeAllEventListeners();
       
       oParentContainer.removeChild(_oButton);
    };
    
    this.enable = function(){
        _bDisable = false;
    };
    
    this.disable = function(){
        _bDisable = true;
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this._initListener = function(){
       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
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
    
    this.buttonRelease = function(){
        
        if(_bDisable){
            return;
        }
        
        playSound("click", 1, false);
        
        _oButton.gotoAndPlay("idle");

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_aParams);
        }
    };
    
    this.buttonDown = function(){
        
        if(_bDisable){
            return;
        }
        

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN],_aParams);
       }
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

    this.setLabel = function(szText){
        var iWidth = 120;
        var iHeight = 50;
        var iX = iXPos;
        var iY = iYPos+134;
        var iSize = 24;
        var oStrokeLabel = new CTLText(_oParentContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    iSize, "center", "#fff", SECONDARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );
        oStrokeLabel.setOutline(4);
        var oStrokeLabel = new CTLText(_oParentContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    iSize, "center", "#000", SECONDARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );
        oStrokeLabel.setOutline(2);
        var oLabel = new CTLText(_oParentContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    iSize, "center", "#f52322", SECONDARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );
    };

    this._init(iXPos,iYPos,oSprite);
    
    return this;
}