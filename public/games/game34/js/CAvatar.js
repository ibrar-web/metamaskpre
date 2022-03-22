function CAvatar(oParentContainer){
    var _pStartPosAvatar;
    
    var _oSpriteIdle;
    var _oSpriteWin;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(){
        _pStartPosAvatar = {x:150,y:CANVAS_HEIGHT-40};
        
        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPosAvatar.x;
        _oContainer.y = _pStartPosAvatar.y;
        _oParentContainer.addChild(_oContainer);
        
        
        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("avatar_idle")
                                    ],

                        framerate: 15,
                        "frames": [
                                        [1, 1, 280, 228, 0, 131, 228],
                                        [283, 1, 282, 228, 0, 132, 228],
                                        [567, 1, 283, 228, 0, 133, 228],
                                        [852, 1, 283, 228, 0, 133, 228],
                                        [1137, 1, 281, 227, 0, 131, 228],
                                        [1420, 1, 277, 228, 0, 128, 228],
                                        [1699, 1, 275, 228, 0, 125, 228],
                                        [1, 231, 272, 228, 0, 122, 228],
                                        [275, 231, 268, 228, 0, 117, 228],
                                        [545, 231, 259, 228, 0, 108, 228],
                                        [806, 231, 251, 228, 0, 101, 228],
                                        [1059, 231, 250, 225, 0, 100, 226],
                                        [1311, 231, 250, 225, 0, 100, 226],
                                        [1563, 231, 251, 227, 0, 101, 228],
                                        [1, 461, 250, 225, 0, 100, 226],
                                        [253, 461, 253, 228, 0, 101, 228],
                                        [508, 461, 250, 225, 0, 100, 226],
                                        [760, 461, 261, 226, 0, 104, 226],
                                        [1023, 461, 250, 226, 0, 100, 226],
                                        [1275, 461, 252, 227, 0, 101, 228],
                                        [1529, 461, 251, 225, 0, 100, 226],
                                        [1782, 461, 252, 228, 0, 101, 228],
                                        [1, 691, 251, 228, 0, 101, 228],
                                        [254, 691, 250, 225, 0, 100, 226],
                                        [506, 691, 250, 226, 0, 100, 226],
                                        [758, 691, 251, 227, 0, 101, 228],
                                        [1011, 691, 253, 226, 0, 103, 226],
                                        [1266, 691, 269, 226, 0, 119, 226],
                                        [1537, 691, 278, 226, 0, 128, 226]
                                ],

                                "animations": {
                                    "anim": { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28] }
                                },
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSpriteIdle = new createjs.Sprite(oSpriteSheet,"anim");
        _oContainer.addChild(_oSpriteIdle);
        
        
        
         var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("avatar_win")
                                    ],

                        "frames": [
                                       [1, 1, 280, 228, 0, 131, 228],
                                        [283, 1, 293, 227, 0, 142, 227],
                                        [578, 1, 301, 225, 0, 150, 225],
                                        [881, 1, 301, 224, 0, 150, 224],
                                        [1184, 1, 302, 222, 0, 150, 222],
                                        [1488, 1, 302, 220, 0, 148, 220],
                                        [1, 231, 294, 217, 0, 139, 218],
                                        [297, 231, 289, 215, 0, 132, 216],
                                        [588, 231, 286, 210, 0, 128, 212],
                                        [876, 231, 287, 210, 0, 127, 212],
                                        [1165, 231, 286, 211, 0, 124, 214],
                                        [1453, 231, 285, 214, 0, 120, 217],
                                        [1, 450, 279, 218, 0, 114, 221],
                                        [282, 450, 272, 222, 0, 107, 226],
                                        [556, 450, 264, 225, 0, 99, 229],
                                        [822, 450, 294, 230, 0, 129, 230],
                                        [1118, 450, 285, 230, 0, 120, 230],
                                        [1405, 450, 267, 229, 0, 102, 230],
                                        [1674, 450, 292, 230, 0, 127, 230],
                                        [1, 682, 326, 230, 0, 161, 230],
                                        [329, 682, 330, 252, 0, 165, 252],
                                        [661, 682, 330, 235, 0, 165, 235],
                                        [993, 682, 330, 228, 0, 165, 231],
                                        [1325, 682, 329, 227, 0, 164, 230],
                                        [1656, 682, 323, 228, 0, 158, 231],
                                        [1, 936, 323, 227, 0, 158, 230],
                                        [326, 936, 323, 227, 0, 158, 230],
                                        [651, 936, 264, 228, 0, 99, 231],
                                        [917, 936, 263, 229, 0, 98, 231],
                                        [1182, 936, 286, 231, 0, 121, 231],
                                        [1470, 936, 314, 252, 0, 149, 252],
                                        [1, 1190, 299, 230, 0, 134, 230],
                                        [302, 1190, 270, 229, 0, 105, 230],
                                        [574, 1190, 280, 230, 0, 116, 230],
                                        [856, 1190, 291, 230, 0, 126, 230],
                                        [1149, 1190, 293, 231, 0, 129, 231],
                                        [1444, 1190, 264, 227, 0, 99, 230],
                                        [1710, 1190, 264, 221, 0, 99, 225],
                                        [1, 1423, 264, 217, 0, 99, 221],
                                        [267, 1423, 262, 212, 0, 99, 216],
                                        [531, 1423, 288, 210, 0, 128, 213],
                                        [821, 1423, 303, 212, 0, 145, 213],
                                        [1126, 1423, 301, 213, 0, 143, 214],
                                        [1429, 1423, 294, 215, 0, 135, 216],
                                        [1, 1642, 290, 217, 0, 133, 218],
                                        [293, 1642, 293, 220, 0, 138, 221],
                                        [588, 1642, 295, 222, 0, 141, 223],
                                        [885, 1642, 291, 224, 0, 140, 225],
                                        [1178, 1642, 285, 226, 0, 134, 227]
                                ],

                        animations: { start:0, anim: [0,38]}
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSpriteWin = new createjs.Sprite(oSpriteSheet, "start");
        _oSpriteWin.on("animationend",this._onAnimationEnd,this);
        _oSpriteWin.visible = false;
        _oContainer.addChild(_oSpriteWin);

        
        this.refreshButtonPos();
    };
    
    this._hideAllAnims = function(){
        _oSpriteIdle.visible = false;
        _oSpriteWin.visible = false;
    };
    
    this.refreshButtonPos = function(){

        _oContainer.x = _pStartPosAvatar.x + s_iOffsetX;
        if(_oContainer.x > 200){
            _oContainer.x = 200;
        }else if(_oContainer.x < 180){
            _oContainer.x = 180;
        }

    };
    
    this.show = function(iAnim){
        switch(iAnim){
            case 0:{
                    _oSpriteIdle.visible = true;
                    _oSpriteWin.visible = false;
                    _oSpriteWin.gotoAndStop("start");
                    _oSpriteIdle.gotoAndPlay("anim");
                    break;
            }
            case 1:{
                    _oSpriteIdle.visible = false;
                    _oSpriteWin.visible = true;
                    _oSpriteWin.gotoAndPlay("anim");
                    break;
            }
        }
        
    };
    
    this._onAnimationEnd = function(evt){
        if(evt.currentTarget.currentAnimation === "anim"){
            this.show(0);
        }
    };
    
    _oParentContainer = oParentContainer;
    
    this._init();
}