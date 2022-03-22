function CPaytable(oParentContainer){
    var _oListener;
    var _pStartPosExitPortrait;
    var _pStartPosExitLandscape;
        
    var _oButExit;
    var _oFade;
    var _oContainerPanel;
    var _oContainerPortrait;
    var _oContainerLandscape;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    var _oThis = this;
    
    this._init = function(){
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.7;
        _oListener = _oFade.on("click", function () {});
        _oContainer.addChild(_oFade);
        
        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH/2;
        _oContainerPanel.y = CANVAS_HEIGHT/2;
        _oContainer.addChild(_oContainerPanel);
        
        this._createPortraitPanel();
        this._createLandscapePanel();
        
        _pStartPosExitPortrait = {x:380,y:-390};
        _pStartPosExitLandscape = {x:690,y:-230};
        _oButExit = new CGfxButton(0,0,s_oSpriteLibrary.getSprite("but_exit"),_oContainerPanel);
        _oButExit.addEventListener(ON_MOUSE_UP,this._onExit,this);
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oFade.off("click",_oListener);
    };
    
    this._createPortraitPanel = function(){
        _oContainerPortrait = new createjs.Container();
        _oContainerPanel.addChild(_oContainerPortrait);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("paytable_portrait");
        var oBg = createBitmap(oSpriteBg);
        _oContainerPortrait.addChild(oBg);
        
        _oContainerPortrait.regX = oSpriteBg.width/2;
        _oContainerPortrait.regY = oSpriteBg.height/2;
        
        //PLACE SYMBOLS
        var iXPos = 180;
        var iYPos = 140;
        var iScale = 0.3;
        for(var k=0;k<NUM_SYMBOLS;k++){
            var iFrame = 0;
            if(k=== 6){
                iFrame = 24;
            }
            var oSymbol = createBitmap(s_oSpriteLibrary.getSprite("symbol_"+k+"_"+iFrame));
            oSymbol.x = iXPos;
            oSymbol.y = iYPos;
            oSymbol.scale = iScale;
            _oContainerPortrait.addChild(oSymbol);
            
            var oSpriteFrame = s_oSpriteLibrary.getSprite("win_frame_anim_7");
            var oWinFrame = createBitmap(oSpriteFrame);
            oWinFrame.x = iXPos;
            oWinFrame.y = iYPos;
            oWinFrame.scale = iScale;
            _oContainerPortrait.addChild(oWinFrame);
            
            var oText = new CTLText(_oContainerPortrait, 
                    iXPos, iYPos + (LOGIC_CELL_HEIGHT*iScale) + 10, LOGIC_CELL_WIDTH*iScale, 40, 
                    40, "center", FONT_COLOR, FONT2, 1,
                    0, 0,
                    formatValue(PAYTABLE[k]),
                    true, true, false,
                    false );
            
            if( (k+1) %3 === 0){
                iXPos = 180 ;
                iYPos += LOGIC_CELL_HEIGHT*iScale + 100;
            }else{
                iXPos += LOGIC_CELL_WIDTH*iScale +100;
            }
        }
    };
    
    this._createLandscapePanel = function(){
        _oContainerLandscape = new createjs.Container();
        _oContainerPanel.addChild(_oContainerLandscape);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("paytable_landscape");
        var oBg = createBitmap(oSpriteBg);
        _oContainerLandscape.addChild(oBg);
        
        _oContainerLandscape.regX = oSpriteBg.width/2;
        _oContainerLandscape.regY = oSpriteBg.height/2;
        
        //PLACE SYMBOLS
        var iXPos = 230;
        var iYPos = 100;
        var iScale = 0.3;
        for(var k=0;k<NUM_SYMBOLS;k++){
            var iFrame = 0;
            if(k=== 6){
                iFrame = 24;
            }
            var oSymbol = createBitmap(s_oSpriteLibrary.getSprite("symbol_"+k+"_"+iFrame));
            oSymbol.x = iXPos;
            oSymbol.y = iYPos;
            oSymbol.scale = iScale;
            _oContainerLandscape.addChild(oSymbol);
            
            var oSpriteFrame = s_oSpriteLibrary.getSprite("win_frame_anim_7");
            var oWinFrame = createBitmap(oSpriteFrame);
            oWinFrame.x = iXPos;
            oWinFrame.y = iYPos;
            oWinFrame.scale = iScale;
            _oContainerLandscape.addChild(oWinFrame);
            
            var oText = new CTLText(_oContainerLandscape, 
                    iXPos, iYPos + (LOGIC_CELL_HEIGHT*iScale) + 10, LOGIC_CELL_WIDTH*iScale, 40, 
                    40, "center", FONT_COLOR, FONT2, 1,
                    0, 0,
                    formatValue(PAYTABLE[k]),
                    true, true, false,
                    false );
            
            if( (k+1) %5 === 0){
                iXPos = 300 ;
                iYPos += LOGIC_CELL_HEIGHT*iScale + 100;
            }else{
                iXPos += LOGIC_CELL_WIDTH*iScale +100;
            }
        }
    };
    
    this.show = function(){
        _oContainer.visible = true;
        _oFade.alpha = 0;
        _oContainerPanel.scale = 0;
        createjs.Tween.get(_oFade).to({alpha:0.7}, 600);  
        createjs.Tween.get(_oContainerPanel).to({scale:1}, 1000,createjs.Ease.elasticOut);  
    };
    
    this.hide = function(){
        createjs.Tween.get(_oFade).to({alpha:0}, 400);  
        createjs.Tween.get(_oContainerPanel).to({scale:0}, 600,createjs.Ease.backIn).call(function(){_oContainer.visible = false;});  
    };
    
    this.refresh = function(){
        if(s_bLandscape){
            _oContainerLandscape.visible = true;
            _oContainerPortrait.visible = false;
            _oButExit.setPosition(_pStartPosExitLandscape.x,_pStartPosExitLandscape.y);
        }else{
            _oContainerLandscape.visible = false;
            _oContainerPortrait.visible = true;
            _oButExit.setPosition(_pStartPosExitPortrait.x,_pStartPosExitPortrait.y);
        }
    };
    
    this._onExit = function(){
        _oThis.hide();
    };
    
    this._init();
}