function CPaytableSlot(iX, iY, oParentContainer, szImage, szLabel, iNumCombo){
    
    var _oPanelContainer;
    
    this._init = function(){
        _oPanelContainer = new createjs.Container();   
        _oPanelContainer.x = iX;
        _oPanelContainer.y = iY;
        oParentContainer.addChild(_oPanelContainer);

        var oSprite = s_oSpriteLibrary.getSprite('slot_paytable_bg');
        var oBg = createBitmap(oSprite);
        oBg.regX = oSprite.width/2;
        oBg.regY = oSprite.height/2;
        _oPanelContainer.addChild(oBg);
        
        var oSpritePrize = s_oSpriteLibrary.getSprite(szImage);
        var iOffset = 10;
        var iScale = (oSprite.height-iOffset)/oSpritePrize.height;
        var iPrizeWidth = oSpritePrize.width*iScale;
        var iPrizeHeight = oSpritePrize.height*iScale;
        var oPrize = createBitmap(oSpritePrize);
        oPrize.regX = oSpritePrize.width/2;
        oPrize.regY = oSpritePrize.height/2;
        oPrize.scaleX = oPrize.scaleY = iScale;
        oPrize.x = -oSprite.width/2 + iPrizeWidth/2 + iOffset/2;
        _oPanelContainer.addChild(oPrize);
        
        var oIconMask = new createjs.Shape();
        oIconMask.graphics.beginFill("rgba(255,0,0,0.51)").drawRoundRect(oPrize.x-iPrizeWidth/2, oPrize.y-iPrizeHeight/2, iPrizeWidth, iPrizeHeight, 4);

        oPrize.mask = oIconMask;
        
        var iWidth = 220;
        var iHeight = oSprite.height/2;
        var iTextX = oPrize.x + iPrizeWidth/2 + 10;
        var iTextY = -14;
        var oPrizeText = new CTLText(_oPanelContainer, 
                    iTextX, iTextY-iHeight/2, iWidth, iHeight, 
                    26, "left", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    szLabel,
                    true, true, false,
                    false );
        
        
        var oBallSprite = s_oSpriteLibrary.getSprite('ball_icon');
        var iStartX = iTextX + oBallSprite.width/2 + 2;
        for(var i=0; i<iNumCombo; i++){
            var oBall = createBitmap(oBallSprite);
            oBall.regX = oBallSprite.width/2;
            oBall.regY = oBallSprite.height/2;
            oBall.x = iStartX+i*oBallSprite.width;
            oBall.y = 12;
            _oPanelContainer.addChild(oBall);
        };
        
    };
    
    this._init();
}


