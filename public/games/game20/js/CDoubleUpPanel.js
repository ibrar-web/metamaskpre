function CDoubleUpPanel(oSpriteSheetCard){
    var _bDisableCards;
    var _bWin;
    var _iDealerCardIndex;
    var _aPlayerCard;
    var _aCardInfos;
    var _oDealerInfo;
    var _oCardDealer;
    var _oTextWonAmount;
    var _oTextDoubleAmount;
    var _oTextDoubleHalf;
    var _oButDouble;
    var _oButDoubleHalf;
    var _oButCollect;
    var _oChooseCardText;
    var _oContainer;
    
    var _oThis;
    
    this._init = function(oSpriteSheetCard){
        _bDisableCards = true;
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_doubleup"));
        _oContainer.addChild(oBg);
        
        var oText = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-350, 50, 700, 70, 
                    70, "center", "#ffc501", FONT1, 1,
                    0, 0,
                    TEXT_DOUBLE_UP,
                    true, true, false,
                    false );

        
        var oTextWon = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-350, 150, 300, 30, 
                    30, "right", "#fff", FONT1, 1,
                    0, 0,
                    TEXT_YOU_WON,
                    true, true, false,
                    false );

        
        var oTextDoubleHalfTo = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-350, 200, 350, 30, 
                    30, "right", "#fff", FONT1, 1,
                    0, 0,
                    TEXT_DOUBLE_HALF_TO,
                    true, true, false,
                    false );

        
        var oTextDoubleUpTo = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-350, 250, 350, 30, 
                    30, "right", "#fff", FONT1, 1,
                    0, 0,
                    TEXT_DOUBLEUP_TO,
                    true, true, false,
                    false );

        
        _oTextWonAmount = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2 + 50, 150, 350, 30, 
                    30, "left", "#ffc501", FONT1, 1,
                    0, 0,
                    "0",
                    true, true, false,
                    false );

        
        _oTextDoubleAmount = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2 + 50, 250, 350, 30, 
                    30, "left", "#ffc501", FONT1, 1,
                    0, 0,
                    "0",
                    true, true, false,
                    false );

        
        _oTextDoubleHalf = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2 + 50, 200, 350, 30, 
                    30, "left", "#ffc501", FONT1, 1,
                    0, 0,
                    "0",
                    true, true, false,
                    false );

        
        var oTextDealer = new CTLText(_oContainer, 
                    450, 335, 230, 20, 
                    20, "center", "#fff", FONT1, 1,
                    0, 0,
                    TEXT_DEALER_CARD,
                    true, true, false,
                    false );
                    

        
        _oButDouble = new CTextButton(CANVAS_WIDTH/2 - 300,700,s_oSpriteLibrary.getSprite("but_menu_bg"),TEXT_DOUBLE,FONT1,"#ffffff",30,0,_oContainer);
        _oButDouble.addEventListener(ON_MOUSE_UP, this._onButDoubleRelease, this);
        
        _oButDoubleHalf = new CTextButton(CANVAS_WIDTH/2,700,s_oSpriteLibrary.getSprite("but_menu_bg"),TEXT_DOUBLE_HALF,FONT1,"#ffffff",24,0,_oContainer);
        _oButDoubleHalf.addEventListener(ON_MOUSE_UP, this._onButDoubleHalfRelease, this);
        
        _oButCollect = new CTextButton(CANVAS_WIDTH/2 + 300,700,s_oSpriteLibrary.getSprite("but_menu_bg"),TEXT_COLLECT,FONT1,"#ffffff",30,0,_oContainer);
        _oButCollect.addEventListener(ON_MOUSE_UP, this._onButCollectRelease, this);
        
        _oChooseCardText = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-400, 660, 800, 60, 
                    60, "center", "#fff", FONT1, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );
                    

        
        //ATTACH DELAER CARD
        _oCardDealer = new CCard(565,490,oSpriteSheetCard,_oContainer,0,0,0);
        
        //ATTACH PLAYER CARDS
        _aPlayerCard = new Array();
        var iX = 878;
        for(var i=0;i<4;i++){
            var oCard = new CCard(iX,490,oSpriteSheetCard,_oContainer,0,0,0);
            oCard.addEventListenerWithParams(ON_CARD_SELECTED,this._onCardSelected,this,i);
        
            _aPlayerCard.push(oCard);
            
            iX += CARD_WIDTH + 4;
        }
    };
    
    this.unload = function(){
        _oButDouble.unload();
        _oButDoubleHalf.unload();
        _oButCollect.unload();
        
        s_oStage.removeChild(_oContainer);   
    };
    
    this.show = function(iWon,iDouble,iDoubleHalf){
        _oButDouble.setVisible(true);
        _oButDoubleHalf.setVisible(true);
        _oButCollect.setVisible(true);
        
        _oTextDoubleAmount.refreshText((iDouble).toFixed(2)+TEXT_CURRENCY);
        _oTextDoubleHalf.refreshText((iDoubleHalf).toFixed(2)+TEXT_CURRENCY);
        _oTextWonAmount.refreshText((iWon).toFixed(2)+TEXT_CURRENCY);

        _oChooseCardText.refreshText("");
        
        //RESET CARDS
        _oCardDealer.setBack();
        for(var i=0;i<_aPlayerCard.length;i++){
            _aPlayerCard[i].setBack();
        }
        
        _oContainer.visible = true;
    };
    
    this.hide = function(){
        _oContainer.visible = false;
        s_oGame.exitFromDoublePanel();
    };
    
    this._setGuiAfterBet = function(){
        _oButDouble.setVisible(false);
        _oButDoubleHalf.setVisible(false);
        _oButCollect.setVisible(false);
        _oCardDealer.showCard();
        
        _oChooseCardText.refreshText(TEXT_CHOOSE_CARD);

        _bDisableCards = false;
    };
    
    this._hideCards = function(){
        for(var i=0;i<_aPlayerCard.length;i++){
            _aPlayerCard[i].hideCard();
        }
        
        _oCardDealer.hideCard();
        
        _oButDouble.setVisible(true);
        _oButDoubleHalf.setVisible(true);
        _oButCollect.setVisible(true);
        
        _oChooseCardText.refreshText("");
        
        var iWin = s_oGame.getCurWin();
        var iDouble = iWin*2;
        var iDoubleHalf = iWin*1.5;

        _oTextDoubleAmount.refreshText((iDouble).toFixed(2)+TEXT_CURRENCY);
        _oTextDoubleHalf.refreshText((iDoubleHalf).toFixed(2)+TEXT_CURRENCY);
        _oTextWonAmount.refreshText((iWin).toFixed(2)+TEXT_CURRENCY);
    };
    
    this._onCardSelected = function(oCard,iIndex){
        if(_bDisableCards){
            return;
        }
        _bDisableCards = true;
        
        var iCont = 0;
        if(_bWin){
            var oPlayerCard = _aCardInfos[_iDealerCardIndex+2];
            for(var i=0;i<_aCardInfos.length;i++){

                if(i !== _iDealerCardIndex && i !== _iDealerCardIndex+2){
                    _aPlayerCard[iCont].changeInfo(_aCardInfos[i].fotogram,_aCardInfos[i].rank,_aCardInfos[i].suit);
                    iCont++;
                }
            }
            _oChooseCardText.refreshText(TEXT_YOU_WON);
            playSound("win",1,false);
            
            setTimeout(function(){_oThis._hideCards();},3000);
        }else{
            var oPlayerCard = _aCardInfos[_iDealerCardIndex-1];
            for(var i=0;i<_aCardInfos.length;i++){
                if(i !== _iDealerCardIndex && i !== _iDealerCardIndex-1){
                    _aPlayerCard[iCont].changeInfo(_aCardInfos[i].fotogram,_aCardInfos[i].rank,_aCardInfos[i].suit);
                    iCont++;
                }
            }
            _oChooseCardText.refreshText(TEXT_YOU_LOSE);
            playSound("lose",1,false);
            
            setTimeout(function(){_oThis.hide();},3000);
        }

        _aPlayerCard[iIndex].changeInfo(oPlayerCard.fotogram,oPlayerCard.rank,oPlayerCard.suit);
        
        _aPlayerCard[iIndex].showCard();
    };
    
    this._onButDoubleRelease = function(){
        var oResult = s_oGame.setDoubleBet();
        
        _bWin = oResult.win;
        
        _aCardInfos = oResult.cards;
        _iDealerCardIndex = oResult.dealer_index;
        _oDealerInfo = _aCardInfos[_iDealerCardIndex];

        _oCardDealer.changeInfo(_oDealerInfo.fotogram,_oDealerInfo.rank,_oDealerInfo.suit);
        
        this._setGuiAfterBet();
    };
    
    this._onButDoubleHalfRelease = function(){
        var oResult = s_oGame.setDoubleHalfBet();
        
        _bWin = oResult.win;
        
        _aCardInfos = oResult.cards;
        _iDealerCardIndex = oResult.dealer_index;
        _oDealerInfo = _aCardInfos[_iDealerCardIndex];

        _oCardDealer.changeInfo(_oDealerInfo.fotogram,_oDealerInfo.rank,_oDealerInfo.suit);
        
        this._setGuiAfterBet();
    };
    
    this._onButCollectRelease = function(){
        _oThis.hide();
    };
    
    _oThis = this;
    
    this._init(oSpriteSheetCard);
}