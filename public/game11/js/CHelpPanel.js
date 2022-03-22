function CHelpPanel(oParentContainer) {

    var _oGroup;    
    var _oParent;
    var _oHandAnim;

    this._init = function (oParentContainer) { 
        
        _oGroup = new createjs.Container();
        var oPos = s_oGame.getStartButPosition();
        _oGroup.x = oPos.x - 6;
        _oGroup.y = oPos.y - 10;
        oParentContainer.addChild(_oGroup);

        var oSprite = s_oSpriteLibrary.getSprite("hand_anim");
        
        var iWidth = oSprite.width/10;
        var iHeight = oSprite.height/2;
        
        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: iWidth, height: iHeight, regX: iWidth / 2, regY: iHeight / 2},
            animations: {idle: [0,19]}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _oHandAnim = createSprite(oSpriteSheet, "idle",iWidth/2,iHeight/2,iWidth,iHeight);
        _oHandAnim.regX = -30;
        _oHandAnim.regY = 90;
        _oHandAnim.scaleY = -1;
        _oGroup.addChild(_oHandAnim);
       
        
        var oSprite = s_oSpriteLibrary.getSprite('bg_help');
        var oBg = createBitmap(oSprite);
        oBg.regX = oSprite.width/2;
        oBg.regY = oSprite.height/2;
        oBg.y = -225;
        _oGroup.addChild(oBg);
        
        var iWidth = oSprite.width - 50;
        var iHeight = oSprite.height-50;
        var iTextX = 0;
        var iTextY = oBg.y;
        var oText = new CTLText(_oGroup, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    200, "center", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    sprintf(TEXT_HELP, TEXT_START),
                    true, true, true,
                    false );
                    
        _oGroup.alpha = 0;
       
    };

    this.refreshPos = function(){
        var oPos = s_oGame.getStartButPosition();
        _oGroup.x = oPos.x - 6;
        _oGroup.y = oPos.y - 10;
    };
    
    this.unload = function () {
        oParentContainer.removeChild(_oGroup);
    };
    
    this.show = function(){
        createjs.Tween.get(_oGroup).to({alpha:1}, 500, createjs.Ease.cubicIn);
    };
    
    this.hide = function(){
        createjs.Tween.get(_oGroup).to({alpha:0}, 500, createjs.Ease.cubicOut);
    };

    _oParent = this;
    this._init(oParentContainer);

}