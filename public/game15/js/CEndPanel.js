function CEndPanel(){
    var _iHeight;
    var _oFinalScoreText;
    var _oTitleText;
    var _oCardLeftScoreText;
    var _oCardsClearedText;
    var _oBonusTimeText;
    var _oButHome;
    var _oButRestart;
    var _oListenerDown;
    
    var _oFade;
    var _oMainContainer;
    var _oContainer;
    var _oThis = this;
    
    this._init = function(){
        _oMainContainer = new createjs.Container();    
        _oMainContainer.visible= false;
        s_oStage.addChild(_oMainContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("rgba(0,0,0)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oListenerDown = _oFade.on("click",function(){});
        _oMainContainer.addChild(_oFade);
        
        _oContainer = new createjs.Container();
        _oMainContainer.addChild(_oContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box_small');
        var oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(oBg);
        
        _oTitleText = new CTLText(_oContainer, 
                    oSpriteBg.width/2-250, 10, 500, 60, 
                    50, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );
                    
        _oCardsClearedText = new CTLText(_oContainer, 
                    oSpriteBg.width/2-250, 100, 500, 40, 
                    20, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );
        
        _oBonusTimeText = new CTLText(_oContainer, 
                    oSpriteBg.width/2-250, 130, 500, 40, 
                    20, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );
                    

        
        _oCardLeftScoreText = new CTLText(_oContainer, 
                    oSpriteBg.width/2-250, 160, 500, 40, 
                    20, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );
                    

        
        _oFinalScoreText = new CTLText(_oContainer, 
                    oSpriteBg.width/2-250, 220, 500, 45, 
                    30, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );

        
        _oButHome = new CGfxButton(oSpriteBg.width/2 + 170,370,s_oSpriteLibrary.getSprite("but_home"),_oContainer);
        _oButHome.addEventListener(ON_MOUSE_UP,this._onReleaseHome,this);
        
        _oButRestart = new CGfxButton(oSpriteBg.width/2 - 170,370,s_oSpriteLibrary.getSprite("but_restart_big"),_oContainer);
        _oButRestart.addEventListener(ON_MOUSE_UP,this._onReleaseRestart,this);
        
        _oContainer.regX = oSpriteBg.width/2;
        _oContainer.regY = oSpriteBg.height/2;
        _oContainer.x = CANVAS_WIDTH/2;
        _oContainer.y = CANVAS_HEIGHT/2;
        
        _iHeight = oSpriteBg.height;
    };

    this.unload = function(){
        _oFade.off("click",_oListenerDown);
        _oButRestart.unload();
        _oButHome.unload();
    };
    
    this.show = function(bWin,iCardClearedScore,iTimeScore,iCardLeftScore,iTotScore){
        if(bWin){
            _oTitleText.refreshText(TEXT_CONGRATS);
            playSound("win",1,false);
        }else{
            _oTitleText.refreshText(TEXT_GAMEOVER);
            playSound("game_over",1,false);
        }
        
        _oContainer.y = -_iHeight;

        _oMainContainer.visible= true;
        _oFinalScoreText.refreshText(TEXT_YOUR_SCORE + " " + iTotScore);
        _oCardLeftScoreText.refreshText(TEXT_CARDS_LEFT + " " + iCardLeftScore);
        _oBonusTimeText.refreshText(TEXT_TIME_SCORE + " "+iTimeScore);
        _oCardsClearedText.refreshText(TEXT_CARD_SCORE+ " "+iCardClearedScore);
        
        _oContainer.visible = true;
        _oFade.alpha=0.1;
        createjs.Tween.get(_oContainer).to({y: CANVAS_HEIGHT/2}, 1000,createjs.Ease.backOut).call(function(){
                                                    createjs.Tween.get(_oFade).to({alpha:0.7}, 500);
                                                });
        
        $(s_oMain).trigger("save_score",iTotScore);
        $(s_oMain).trigger("share_event",iTotScore);
    };
    
    this.hide = function(){
        _oMainContainer.visible = false;
        $(s_oMain).trigger("show_interlevel_ad");
    };

    this._onReleaseHome = function(){
        _oThis.hide();
        
        $(s_oMain).trigger("end_session");
        s_oMain.gotoMenu();
    };
    
    this._onReleaseRestart = function(){
        _oThis.hide();
        
        s_oGame.restart();
    };
    
    this._init();
}
