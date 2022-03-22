function CPaytable(oSpriteBg) {
    var _aCbCompleted;
    var _aCbOwner;

    var _oBg;
    var _oMsgText;

    var _oGroup;
    var _oPanelContainer;
    var _oButNo;
    var _oButYes;
    var _oFade;
    var _oParent;

    this._init = function (oSpriteBg) {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oGroup = new createjs.Container();

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
                    "PAYTABLE",
                    true, true, false,
                    false );
        
        var iCenterTableY = -40;
        var oTableContainer = new createjs.Container();
        _oPanelContainer.addChild(oTableContainer);
        
        var iOffsetX = 153;
        var iOffsetY = 70;
        var iStartY = 0;
        

        var iNumElements = 0;
        for(var i=0; i<PAYTABLE_SETTINGS.length; i++){
            if(PAYTABLE_SETTINGS[i].prize_img_url !== ""){
                iNumElements++;
            }
        }
        
        var iCont = 0;
        for(var i=0; i<PAYTABLE_SETTINGS.length; i++){
            if(PAYTABLE_SETTINGS[i].prize_img_url === ""){
                continue;
            }
            var szImage = "prize_"+i;
            var szLabel = PAYTABLE_SETTINGS[i].label;
            var iNumCombo = parseInt( PAYTABLE_SETTINGS[i].num_balls_matched );
            
            var iDirectionSign = iCont%2===0 ? -1 : 1;
            if(iNumElements%2 === 1 && iCont === iNumElements-1){
                iDirectionSign = 0;
            }
            if(iCont !== 0 && iCont%2 === 0){
                iStartY += iOffsetY;
            }
            
            var oSlot = new CPaytableSlot(iDirectionSign*iOffsetX,iStartY,oTableContainer, szImage, szLabel, iNumCombo);
            
            iCont++;
        }

        var iTableHeight = oTableContainer.getBounds().height;
        oTableContainer.y = iCenterTableY - iTableHeight/2;

        var oSpriteButHome = s_oSpriteLibrary.getSprite("but_yes");
        _oButYes = new CGfxButton(0, 200, oSpriteButHome, _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_DOWN, _oParent._onYes, this);

        s_oStage.addChild(_oGroup);

    };

    this.smartResize = function(){
        smartResize(_oPanelContainer,60,60);
    };

    this.unload = function () {
        _oFade.removeAllEventListeners();
        s_oStage.removeChild(_oGroup);
        _oButNo.unload();
        _oButNo = null;
        _oButYes.unload();
        _oButYes = null;
    };

    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };

    this.hide = function(){
        _oGroup.visible = false;
        
        createjs.Tween.get(_oGroup).to({alpha: 0}, 500);
    };

    this.show = function () {
        _oGroup.visible = true;

        createjs.Tween.get(_oGroup).to({alpha: 1}, 500);
    };

    this._onRefuse = function () {
        _oParent.hide();
        
        var iEventToLaunch = ON_REFUSE;
        if(_aCbCompleted[iEventToLaunch]){
            _aCbCompleted[iEventToLaunch].call(_aCbOwner[iEventToLaunch]);
        }
    };

    this._onYes = function () {
        _oParent.hide();
        
        var iEventToLaunch = ON_CONFIRM;
        if(_aCbCompleted[iEventToLaunch]){
            _aCbCompleted[iEventToLaunch].call(_aCbOwner[iEventToLaunch]);
        }
    };

    _oParent = this;
    this._init(oSpriteBg);

    return this;
}


