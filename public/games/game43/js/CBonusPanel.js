function CBonusPanel(){
    var _bUpdate;
    var _bSpriteLoaded = false;
    var _bEndBonus;
    var _bFinalPrize;

    var _iGameState;
    var _iMaskWidth;
    var _iMaskHeight;
    var _iCurMult;
    var _iTotWin;
    var _iCurResources;
    var _iTotResources;
    var _iScaleOffsetForStands;
    var _iCurXPlayerPos;
    var _iCurOpponentHide;
    var _iCurTrembleIndex;
    var _iIdInterval;
    var _aBonusSeq;
    var _aPlayerPos;
    var _aOpponentPos;
    var _aOpponentFinalPos;
    var _aOpponents;
    var _aTrembleSequence;
    var _oMaskPreloader;
    var _pStartPosBut;
    var _oListenerBlock;
    var _oListenerClick;
    var _pStartPosScore;

    var _oFieldBonus;
    var _oFieldEndZone;
    var _oBg;
    var _oPost;
    var _oButLeft;
    var _oButCenter;
    var _oButRight;
    var _oPlayer;
    var _oBgLoading;
    var _oLoadingText;
    var _oProgressBar;
    var _oResultPanel;
    var _oScoreText = null;
    var _oBlock;
    var _oContainerBut;
    var _oMultAmountText;
    var _oContainerScore;
    var _oContainer;
    
    this._init = function(){
        _bUpdate = false;
        _bSpriteLoaded = true;
        _iGameState = -1;
        _iCurXPlayerPos = 1;
        _aPlayerPos = [176,476,776];
        _aOpponentPos = [{x:640,y:526},{x:776,y:526},{x:896,y:526}];
        _aOpponentFinalPos = [{x:500,y:1070},{x:776,y:1070},{x:1036,y:1070}];
        _aTrembleSequence = new Array({x:10,y:0},{x:-20,y:0},{x:10,y:-10},{x:0,y:20},{x:10,y:-10},{x:-10,y:0},{x:10,y:0},{x:-20,y:0},{x:10,y:-10},{x:0,y:20},{x:10,y:-10},{x:-10,y:0});
        
        _oContainer.removeAllChildren();
        _oContainer.visible = false;
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('bg_bonus');
        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width/2;
        _oBg.regY = oSpriteBg.height;
        _oBg.scaleX = _oBg.scaleY = STARTING_STANDS_SCALE_BONUS;
        _oBg.x = CANVAS_WIDTH/2;
        _oBg.y = 521;
        _oContainer.addChild(_oBg);
        
        
        
        _oFieldBonus = new CFieldBonus(0,516,_oContainer);
        
        
        _oFieldEndZone = new CFieldEndZoneBonus(0,516,_oContainer);
        
        var oSpritePost = s_oSpriteLibrary.getSprite("post");
        _oPost = createBitmap(oSpritePost);
        _oPost.regX = oSpritePost.width/2;
        _oPost.regY = oSpritePost.height;
        _oPost.x = CANVAS_WIDTH - 450;
        _oPost.y = 518;
        _oPost.scaleX = _oPost.scaleY = 0.2;
        _oContainer.addChild(_oPost);
        
        _aOpponents = new Array();
        for(var i=0;i<3;i++){
            var oOpponent = new CBonusOpponent(i,_aOpponentPos[i],_aOpponentFinalPos[i],_oContainer);
            oOpponent.addEventListener(ON_OPPONENT_HIDE,this._onOpponentHide,this);
            oOpponent.addEventListener(ON_OPPONENT_TACKLE,this._onOpponentTackle,this);
            
            _aOpponents.push(oOpponent);
        }
        
        
        _oPlayer = new CBonusPlayer(_aPlayerPos[1],370,_oContainer);
        _oPlayer.addEventListener(ON_END_PLAYER_MOVE,this._onEndPlayerMove,this);
        _oPlayer.addEventListener(ON_BONUS_END,this._onBonusEnd,this);
        
        
        
        _pStartPosBut = {x:0,y:CANVAS_HEIGHT - 100};
        _oContainerBut = new createjs.Container();
        _oContainerBut.x = _pStartPosBut.x;
        _oContainerBut.y = _pStartPosBut.y;
        _oContainer.addChild(_oContainerBut);
        
        _oButLeft = new CGfxButton(CANVAS_WIDTH/2 - 350,50,s_oSpriteLibrary.getSprite("but_left"),_oContainerBut);
        _oButLeft.addEventListener(ON_MOUSE_UP,this._onLeft,this);
        
        _oButCenter = new CGfxButton(CANVAS_WIDTH/2,50 ,s_oSpriteLibrary.getSprite("but_center"),_oContainerBut);
        _oButCenter.addEventListener(ON_MOUSE_UP,this._onCenter,this);
        
        _oButRight = new CGfxButton(CANVAS_WIDTH/2 + 350,50,s_oSpriteLibrary.getSprite("but_right"),_oContainerBut);
        _oButRight.addEventListener(ON_MOUSE_UP,this._onRight,this);
        
        
        var oSpriteScoreBg = s_oSpriteLibrary.getSprite("amount_bonus_win");
        _pStartPosScore = {x:10,y:3};
        _oContainerScore = new createjs.Container();
        _oContainerScore.x = _pStartPosScore.x;
        _oContainerScore.y = _pStartPosScore.y;
        _oContainer.addChild(_oContainerScore);
        
        
        var oBgScore = createBitmap(oSpriteScoreBg);
        _oContainerScore.addChild(oBgScore);
        
        _oMultAmountText = new createjs.Text(formatEntries(0),"40px "+FONT_GAME_1, "#fff");
        _oMultAmountText.textBaseline = "alphabetic";
        _oMultAmountText.textAlign="center";
        _oMultAmountText.x = oSpriteScoreBg.width/2;
        _oMultAmountText.y = 54;
        _oMultAmountText.shadow = new createjs.Shadow("#000", 1, 1, 1);
        _oContainerScore.addChild(_oMultAmountText);
        
        _oBlock = new createjs.Shape();
        _oBlock.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oListenerBlock = _oBlock.on("click",function(){});
        _oContainer.addChild(_oBlock);
        
        this._startBonus();
        
        
    };
    
    this._loadAllResources = function(){
        _oContainer = new createjs.Container();
        s_oAttachSection.addChild(_oContainer);

        var oSprite = s_oSpriteLibrary.getSprite('bg_loading_bonus');
        _oBgLoading = createBitmap(oSprite);
        _oContainer.addChild(_oBgLoading);
        
        var oSprite = s_oSpriteLibrary.getSprite('progress_bar');
       _oProgressBar  = createBitmap(oSprite);
       _oProgressBar.x = CANVAS_WIDTH/2 - (oSprite.width/2);
       _oProgressBar.y = CANVAS_HEIGHT - 91;
       _oContainer.addChild(_oProgressBar);
       
       _iMaskWidth = oSprite.width;
       _iMaskHeight = oSprite.height;
       _oMaskPreloader = new createjs.Shape();
       _oMaskPreloader.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, 1,_iMaskHeight);
       _oContainer.addChild(_oMaskPreloader);
       
       _oProgressBar.mask = _oMaskPreloader;
       
        _oLoadingText = new createjs.Text("","15px "+FONT_GAME_1, "#fff");
        _oLoadingText.x = CANVAS_WIDTH/2;
        _oLoadingText.y = CANVAS_HEIGHT - 41;
        _oLoadingText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oLoadingText.textBaseline = "alphabetic";
        _oLoadingText.textAlign = "center";
        _oContainer.addChild(_oLoadingText);

        s_oSpriteLibrary.init( this._onResourceBonusLoaded,this._onAllImagesLoaded, this );
        
        //LOAD BONUS SPRITES
        s_oSpriteLibrary.addSprite("bg_bonus","./sprites/bonus/bg_bonus.jpg");
        s_oSpriteLibrary.addSprite("but_center","./sprites/bonus/but_center.png");
        s_oSpriteLibrary.addSprite("but_left","./sprites/bonus/but_left.png");
        s_oSpriteLibrary.addSprite("but_right","./sprites/bonus/but_right.png");
        s_oSpriteLibrary.addSprite("post","./sprites/bonus/post.png");
        
        for(var k = 0; k < 3; k++){
            s_oSpriteLibrary.addSprite("field_loop-"+k,"./sprites/bonus/field_loop-"+k+".png");
        }
        
        for(var t=0;t<4;t++){
            s_oSpriteLibrary.addSprite("end_zone-"+t,"./sprites/bonus/end_zone-"+t+".png");
        }

        s_oSpriteLibrary.addSprite("player_falling","./sprites/bonus/player/player_falling.png");
        
        for(var i=0;i<2;i++){
            s_oSpriteLibrary.addSprite("player_running-"+i,"./sprites/bonus/player/player_running-"+i+".png");
        }
        
        for(var i=0;i<2;i++){
            s_oSpriteLibrary.addSprite("player_touchdown-"+i,"./sprites/bonus/player/player_touchdown-"+i+".png");
        }
        
        for(var j=0;j<3;j++){
            s_oSpriteLibrary.addSprite("enemy_running-"+j,"./sprites/bonus/enemy/enemy_running-"+j+".png");
        }
        
        for(var j=0;j<2;j++){
            s_oSpriteLibrary.addSprite("enemy_tackle-"+j,"./sprites/bonus/enemy/enemy_tackle-"+j+".png");
        }
        
        _iCurResources = 0;
       
        _iTotResources = s_oSpriteLibrary.getNumSprites() ;
        
        if(_iTotResources === 0){
            this._startBonus();
        }else{
            s_oSpriteLibrary.loadSprites();
        }
        
    };
    
    // CALLBACK FOR LOADED RESOURCES
    this._onResourceBonusLoaded = function(){
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
    
    
    this.refreshButtonPos = function(){
        if(_oContainerBut !== undefined){
            _oContainerBut.y = _pStartPosBut.y - s_iOffsetY;
        }
        

        if(_oContainerScore !== undefined){
            _oContainerScore.x = _pStartPosScore.x + s_iOffsetX;
            _oContainerScore.y = _pStartPosScore.y + s_iOffsetY;
        }
    };
    
    this.unload = function(){
        _oBlock.off("click",_oListenerBlock);
        _oButLeft.unload();
        _oButCenter.unload();
        _oButRight.unload();
        
    };
    
    this._onAllImagesLoaded = function(){
    };
    
    this.reset = function(){
        _oResultPanel.unload();
        _oPlayer.reset();
        _oMultAmountText.text = formatEntries(0);
        
        if(_oScoreText !== null){
            _oScoreText.unload();
            _oScoreText = null;
        }
        
        _oBg.scaleX = _oBg.scaleY = STARTING_STANDS_SCALE_BONUS;
        _oBg.x = CANVAS_WIDTH/2;
        _oBg.y = 521;
        
        _oPost.x = CANVAS_WIDTH - 450;
        _oPost.y = 518;
        _oPost.scaleX = _oPost.scaleY = 0.2;
        
        _oFieldEndZone.reset();
    };
    
    this.show = function(aBonusSeq,bFinalPrize){
        _aBonusSeq = aBonusSeq;
        _bFinalPrize = bFinalPrize;
 
        _iScaleOffsetForStands = (1-STARTING_STANDS_SCALE_BONUS)/_aBonusSeq.length;
        
        if(_bSpriteLoaded){
            this._startBonus();
        }else{
            this._loadAllResources();
        }
        
        _oListenerClick = _oContainer.on("click",function(){});
    };
    
    this.hide = function(){
        _bUpdate = false;
        
        stopSound("soundtrack_bonus");
        stopSound("crowd_idle");
        
        _oContainer.off("click",_oListenerClick);
        _oContainer.visible = false;


        this.reset();
        s_oGame.exitFromBonus();
    };
    
    this._startBonus = function(){
        playSound("soundtrack_bonus",1,true);
        playSound("crowd_idle",1,true);
        
        _iTotWin = 0;
        
        this._enableAllButtons();
        
        _oPlayer.show();
        _oFieldBonus.show();
        
        _oContainer.visible = true;
        _bUpdate = true;
        _iGameState = STATE_BONUS_IDLE;
        
        _oButCenter.pulseAnimation();
        _oButLeft.pulseAnimation();
        _oButRight.pulseAnimation();
        
        this.refreshButtonPos();
    };
    
    this._enableAllButtons = function(){
        _oBlock.visible = false;
        new createjs.Tween.get(_oContainerBut).to({alpha:1},500);
    };
    
    this._disableAllButtons = function(){
        _oBlock.visible = true;
        new createjs.Tween.get(_oContainerBut).to({alpha:0},500);
    };
    
    this.refreshScoreAmount = function(){
        _oMultAmountText.text = formatEntries(_iTotWin);
    };
    
    this._onLeft = function(){
        s_oBonusPanel._disableAllButtons();
        
        var iTime;
        if(_iCurXPlayerPos === 0){
            iTime = 0;
        }else if(_iCurXPlayerPos === 1){
            iTime = 1500;
        }else{
            iTime = 3000;
        }

        _iCurXPlayerPos = 0;
        _oPlayer.move(_aPlayerPos[_iCurXPlayerPos],iTime);
    };
    
    this._onRight = function(){
        s_oBonusPanel._disableAllButtons();
        
        var iTime;
        if(_iCurXPlayerPos === 0){
            iTime = 3000;
        }else if(_iCurXPlayerPos === 1){
            iTime = 1500;
        }else{
            iTime = 0;
        }

        _iCurXPlayerPos = 2;
        _oPlayer.move(_aPlayerPos[_iCurXPlayerPos],iTime);
    };
    
    this._onCenter = function(){
        s_oBonusPanel._disableAllButtons();
        
        var iTime;
        if(_iCurXPlayerPos === 0){
            iTime = 1500;
        }else if(_iCurXPlayerPos === 1){
            iTime = 0;
        }else{
            iTime = 1500;
        }

        _iCurXPlayerPos = 1;
        _oPlayer.move(_aPlayerPos[_iCurXPlayerPos],iTime);
    };
    
    this._onEndPlayerMove = function(){
        _iCurOpponentHide = 0;
        
        if(_aBonusSeq.length === 0){
            _bEndBonus = true;
            
            if(!_bFinalPrize){
                //SHOW OPPONENTS
                _aOpponents[_iCurXPlayerPos].show(0);
                var aRandOpponent = new Array();
                for(var i=0;i<3;i++){
                    if(i !== _iCurXPlayerPos){
                        aRandOpponent.push(i);
                    }
                }

                var iRand = Math.floor(Math.random()*aRandOpponent.length);
                _aOpponents[aRandOpponent[iRand]].show(Math.floor(Math.random()*500));
                
                this._scaleStands();
            }/*else{
                _oFieldEndZone.show();
                var iNewScale = _oBg.scaleX + _iScaleOffsetForStands;
                new createjs.Tween.get(_oBg).to({scaleX:iNewScale,scaleY:iNewScale},1200);

                var iNewScalePost = _oPost.scaleX +_iScaleOffsetForStands;
                new createjs.Tween.get(_oPost).to({scaleX:iNewScalePost,scaleY:iNewScalePost,x:_oPost.x + 500,y:_oPost.y + 60},1000);

                setTimeout(function(){_oPlayer.changeAnim(BONUS_ANIM_TOUCHDOWN); playSound("crowd_touchdown",1,false);},500);
            }*/
        }else{
            _bEndBonus = false;
            _iCurMult = _aBonusSeq.shift();
            _iTotWin += _iCurMult;
            
            if(_aBonusSeq.length === 0 && _bFinalPrize){
                _oFieldEndZone.show();
                var iNewScale = _oBg.scaleX + _iScaleOffsetForStands;
                new createjs.Tween.get(_oBg).to({scaleX:iNewScale,scaleY:iNewScale},1200);

                var iNewScalePost = _oPost.scaleX +_iScaleOffsetForStands;
                new createjs.Tween.get(_oPost).to({scaleX:iNewScalePost,scaleY:iNewScalePost,x:_oPost.x + 500,y:_oPost.y + 60},1000);
                
                //SHOW SCORE BONUS AMOUNT
                _oScoreText = new CScoreText(formatEntries(_iCurMult), CANVAS_WIDTH/2, 252,_oContainer);
                playSound("bonus_mult",1,false);
                this.refreshScoreAmount();
            
                setTimeout(function(){_oPlayer.changeAnim(BONUS_ANIM_TOUCHDOWN); playSound("crowd_touchdown",1,false);},500);
            }else{
                //SHOW OPPONENTS
                var iTime = 0;
                for(var i=0;i<3;i++){
                    if(i !== _iCurXPlayerPos){
                        _aOpponents[i].show(iTime);
                        var iRand = Math.floor(Math.random()*1000);
                        iTime += iRand;
                    }
                }

                this._scaleStands();
            }
            
        }
    };
    
    this._scaleStands = function(){
        //SCALE STANDS AND POST
        var iNewScale = _oBg.scaleX + _iScaleOffsetForStands;
        new createjs.Tween.get(_oBg).to({scaleX:iNewScale,scaleY:iNewScale},TIME_OPPONENT_RUN,createjs.Ease.cubicIn);
        
        var iNewScalePost = _oPost.scaleX +_iScaleOffsetForStands;
        new createjs.Tween.get(_oPost).to({scaleX:iNewScalePost,scaleY:iNewScalePost,x:_oPost.x + (750*_iScaleOffsetForStands)},TIME_OPPONENT_RUN,createjs.Ease.cubicIn);
    };

    this._onBonusEnd = function(){
        setTimeout(function(){ 
                        _bUpdate = false;
                        _oFieldBonus.stop();
                        _oResultPanel = new CBonusResultPanel(_iTotWin,_oContainer);
                        
                        stopSound("soundtrack_bonus");
                        stopSound("crowd_idle");
                        if(_bFinalPrize){
                            playSound("win_bonus",1,false);
                        }else{
                            playSound("game_over",1,false);
                        }
                    },1000);
    };
    
    this._onOpponentHide = function(){
        _iCurOpponentHide++;
        if(_iCurOpponentHide === 2 && _bEndBonus === false){
            _oScoreText = new CScoreText(formatEntries(_iCurMult), CANVAS_WIDTH/2, 252,_oContainer);
            
            playSound("bonus_mult",1,false);
            
            this.refreshScoreAmount();
            
            _oPlayer.tweenJump();
            this._enableAllButtons();
            
        }
    };
    
    this._onOpponentTackle = function(iOpponent){
        if(_bEndBonus){
            if(_iCurXPlayerPos === iOpponent){
                _iCurTrembleIndex = 0;
                var oParent = this;
                _iIdInterval = setInterval(function(){oParent.tremble();},20);
                _oPlayer.changeAnim(BONUS_ANIM_FALL);
                playSound("enemy_tackle",1,false);
            }
        }
    };
    
    this.tremble = function(){
        var oDir = _aTrembleSequence[_iCurTrembleIndex];
        _oContainer.x = _oContainer.x + oDir.x;
        _oContainer.y = _oContainer.y + oDir.y;

        _iCurTrembleIndex++;
        if(_iCurTrembleIndex === _aTrembleSequence.length){
            _iCurTrembleIndex = 0;
            clearInterval(_iIdInterval);
        }
    };

    
    this.update = function(){

        
    };
    
    s_oBonusPanel = this;

}

var s_oBonusPanel = null;