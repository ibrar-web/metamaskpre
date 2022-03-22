function CAvatar(oParentContainer){
    var _pStartPosAvatar;
    
    var _oSpriteIdle;
    var _oSpriteWin1;
    var _oSpriteWin2;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(){
        _pStartPosAvatar = {x:-90,y:105};
        
        _oContainer = new createjs.Container();
        _oContainer.x = 50;
        _oContainer.y = _pStartPosAvatar.y;
        _oParentContainer.addChild(_oContainer);
        
        
        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("avatar_idle-0"),
                                        s_oSpriteLibrary.getSprite("avatar_idle-1"),
                                        s_oSpriteLibrary.getSprite("avatar_idle-2")
                                    ],

                        framerate: 15,
                        frames: [
                            [1, 1, 364, 692, 0, 0, 0],
                            [367, 1, 364, 692, 0, 0, 0],
                            [733, 1, 364, 692, 0, 0, 0],
                            [1099, 1, 364, 692, 0, 0, 0],
                            [1465, 1, 364, 692, 0, 0, 0],
                            [1, 695, 364, 692, 0, 0, 0],
                            [367, 695, 364, 692, 0, 0, 0],
                            [733, 695, 364, 692, 0, 0, 0],
                            [1099, 695, 364, 692, 0, 0, 0],
                            [1465, 695, 364, 692, 0, 0, 0],
                            [1, 1, 364, 692, 1, 0, 0],
                            [367, 1, 364, 692, 1, 0, 0],
                            [733, 1, 364, 692, 1, 0, 0],
                            [1099, 1, 364, 692, 1, 0, 0],
                            [1465, 1, 364, 692, 1, 0, 0],
                            [1, 695, 364, 692, 1, 0, 0],
                            [367, 695, 364, 692, 1, 0, 0],
                            [733, 695, 364, 692, 1, 0, 0],
                            [1099, 695, 364, 692, 1, 0, 0],
                            [1465, 695, 364, 692, 1, 0, 0],
                            [1, 1, 364, 692, 2, 0, 0],
                            [367, 1, 364, 692, 2, 0, 0],
                            [733, 1, 364, 692, 2, 0, 0],
                            [1099, 1, 364, 692, 2, 0, 0],
                            [1465, 1, 364, 692, 2, 0, 0],
                            [1, 695, 364, 692, 2, 0, 0],
                            [367, 695, 364, 692, 2, 0, 0],
                            [733, 695, 364, 692, 2, 0, 0],
                            [1099, 695, 364, 692, 2, 0, 0],
                            [1465, 695, 364, 692, 2, 0, 0]
                        ],

                        animations: { start:0, anim: [0,29]}
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSpriteIdle = createSprite(oSpriteSheet,"anim",0,0,364,692);
        _oContainer.addChild(_oSpriteIdle);
        
        
        
         var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("avatar_win1-0"),
                                        s_oSpriteLibrary.getSprite("avatar_win1-1"),
                                        s_oSpriteLibrary.getSprite("avatar_win1-2")
                                    ],

                        framerate: 30,
                        frames: [
                            [1, 1, 342, 547, 0, -22, -145],
                            [345, 1, 342, 542, 0, -22, -150],
                            [689, 1, 342, 539, 0, -22, -153],
                            [1033, 1, 342, 534, 0, -22, -158],
                            [1377, 1, 346, 521, 0, -18, -171],
                            [1, 550, 356, 518, 0, -8, -174],
                            [359, 550, 364, 518, 0, 0, -174],
                            [725, 550, 364, 525, 0, 0, -167],
                            [1091, 550, 348, 564, 0, -16, -128],
                            [1441, 550, 335, 602, 0, -29, -90],
                            [1, 1154, 331, 635, 0, -33, -57],
                            [334, 1154, 325, 667, 0, -39, -25],
                            [661, 1154, 313, 681, 0, -51, -11],
                            [976, 1154, 308, 639, 0, -56, -53],
                            [1286, 1154, 303, 610, 0, -61, -82],
                            [1591, 1154, 304, 608, 0, -60, -84],
                            [1, 1, 311, 599, 1, -53, -93],
                            [314, 1, 323, 588, 1, -41, -104],
                            [639, 1, 330, 574, 1, -34, -118],
                            [971, 1, 335, 559, 1, -28, -133],
                            [1308, 1, 339, 530, 1, -24, -162],
                            [1649, 1, 343, 520, 1, -19, -172],
                            [1, 602, 345, 515, 1, -17, -177],
                            [348, 602, 346, 514, 1, -17, -178],
                            [696, 602, 347, 523, 1, -17, -169],
                            [1045, 602, 347, 529, 1, -17, -163],
                            [1394, 602, 347, 533, 1, -17, -159],
                            [1, 1137, 345, 537, 1, -19, -155],
                            [348, 1137, 343, 537, 1, -21, -155],
                            [693, 1137, 342, 537, 1, -22, -155],
                            [1037, 1137, 342, 537, 1, -22, -155],
                            [1381, 1137, 341, 537, 1, -23, -155],
                            [1, 1, 340, 538, 2, -24, -154],
                            [343, 1, 340, 538, 2, -24, -154],
                            [685, 1, 340, 539, 2, -24, -153],
                            [1027, 1, 342, 543, 2, -22, -149],
                            [1, 546, 342, 544, 2, -22, -148],
                            [345, 546, 342, 546, 2, -22, -146],
                            [689, 546, 342, 547, 2, -22, -145]
                        ],

                        animations: { start:0, anim: { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38] }}
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSpriteWin1 = createSprite(oSpriteSheet, "start");
        _oSpriteWin1.on("animationend",this._onAnimationEnd,this);
        _oSpriteWin1.visible = false;
        _oContainer.addChild(_oSpriteWin1);
        
        
        
        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("avatar_win2-0"),
                                        s_oSpriteLibrary.getSprite("avatar_win2-1"),
                                        s_oSpriteLibrary.getSprite("avatar_win2-2")
                                    ],

                        framerate: 30,
                        frames: [
                            [1, 1, 323, 547, 0, -36, -145],
                            [326, 1, 325, 545, 0, -34, -147],
                            [653, 1, 326, 540, 0, -33, -152],
                            [981, 1, 333, 535, 0, -24, -157],
                            [1316, 1, 335, 531, 0, -21, -161],
                            [1653, 1, 334, 529, 0, -20, -163],
                            [1, 550, 333, 526, 0, -19, -166],
                            [336, 550, 325, 521, 0, -28, -171],
                            [663, 550, 331, 519, 0, -25, -173],
                            [996, 550, 334, 517, 0, -24, -175],
                            [1332, 550, 335, 517, 0, -23, -175],
                            [1669, 550, 341, 520, 0, -20, -172],
                            [1, 1078, 341, 523, 0, -21, -169],
                            [344, 1078, 337, 526, 0, -26, -166],
                            [683, 1078, 336, 540, 0, -27, -152],
                            [1021, 1078, 337, 584, 0, -27, -108],
                            [1360, 1078, 340, 603, 0, -24, -89],
                            [1702, 1078, 339, 612, 0, -24, -80],
                            [1, 1, 332, 612, 1, -32, -80],
                            [335, 1, 331, 614, 1, -33, -78],
                            [668, 1, 332, 615, 1, -32, -77],
                            [1002, 1, 332, 614, 1, -32, -78],
                            [1336, 1, 329, 610, 1, -34, -82],
                            [1667, 1, 330, 591, 1, -34, -101],
                            [1, 618, 333, 573, 1, -31, -119],
                            [336, 618, 336, 550, 1, -28, -142],
                            [674, 618, 338, 531, 1, -25, -161],
                            [1014, 618, 345, 531, 1, -19, -161],
                            [1361, 618, 339, 531, 1, -21, -161],
                            [1702, 618, 335, 530, 1, -25, -162],
                            [1, 1193, 324, 530, 1, -33, -162],
                            [327, 1193, 324, 530, 1, -33, -162],
                            [653, 1193, 323, 530, 1, -33, -162],
                            [978, 1193, 322, 531, 1, -33, -161],
                            [1302, 1193, 321, 532, 1, -33, -160],
                            [1625, 1193, 320, 532, 1, -35, -160],
                            [1, 1, 323, 533, 2, -32, -159],
                            [326, 1, 322, 534, 2, -33, -158],
                            [650, 1, 324, 537, 2, -33, -155],
                            [1, 540, 324, 539, 2, -33, -153],
                            [327, 540, 323, 541, 2, -35, -151],
                            [1, 1083, 326, 544, 2, -33, -148],
                            [329, 1083, 326, 547, 2, -34, -145]
                        ],

                        animations: { start:0, anim: { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42] }}
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSpriteWin2 = createSprite(oSpriteSheet, "start");
        _oSpriteWin2.on("animationend",this._onAnimationEnd,this);
        _oSpriteWin2.visible = false;
        _oContainer.addChild(_oSpriteWin2);
        
        this.refreshButtonPos();
    };
    
    this._hideAllAnims = function(){
        _oSpriteIdle.visible = false;
        _oSpriteWin1.visible = false;
        _oSpriteWin2.visible = false;
    };
    
    this.refreshButtonPos = function(){
        if( s_iOffsetX  > 150){
            _oContainer.x = _pStartPosAvatar.x + s_iOffsetX;
        }else{
            _oContainer.x = 60;
        }
    };
    
    this.show = function(iAnim){
        switch(iAnim){
            case 0:{
                    _oSpriteIdle.visible = true;
                    _oSpriteWin1.visible = false;
                     _oSpriteWin2.visible = false;
                    _oSpriteWin1.gotoAndStop("start");
                    _oSpriteWin2.gotoAndStop("start");
                    _oSpriteIdle.gotoAndPlay("anim");
                    break;
            }
            case 1:{
                    _oSpriteIdle.visible = false;
                    _oSpriteWin1.visible = true;
                    _oSpriteWin2.visible = false;
                    _oSpriteWin1.gotoAndPlay("anim");
                    break;
            }
            case 2:{
                    _oSpriteIdle.visible = false;
                    _oSpriteWin1.visible = false;
                    _oSpriteWin2.visible = true;
                    _oSpriteWin2.gotoAndPlay("anim");
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