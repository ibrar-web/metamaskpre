function CFicheBut(iIndex,iXPos,iYPos,oSprite){
    var _bSelected;
    var _bDisable;
    var _iWidth;
    var _iHeight;
    var _iIndex = iIndex;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    var _oTextValue;
    var _oButton;
    var _oContainer;
    var _oSelect;
    
    this._init =function(iXPos,iYPos,oSprite){
        _bDisable = false;
        
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos; 
        _oContainer.regX = oSprite.width/2;
        _oContainer.regY = oSprite.height/2;
        s_oStage.addChild(_oContainer);
        
        _bSelected = false;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oButton = createBitmap( oSprite);                                  
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;
        _oButton.cursor = "pointer";
        _oContainer.addChild(_oButton);
        
        var szValue = s_oGameSettings.getFicheValues(_iIndex);

        _oTextValue = new CTLText(_oContainer, 
                    -8, -8, 14, 14, 
                    50, "center",COLOR_FICHES[_iIndex] , FONT1, 1,
                    0, 0,
                    szValue,
                    true, true, false,
                    false );
                   
        _iWidth = oSprite.width;
        _iHeight = oSprite.height;
        
        oSprite = s_oSpriteLibrary.getSprite('select_fiche');
        _oSelect = createBitmap(oSprite);
        _oSelect.regX = oSprite.width/2;
        _oSelect.regY = oSprite.height/2;
        _oContainer.addChild(_oSelect);
        
        _oSelect.visible = _bSelected;
        
        this._initListener();
    };
    
    this.unload = function(){
       _oContainer.off("mousedown", this.buttonDown);
       _oContainer.off("pressup" , this.buttonRelease); 
       
       s_oStage.removeChild(_oContainer);
    };
    
    this.select = function(){
        _bSelected = true;
        _oSelect.visible = _bSelected;
    };
    
    this.deselect = function(){
        _bSelected = false;
        _oSelect.visible = _bSelected;
    };
    
    this.enable = function(){
        _bDisable = false;
		
	_oButton.filters = [];

        _oButton.cache(0,0,_iWidth,_iHeight);
    };
    
    this.disable = function(){
        _bDisable = true;
		
	var matrix = new createjs.ColorMatrix().adjustSaturation(-90);
        _oButton.filters = [
                 new createjs.ColorMatrixFilter(matrix)
        ];
        _oButton.cache(0,0,_iWidth,_iHeight);
    };
    
    this.setVisible = function(bVisible){
        _oContainer.visible = bVisible;
    };
    
    this._initListener = function(){
       _oContainer.on("mousedown", this.buttonDown);
       _oContainer.on("pressup" , this.buttonRelease);      
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
        
        playSound("click",1,false);
        
        _oContainer.scaleX = 1;
        _oContainer.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_aParams);
        }
        
        _bSelected = !_bSelected;
        _oSelect.visible = _bSelected;
    };
    
    this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        
        _oContainer.scaleX = 0.9;
        _oContainer.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN],_aParams);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oContainer.x = iXPos;
         _oContainer.y = iYPos;
    };
    
    this.setX = function(iXPos){
         _oContainer.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oContainer.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };
    
    
    this.getX = function(){
        return _oContainer.x;
    };
    
    this.getY = function(){
        return _oContainer.y;
    };

    this._init(iXPos,iYPos,oSprite);
}