function CBoard(oParentContainer){
    var _bQuickScratchActive;
    var _bEndScratching;
    var _iCurWinSymbol;
    var _aGridCells = null;
    var _aPatternSymbols;
    var _aVisibleSymbols;
    var _aQuickScratches;
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oContainer;
    var _oParentContainer = oParentContainer;
    var _oThis = this;
    
    this._init = function(){
        _bQuickScratchActive = false;
        _bEndScratching = false;
        _iCurWinSymbol = -1;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        _aVisibleSymbols = [];
        
        _oContainer = new createjs.Container();
        _oContainer.x = GRID_POS.x;
        _oContainer.y = GRID_POS.y;
        _oParentContainer.addChild(_oContainer);

    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.unload = function(){
        if(_aGridCells === null){
            return;
        }
        
        for(var i=0;i<GRID_SIZE;i++){
            for(var j=0;j<GRID_SIZE;j++){
                _aGridCells[i][j].unload();
            }
        }
        
        _aVisibleSymbols = [];
        _aGridCells = null;
        
        _oContainer.removeAllChildren();
    };
    
    this.initGrid = function(iWin,iSymbolIndex){
        _bQuickScratchActive = false;
        _bEndScratching = false;
        _iCurWinSymbol = iSymbolIndex;
        
        this.unload();
        _aPatternSymbols = this._prepareSymbolsList(iWin,iSymbolIndex);
        this._createGrid(_aPatternSymbols);

        _oContainer.scale = 0;
        createjs.Tween.get(_oContainer).to({scale:CUR_GRID_SCALE}, 1000, createjs.Ease.elasticOut);
    };
    
    this._prepareSymbolsList = function(iWin,iSymbolIndex){
        var aFinalPattern = [];
        if(iWin === 0){
            //LOSE
            aFinalPattern = this.generateLosingPattern(NUM_SYMBOLS,[]);
        }else{
            //WIN
            var aPattern = this.generateLosingPattern(NUM_SYMBOLS-3,[iSymbolIndex]);
             aFinalPattern = aPattern.concat([iSymbolIndex,iSymbolIndex,iSymbolIndex])
        }
        
        aFinalPattern = shuffle(aFinalPattern);

        return aFinalPattern;
    };
    
    this.generateLosingPattern = function(iNumSymbol,aSymbolToExclude){
        var aPossibleSymbols = [];
        for(var i=0;i<NUM_SYMBOLS;i++){
            if(!aSymbolToExclude.includes(i)){
                aPossibleSymbols.push(i);
                aPossibleSymbols.push(i);
            }
        }
        
        var aList = [];
       
        for(var k=0;k<iNumSymbol;k++){
            var iRand = Math.floor(Math.random()*aPossibleSymbols.length);
            
            aList.push(aPossibleSymbols.splice(iRand,1));
        }
        
        return aList;
    };
    
    this._createGrid = function(aPattern){
        
        var iXPos = 0;
        var iYPos = 0;
        var iCont = 0;
        _aGridCells = new Array();
        for(var i=0;i<GRID_SIZE;i++){
            _aGridCells[i] = new Array();
            for(var j=0;j<GRID_SIZE;j++){
                var oCell = new CGridCell(iXPos,iYPos,i,j,aPattern[iCont],_oContainer);
                oCell.addEventListener(ON_SELECT_CELL,this._onSelectCell,this);
                
                _aGridCells[i][j] = oCell;
                
                iXPos += LOGIC_CELL_WIDTH + SPACE_BETWEEN_CELLS;
                iCont++;
            }
            
            iXPos = 0;
            iYPos += LOGIC_CELL_HEIGHT + SPACE_BETWEEN_CELLS;
        }
        
        _oContainer.regX = ((LOGIC_CELL_WIDTH*GRID_SIZE) + (SPACE_BETWEEN_CELLS*(GRID_SIZE-1)))/2 - LOGIC_CELL_WIDTH/2;
        _oContainer.regY = ((LOGIC_CELL_HEIGHT*GRID_SIZE) + (SPACE_BETWEEN_CELLS*(GRID_SIZE-1)))/2 - LOGIC_CELL_HEIGHT/2;
    };

    this.refreshGridScale = function(){
        _oContainer.scaleX = _oContainer.scaleY = CUR_GRID_SCALE;
    };
    
    this.prepareQuickScratch = function(){
        
        _aQuickScratches = [];
        for(var i=0;i<GRID_SIZE;i++){
            for(var j=0;j<GRID_SIZE;j++){
                if(!_aGridCells[i][j].isScratched()){
                    _aQuickScratches.push({row:i,col:j})
                }
            }
        }
        
        _aQuickScratches = shuffle(_aQuickScratches);
        
        var oInfos = _aQuickScratches.pop();
        _aGridCells[oInfos.row][oInfos.col].onSelectCell();
        
        _bQuickScratchActive = true;
    };
    
    this._checkIfWin = function(){
        var oCounts = {};
        _aVisibleSymbols.forEach(function (x) { oCounts[x] = (oCounts[x] || 0) + 1; });
        
        var bWin = false;
        for(var k in oCounts){
            if(oCounts[k] && oCounts[k] === 3){
                bWin = true;
            }
        }

        if(bWin){
            var iTimeWin = 3000;
            _bEndScratching = true;
            //WIN
            setTimeout(function(){
                
                if(_aCbCompleted[ON_END_SCRATCHING]){
                    _aCbCompleted[ON_END_SCRATCHING].call(_aCbOwner[ON_END_SCRATCHING],true);
                }
            },_aVisibleSymbols.length === 9?iTimeWin/2:iTimeWin);
            
            _oThis.stopEnlight();
            
            playSound("win",1,false);
            this.highlightWinningSymbols(iTimeWin);
            setTimeout(function(){
                _oThis._showRemainingSymbols();
            },iTimeWin/2);
            
            
            return;
        }else if(_aVisibleSymbols.length === 9){
            _bEndScratching = true;
            //LOSE
            if(_aCbCompleted[ON_END_SCRATCHING]){
                _aCbCompleted[ON_END_SCRATCHING].call(_aCbOwner[ON_END_SCRATCHING],false);
            }
            this.stopEnlight();
            
            return;
        }else if(_bQuickScratchActive){
            var oInfos = _aQuickScratches.pop();
            _aGridCells[oInfos.row][oInfos.col].onSelectCell();
        }else{
            s_oGame.unblockGrid();
        }
        
        for(var k in oCounts){
            if(oCounts[k] === 2){
                this.enlightSymbolsByType(k);
                
            }
        }
    };
    
    this.highlightWinningSymbols = function(iTimeWin){
        for(var i=0;i<GRID_SIZE;i++){
            for(var j=0;j<GRID_SIZE;j++){
                if(_aGridCells[i][j].getType() === _iCurWinSymbol){
                    _aGridCells[i][j].playWinAnim(iTimeWin);
                }
            }
        }
    };
    
    this._showRemainingSymbols = function(){
         for(var i=0;i<GRID_SIZE;i++){
            for(var j=0;j<GRID_SIZE;j++){
                if(!_aVisibleSymbols.includes(_aGridCells[i][j].getType()) ){
                    _aGridCells[i][j].onSelectCell();
                }
            }
        }
    };
    
    this.enlightSymbolsByType = function(iType){
        for(var i=0;i<GRID_SIZE;i++){
            for(var j=0;j<GRID_SIZE;j++){
                if(_aGridCells[i][j].isScratched() && _aGridCells[i][j].getType() == iType){
                    _aGridCells[i][j].playFrameAnim();
                }
            }
        }
    };
    
    this.stopEnlight = function(){
        for(var i=0;i<GRID_SIZE;i++){
            for(var j=0;j<GRID_SIZE;j++){
                _aGridCells[i][j].stopWinFrame();
            }
        }
    };
    
    this._onSelectCell = function(iRow,iCol,iType){
        if(_bEndScratching){
            return;
        }
        
        _aVisibleSymbols.push(iType);
        _oThis._checkIfWin();
    };

    this._init();
}