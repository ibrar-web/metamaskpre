function CBonusCharacter(iX,iY,oParentContainer){
    var _iFinalX;
    var _pStartPos;
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oAnimIdle;
    var _oAnimStrafeIn;
    var _oAnimStrafeOut;
    var _oContainer;
    var _oParentContainer = oParentContainer;

    
    this._init = function(iX,iY){
        _iFinalX = iX;
        _pStartPos = {x:iX,y:iY};
        _aCbCompleted = new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oContainer.scaleX = _oContainer.scaleY = 0.9;
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
        _oAnimIdle = new createjs.Sprite(oSpriteSheet,"anim");
        _oContainer.addChild(_oAnimIdle);
        
        
        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("avatar_strafe_in")
                                    ],

                        framerate: 30,
                        "frames": [
                                       [1, 1, 319, 204, 0, 159, 209],
                                        [322, 1, 324, 208, 0, 160, 211],
                                        [648, 1, 326, 210, 0, 162, 213],
                                        [976, 1, 324, 210, 0, 160, 212],
                                        [1302, 1, 330, 210, 0, 165, 213],
                                        [1634, 1, 310, 208, 0, 145, 211],
                                        [1, 213, 293, 211, 0, 128, 214],
                                        [296, 213, 285, 215, 0, 121, 218],
                                        [583, 213, 280, 219, 0, 115, 223],
                                        [865, 213, 273, 223, 0, 108, 228],
                                        [1140, 213, 264, 226, 0, 100, 230],
                                        [1406, 213, 295, 231, 0, 131, 232],
                                        [1703, 213, 285, 231, 0, 121, 232],
                                        [1, 446, 283, 228, 0, 118, 231],
                                        [286, 446, 322, 229, 0, 158, 230],
                                        [610, 446, 330, 245, 0, 165, 246],
                                        [942, 446, 330, 252, 0, 165, 252],
                                        [1274, 446, 330, 227, 0, 165, 231],
                                        [1606, 446, 329, 227, 0, 164, 231],
                                        [1, 700, 325, 228, 0, 160, 232],
                                        [328, 700, 325, 227, 0, 160, 231],
                                        [655, 700, 322, 228, 0, 157, 232],
                                        [979, 700, 265, 228, 0, 100, 232],
                                        [1246, 700, 265, 229, 0, 100, 232],
                                        [1513, 700, 287, 231, 0, 122, 232],
                                        [1, 933, 315, 252, 0, 150, 252],
                                        [318, 933, 300, 231, 0, 135, 232],
                                        [620, 933, 270, 229, 0, 105, 231],
                                        [892, 933, 282, 230, 0, 117, 231],
                                        [1176, 933, 292, 231, 0, 128, 232],
                                        [1470, 933, 264, 227, 0, 100, 231],
                                        [1736, 933, 265, 223, 0, 100, 228],
                                        [1, 1187, 265, 217, 0, 100, 222],
                                        [268, 1187, 262, 212, 0, 100, 217],
                                        [532, 1187, 288, 210, 0, 129, 214],
                                        [822, 1187, 303, 213, 0, 146, 215],
                                        [1127, 1187, 300, 214, 0, 143, 216],
                                        [1429, 1187, 293, 215, 0, 136, 217],
                                        [1, 1406, 288, 217, 0, 133, 220],
                                        [291, 1406, 292, 220, 0, 137, 221],
                                        [585, 1406, 294, 221, 0, 141, 223],
                                        [881, 1406, 293, 226, 0, 141, 227],
                                        [1176, 1406, 285, 227, 0, 135, 228]
                                ],

                                animations: {start:0,anim:[0,5,"start_cut"],start_cut:[6,15,"end_cut"],end_cut:[16,42,"stop_cut"],stop_cut:42}
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _oAnimStrafeIn = new createjs.Sprite(oSpriteSheet, "start");
        _oAnimStrafeIn.visible = false;
        _oContainer.addChild(_oAnimStrafeIn);
        _oAnimStrafeIn.on("animationend",this._onEndAnimStrafeIn,this);
        
        
        
        
        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("avatar_strafe_out")
                                    ],

                        framerate: 30,
                        "frames": [
                                            [1, 1, 281, 227, 0, 131, 228],
                                            [284, 1, 293, 228, 0, 143, 228],
                                            [579, 1, 300, 225, 0, 150, 225],
                                            [881, 1, 302, 225, 0, 151, 225],
                                            [1185, 1, 303, 223, 0, 151, 223],
                                            [1490, 1, 303, 221, 0, 148, 221],
                                            [1, 231, 295, 217, 0, 140, 218],
                                            [298, 231, 290, 215, 0, 133, 216],
                                            [590, 231, 287, 213, 0, 129, 214],
                                            [879, 231, 295, 211, 0, 135, 213],
                                            [1176, 231, 324, 209, 0, 159, 212],
                                            [1502, 231, 325, 211, 0, 161, 212],
                                            [1, 450, 326, 210, 0, 162, 212],
                                            [329, 450, 326, 208, 0, 162, 211],
                                            [657, 450, 324, 208, 0, 160, 211],
                                            [983, 450, 324, 207, 0, 161, 210],
                                            [1309, 450, 315, 204, 0, 157, 208]
                                ],

                                animations: {start:0,anim:[1,8,"move"],move:[9,16,"stop_move"],stop_move:16}
        };

                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oAnimStrafeOut = new createjs.Sprite(oSpriteSheet, "start");
        //_oAnimStrafeOut.visible = false;
        _oContainer.addChild(_oAnimStrafeOut);
        _oAnimStrafeOut.on("animationend",this._onEndAnimStrafeOut,this);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.hide = function(){
        _oAnimIdle.visible = false;
        _oAnimStrafeIn.visible = false;
        _oAnimStrafeIn.gotoAndStop("start");
        _oAnimIdle.gotoAndStop("start");
    };

    this.reset = function(){
        _iFinalX = _pStartPos.x;
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
    };
     
    this.idle = function(){
        _oAnimIdle.visible = true;
        _oAnimStrafeIn.visible = false;
        _oAnimStrafeIn.gotoAndStop("start");
        _oAnimIdle.gotoAndPlay("anim");
    };
    
    this.startMoving = function(iFinalX){
        _iFinalX = iFinalX;
        _oAnimIdle.gotoAndStop("start");
        _oAnimIdle.visible = false;
        
        _oAnimStrafeOut.visible = true;
        _oAnimStrafeOut.gotoAndPlay("anim");
    };
    
    this.cutFruit = function(){
        playSound("avatar_cut",1,false);
        
        _oAnimIdle.gotoAndStop("start");
        _oAnimIdle.visible = false;
        _oAnimStrafeIn.visible = true;
        _oAnimStrafeIn.gotoAndPlay("start_cut");
        
    };
    
    this._onEndAnimStrafeIn = function(evt){
        if(evt.name === "start_cut"){
            //CUT THE FRUIT
            s_oBonusPanel.cutTheFruit();
        }else if(evt.name === "stop_cut"){
            _oAnimStrafeIn.visible = false;
            _oAnimIdle.visible = true;
            _oAnimIdle.gotoAndPlay("anim");
        }
    };

    this._onEndAnimStrafeOut = function(evt){
        if(evt.name === "anim"){
            //START MOVING CHARACTER
            playSound("swoosh",1,false);
            createjs.Tween.get(_oContainer).to({x:_oContainer.x + 70}, 400, createjs.Ease.linear).call(function(){
                                                                                                                    _oAnimStrafeOut.visible = false;
                                                                                                                    _oContainer.x = _iFinalX;
                                                                                                                    _oAnimStrafeIn.visible = true;
                                                                                                                    _oAnimStrafeIn.gotoAndPlay("anim");
                                                                                                                    
                                                                                                                    playSound("avatar_cut",1,false);
                                                                                                                });
            
        }
    };
    
    this.getCurX = function(){
        return _iFinalX;
    };
    
    this._init(iX,iY);
}