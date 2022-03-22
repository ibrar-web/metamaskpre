function CBall(iXPos, iYPos, oPhysics, oParentContainer, iIndex) {

    var _iNumSprite;
    var _iRadiansForSprite;
    var _iDoublePI;

    var _oBall;
    var _oParentContainer;
    var _oPhysics;
    var _oContainer;
    var _iFrame = 0;
    var _oTween = null;
    var _bInTube;
    var _bTubeAnim;

    this._init = function () {
        _bInTube = false;
        _bTubeAnim = false;
        
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        
        var szBallNumber = iIndex+1;
        var iRepetition = 4;
        var aSprite = new Array();
        for(var i=0; i<iRepetition; i++){
            aSprite.push( s_oSpriteLibrary.getSprite("ball_"+szBallNumber) );
        }

        _iNumSprite = iRepetition*NUM_FRAMES_PER_BALL;
        _iDoublePI = 2*Math.PI;
        _iRadiansForSprite = _iDoublePI / _iNumSprite;
        
        var iWidth = aSprite[0].width/NUM_FRAMES_PER_BALL;
        var iHeight = aSprite[0].height;
        
        var oWaitAnim = {frames: [0,0,0,0,0,0,0,0], next: "roll", speed: 0.5 };
        
        var oData = {
            framerate: 60,
            images: aSprite,
            // width, height & registration point of each sprite
            frames: {width: iWidth, height: iHeight, regX: iWidth / 2, regY: iHeight / 2},
            animations: {stop: [0], waittoroll: oWaitAnim, roll: [0,_iNumSprite-1, "roll", 0.6]}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oBall = createSprite(oSpriteSheet, 0, iWidth/2, iHeight / 2, iWidth, iHeight);
        _oBall.stop();
        _oContainer.addChild(_oBall);
        
        var oText = new createjs.Text(szBallNumber, "36px " + PRIMARY_FONT, "#fff");
        oText.x = 0;
        oText.y = 4;
        oText.textAlign = "center";
        oText.textBaseline = "middle";
    };

    this.rolls = function () {
        if(_bInTube){
            return;
        }
        
        var euler = {x:0, y:0, z:0};
        _oPhysics.quaternion.toEuler(euler,"YZX");

        //////NORMALIZE FORWARD ROTATION (X)
        if(euler.x<=0){
            euler.x *= -1;
        } else {
            euler.x = _iDoublePI - euler.x;
        }

        var iSpriteIndex = Math.floor(Math.abs(euler.x / _iRadiansForSprite));

        _oBall.gotoAndStop(iSpriteIndex);
        
        //////NORMALIZE ROLL ROTATION (Y)
        if(euler.y<=0){
            euler.y *= -1;
        } else {
            euler.y = _iDoublePI - euler.y;
        }
        
        var iRotation = Math.degrees(_iDoublePI -euler.y);
        _oBall.rotation = iRotation;        
    };
    
    this.setBallFrame = function(iFrame){
        _oBall.gotoAndStop(iFrame);
    };
    
    this.fallInTubeAnim = function(){
        _bInTube = true;
        _bTubeAnim = true;
        
        _oBall.rotation = 180;
        
        _oBall.framerate = 50 + Math.round( Math.random()*10 );
        _oBall.gotoAndPlay("waittoroll");
    };
    
    this.endFallingTube = function(){
        _bTubeAnim = false;
        _oBall.gotoAndStop(_oBall.currentFrame)
    };
    
    this.pauseAnim = function(bVal){
        if(_bTubeAnim){
            _oBall.paused = bVal;
        }
    };
    
    this.reset = function(){
        _bTubeAnim = false;
        _bInTube = false;
        this.resetBodyPhysicParams();
    };
    
    this.resetBodyPhysicParams = function(){
        // orientation
        oPhysics.quaternion.set(0,0,0,1);
        oPhysics.initQuaternion.set(0,0,0,1);
        oPhysics.interpolatedQuaternion.set(0,0,0,1);

        // Velocity
        oPhysics.velocity.setZero();
        oPhysics.initVelocity.setZero();
        oPhysics.angularVelocity.setZero();
        oPhysics.initAngularVelocity.setZero();

        // Force
        oPhysics.force.setZero();
        oPhysics.torque.setZero();

        // Sleep state reset
        oPhysics.sleepState = 0;
        oPhysics.timeLastSleepy = 0;
        oPhysics._wakeUpAfterNarrowphase = false;
    };
    
    this.unload = function () {
        _oBall.removeAllEventListeners();
        _oParentContainer.removeChild(_oBall);
    };

    this.setVisible = function (bVisible) {
        _oContainer.visible = bVisible;
    };

    this.fadeAnimation = function (fVal, iTime, iWait) {
        this.tweenFade(fVal, iTime, iWait);
    };

    this.tweenFade = function (fVal, iTime, iWait) {
        _oTween = createjs.Tween.get(_oContainer, {override: true}).wait(iWait).to({alpha: fVal}, iTime).call(function () {
            _oTween = null;
        });
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
        
        _oContainer.z = _oPhysics.position.z;
    };

    this.getPosition = function(){
        return {x: _oBall.x, y: _oBall.y};
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.setAngle = function (iAngle) {
        _oBall.rotation = iAngle;
    };

    this.getX = function () {
        return _oBall.x;
    };

    this.getY = function () {
        return _oBall.y;
    };

    this.scale = function (fValue) {
        _oBall.scaleX = fValue;
        _oBall.scaleY = fValue;
    };

    this.getScale = function () {
        return _oBall.scaleX;
    };

    this.getObject = function () {
        return _oContainer;
    };

    this.getSprite = function () {
        return _oBall;
    };

    this.getDepthPos = function () {
        return _oPhysics.position.y;
    };

    _oPhysics = oPhysics;
    _oParentContainer = oParentContainer;

    this._init();

    return this;
}
