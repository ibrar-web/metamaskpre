function CWinPanel(oSpriteBg) {
    var _aCbCompleted;
    var _aCbOwner;
    var _aNumbersExtracted;
    var _aNumbersPlayed;

    var _oBg;
    var _oMsgText;
    var _oExplText;

    var _oGroup;
    var _oPanelContainer;
    var _oButRedeem;
    var _oPrizeText;
    var _oPrizeImage;
    var _oFade;
    var _oParent;

    this._init = function (oSpriteBg) {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible = false;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0.7;
        _oFade.on("mousedown",function(){});
        _oGroup.addChild(_oFade);

        _oPanelContainer = new createjs.Container();   
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT/2;
        _oGroup.addChild(_oPanelContainer);

        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width/2;
        _oBg.regY = oSpriteBg.height/2;
        _oPanelContainer.addChild(_oBg);

        var iWidth = 750;
        var iHeight = 100;
        var iTextX = 0;
        var iTextY = -250;
        _oMsgText = new CTLText(_oPanelContainer, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    70, "center", "#fff", SECONDARY_FONT, 1,
                    2, 2,
                    TEXT_CONGRATULATIONS,
                    true, true, false,
                    false );
                    
  
        var iWidth = 750;
        var iHeight = 100;
        var iTextX = 0;
        var iTextY = -80;
        _oExplText = new CTLText(_oPanelContainer, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    40, "center", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    "",
                    true, true, true,
                    false );

        var iWidth = 500;
        _aNumbersExtracted = new Array();
        for(var i=0; i<NUMBERS_TO_PICK; i++){
            var oSprite = s_oSpriteLibrary.getSprite("ball_1");
            var iNewX = -iWidth/2 + i*(iWidth/(NUMBERS_TO_PICK-1));
            var iNewY = -166;
            var oBall = createBitmap(oSprite);
            oBall.regX = oSprite.width/2/NUM_FRAMES_PER_BALL;
            oBall.regY = oSprite.height/2;
            oBall.x = iNewX;
            oBall.y = iNewY;
            oBall.sourceRect = {x: 0, y:0, width:oSprite.width/NUM_FRAMES_PER_BALL, height:oSprite.height}
            _aNumbersExtracted.push(oBall);
            _oPanelContainer.addChild(oBall);
        }

        var iWidth = 420;
        var oToggleSprite = s_oSpriteLibrary.getSprite('toggle_num');
        _aNumbersPlayed = new Array();
        for(var i=0; i<NUMBERS_TO_PICK; i++){    
            var iNewX = -iWidth/2 + i*(iWidth/(NUMBERS_TO_PICK-1));
            var iNewY = 0;
            var oNumber = new CNumberBut(iNewX,iNewY, oToggleSprite, -1, _oPanelContainer);
            oNumber.deactive();
            oNumber.setClickable(false);

            _aNumbersPlayed.push(oNumber);
        }

        var oSpritePrize = s_oSpriteLibrary.getSprite("prize_0");
        var iScale = 150/oSpritePrize.height;
        var iPrizeWidth = oSpritePrize.width*iScale;
        var iPrizeHeight = oSpritePrize.height*iScale;
        _oPrizeImage = createBitmap(oSpritePrize);
        _oPrizeImage.regX = oSpritePrize.width/2;
        _oPrizeImage.regY = oSpritePrize.height/2;
        _oPrizeImage.scaleX = _oPrizeImage.scaleY = iScale;
        _oPrizeImage.x = -280;
        _oPrizeImage.y = 200;
        _oPanelContainer.addChild(_oPrizeImage);
        
        var oIconMask = new createjs.Shape();
        oIconMask.graphics.beginFill("rgba(255,0,0,0.51)").drawRoundRect(_oPrizeImage.x-iPrizeWidth/2, _oPrizeImage.y-iPrizeHeight/2, iPrizeWidth, iPrizeHeight, 8);

        _oPrizeImage.mask = oIconMask;
        
        var iWidth = 250;
        var iHeight = 50;
        var iTextX = _oPrizeImage.x + iPrizeWidth/2 + 10;
        var iTextY = _oPrizeImage.y;
        _oPrizeText = new CTLText(_oPanelContainer, 
                    iTextX, iTextY-iHeight/2, iWidth, iHeight, 
                    40, "left", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    "",
                    true, true, false,
                    false );
        
        var oSprite = s_oSpriteLibrary.getSprite('but_long');
        _oButRedeem = new CToggle(240, 200, oSprite, true, _oPanelContainer); 
        _oButRedeem.setToChangeStateAtClick(false);
        _oButRedeem.addText(TEXT_REDEEM, 40, "#fff", PRIMARY_FONT);
        _oButRedeem.addEventListener(ON_MOUSE_UP, _oParent._onRedeem, this);
       
        s_oStage.addChild(_oGroup);

        $(s_oMain).trigger("show_interlevel_ad");

    };
    
    this.smartResize = function(){
        smartResize(_oPanelContainer,60,60);
    };
    
    this.unload = function () {
        _oFade.removeAllEventListeners();
        s_oStage.removeChild(_oGroup);
    };

    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };

    this.hide = function(){
        _oGroup.visible = false;
    };

    this.show = function (aInfo, aExtractionNum, oPrizeInfo) {
        playSound("win_panel",1,false);

        var iWinNumbers = 0;
        
        for(var i=0; i<aInfo.length; i++){
            _aNumbersPlayed[i].deactive();
            _aNumbersPlayed[i].setIndex(aInfo[i].num);
            _aNumbersPlayed[i].setTextNumber(aInfo[i].num+1);
            
            if(aInfo[i].state){
                iWinNumbers++;
                _aNumbersPlayed[i].active();
            }
        } 

        var iWidth = _aNumbersExtracted[0].getBounds().width;
        var iHeight = _aNumbersExtracted[0].getBounds().height;

        for(var i=0; i<aExtractionNum.length; i++){
            var iRandomFrame = Math.floor( Math.random()*NUM_FRAMES_PER_BALL );
            var iRandomRotation = -45 + Math.random()*90;
            var iBallNum = aExtractionNum[i]+1;
            var oSprite = s_oSpriteLibrary.getSprite("ball_"+iBallNum);
            _aNumbersExtracted[i].image = oSprite;
            _aNumbersExtracted[i].rotation = iRandomRotation;
            _aNumbersExtracted[i].sourceRect = {x: iRandomFrame*iWidth, y:0, width:iWidth, height:iHeight}
        }

        if(iWinNumbers === 1){
            _oExplText.refreshText(sprintf( TEXT_CONGRATULATIONS_EXPL_SINGLE, iWinNumbers));
        }else {
            _oExplText.refreshText(sprintf( TEXT_CONGRATULATIONS_EXPL, iWinNumbers));
        }
        
        _oGroup.visible = true;

        _oPrizeImage.image = s_oSpriteLibrary.getSprite('prize_'+oPrizeInfo.index);
        _oPrizeText.refreshText(oPrizeInfo.label);
        
        createjs.Tween.get(_oGroup).to({alpha: 1}, 500);
    };

    this._onExit = function () {
        _oParent.hide();
        
        var iEventToLaunch = ON_BACK_MENU;
        if(_aCbCompleted[iEventToLaunch]){
            _aCbCompleted[iEventToLaunch].call(_aCbOwner[iEventToLaunch]);
        }
    };

    this._onRestart = function () {
        _oParent.hide();
        
        var iEventToLaunch = ON_RESTART;
        if(_aCbCompleted[iEventToLaunch]){
            _aCbCompleted[iEventToLaunch].call(_aCbOwner[iEventToLaunch]);
        }
    };

    this._onRedeem = function () {
        _oParent.hide();
        
        var iEventToLaunch = ON_REDEEM;
        if(_aCbCompleted[iEventToLaunch]){
            _aCbCompleted[iEventToLaunch].call(_aCbOwner[iEventToLaunch]);
        }
    };

    _oParent = this;
    this._init(oSpriteBg);

    return this;
}