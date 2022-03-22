function CSelectNumbersPanel(){
    
    var _aNumToPick;
    var _aListNum;
    
    var _oContainer;
    var _oFade;
    var _oTitle;
    var _oPanelContainer;
    var _oParent;
    var _oListener;
    var _oButStart;

    this._init = function () {
        _oContainer = new createjs.Container();   
        _oContainer.alpha = 0;
        s_oStage.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0.7;
        _oListener = _oFade.on("mousedown",function(){});
        _oContainer.addChild(_oFade);
        
        _oPanelContainer = new createjs.Container();   
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT/2;
        _oContainer.addChild(_oPanelContainer);

        var oSprite = s_oSpriteLibrary.getSprite('pick_numbers_panel');
        var oPanel = createBitmap(oSprite);        
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        _oPanelContainer.addChild(oPanel);


        var iWidth = 750;
        var iHeight = 70;
        var iTextX = 0;
        var iTextY = -170;
        _oTitle = new CTLText(_oPanelContainer, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    60, "center", "#fff", SECONDARY_FONT, 1,
                    2, 2,
                    sprintf(TEXT_PICK_NUMBERS, NUMBERS_TO_PICK),
                    true, true, false,
                    false );

        var oNumbersContainer = new createjs.Container();   
        oNumbersContainer.y = 50;
        _oPanelContainer.addChild(oNumbersContainer);

        _aListNum = new Array();
        
        _aNumToPick = new Array();
        var iCurCol = 0;
        var iCurRow = 0;
        var oSprite = s_oSpriteLibrary.getSprite('toggle_num');
        
        var iWidth = 700;
        var iHeight = 230;
        var iNumCol = 10;
        var iNumRow = Math.floor( TOTAL_NUMBERS/iNumCol );
        for(var i=0; i<TOTAL_NUMBERS; i++){    
            if(i!==0 && i%iNumCol === 0){
                iCurCol = 0;
                iCurRow++;
            }
            var iX = -iWidth/2 + iCurCol*(iWidth/(iNumCol-1));
            var iY = -iHeight/2 + iCurRow*(iHeight/(iNumRow-1));
            _aNumToPick[i] = new CNumberBut(iX,iY, oSprite, i, oNumbersContainer);
            _aNumToPick[i].addEventListenerWithParams(ON_MOUSE_UP, this._onNumberClick, this, i);
            _aNumToPick[i].deactive();
            
            iCurCol++;
        }
       
        var oSprite = s_oSpriteLibrary.getSprite('but_long');
        _oButStart = new CToggle(0, 290, oSprite, false, _oPanelContainer); 
        _oButStart.setToChangeStateAtClick(false);
        _oButStart.addText(TEXT_LETS_PLAY, 40, "#71a8d7", PRIMARY_FONT);
        _oButStart.addEventListener(ON_MOUSE_UP, this._onButStart, this);
        _oButStart.setClickable(false);
        
        
    };

    this.smartResize = function(){
        smartResize(_oPanelContainer,60,60);
    };

    this._checkXResize = function(){
        var iWidth = _oPanelContainer.getBounds().width;
        var iScreenWidth = CANVAS_WIDTH-2*s_iOffsetX;
        
        var iScaleRatio = iScreenWidth/iWidth;
        
        if(iWidth>iScreenWidth){
            _oPanelContainer.scaleX = _oPanelContainer.scaleY = iScaleRatio;
        }
    };

    this._checkYResize = function(){
        var iHeight = _oPanelContainer.getBounds().height;
        var iScreenHeight = CANVAS_HEIGHT-2*s_iOffsetY;
        
        var iScaleRatio = iScreenHeight/iHeight;
        
        if(iHeight>iScreenHeight){
            _oPanelContainer.scaleX = _oPanelContainer.scaleY = iScaleRatio;
        }
    };

    this.unload = function () {
        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oPanelContainer);

        for(var i=0; i<_aNumToPick.length; i++){
            _aNumToPick[i].unload();
        }
        _oButStart.unload();

        _oFade.off("mousedown",_oListener);
    };

    this.instantShow = function(){
        _oContainer.alpha = 1;
    };

    this.show = function(){
        createjs.Tween.get(_oContainer).to({alpha:1},500);
        
        this._checkIfCanStart();
    };

    this.hide = function(){
        createjs.Tween.get(_oContainer).to({alpha:0},500);
    };

    this._onNumberClick = function(iNumber){
        var iIndex = _aListNum.indexOf(iNumber);
        
        if(iIndex === -1){
            if(_aListNum.length >= NUMBERS_TO_PICK){
                return;
            }
            _aListNum.push(iNumber);
            _aNumToPick[iNumber].active();
        }else {
            _aListNum.splice(iIndex,1);
            _aNumToPick[iNumber].deactive();
        }
        
        this._checkIfCanStart();
    };

    this._onButStart = function(){
        _oParent.hide();
        
        _oButStart.setClickable(false);
        
        _aListNum.sort(_oParent._sortNumbers);
        
        s_oGame.playACombination(_aListNum);
    };

    this._sortNumbers = function(a, b){
        return a - b;
    };

    this._checkIfCanStart = function(){
        if(_aListNum.length === NUMBERS_TO_PICK){
            _oButStart.setClickable(true);
            _oButStart.setActive(true);
            _oButStart.setTextColor("#fff");
            
            _oTitle.refreshText(sprintf(TEXT_LETS_PLAY));
        }else {
            _oButStart.setClickable(false);
            _oButStart.setActive(false);
            _oButStart.setTextColor("#71a8d7");
            var szText;
            var iCurNumbers = NUMBERS_TO_PICK - _aListNum.length;
            if(iCurNumbers === 1){
                szText = sprintf(TEXT_PICK_NUMBERS_SINGLE, iCurNumbers);
            }else {
                szText = sprintf(TEXT_PICK_NUMBERS, iCurNumbers);
            }
            
            _oTitle.refreshText(szText);
        }
    };

    this.getBounds = function(){
        return _oPanelContainer.getBounds();
    };

    _oParent = this;
    this._init();
}


