function CFiche(iX,iY,iIndex,szValue,iScale,bClickable,oParentContainer){
    var _bDisable;
    var _iWidth;
    var _iHeight;
    var _iCurScale = iScale;
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;
    
    var _oFicheHighlight;
    var _oSprite;
    var _oTextValue;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iX,iY,iIndex,szValue,bClickable){
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oContainer.scaleX = _oContainer.scaleY = _iCurScale;
        _oParentContainer.addChild(_oContainer);
        
        var oSpriteHighlight = s_oSpriteLibrary.getSprite('fiche_highlight');
        _oFicheHighlight = createBitmap(oSpriteHighlight);
        _oFicheHighlight.x = -9;
        _oFicheHighlight.y = -9;
        _oFicheHighlight.visible = false;
        _oContainer.addChild(_oFicheHighlight);
        
        var oSpriteFiche = s_oSpriteLibrary.getSprite('fiche_'+iIndex);
        _oSprite = createBitmap(oSpriteFiche);
        _oContainer.addChild(_oSprite);
        
        
        _oTextValue = new CTLText(_oContainer, 
                    8, 8, oSpriteFiche.width-21, 20, 
                    20, "center",  COLOR_FICHE_PER_VALUE[iIndex], FONT_GAME_1, 1,
                    0, 0,
                    szValue,
                    true, true, false,
                    false );
                    
       
        
        if(bClickable){
            _bDisable = false;
            _iWidth = oSpriteFiche.width;
            _iHeight = oSpriteFiche.height;
        
            _aCbCompleted=new Array();
            _aCbOwner =new Array();
            
            _oContainer.on("mousedown", this.buttonDown);
            _oContainer.on("pressup" , this.buttonRelease);      
        }
        
        _oContainer.regX = oSpriteFiche.width/2;
        _oContainer.regY = oSpriteFiche.height/2;
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
    
    this.select = function(bSelect){
        _oFicheHighlight.visible = bSelect;
    };
    
    this.enable = function(){
        _bDisable = false;

    };
    
    this.disable = function(){
        _bDisable = true;

    };

    
    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }

        
        
        _oContainer.scaleX = _iCurScale;
        _oContainer.scaleY = _iCurScale;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_aParams);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        _oContainer.scaleX = 0.9*_iCurScale;
        _oContainer.scaleY = 0.9*_iCurScale;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN],_aParams);
       }
    };
    
    this.getX = function(){
        return _oContainer.x;
    };
    
    this.getY = function(){
        return _oContainer.x;
    };
    
    this._init(iX,iY,iIndex,szValue,bClickable);
}