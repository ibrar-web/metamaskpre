function CGame(oData){
    
    var _bUpdate; 
    var _iNumCards;
    var _iCurCard;
    var _iWinnings;
    var _iCurWin;
    var _iCurWinningSymbol;
    var _aOccurrencePrizes;
    var _oListenerBlock;
    
    var _oContainerGrid;
    var _oBoard;
    var _oInterface;
    var _oTopGui;
    var _oAreYouSurePanel;
    var _oNextCardPanel;
    var _oEndPanel = null;
    var _oPayTable;
    var _oBlock;
    var _oParent;
    
    
    this._init = function(){

        _iNumCards = NUM_CARDS;
        _iWinnings = 0;
        _iCurCard = 1;
        _iCurWinningSymbol = -1;
        
        _aOccurrencePrizes = [];
        for(var k=0;k<WIN_OCCURRENCE_PRIZES.length;k++){
            for(var t=0;t<WIN_OCCURRENCE_PRIZES[k];t++){
                _aOccurrencePrizes.push(k)
            }
            
        }
        
        _aOccurrencePrizes = shuffle(_aOccurrencePrizes);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg); 
        
        _oContainerGrid = new createjs.Container();
        s_oStage.addChild(_oContainerGrid);
        
        _oBoard = new CBoard(_oContainerGrid);
        _oBoard.addEventListener(ON_END_SCRATCHING,this._onEndScratching,this);
        
        _oTopGui = new CTopGUI(_iWinnings,_iCurCard,_iNumCards,s_oStage);
        _oTopGui.addEventListener(ON_QUICK_SCRATCH,this._onQuick,this);
         
        _oInterface = new CInterface();
        _oInterface.addEventListener(ON_EXIT_FROM_GAME,this.onExit,this);
        _oInterface.addEventListener(ON_EXIT_FROM_HELP,this._onExitFromHelp,this);
        _oInterface.addEventListener(ON_SHOW_PAYTABLE,this._onPaytable,this);
        
       _oBlock = new createjs.Shape();
        _oBlock.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oBlock.alpha = 0.01;
        _oListenerBlock = _oBlock.on("click", function(){});
        s_oStage.addChild(_oBlock);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("msg_box")
        _oAreYouSurePanel = new CAreYouSurePanel(CANVAS_WIDTH/2,-oSpriteBg.height/2,{type:createjs.Ease.bounceOut,time:1000,property:{y:CANVAS_HEIGHT/2}},
                                                    {type:createjs.Ease.backIn,time:400,property:{y:-oSpriteBg.height/2}},s_oStage);
        _oAreYouSurePanel.addEventListener(ON_EXIT_FROM_GAME,this.onConfirmExit,this);
        
        _oNextCardPanel = new CNextCardPanel(s_oStage);
        _oNextCardPanel.addEventListener(ON_PLAY_NEXT_CARD,this._onNextCard,this);
        
        _oEndPanel = new CGameOverPanel();
        
        _oPayTable = new CPaytable(s_oStage);
        
        _bUpdate = true;
        this.unblockGrid();
        
        this.refreshButtonPos();
    };
    
    
    this.unload = function(){
        _oInterface.unload();
        if(_oEndPanel !== null){
            _oEndPanel.unload();
        }

        _oBlock.off("click",_oListenerBlock);
        s_oGame = null;
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren(); 
        
        s_oMain.gotoMenu();
    };
    
    this.refreshButtonPos = function(){
        this.refreshGridScale();
        
        _oInterface.refreshButtonPos();
        _oTopGui.refreshButtonPos();
    };
    
    this.refreshGridScale = function(){
        if(s_bLandscape){
            var iHeight = MAX_TABLE_HEIGHT_LANDSCAPE;
            var iMaxGridSizeHeight = (CANVAS_HEIGHT - (s_iOffsetY*2));
            CUR_GRID_SCALE = iMaxGridSizeHeight/iHeight;
        }else{
            var iWidth = MAX_TABLE_WIDTH_PORTRAIT;
            var iMaxGridSizeWidth = (CANVAS_WIDTH - (s_iOffsetX*2));
            CUR_GRID_SCALE = iMaxGridSizeWidth/iWidth;
            if(CUR_GRID_SCALE >1.23){
                CUR_GRID_SCALE = 1.23;
            }
        }
        
        if(CUR_GRID_SCALE <= 1){
            CUR_GRID_SCALE = parseFloat(CUR_GRID_SCALE.toFixed(2));
        }
        
        _oBoard.refreshGridScale();
        _oPayTable.refresh();
    };
    
    this.blockGrid = function(){
        _oBlock.visible = true;
    };
    
    this.unblockGrid = function(){
        _oBlock.visible = false;
    };
    
    this.prepareNextCard = function(){
        var iRand = Math.floor(Math.random()*100);
        if(iRand < WIN_OCCURRENCE){
            //WIN
            var iRandPrizes = Math.floor(Math.random()*_aOccurrencePrizes.length);
            _iCurWin = PAYTABLE[_aOccurrencePrizes[iRandPrizes]];
            _iCurWinningSymbol = _aOccurrencePrizes[iRandPrizes];
        }else{
            //LOSE
            _iCurWin = 0;
        }
       
        _oBoard.initGrid(_iCurWin,_aOccurrencePrizes[iRandPrizes]);
    };
    
    this._onEndScratching = function(bWin){
        _oNextCardPanel.show(_iCurWinningSymbol,bWin,_iCurCard < NUM_CARDS?false:true);
        _iWinnings += _iCurWin;
        _oTopGui.refreshWinnings(_iWinnings);
    };
    
    this._onExitFromHelp = function(bExit){
        if(bExit){
            s_oGame.onConfirmExit();
        }else{
            s_oGame.prepareNextCard();
        }
    };
    
    this._onPaytable = function(){
        _oPayTable.show();
    };
    
    this._onQuick = function(){
        this.blockGrid();
        _oBoard.prepareQuickScratch();
    };
    
    this._onNextCard = function(){
        if(_iCurCard < NUM_CARDS){
            _iCurCard++;
            _oTopGui.refreshNumCards(_iCurCard);
            
            s_oGame.prepareNextCard();
            s_oGame.unblockGrid();
        }else{
            _oEndPanel.show(_iWinnings);
        } 
    };
    
    this.onExit = function(){
        _oAreYouSurePanel.show();
    };
    
    this.onConfirmExit = function(){
        this.unload();
        
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        
        s_oMain.gotoMenu();
    };

    this.update = function(){
        
    };

    s_oGame=this;
    _oParent=this;
    
    this._init();
}

var s_oGame = null;
