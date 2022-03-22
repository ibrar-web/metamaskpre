function CEndPanel(oSpriteBg){
    
    var _oBg;
    var _oGroup;
    
    var _oMsgText;
    var _oScoreText;
    var _oHeart;
    
    this._init = function(oSpriteBg){
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        s_oStage.addChild(_oGroup);
        
        _oBg = createBitmap(oSpriteBg);
        _oGroup.addChild(_oBg);
        
        var oHeartSprite = s_oSpriteLibrary.getSprite('heart_lose');
        _oHeart = createBitmap(oHeartSprite);
        _oHeart.regX = oHeartSprite.width/2;
        _oHeart.x = oSpriteBg.width/2;
        _oHeart.y = 314;
        _oGroup.addChild(_oHeart);

        _oMsgText = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-250, (CANVAS_HEIGHT/2)-190, 500, 100, 
                    50, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );
                    
        
        
        
        _oScoreText = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-250, (CANVAS_HEIGHT/2)+130, 500, 80, 
                    40, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );

        
    };
    
    this.unload = function(){
        _oGroup.off("mousedown",this._onExit);
    };
    
    this._initListener = function(iScore){
        _oGroup.on("mousedown",this._onExit);
		
		var szImage = "200x200.jpg";
        var szTitle = "Congratulations!";
        var szMsg = "You collected <strong>" + (iScore) + " points</strong>!<br><br>Share your score with your friends!";
        var szMsgShare = "My score is " + (iScore) + " points! Can you do better";
		
		$(s_oMain).trigger("share_event",[iScore, szImage, szTitle, szMsg, szMsgShare]);
    };
    
    this.show = function(iScore){
		
	playSound("game_over",1,false);


        
        _oMsgText.refreshText(TEXT_GAMEOVER);
        _oScoreText.refreshText(TEXT_SCORE +": "+iScore);
        
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).wait(2500).to({alpha:1 }, 500).call(function() {oParent._initListener(iScore);});
        
        $(s_oMain).trigger("save_score",iScore);
        $(s_oMain).trigger("end_level",1);  
    };
    
    this._onExit = function(){        
        $(s_oMain).trigger("end_session");
        
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);
        
        s_oGame.onExit();
    };
    
    this._init(oSpriteBg);
    
    return this;
}
