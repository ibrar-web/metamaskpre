function CFieldEndZoneBonus(iX,iY,oParentContainer){
    var _oSprite;
    var _oParentContainer;
    
    this._init = function(iX,iY){
        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("end_zone-0"),
                                        s_oSpriteLibrary.getSprite("end_zone-1"),
                                        s_oSpriteLibrary.getSprite("end_zone-2"),
                                        s_oSpriteLibrary.getSprite("end_zone-3")
                                        
                                    ],

                        framerate: 30,
                        frames: [
                            [1, 1, 1500, 33, 0, 0, 0],
                            [1, 36, 1500, 34, 0, 0, 0],
                            [1, 72, 1500, 35, 0, 0, 0],
                            [1, 109, 1500, 38, 0, 0, 0],
                            [1, 149, 1500, 41, 0, 0, 0],
                            [1, 192, 1500, 46, 0, 0, 0],
                            [1, 240, 1500, 52, 0, 0, 0],
                            [1, 294, 1500, 58, 0, 0, 0],
                            [1, 354, 1500, 66, 0, 0, 0],
                            [1, 422, 1500, 74, 0, 0, 0],
                            [1, 498, 1500, 84, 0, 0, 0],
                            [1, 584, 1500, 93, 0, 0, 0],
                            [1, 679, 1500, 104, 0, 0, 0],
                            [1, 785, 1500, 115, 0, 0, 0],
                            [1, 902, 1500, 126, 0, 0, 0],
                            [1, 1030, 1500, 137, 0, 0, 0],
                            [1, 1169, 1500, 148, 0, 0, 0],
                            [1, 1319, 1500, 162, 0, 0, 0],
                            [1, 1483, 1500, 180, 0, 0, 0],
                            [1, 1665, 1500, 198, 0, 0, 0],
                            [1, 1, 1500, 215, 1, 0, 0],
                            [1, 218, 1500, 238, 1, 0, 0],
                            [1, 458, 1500, 252, 1, 0, 0],
                            [1, 712, 1500, 252, 1, 0, 0],
                            [1, 966, 1500, 252, 1, 0, 0],
                            [1, 1220, 1500, 252, 1, 0, 0],
                            [1, 1474, 1500, 252, 1, 0, 0],
                            [1, 1728, 1500, 252, 1, 0, 0],
                            [1, 1, 1500, 252, 2, 0, 0],
                            [1, 255, 1500, 252, 2, 0, 0],
                            [1, 509, 1500, 252, 2, 0, 0],
                            [1, 763, 1500, 252, 2, 0, 0],
                            [1, 1017, 1500, 252, 2, 0, 0],
                            [1, 1271, 1500, 252, 2, 0, 0],
                            [1, 1525, 1500, 252, 2, 0, 0],
                            [1, 1779, 1500, 251, 2, 0, -1],
                            [1, 1, 1500, 252, 3, 0, 0],
                            [1, 255, 1500, 252, 3, 0, 0],
                            [1, 509, 1500, 252, 3, 0, 0]
                        ],

                        animations: { start:0, anim: [0,38,"stop"],stop:38}
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _oSprite = createSprite(oSpriteSheet,"start");
        _oSprite.visible = false;
        _oSprite.x = iX;
        _oSprite.y = iY;
        _oParentContainer.addChild(_oSprite);
    };
    
    this.show = function(){
        _oSprite.visible = true;
        _oSprite.gotoAndPlay("anim");
    };
    
    this.hide = function(){
        this.reset();
    };
    
    this.reset = function(){
        _oSprite.gotoAndStop("start");
        _oSprite.visible = false;
        
    };
    
    _oParentContainer = oParentContainer;
    this._init(iX,iY);
}