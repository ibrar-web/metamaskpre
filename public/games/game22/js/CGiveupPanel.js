function CGiveupPanel(oSpriteBg, iScore){
    
    var _oBg;
    var _oGroup;
    
    var _oMsgTextBack;
    var _oMsgText;
    var _oBlockGroup;
    var _oButYes;
    var _oButNo;
    
    this._init = function(oSpriteBg, iScore){
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        s_oStage.addChild(_oGroup);
        
        
        _oBg = createBitmap(oSpriteBg);
        _oGroup.addChild(_oBg);
        
	_oMsgTextBack = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-248, (CANVAS_HEIGHT/2)-138, 500, 180, 
                    60, "center", "#000", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );


        _oMsgText = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-250, (CANVAS_HEIGHT/2)-140, 500, 180, 
                    60, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );
        
        _oBlockGroup = new createjs.Shape();
        _oBlockGroup.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oBlockGroup.on("mousedown",function(){});
        _oGroup.addChild(_oBlockGroup);
        

        var oSprite = s_oSpriteLibrary.getSprite('but_bet');
        _oButYes = new CTextButton(CANVAS_WIDTH/2 - 200,CANVAS_HEIGHT/2 +170,oSprite,TEXT_YES,PRIMARY_FONT,"#ffffff",40, false, _oGroup);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onYesRelease, this);
        _oButYes.enable();
        
        _oButNo = new CTextButton(CANVAS_WIDTH/2 + 200,CANVAS_HEIGHT/2 + 170,oSprite,TEXT_NO,PRIMARY_FONT,"#ffffff",40, false, _oGroup);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onNoRelease, this);
        _oButNo.enable();

        
        
        playSound("click",1,false);
        
        
        _oMsgTextBack.refreshText(TEXT_ENDGIVEUP +TEXT_CURRENCY+iScore +" ?");
        _oMsgText.refreshText(TEXT_ENDGIVEUP +TEXT_CURRENCY+iScore+" ?");
        
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500);
        
    };
    
    this.unload = function(){
        s_oStage.removeChild(_oGroup);
    };
    
    
    this._onYesRelease = function(){
        
        $(s_oMain).trigger("save_score",[iScore,"standard"]);
        $(s_oMain).trigger("end_level",1);
        $(s_oMain).trigger("end_session");

        
        $(s_oMain).trigger("share_event",[iScore]);
        
        s_oStage.removeChild(_oGroup);
        s_oGame.onExit();
        
    };
    
    this._onNoRelease = function(){
        this.unload();
    };
    
    this._init(oSpriteBg, iScore);
    
    return this;
}
