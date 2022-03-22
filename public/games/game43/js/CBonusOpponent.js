function CBonusOpponent(iIndex,pPos,pFinalPos,oParentContainer){
    var _iIndex = iIndex;
    var _aCbCompleted;
    var _aCbOwner;
    var _pStartPos;
    var _pFinalPos;
    
    var _oSpriteRun;
    var _oSpriteTackle;
    var _oContainer;
    var _oParentContainer;
    
    var _oThis = this;
    
    this._init = function(pPos,pFinalPos){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        _pStartPos = pPos;
        _pFinalPos = pFinalPos;
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oContainer.x = pPos.x;
        _oContainer.y = pPos.y;
        _oContainer.scaleX = _oContainer.scaleY = 0.1;
        _oParentContainer.addChild(_oContainer);
        
        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("enemy_running-0"),
                                        s_oSpriteLibrary.getSprite("enemy_running-1"),
                                        s_oSpriteLibrary.getSprite("enemy_running-2")
                                        
                                    ],

                        framerate: 30,
                        frames: [
                            [1, 1, 551, 698, 0, -9, -30],
                            [554, 1, 550, 707, 0, -5, -21],
                            [1106, 1, 551, 717, 0, 0, -11],
                            [1, 720, 551, 725, 0, 0, -3],
                            [554, 720, 552, 726, 0, 0, -2],
                            [1108, 720, 549, 722, 0, -4, -6],
                            [1, 1, 545, 714, 1, -11, -14],
                            [548, 1, 521, 703, 1, -24, -25],
                            [1071, 1, 536, 695, 1, -19, -33],
                            [1, 717, 566, 698, 1, -2, -30],
                            [569, 717, 577, 709, 1, 0, -19],
                            [1148, 717, 579, 718, 1, 0, -10],
                            [1, 1, 572, 724, 2, 0, -4],
                            [575, 1, 567, 725, 2, 0, -3],
                            [1144, 1, 562, 721, 2, 0, -7],
                            [1, 728, 554, 714, 2, 0, -14],
                            [557, 728, 544, 702, 2, -3, -26],
                            [1103, 728, 556, 698, 2, -3, -30]
                        ],

                        animations: { start:0, anim: [0,17]}
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _oSpriteRun = createSprite(oSpriteSheet,"start");
        _oContainer.addChild(_oSpriteRun);



        var oData = {   
                        images: [
                                        s_oSpriteLibrary.getSprite("enemy_tackle-0"),
                                        s_oSpriteLibrary.getSprite("enemy_tackle-1")
                                        
                                    ],

                        framerate: 30,
                        frames: [
                                    [1, 1, 585, 688, 0, -6, -50],
                                    [588, 1, 598, 659, 0, -17, -80],
                                    [1188, 1, 602, 629, 0, -27, -112],
                                    [1, 691, 571, 570, 0, -50, -171],
                                    [574, 691, 552, 536, 0, -63, -205],
                                    [1128, 691, 612, 503, 0, -70, -238],
                                    [1, 1263, 646, 496, 0, -82, -245],
                                    [649, 1263, 710, 493, 0, -61, -248],
                                    [1361, 1263, 656, 502, 0, -85, -239],
                                    [1, 1, 659, 516, 1, -93, -225],
                                    [662, 1, 500, 536, 1, -126, -205],
                                    [1164, 1, 543, 534, 1, -80, -207],
                                    [1, 539, 562, 530, 1, -58, -211],
                                    [565, 539, 568, 520, 1, -48, -221],
                                    [1135, 539, 566, 511, 1, -44, -230],
                                    [1, 1071, 555, 501, 1, -48, -240],
                                    [558, 1071, 549, 485, 1, -52, -256],
                                    [1109, 1071, 550, 441, 1, -72, -300]
                                ],

                        animations: { start:0, anim: [0,17,"stop"],stop:18}
        };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSpriteTackle = createSprite(oSpriteSheet,"start");
        _oSpriteTackle.on("animationend",this._onEndTackle,this);
        _oContainer.addChild(_oSpriteTackle);
        
        
        _oContainer.regX = 402;
        _oContainer.regY = 728;
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.reset = function(){
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
        _oContainer.scaleX = _oContainer.scaleY = 0.1;
        
        
        _oSpriteRun.visible = false;
        _oSpriteTackle.visible = false;
    };
    
    this.show = function(iTime){
	this.reset();
        setTimeout(function(){_oThis._startRun();},iTime);
    };
    
    this._startRun = function(){
        _oSpriteRun.visible = true;
        _oSpriteRun.gotoAndPlay("anim");

        _oContainer.alpha = 0;
        _oContainer.visible = true;
        
        
        new createjs.Tween.get(_oContainer).to({alpha:1},500);
        new createjs.Tween.get(_oContainer).to({scaleX:1,scaleY:1,x:_pFinalPos.x,y:_pFinalPos.y},TIME_OPPONENT_RUN,createjs.Ease.cubicIn).call(function(){
            if(_aCbCompleted[ON_OPPONENT_TACKLE]){
                _aCbCompleted[ON_OPPONENT_TACKLE].call(_aCbOwner[ON_OPPONENT_TACKLE],_iIndex);
            }
        });
        
        setTimeout(function(){
                _oThis._changeAnim();
                playSound("enemy",1,false);
            },2500);
    };
    
    this.hide = function(){
        _oContainer.visible = false;

        if(_aCbCompleted[ON_OPPONENT_HIDE]){
            _aCbCompleted[ON_OPPONENT_HIDE].call(_aCbOwner[ON_OPPONENT_HIDE]);
        }
    };

    this._changeAnim = function(){
        _oSpriteRun.visible = false;
        _oSpriteRun.gotoAndStop("start");
        _oSpriteTackle.visible = true;
        _oSpriteTackle.gotoAndPlay("anim");
    };
    
    this._onEndTackle = function(evt){
        if(evt.currentTarget.currentAnimation === "anim"){
            this.hide();
        }
    };
    
    _oParentContainer = oParentContainer;
    this._init(pPos,pFinalPos);
}