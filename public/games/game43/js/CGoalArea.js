function CGoalArea(iStage, oParentContainer){
    
    var _iStage;
    var _iCurAnim;
    
    var _oParent;
    var _oGoalArea;
    var _oTotalArea;
    
    var _oPost;
    var _oStakeContainer;
    
    this._init = function(iStage, oParentContainer){
        
        _iStage = iStage;
        _iCurAnim = 0;
        
        _oGoalArea = new createjs.Container();
        oParentContainer.addChild(_oGoalArea);
        
        _oStakeContainer = new createjs.Container();
        oParentContainer.addChild(_oStakeContainer);
        
        
        this.setGoalArea(_iStage);
        this.setAreaSprite(_iStage);
    };
    
    this.unload = function(){
        oParentContainer.removeChild(_oGoalArea);
        oParentContainer.removeChild(_oStakeContainer);
    };
    
    this.setGoalArea = function(iNewStage){
        _iStage = iNewStage;
        
        _oGoalArea.removeAllChildren();
        _oStakeContainer.removeAllChildren();
        oParentContainer.removeChild(_oPost);
        
        _oGoalArea.x = GOAL_AREA[_iStage].x;
        _oGoalArea.y = GOAL_AREA[_iStage].y;
        
        _oTotalArea = new createjs.Shape();
        _oTotalArea.graphics.beginFill("rgba(0,255,255,0.5)").drawRect(-GOAL_AREA[_iStage].width/2,-GOAL_AREA[_iStage].height/2, GOAL_AREA[_iStage].width, GOAL_AREA[_iStage].height);

    };
    
    this.setAreaSprite = function(){

        this._stakeArea();
    };
    
    this._stakeArea = function(){
        var iWidth = 50;

        var oStake = new createjs.Shape();
        oStake.graphics.setStrokeStyle(iWidth);        
        oStake.graphics.beginStroke("rgba(255,255,255,0.01)"); 
        
        oStake.graphics.moveTo(STAKE_POS[_iStage][0].x, STAKE_POS[_iStage][0].y);
        for(var i=1; i<STAKE_POS[_iStage].length; i++){
            oStake.graphics.lineTo(STAKE_POS[_iStage][i].x, STAKE_POS[_iStage][i].y);
        }
        _oStakeContainer.addChild(oStake);

        var szTag = _iStage +1;
        var oSprite = s_oSpriteLibrary.getSprite('post_'+szTag);
        _oPost = createBitmap(oSprite);
        _oPost.regX = oSprite.width/2;
        _oPost.regY = oSprite.height/2;
        _oPost.x = POST_POS[_iStage].x - GOAL_AREA[_iStage].x;
        _oPost.y = POST_POS[_iStage].y - GOAL_AREA[_iStage].y;
        _oGoalArea.addChild(_oPost);
    };
    
    this.getAreaHit = function(iXRelative, iYRelative,iAreaHit){

        var iX = GOAL_AREA[_iStage].x + iXRelative*GOAL_AREA[_iStage].width/2;
        var iY = GOAL_AREA[_iStage].y + iYRelative*GOAL_AREA[_iStage].height/2;
        
        var bStakeHit = _oStakeContainer.hitTest(iX, iY);
        if(bStakeHit){
            return {x: iX, y: iY, areahit: NULL_TARGET_POLE, stakehit: true};
        }

        return {x: iX, y: iY, areahit: iAreaHit, stakehit: false};
    };

    
    this.getGlobalPos = function(){
        return oParentContainer.localToGlobal(_oGoalArea.x, _oGoalArea.y);
    };
 
    
    this.getContainer = function(){
        return _oGoalArea;
    };
    
    _oParent = this;
    this._init(iStage, oParentContainer);
    
}


