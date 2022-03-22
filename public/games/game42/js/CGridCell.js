function CGridCell(iX,iY,iRow,iCol,iType,oParentContainer){
    var _bDisable;
    var _iRow = iRow;
    var _iCol = iCol;
    var _iType = iType;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;
    
    var _oWinFrame;
    var _oSilver;
    var _oSymbolSprite;
    var _oTextWin;
    var _oContainerWin;
    var _oContainer;
    var _oParentContainer = oParentContainer;
     
    this._init = function(iX,iY,iType){
        _bDisable = false;
        
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        _oListener = _oContainer.on("click",this.onSelectCell,this);
        
        //SYMBOL ANIM
        var iWidthSprite;
        var iHeightSprite;
        var aSpritesSymbols = new Array();
        for(var k=0;k<25;k++){
            var oSpriteBg = s_oSpriteLibrary.getSprite("symbol_"+iType+"_"+k);
            iWidthSprite = oSpriteBg.width;
            iHeightSprite = oSpriteBg.height;
            aSpritesSymbols.push(oSpriteBg);
        }
        
        var oData = {   
                        images: aSpritesSymbols, 
                        framerate:15,
                        // width, height & registration point of each sprite
                        frames: {width: iWidthSprite, height: iHeightSprite}, 
                        animations: {start:START_FRAME_SYMBOL[iType],anim:[0,aSpritesSymbols.length-1,"stop_anim"],stop_anim:aSpritesSymbols.length-1,anim_loop:[0,aSpritesSymbols.length-1]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSymbolSprite = createSprite(oSpriteSheet,"start",0,0,iWidthSprite,iHeightSprite);
        _oContainer.addChild(_oSymbolSprite);
        
        
        //WIN FRAME
        var aSpritesFrame = new Array();
        for(var k=0;k<25;k++){
            aSpritesFrame.push(s_oSpriteLibrary.getSprite("win_frame_anim_"+k));
        }

        var oData = {   
                    images: aSpritesFrame, 
                    framerate:15,
                    // width, height & registration point of each sprite
                    frames: {width: aSpritesFrame[0].width, height: aSpritesFrame[0].height,regX:aSpritesFrame[0].width/2,regY:aSpritesFrame[0].height/2}, 
                    animations: {start:0,anim:[0,aSpritesFrame.length-1,"stop_anim"],stop_anim:aSpritesFrame.length-1,anim_loop:[0,aSpritesFrame.length-1]}
               };

        var oSpriteSheet = new createjs.SpriteSheet(oData);


        _oWinFrame = createSprite(oSpriteSheet,"start",aSpritesFrame[0].width/2,aSpritesFrame[0].height/2,aSpritesFrame[0].width,aSpritesFrame[0].height);
        _oWinFrame.x = aSpritesFrame[0].width/2;
        _oWinFrame.y = aSpritesFrame[0].height/2;
        _oContainer.addChild(_oWinFrame);
            
            
        //CONTAINER WIN
        _oContainerWin = new createjs.Container();
        _oContainerWin.x = iWidthSprite/2;
        _oContainerWin.y = iHeightSprite/2 + 96;
        _oContainerWin.visible = false;
        _oContainer.addChild(_oContainerWin);
        
        var oSpriteWin = s_oSpriteLibrary.getSprite("win_amount_bg");
        var oBgWin = createBitmap(oSpriteWin);
        _oContainerWin.addChild(oBgWin);
        
        _oTextWin = new CTLText(_oContainerWin, 
                    25, 10, oSpriteWin.width-50, oSpriteWin.height-20, 
                    oSpriteWin.height-40, "center", FONT_COLOR, FONT2, 1.1,
                    0, 0,
                    formatValue(PAYTABLE[iType]),
                    true, true, false,
                    false );
        
        _oContainerWin.regX = oSpriteWin.width/2;
        
        var aSprites = new Array();
        for(var k=0;k<54;k++){
            var oSprite = s_oSpriteLibrary.getSprite("silver_scratch_"+k);
            iWidthSprite = oSprite.width;
            iHeightSprite = oSprite.height;
            
            aSprites.push(oSprite);
        }
        var oData = {   
                        images: aSprites, 
                        // width, height & registration point of each sprite
                        frames: {width: iWidthSprite, height: iHeightSprite,regX:iWidthSprite/2,regY:iHeightSprite/2}, 
                        animations: {start:0,anim:[0,aSprites.length-1,"stop_anim"],stop_anim:aSprites.length-1}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        
        _oSilver = createSprite(oSpriteSheet,"start",iWidthSprite/2,iHeightSprite/2,oSprite.width,oSprite.height);
        _oSilver.x = oSpriteBg.width/2;
        _oSilver.y = oSpriteBg.height/2;
        _oSilver.on("animationend",this._onEndReveal,this);
        _oContainer.addChild(_oSilver);
        
        
        _oContainer.regX = oSpriteBg.width/2;
        _oContainer.regY = oSpriteBg.height/2;
    };
    
    this.unload = function(){
        _oContainer.off("click",_oListener);
        _oParentContainer.removeChild(_oContainer);
    };
    
    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };
    
    this.playAnim = function(bLoop){
        _oSilver.visible = false;
        _oWinFrame.visible = true;
        _oContainerWin.visible = true;
        
        if(bLoop){
            _oSymbolSprite.gotoAndPlay("anim_loop");
            _oWinFrame.gotoAndPlay("anim_loop");
        }else{
            _oSymbolSprite.gotoAndPlay("anim");
        }
        
    };
    
    this.playFrameAnim = function(){
        if(_oWinFrame.currentAnimation  !== "anim_loop"){
            _oWinFrame.visible = true;
            _oWinFrame.gotoAndPlay("anim_loop");
            playSound("particle",1,false);
        }
    };
    
    this.playWinAnim = function(){
         createjs.Tween.get(_oContainer,{loop:2}).to({rotation: 5}, 50, createjs.Ease.quadOut).
                    to({rotation: -5}, 100, createjs.Ease.quadIn).to({rotation: 0}, 50, createjs.Ease.quadIn);
    };
    
    this.stopAllAnims = function(){
        _oSymbolSprite.gotoAndPlay("start");
        _oWinFrame.gotoAndPlay("start");
    };
    
    this.stopWinFrame = function(){
        _oWinFrame.gotoAndStop("start");
    };
    
    this._onEndReveal = function(evt){
        if(evt.name === "stop_anim"){
            if (_aCbCompleted[ON_SELECT_CELL]) {
                _aCbCompleted[ON_SELECT_CELL].call(_aCbOwner[ON_SELECT_CELL],_iRow,_iCol,_iType);
            }
        }
    };
    
    this.onSelectCell = function(){
        if(_bDisable){
            return;
        }
        s_oGame.blockGrid();
        _bDisable = true;
        _oSilver.gotoAndPlay("anim");
        playSound("scratch",1,false);
    };

    this.getType = function(){
        return _iType;
    };
    
    this.isScratched = function(){
        return _bDisable;
    };
    
    this._init(iX,iY,iType);
}