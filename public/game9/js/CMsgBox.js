function CMsgBox(oSpriteBg){
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oBg;
    var _oGroup;

    var _oMsgText;
    var _oButExit;
    var _oButRecharge;
    
    this._init = function(oSpriteBg){
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        _oGroup.on("click", function(){}, this);
        
        
        _oBg = createBitmap(oSpriteBg);
        _oGroup.addChild(_oBg);
        
	

        _oMsgText = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-250, (CANVAS_HEIGHT/2)-250, 500, 250, 
                    100, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );

        
        _oButExit = new CTextButton(CANVAS_WIDTH/2,CANVAS_HEIGHT/2 + 150,s_oSpriteLibrary.getSprite('but_gui'),TEXT_EXIT,PRIMARY_FONT,"#ffffff",50,0,_oGroup);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        _oButRecharge = new CTextButton(CANVAS_WIDTH/2,CANVAS_HEIGHT/2 + 100,s_oSpriteLibrary.getSprite('but_gui'),TEXT_RECHARGE,PRIMARY_FONT,"#ffffff",50,0,_oGroup);
        _oButRecharge.addEventListener(ON_MOUSE_UP, this._onRecharge, this);

        s_oStage.addChild(_oGroup);
    };

    
    this.show = function(szText, bRecharge){

	playSound("game_over",1,false);

        _oMsgText.refreshText(szText);
        
        _oGroup.visible = true;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500);      
        
        if(bRecharge){
            _oButExit.setPosition(CANVAS_WIDTH/2,CANVAS_HEIGHT/2 + 200);
            _oButRecharge.setVisible(true);
        }else{
            _oButExit.setPosition(CANVAS_WIDTH/2,CANVAS_HEIGHT/2 + 150);
            _oButRecharge.setVisible(false);
        }
        
    };
    
    this.unload = function(){
        s_oStage.removeChild(_oGroup);
        _oButExit.unload();
        _oButRecharge.unload();
        
        _oGroup.removeAllEventListeners();
    };
    
    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };
    
    this.hide = function(){
        _oGroup.visible = false;
    };
    
    this._onExit = function(){
        this.hide();
        
        if (_aCbCompleted[ON_BUT_EXIT]) {
            _aCbCompleted[ON_BUT_EXIT].call(_aCbOwner[ON_BUT_EXIT]);
        }
    };
    
    this._onRecharge = function(){
        this.hide();
        
        if (_aCbCompleted[ON_BUT_RECHARGE]) {
            _aCbCompleted[ON_BUT_RECHARGE].call(_aCbOwner[ON_BUT_RECHARGE]);
        }
    };
    
    this._init(oSpriteBg);
    
    return this;
}
