function CFreekicksPanel(){
    var _bInitGame;
    var _bSpriteLoaded = false;
    var _bShowing = false;
    var _bNewFreespinWon;
    var _bReadyToKick;
    var _bWinNextKick;
    var _bLastKick;
    var _iGameState;
    var _iNumKicks;
    var _iMaskWidth;
    var _iMaskHeight;
    var _iCurResources;
    var _iTotResources;
    var _iXRelativePos;
    var _iYRelativePos;
    var _iCurWin;
    var _iTotWin;
    var _iFreeSpinWin;
    var _aNumKicks;
    var _pStartPosKicks;
    var _pStartPosMult;
    var _oListenerClick;
    
    var _oMultText;
    var _oGoalArea;
    var _oKickContainer;
    var _oMultContainer;
    var _oBall;
    var _oPlayer = null;
    var _oCameraContainer;
    var _oLoadingText;
    var _oTextInstructions;
    var _oMaskPreloader;
    var _oProgressBar;
    var _oMsgBox;
    var _oFinalPanel;
    var _oContainer;
    
    var _oThis = this;
    
    this._init = function(){
        _bSpriteLoaded = true;
        _bInitGame = false;
        _bReadyToKick = false;
        _iGameState = -1;
        
        _oContainer.removeAllChildren();
        
        _oCameraContainer = new createjs.Container();
        _oCameraContainer.x = CANVAS_WIDTH/2;
        _oCameraContainer.y = CANVAS_HEIGHT/2;
        _oCameraContainer.scaleX = _oCameraContainer.scaleY = 0.5;
        _oContainer.addChild(_oCameraContainer);

        var oSprite = s_oSpriteLibrary.getSprite('bg_game_1');
        var oBg = createBitmap(oSprite);
        oBg.regX = oSprite.width/2;
        oBg.regY = oSprite.height/2;
        _oCameraContainer.addChild(oBg); 
        
        
        _oGoalArea = new CGoalArea(0, _oCameraContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('ball_holder');
        var _oBallHolder = createBitmap(oSprite);
        _oBallHolder.regX = oSprite.width/2;
        _oBallHolder.regY = oSprite.height/2;
        _oBallHolder.x = 78;
        _oBallHolder.y = 764;
        _oCameraContainer.addChild(_oBallHolder);

        _oBall = new CBallFreekicks(0, 600, _oCameraContainer,this);
        
        _oPlayer = new CPlayerFreeckicks(_oContainer);
        _oPlayer.addEventListener(ON_FREEKICK_PLAY,this.kickBall,this);
        
        
        _pStartPosKicks = {x: CANVAS_WIDTH - 30, y: 30};
        _oKickContainer = new createjs.Container();
        _oKickContainer.x = _pStartPosKicks.x;
        _oKickContainer.y = _pStartPosKicks.y;
        _oContainer.addChild(_oKickContainer);

        
        var oSpriteMultBg = s_oSpriteLibrary.getSprite("amount_bonus_win");
        _pStartPosMult = {x:30,y:CANVAS_HEIGHT - oSpriteMultBg.height/2 - 10};
        _oMultContainer = new createjs.Container();
        _oMultContainer.x = _pStartPosMult.x;
        _oMultContainer.y = _pStartPosMult.y;
        _oContainer.addChild(_oMultContainer);
        
        
        var oBg = createBitmap(oSpriteMultBg);
        oBg.regY = oSpriteMultBg.height/2;
        _oMultContainer.addChild(oBg);
        
        _oMultText = new createjs.Text("0.00","40px "+FONT_GAME_1, "#fff");
        _oMultText.x = oSpriteMultBg.width/2;
        _oMultText.y = 12;
        _oMultText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oMultText.textBaseline = "alphabetic";
        _oMultText.textAlign = "center";
        _oMultContainer.addChild(_oMultText);
        
        _oTextInstructions = new createjs.Text(TEXT_FREEKICKS_HELP,"50px "+FONT_GAME_1, "#fff");
        _oTextInstructions.x = CANVAS_WIDTH/2;
        _oTextInstructions.y = 200;
        _oTextInstructions.textAlign = "center";
        _oTextInstructions.textBaseline = "alphabetic";
        _oTextInstructions.shadow = new createjs.Shadow("#000", 1, 1, 1);
        _oTextInstructions.alpha = 0;
        _oContainer.addChild(_oTextInstructions);
        
        _oMsgBox = new CFreekicksMsgBox(_oContainer);
        _oMsgBox.addEventListener(ON_EXIT_FREEKICKS_MSGBOX,this._closeMsgBox,this);
        
        _oFinalPanel = new CFreekicksFinalPanel(_oContainer);
        _oFinalPanel.addEventListener(ON_EXIT_FREEKICKS,this.exitFromFinalPanel,this);
        
        this._startFreekicks();
    };
    
    this.refreshButtonPos = function(){
        if(_bInitGame){
            _oKickContainer.x = _pStartPosKicks.x - s_iOffsetX;
            _oKickContainer.y = _pStartPosKicks.y + s_iOffsetY;
            
            _oMultContainer.x = _pStartPosMult.x + s_iOffsetX;
            _oMultContainer.y = _pStartPosMult.y - s_iOffsetY;
        }
    };
    
    this.show = function(iNumKicks){
        
        _iTotWin = 0;
        _iNumKicks = iNumKicks;
        _bReadyToKick = false;
        
        if(_bSpriteLoaded){
            this._startFreekicks();
        }else{
            this._loadAllResources();
        }
    };
    
    this._loadAllResources = function(){
        _oContainer = new createjs.Container();
       
        s_oAttachSection.addChild(_oContainer);

        var oSprite = s_oSpriteLibrary.getSprite('bg_loading_freekicks');
        var oBgLoading = createBitmap(oSprite);
        _oContainer.addChild(oBgLoading);
        
        var oSprite = s_oSpriteLibrary.getSprite('progress_bar');
       _oProgressBar  = createBitmap(oSprite);
       _oProgressBar.x = CANVAS_WIDTH/2 - (oSprite.width/2);
       _oProgressBar.y = CANVAS_HEIGHT - 270;
       _oContainer.addChild(_oProgressBar);
       
       _iMaskWidth = oSprite.width;
       _iMaskHeight = oSprite.height;
       _oMaskPreloader = new createjs.Shape();
       _oMaskPreloader.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, 1,_iMaskHeight);
       _oContainer.addChild(_oMaskPreloader);
       
       _oProgressBar.mask = _oMaskPreloader;
       
        _oLoadingText = new createjs.Text("","30px "+FONT_GAME_1, "#fff");
        _oLoadingText.x = CANVAS_WIDTH/2;
        _oLoadingText.y = CANVAS_HEIGHT - 225;
        _oLoadingText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oLoadingText.textBaseline = "alphabetic";
        _oLoadingText.textAlign = "center";
        _oContainer.addChild(_oLoadingText);

        s_oSpriteLibrary.init( this._onResourceFreekicksLoaded,this._onAllImagesLoaded, this );
        
        //LOAD BONUS SPRITES
        s_oSpriteLibrary.addSprite("ball_freekicks","./games/game43/sprites/freekicks/ball_freekicks.png");
        s_oSpriteLibrary.addSprite("ball_holder","./games/game43/sprites/freekicks/ball_holder.png");
        s_oSpriteLibrary.addSprite("bg_game_1","./games/game43/sprites/freekicks/bg_game_1.jpg");
        s_oSpriteLibrary.addSprite("post_1","./games/game43/sprites/freekicks/post_1.png");

        for(var k = 0; k < 53; k++){
            s_oSpriteLibrary.addSprite("player_"+k,"./games/game43/sprites/freekicks/player/player_"+k+".png");
        }

        
        _iCurResources = 0;
       
        _iTotResources = s_oSpriteLibrary.getNumSprites() ;
        s_oSpriteLibrary.loadSprites();
    };
    
    // CALLBACK FOR LOADED RESOURCES
    this._onResourceFreekicksLoaded = function(){
        _iCurResources++;
        var iPerc = Math.floor(_iCurResources/_iTotResources *100);
        _oLoadingText.text = iPerc+"%";
        _oMaskPreloader.graphics.clear();
        var iNewMaskWidth = Math.floor((iPerc*_iMaskWidth)/100);
        _oMaskPreloader.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, iNewMaskWidth,_iMaskHeight);
        
        if(_iCurResources === _iTotResources){
           this._init();
        }
    };
    
    this._onAllImagesLoaded = function(){
    };
    
    this._startFreekicks = function(){
        _oListenerClick = _oContainer.on("click",function(){_oThis.clickHitArea();});
        _oContainer.visible = true;
        _bInitGame = true;
        _iGameState = STATE_BONUS_IDLE;
        _bShowing = true;
        _oMultText.text = "0.00";
        
        _oMsgBox.show(_iNumKicks);
        this.refreshNumKick(_iNumKicks);
    };
    
    this.hide = function(){
        _bInitGame = false;
        _oContainer.off("click",_oListenerClick);
        _oContainer.visible = false;
        
        _bShowing = false;
        _iGameState = -1;
    };
    
    this.clickHitArea = function(){
        if(_bReadyToKick){
            _bReadyToKick = false;
            s_oGame.onSpin();
            
            createjs.Tween.get(_oTextInstructions).to({alpha:0}, 500);
        }
    };
    
    this._closeMsgBox = function(){
        if(_bNewFreespinWon){
            if(!_bLastKick){
                _bReadyToKick = true;
                _oTextInstructions.alpha = 0;
                createjs.Tween.get(_oTextInstructions).to({alpha:1}, 500);
            }
        }else{
            _oTextInstructions.alpha = 0;
            createjs.Tween.get(_oTextInstructions).to({alpha:1}, 500);
            _bReadyToKick = true;
        }
    };
    
    this.playerShot = function(fWinAmount,iFreeSpinWin){
        _iCurWin = fWinAmount;
        _iTotWin += fWinAmount;
        _iFreeSpinWin = iFreeSpinWin;
        
        if(fWinAmount > 0){
            _bWinNextKick = true;
            _iXRelativePos = (Math.random() * 0.3).toFixed(3);
            _iYRelativePos = (Math.random() * 0.3).toFixed(3);
        }else{
            _bWinNextKick = false;
            _iXRelativePos = (Math.random() * (1 - 0.5) + 0.5).toFixed(3);
            _iYRelativePos = (Math.random() * (1 - 0.5) + 0.5).toFixed(3);
        }
        
        var iSign = Math.random()>0.5?1:-1;
        _iXRelativePos *= iSign;
        var iSign = Math.random()>0.5?1:-1;
        _iYRelativePos *= iSign;
        
        _bNewFreespinWon = false;
        if(iFreeSpinWin >0){
            _bNewFreespinWon = true;
        }
        
        
        this.startKick(); 
    };
    
    this.startKick = function(){
        console.log("startKick")
        _oPlayer.startPlay();
        _iGameState = STATE_FREEKICKS_KICK;
    };
    
    
    this._resetShot = function(){
        _oBall.reset();
        new createjs.Tween.get(_oCameraContainer).to({scaleX:0.5, scaleY:0.5, regX: 0, regY:0}, 1000, createjs.Ease.cubicOut).call(function(){
                _oThis._levelSet();
        });
    };
    
    this._levelSet = function(){
        _oCameraContainer.scaleX = _oCameraContainer.scaleY = 0.5;
        _oCameraContainer.regX = _oCameraContainer.regY = 0;
        
        if(_bNewFreespinWon){
            _oMsgBox.show(_iFreeSpinWin);
            _iNumKicks += _iFreeSpinWin;
            this.refreshNumKick(_iNumKicks);
            return;
        }
        
        if(!_bLastKick){
            _bReadyToKick = true;
            _oTextInstructions.alpha = 0;
            createjs.Tween.get(_oTextInstructions).to({alpha:1}, 500);
        }
    };
    
    this.kickBall = function(){ 
        _iNumKicks--;
        
        _aNumKicks[_iNumKicks].visible = false;
        
        var oResult = _oGoalArea.getAreaHit(_iXRelativePos, _iYRelativePos,_bWinNextKick?GREEN_TARGET:NULL_TARGET);

        this._shiftCamera(oResult.x);

        _oBall.launch(oResult.x, oResult.y, oResult.areahit, _iXRelativePos, oResult.stakehit);
    };
    
    this.refreshNumKick = function(iAmount){
        _oKickContainer.removeAllChildren();
        
        var oSprite = s_oSpriteLibrary.getSprite('ball_freekicks');
        var iFrameWidth = oSprite.width/2;
        var iFrameHeight = oSprite.height/6;
        var oData = {   
                        images: [oSprite],
                        // width, height & registration point of each sprite
                        frames: {width: iFrameWidth, height: iFrameHeight, regX: iFrameWidth/2, regY: iFrameHeight/2}, 
                        animations: {static:0}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _aNumKicks = new Array();
        for(var i=0; i<iAmount; i++){
            _aNumKicks[i] = createSprite(oSpriteSheet, "static",0,0,0,0);
            _aNumKicks[i].gotoAndStop("static");
            _aNumKicks[i].scaleX = _aNumKicks[i].scaleY = 0.15;
            _aNumKicks[i].rotation = 30;
            _aNumKicks[i].x = -i*26;
            _oKickContainer.addChild(_aNumKicks[i]);
        }

        this.refreshButtonPos();
    };
    
    this._shiftCamera = function(iX){
        var iLimitX = 320;
        if(Math.abs(iX) > iLimitX){
            if(iX>0){
                iX = iLimitX;
            } else {
                iX = -iLimitX;
            }
        }
        new createjs.Tween.get(_oCameraContainer).wait(500).to({scaleX:1, scaleY:1, regX: iX}, 2000, createjs.Ease.cubicOut);
        
        new createjs.Tween.get(_oCameraContainer).wait(500).to({regY: -200}, 1300, createjs.Ease.cubicOut).to({regY: -150}, 1600, createjs.Ease.cubicIn);
    };
    
    this.ballTouchTheTarget = function(iX, iY, iAreaHit){
        switch(iAreaHit){
            case NULL_TARGET_POLE:{
                    playSound("miss_goal",1,false);
                    new CScoreTextFreekicks(TEXT_CENTER_NULL, iX, iY, _oCameraContainer, "#ff0000");
                    break;
            }
            case NULL_TARGET:{
                    playSound("miss_goal",1,false);
                    new CScoreTextFreekicks(TEXT_MISS, iX, iY, _oCameraContainer, "#ff0000");
                    break;
            }
            default:{
                    playSound("goal",1,false);
                    new CScoreTextFreekicks(formatEntries(_iCurWin), iX, iY, _oCameraContainer, "#fff");
            }
        }

        if(iAreaHit !== NULL_TARGET_POLE){
            _oCameraContainer.swapChildren(_oBall.getContainer(), _oGoalArea.getContainer());
        }
    };
    
    this.ballArrived = function(bStakeHit){
        _oMultText.text = formatEntries(_iTotWin);
        _bLastKick = false;
        if(_iNumKicks === 0 && _bNewFreespinWon === false){
            _bLastKick = true;
            if(_iTotWin === 0){
                _oFinalPanel.show(TEXT_NO_WIN_FREEKICKS,"");
            }else{
                _oFinalPanel.show(TEXT_GREAT,TEXT_YOU_WIN + " " + _oMultText.text + "!");
            }

        }
        
        this._resetShot();
        
        if(!bStakeHit){
            _oCameraContainer.swapChildren( _oGoalArea.getContainer(), _oBall.getContainer());
        }
        
    };
    
    this.exitFromFinalPanel = function(){
        _oThis.hide();
        s_oGame.exitFromFreekicks(_iTotWin);
    };
    
    this.isVisible = function(){
        return _bShowing;
    };
    
    this.update = function(){
        if(_bInitGame){
            _oPlayer.update();
        }
        
    };
}