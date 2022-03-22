function CChooseModePanel(){
    var _oButEasy;
    var _oButHard;
    var _oContainer;
    
    var _oThis = this;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_select_mode"));
        _oContainer.addChild(oBg);
        
        var oText = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2 - 250, 50, 500, 80, 
                    80, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_CHOOSE_MODE,
                    true, true, false,
                    false );
        
        _oButEasy = new CButMode(CANVAS_WIDTH/2 - 150,CANVAS_HEIGHT - 250,s_oSpriteLibrary.getSprite("mode_easy"),TEXT_EASY,PRIMARY_FONT,"#06b4f0",30,_oContainer);
        _oButEasy.addEventListener(ON_MOUSE_UP,this._onSelectEasy,this);
        
        _oButHard = new CButMode(CANVAS_WIDTH/2 + 150,CANVAS_HEIGHT - 250,s_oSpriteLibrary.getSprite("mode_hard"),TEXT_HARD,PRIMARY_FONT,"#06b4f0",30,_oContainer);
        _oButHard.addEventListener(ON_MOUSE_UP,this._onSelectHard,this);
    };
    
    this.unload = function(){
        _oButEasy.unload();
        _oButHard.unload();
        
        s_oStage.removeAllChildren();
    }
    
    this._onSelectEasy = function(){
        s_iMode = MODE_EASY;
        _oThis.unload();
        
        s_oMain.gotoGame();
    };
    
    this._onSelectHard = function(){
        s_iMode = MODE_HARD;
        _oThis.unload();
        
        s_oMain.gotoGame();
    };
    
    this._init();
}