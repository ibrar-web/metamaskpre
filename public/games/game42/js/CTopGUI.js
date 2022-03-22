function CTopGUI(iWinnings,iCurCard,iNumCards,oParentContainer){
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oTextWinnings;
    var _oTextCards;
    var _oButQuick;
    var _oSpriteBut;
    var _oContainerWinnings;
    var _oContainerCards;
    var _oContainerQuick;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iWinnings,iCurCard,iNumCards){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainerWinnings = new createjs.Container();
        _oParentContainer.addChild(_oContainerWinnings);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("gui_bg");
        var oBg = createBitmap(oSpriteBg);
        _oContainerWinnings.addChild(oBg);
        
        var oText = new CTLText(_oContainerWinnings, 
                    10, 5, oSpriteBg.width-20, 60, 
                    70, "center", FONT_COLOR, FONT, 1.1,
                    0, 0,
                    TEXT_WINNINGS,
                    true, true, false,
                    false );
        
        _oTextWinnings = new CTLText(_oContainerWinnings, 
                    10, 70, oSpriteBg.width-20, oSpriteBg.height-75, 
                    70, "center", FONT_COLOR, FONT2, 1.1,
                    0, 0,
                    formatValue(iWinnings),
                    true, true, false,
                    false );
                    
        _oContainerWinnings.regY = oSpriteBg.height;
        
        _oContainerCards = new createjs.Container();
        _oContainerCards.regX = oSpriteBg.width;
        _oContainerCards.regY = oSpriteBg.height;
        _oParentContainer.addChild(_oContainerCards);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("gui_bg");
        var oBg = createBitmap(oSpriteBg);
        _oContainerCards.addChild(oBg);
        
        var oText = new CTLText(_oContainerCards, 
                    10, 5, oSpriteBg.width-20, 60, 
                    70, "center", FONT_COLOR, FONT, 1.1,
                    0, 0,
                    TEXT_CARDS,
                    true, true, false,
                    false );
                    
        _oTextCards = new CTLText(_oContainerCards, 
                    10, 70, oSpriteBg.width-20, oSpriteBg.height-75, 
                    70, "center", FONT_COLOR, FONT2, 1.1,
                    0, 0,
                    iCurCard+"/"+iNumCards,
                    true, true, false,
                    false );
         
        _oContainerQuick = new createjs.Container();
        _oContainerQuick.x = CANVAS_WIDTH/2;
        _oParentContainer.addChild(_oContainerQuick);
                    
        _oSpriteBut = s_oSpriteLibrary.getSprite("but_generic");
        _oButQuick = new CTextButton(0,15,_oSpriteBut,TEXT_QUICK,FONT,FONT_COLOR,50,_oContainerQuick);
        _oButQuick.addEventListener(ON_MOUSE_UP,this._onQuick,this);
        
        _oContainerQuick.regY = _oSpriteBut.height/2;
        
    };
    
    this.refreshButtonPos = function(){
         _oContainerWinnings.scale = CUR_GRID_SCALE;
         _oContainerWinnings.x = GRID_POS.x - ( (LOGIC_CELL_WIDTH*CUR_GRID_SCALE)*1.5)
         _oContainerWinnings.y = GRID_POS.y - ( (LOGIC_CELL_HEIGHT*CUR_GRID_SCALE)*1.5) - 50;
         
         _oContainerCards.scale = CUR_GRID_SCALE;
         _oContainerCards.x = GRID_POS.x + ( (LOGIC_CELL_WIDTH*CUR_GRID_SCALE)*1.5)
         _oContainerCards.y = GRID_POS.y - ( (LOGIC_CELL_HEIGHT*CUR_GRID_SCALE)*1.5) - 50;
         
         _oContainerQuick.scale = CUR_GRID_SCALE;
         _oContainerQuick.y = GRID_POS.y - ( (LOGIC_CELL_HEIGHT*CUR_GRID_SCALE)*1.5) -50;
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
     
    this.refreshWinnings = function(iAmount){
         _oTextWinnings.refreshText(formatValue(iAmount));
    };
    
    this.refreshNumCards = function(iNumCards){
        _oTextCards.refreshText(iNumCards+"/"+NUM_CARDS);
    };
    
    this._onQuick = function(){
        if(_aCbCompleted[ON_QUICK_SCRATCH]){
            _aCbCompleted[ON_QUICK_SCRATCH].call(_aCbOwner[ON_QUICK_SCRATCH]);
        }
    };
    
    this._init(iWinnings,iCurCard,iNumCards);
}