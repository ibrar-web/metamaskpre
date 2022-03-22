function CBonusPlayer(iX,iY,oParentContainer){
    var _bUpdate = false;
    var _iCurAnim;
    var _iTotAnimFrame;
    var _iCurFrameIndex;
    var _iStartX;
    var _iStartY;
    var _aAnim;
    var _aAnimNumFrames;
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oSpriteRun;
    var _oSpriteFall;
    var _oSpriteTouchdown;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(iX,iY){
        _iStartX = iX;
        _iStartY = iY;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        
        //SPRITE RUN
        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("player_running-0"),
                                        s_oSpriteLibrary.getSprite("player_running-1") 
                                    ],

                        framerate: 30,
                        frames: [
                                [1, 1, 404, 403, 0, -74, -45],
                                [407, 1, 413, 416, 0, -68, -32],
                                [822, 1, 421, 429, 0, -66, -19],
                                [1245, 1, 420, 440, 0, -64, -8],
                                [1, 443, 427, 444, 0, -58, -4],
                                [430, 443, 438, 440, 0, -53, -8],
                                [870, 443, 447, 432, 0, -46, -16],
                                [1319, 443, 454, 416, 0, -35, -32],
                                [1, 889, 479, 404, 0, -22, -44],
                                [482, 889, 507, 407, 0, -22, -41],
                                [991, 889, 523, 421, 0, -39, -27],
                                [1516, 889, 506, 433, 0, -65, -15],
                                [1, 1324, 510, 440, 0, -74, -8],
                                [513, 1324, 503, 440, 0, -75, -8],
                                [1018, 1324, 475, 436, 0, -75, -12],
                                [1495, 1324, 443, 426, 0, -75, -22],
                                [1, 1, 421, 410, 1, -78, -38],
                                [424, 1, 401, 396, 1, -83, -52]
                        ],

                        animations: { start:0, anim: [0,17]}
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSpriteRun = createSprite(oSpriteSheet,"start");
        _oSpriteRun.visible = false;
        _oContainer.addChild(_oSpriteRun);
        
        
        //SPRITE FALL
        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("player_falling")
                                    ],

                        framerate: 30,
                        frames: [
                                    [1, 1, 404, 403, 0, -74, -45],
                                    [407, 1, 404, 403, 0, -74, -45],
                                    [813, 1, 424, 403, 0, -63, -45],
                                    [1239, 1, 449, 400, 0, -50, -48],
                                    [1, 406, 477, 377, 0, -36, -71],
                                    [480, 406, 550, 309, 0, -16, -139],
                                    [1032, 406, 550, 309, 0, -16, -139],
                                    [1, 785, 582, 248, 0, -4, -200],
                                    [585, 785, 596, 88, 0, -7, -360]
                        ],

                        animations: { start:0, anim: [0,8,"hide"],hide:9}
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSpriteFall = createSprite(oSpriteSheet,"start");
        _oSpriteFall.on("animationend",this._onEndFall,this);
        _oSpriteFall.visible = false;
        _oContainer.addChild(_oSpriteFall);
        
        
        //SPRITE TOUCHDOWN
        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("player_touchdown-0"),
                                        s_oSpriteLibrary.getSprite("player_touchdown-1")
                                    ],

                        framerate: 30,
                        frames: [
                                    [1, 1, 401, 396, 0, -83, -52],
                                    [404, 1, 385, 386, 0, -95, -62],
                                    [791, 1, 361, 370, 0, -113, -78],
                                    [1154, 1, 343, 357, 0, -128, -91],
                                    [1499, 1, 322, 362, 0, -135, -86],
                                    [1, 399, 304, 370, 0, -138, -78],
                                    [307, 399, 296, 377, 0, -142, -71],
                                    [605, 399, 289, 384, 0, -145, -64],
                                    [896, 399, 281, 383, 0, -149, -65],
                                    [1179, 399, 277, 383, 0, -150, -65],
                                    [1458, 399, 273, 381, 0, -152, -67],
                                    [1733, 399, 269, 378, 0, -157, -70],
                                    [1, 785, 260, 377, 0, -172, -71],
                                    [263, 785, 241, 375, 0, -192, -73],
                                    [506, 785, 218, 374, 0, -202, -74],
                                    [726, 785, 197, 376, 0, -204, -72],
                                    [925, 785, 215, 378, 0, -201, -70],
                                    [1142, 785, 223, 380, 0, -194, -68],
                                    [1367, 785, 230, 381, 0, -184, -67],
                                    [1599, 785, 238, 383, 0, -182, -65],
                                    [1, 1170, 261, 383, 0, -183, -65],
                                    [264, 1170, 279, 383, 0, -185, -65],
                                    [545, 1170, 286, 382, 0, -188, -66],
                                    [833, 1170, 294, 379, 0, -195, -69],
                                    [1129, 1170, 291, 376, 0, -201, -72],
                                    [1422, 1170, 277, 373, 0, -209, -75],
                                    [1701, 1170, 259, 368, 0, -215, -80],
                                    [1, 1555, 241, 363, 0, -218, -84],
                                    [244, 1555, 236, 353, 0, -210, -86],
                                    [482, 1555, 251, 345, 0, -189, -89],
                                    [735, 1555, 283, 335, 0, -154, -92],
                                    [1020, 1555, 307, 326, 0, -131, -94],
                                    [1329, 1555, 301, 315, 0, -137, -97],
                                    [1632, 1555, 287, 318, 0, -149, -89],
                                    [1, 1, 290, 284, 1, -147, -120],
                                    [293, 1, 283, 259, 1, -157, -142],
                                    [578, 1, 259, 234, 1, -188, -166],
                                    [1, 287, 245, 211, 1, -212, -185],
                                    [248, 287, 237, 195, 1, -229, -199],
                                    [487, 287, 229, 178, 1, -242, -210],
                                    [718, 287, 224, 161, 1, -246, -221],
                                    [1, 500, 231, 154, 1, -253, -229],
                                    [234, 500, 241, 145, 1, -260, -237],
                                    [477, 500, 241, 153, 1, -264, -228],
                                    [720, 500, 224, 154, 1, -269, -226],
                                    [1, 656, 190, 156, 1, -277, -224],
                                    [193, 656, 184, 155, 1, -266, -224],
                                    [379, 656, 184, 155, 1, -268, -223],
                                    [565, 656, 181, 157, 1, -275, -221],
                                    [748, 656, 183, 161, 1, -275, -216],
                                    [1, 819, 189, 169, 1, -274, -207],
                                    [192, 819, 192, 180, 1, -273, -196],
                                    [386, 819, 196, 188, 1, -273, -188],
                                    [584, 819, 202, 193, 1, -272, -183],
                                    [788, 819, 203, 199, 1, -272, -177],
                                    [1, 1020, 207, 204, 1, -271, -172],
                                    [210, 1020, 208, 207, 1, -270, -169],
                                    [420, 1020, 207, 206, 1, -271, -170],
                                    [629, 1020, 219, 202, 1, -269, -174],
                                    [1, 1229, 240, 193, 1, -269, -183],
                                    [243, 1229, 259, 181, 1, -268, -195],
                                    [504, 1229, 274, 168, 1, -268, -208],
                                    [1, 1424, 294, 145, 1, -268, -231],
                                    [297, 1424, 315, 134, 1, -267, -242],
                                    [614, 1424, 328, 136, 1, -267, -240],
                                    [1, 1571, 336, 136, 1, -265, -240],
                                    [339, 1571, 335, 128, 1, -265, -248],
                                    [676, 1571, 328, 114, 1, -265, -262]
                        ],

                        animations: { start:0, anim: [0,67,"stop"],stop:67}
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSpriteTouchdown = createSprite(oSpriteSheet,"start");
        _oSpriteTouchdown.on("animationend",this._onEndTouchdown,this);
        _oSpriteTouchdown.visible = false;
        _oContainer.addChild(_oSpriteTouchdown);
        
        
        
        _aAnimNumFrames = new Array();
        _aAnimNumFrames[BONUS_ANIM_RUN] = 18;
        _aAnimNumFrames[BONUS_ANIM_FALL] = 9;
        _aAnimNumFrames[BONUS_ANIM_TOUCHDOWN] = 50;

        _iCurAnim = BONUS_ANIM_RUN;
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.show = function(){
        _oSpriteRun.visible = true;
        _oContainer.visible = true;
        _oSpriteRun.gotoAndPlay("anim");
    };
    
    this.hide = function(){
        _bUpdate = false;
        _oContainer.visible = false;
    };
    
    this.reset = function(){
        _bUpdate = false;
        _oContainer.alpha = 1;
        _oContainer.x = _iStartX;
        _oContainer.y = _iStartY;
        
        _oSpriteRun.visible = false;
        _oSpriteFall.visible = false;
        _oSpriteTouchdown.visible = false;

        _iCurAnim = BONUS_ANIM_RUN;
    };
    
    this.changeAnim = function(iAnim){
        switch(iAnim){
            case BONUS_ANIM_FALL:{
                    _oSpriteRun.visible = false;
                    _oSpriteFall.visible = true;
                    _oSpriteTouchdown.visible = false;
                    
                    _oSpriteFall.gotoAndPlay("anim");
                    break;
            }
            case BONUS_ANIM_TOUCHDOWN:{
                    _oSpriteRun.visible = false;
                    _oSpriteFall.visible = false;
                    _oSpriteTouchdown.visible = true;
                    
                    _oSpriteTouchdown.gotoAndPlay("anim");
                    break;
            }
        }
        
        _iCurAnim = iAnim;
    };
    
    this._onEndFall = function(evt){
        if(evt.currentTarget.currentAnimation === "anim"){
            this.hide();
            if(_aCbCompleted[ON_BONUS_END]){
                _aCbCompleted[ON_BONUS_END].call(_aCbOwner[ON_BONUS_END]);
            }
        }
    };
    
    this._onEndTouchdown = function(evt){
        if(evt.currentTarget.currentAnimation === "anim"){
            new createjs.Tween.get(_oContainer).to({alpha:0},500);
            if(_aCbCompleted[ON_BONUS_END]){
                 _aCbCompleted[ON_BONUS_END].call(_aCbOwner[ON_BONUS_END]);
            }
        }
    };
    
    this.tweenJump = function(){
        new createjs.Tween.get(_oContainer).to({y:_iStartY-50},50).to({y:_iStartY},50);
    };

    this.move = function(iX,iTime){
        new createjs.Tween.get(_oContainer).to({x:iX},iTime,createjs.Ease.cubicOut).call(function(){
            if(_aCbCompleted[ON_END_PLAYER_MOVE]){
                _aCbCompleted[ON_END_PLAYER_MOVE].call(_aCbOwner[ON_END_PLAYER_MOVE]);
            }
        });
    };
    
    _oParentContainer = oParentContainer;
    this._init(iX,iY);
}