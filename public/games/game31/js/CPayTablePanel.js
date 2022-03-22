function CPayTablePanel(){
    var _iCurPage;
    var _aNumSymbolComboText;
    var _aWinComboText;
    var _aPages;
    var _pStartPosCredits;
    var _oCurPage;
    
    var _oButExit;
    var _oButArrowNext;
    var _oButArrowPrev;
    var _oContainer;
    var _oButCredits;
    
    this._init = function(){
        _iCurPage = 0;
        _aPages = new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.on("click",function(){});
        _oContainer.visible = false;
        s_oAttachSection.addChild(_oContainer);
        
        //ATTACH PAGE 1
        var oContainerPage = new createjs.Container();
        _oContainer.addChild(oContainerPage);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable1'));
        oContainerPage.addChild(oBg);
        
        //LIST OF COMBO TEXT

        this._createPayouts(oContainerPage);
        
        _aPages[0] = oContainerPage;
        
        //ATTACH PAGE 2
        oContainerPage = new createjs.Container();
        oContainerPage.visible = false;
        _oContainer.addChild(oContainerPage);
        
        oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable2'));
        oContainerPage.addChild(oBg);

        _aPages[1] = oContainerPage;
        
        _oCurPage = _aPages[_iCurPage];
        
        //ATTACH PAGE 3
        oContainerPage = new createjs.Container();
        oContainerPage.visible = false;
        _oContainer.addChild(oContainerPage);
        
        oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable3'));
        oContainerPage.addChild(oBg);
        
        var oText = new CTLText(oContainerPage, 
                    770, 248, 400, 100, 
                    28, "center", "#fff", FONT_GAME_1, 1,
                    0, 0,
                    TEXT_HELP_BONUS1,
                    true, true, true,
                    false);

        
        var oText2 = new CTLText(oContainerPage, 
                    770, 400, 400, 180, 
                    40, "center", "#fff", FONT_GAME_1, 1,
                    0, 0,
                    TEXT_HELP_BONUS2,
                    true, true, true,
                    false);

        
        _aPages[2] = oContainerPage;
        
        //ATTACH PAGE 4
        oContainerPage = new createjs.Container();
        oContainerPage.visible = false;
        _oContainer.addChild(oContainerPage);
        
        oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable4'));
        oContainerPage.addChild(oBg);
        
        var oText = new CTLText(oContainerPage, 
                    CANVAS_WIDTH/2-210, 410, 420, 170, 
                    40, "center", "#fff", FONT_GAME_1, 1,
                    0, 0,
                    TEXT_HELP_FREESPIN,
                    true, true, true,
                    false);

        
        _aPages[3] = oContainerPage;
        
        _oCurPage = _aPages[_iCurPage];

        //ATTACH ARROW
        _oButArrowNext = new CGfxButton(CANVAS_WIDTH - 290,CANVAS_HEIGHT - 160,s_oSpriteLibrary.getSprite('but_arrow_next'),_oContainer);
        _oButArrowNext.addEventListener(ON_MOUSE_UP, this._onNext, this);
        
        _oButArrowPrev = new CGfxButton(290,CANVAS_HEIGHT - 160,s_oSpriteLibrary.getSprite('but_arrow_prev'),_oContainer);
        _oButArrowPrev.addEventListener(ON_MOUSE_UP, this._onPrev, this);
        
        //ATTACH CREDITS BUTTON
        var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        _pStartPosCredits = {x:oSprite.width/2 + 2,y:oSprite.height/2 + 2};
        _oButCredits = new CGfxButton(_pStartPosCredits.x,_pStartPosCredits.y,oSprite,_oContainer);
        _oButCredits.addEventListener(ON_MOUSE_UP, this._onCredits, this);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit_info');
        _oButExit = new CGfxButton(1220, 154, oSprite, _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
    };
    
    this.unload = function(){
        _oContainer.off("click",function(){});
        _oButExit.unload();
        
        _oButArrowNext.unload();
        _oButArrowPrev.unload();
        _oButCredits.unload();
        
        s_oAttachSection.removeChild(_oContainer);
        
        for(var i=0;i<_aNumSymbolComboText.length;i++){
            _oContainer.removeChild(_aNumSymbolComboText[i]);
        }
        
        for(var j=0;j<_aWinComboText.length;j++){
            _aWinComboText[j].unload();
        }
        
    };
    
    this._createPayouts = function(oContainerPage){
        _aNumSymbolComboText = new Array();
        _aWinComboText = new Array();
        
        var aPos = [{x:530,y:250},{x:750,y:250},{x:970,y:250},{x:421,y:360},{x:641,y:360},{x:861,y:360},{x:1081,y:360},{x:530,y:470},{x:750,y:470},{x:970,y:470}];
        var iCurPos = 0;
        for(var i=0;i<s_aSymbolWin.length;i++){
            var aSymbolPayouts = s_aSymbolWin[i];
            do{
                var iIndex = aSymbolPayouts.indexOf(0);
                if(iIndex !== -1){
                    aSymbolPayouts.splice(iIndex, 1);
                }
                
            }while(iIndex !== -1);
            
            var iLen = aSymbolPayouts.length;
            
            if(iLen === 0){
                continue;
            }
            
            var iOffsetY = 24;
            if(iLen === 4){
                iOffsetY = 18;
            }
            
            var iYPos = aPos[iCurPos].y;
            _aNumSymbolComboText[i] = new Array();
            _aWinComboText[i] = new Array();

            for(var j=0;j<iLen;j++){
                var oTextMult = new CTLText(oContainerPage, 
                    aPos[iCurPos].x, iYPos, 35, 21, 
                    21, "left", "#fff", FONT_GAME_1, 1,
                    0, 0,
                    "X"+(5-j),
                    true, true, false,
                    false);


                _aNumSymbolComboText[i][j] = oTextMult;
                
                var oText = new CTLText(oContainerPage, 
                    oTextMult.getX() + 40, oTextMult.getY(), 50, 21, 
                    21, "left", "#ffff00", FONT_GAME_1, 1,
                    0, 0,
                    aSymbolPayouts[iLen-j-1],
                    true, true, false,
                    false);


                _aWinComboText[i][j] = oText;
            
                iYPos += iOffsetY;
            }
            
            iCurPos++;
        }
    };
    
    this._onNext = function(){
        if(_iCurPage === _aPages.length-1){
            _iCurPage = 0;
        }else{
            _iCurPage++;
        }
        
        
        _oCurPage.visible = false;
        _aPages[_iCurPage].visible = true;
        _oCurPage = _aPages[_iCurPage];
    };
    
    this._onPrev = function(){
        if(_iCurPage === 0){
            _iCurPage = _aPages.length -1;
        }else{
            _iCurPage--;
        }
        
        
        _oCurPage.visible = false;
        _aPages[_iCurPage].visible = true;
        _oCurPage = _aPages[_iCurPage];
    };
    
    this._onCredits = function(){
        new CCreditsPanel();
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButCredits.setPosition(_pStartPosCredits.x + iNewX ,_pStartPosCredits.y + iNewY);
    };
    
    this.show = function(){
        _iCurPage = 0;
        _oCurPage.visible = false;
        _aPages[_iCurPage].visible = true;
        _oCurPage = _aPages[_iCurPage];
        
        _oContainer.visible = true;
    };
    
    this.hide = function(){
        _oContainer.visible = false;
    };
    
    this.resetHighlightCombo = function(){
        for(var i=0;i<_aNumSymbolComboText.length;i++){
            if(_aNumSymbolComboText[i] !== undefined){
                for(var j=0;j<_aNumSymbolComboText[i].length;j++){
                    _aNumSymbolComboText[i][j].color = "#ffffff";
                    _aWinComboText[i][j].setColor("#ffff00");
                    createjs.Tween.removeTweens(_aWinComboText[i][j].getText());
                    _aWinComboText[i][j].setAlpha(1);
                }
            }
            
        } 
    };
    
    this.highlightCombo = function(iSymbolValue,iNumCombo){
        
        _aWinComboText[iSymbolValue-1][NUM_REELS-iNumCombo].setColor("#ff9000");
        
        this.tweenAlpha(_aWinComboText[iSymbolValue-1][NUM_REELS-iNumCombo].getText(),0);
        
    };
    
    this.tweenAlpha = function(oText,iAlpha){
        createjs.Tween.get(oText,{loop:-1}).to({alpha:0}, 200).to({alpha:1},200);
    };
    
    this._onExit = function(){
        s_oGame.hidePayTable();
    };
    
    this.isVisible = function(){
        return _oContainer.visible;
    };
    
    this._init();
}