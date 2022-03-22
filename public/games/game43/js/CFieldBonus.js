function CFieldBonus(iX,iY,oParentContainer){
    var _oSprite;
    var _oParentContainer;
    
    this._init = function(iX,iY){
        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("field_loop-0"),
                                        s_oSpriteLibrary.getSprite("field_loop-1"),
                                        s_oSpriteLibrary.getSprite("field_loop-2")
                                        
                                    ],

                        framerate: 30,
                        frames: [
                                [1, 1, 1500, 252, 0, 0, 0],
                                [1, 255, 1500, 252, 0, 0, 0],
                                [1, 509, 1500, 252, 0, 0, 0],
                                [1, 763, 1500, 252, 0, 0, 0],
                                [1, 1017, 1500, 252, 0, 0, 0],
                                [1, 1271, 1500, 252, 0, 0, 0],
                                [1, 1525, 1500, 252, 0, 0, 0],
                                [1, 1779, 1500, 252, 0, 0, 0],
                                [1, 1, 1500, 252, 1, 0, 0],
                                [1, 255, 1500, 252, 1, 0, 0],
                                [1, 509, 1500, 252, 1, 0, 0],
                                [1, 763, 1500, 252, 1, 0, 0],
                                [1, 1017, 1500, 252, 1, 0, 0],
                                [1, 1271, 1500, 252, 1, 0, 0],
                                [1, 1525, 1500, 252, 1, 0, 0],
                                [1, 1779, 1500, 252, 1, 0, 0],
                                [1, 1, 1500, 252, 2, 0, 0],
                                [1, 255, 1500, 252, 2, 0, 0]
                        ],

                        animations: { start:0, anim: [0,17]}
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
        _oSprite.visible = false;
        _oSprite.gotoAndStop("start");
    };
    
    this.stop = function(){
        _oSprite.stop();
    };
    
    _oParentContainer = oParentContainer;
    this._init(iX,iY);
}