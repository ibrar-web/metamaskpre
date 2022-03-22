function CGame(oData, iLevel) {
    var _bStartGame;
    var _bScenarioLoaded;

    var _szRedeemLink;

    var _iGameState;
    var _iTimeOutID;
    var _iShuffleTickTime;
    var _iBallsExtractCounter;
    var _iCurBallExtractedIndex;

    var _aProbabilityArray=[];
    var _aBalls;
    var _aBallsToShuffle;
    var _aListNumPlayed;
    var _aListBallsExtracted;
    var _aCombinationToExtract;

    var _oCamera = null;
    var _oGameElementsContainer;
    var _oBallsContainer;
    var _oInterfaceContainer;
    var _oHelpPanel;
    var _oFadeContainer;
    var _oFade;
    var _oInterface;
    var _oPaytable;
    var _oLosePanel;
    var _oWinPanel;
    var _oScene;
    var _oSelectNumbersPanel;
    var _oStartExtractionToggle;
    var _oNumMatchedPanel;
    var _oTubeRadians;
    
    var _oTweenChooseBallToExtract;
    var _oTweenMoveBallToCenter;
    var _oTweenMoveBallToExit;
    var _oTweenBallRotationInCurve;
    var _oTweenBallInTubeCurve;
    var _oTweenBallInTubeLinear;
    var _oTweenBallRotationInLinear;

    var _pStartExtractionTogglePos;
    
    var STATE_INIT = 0;
    var STATE_PLAY = 1;
    
    this._init = function (iLevel) {
        //////ALL LOGICAL OPERATION ON BALLS NUMBERS ARE DONE WITH THEIR INDEX (e.g. the ball number one, have index = 0)
        
        _bScenarioLoaded = false;
        _bStartGame = false;

        _iShuffleTickTime = SHUFFLE_TICK_TIME;
        _iBallsExtractCounter = 0;

        _aBallsToShuffle = new Array();
        _aListBallsExtracted = new Array();

        _oCamera = createOrthoGraphicCamera();  
        _oScene = new CScenario();
        
        var oSprite = s_oSpriteLibrary.getSprite("bg_game");
        var oBg = createBitmap(oSprite);
        s_oStage.addChild(oBg);

        resizeCanvas3D();

        _oGameElementsContainer = new createjs.Container();
        _oGameElementsContainer.x = CANVAS_WIDTH/2;
        _oGameElementsContainer.y = CANVAS_HEIGHT/2;
        s_oStage.addChild(_oGameElementsContainer);

        _oInterfaceContainer = new createjs.Container();
        s_oStage.addChild(_oInterfaceContainer);

        _oFadeContainer = new createjs.Container();
        s_oStage.addChild(_oFadeContainer);

        var oSprite = s_oSpriteLibrary.getSprite('start_extraction_toggle');
        _pStartExtractionTogglePos = {x: 996, y: 800};
        _oStartExtractionToggle = new CToggleExtraction(_pStartExtractionTogglePos.x, _pStartExtractionTogglePos.y, oSprite, true, _oInterfaceContainer);
        _oStartExtractionToggle.addEventListener(ON_MOUSE_UP, this.startExtraction, this);
        _oStartExtractionToggle.setScaleOnClick(false);

        _oInterface = new CInterface(_oInterfaceContainer);

        _oNumMatchedPanel = new CNumMatchedPanel(_oInterfaceContainer);

        _oFadeContainer.addChild(_oFade);

        _oSelectNumbersPanel = new CSelectNumbersPanel();
        _oSelectNumbersPanel.instantShow();

        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oPaytable = new CPaytable(oSprite);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oLosePanel = new CLosePanel(oSprite);
        _oLosePanel.addEventListener(ON_BACK_MENU, this.onExit, this);
        _oLosePanel.addEventListener(ON_RESTART, this.onRestart, this);
        _oLosePanel.addEventListener(ON_REDEEM, this.onRedeem, this);
        
        _oWinPanel = new CWinPanel(oSprite);
        _oWinPanel.addEventListener(ON_BACK_MENU, this.onExit, this);
        _oWinPanel.addEventListener(ON_RESTART, this.onRestart, this);
        _oWinPanel.addEventListener(ON_REDEEM, this.onRedeem, this);
        
        _oHelpPanel = new CHelpPanel(_oInterfaceContainer);
        _oHelpPanel.hide();
    };

    this.refreshButtonPos = function(){
        if(s_bLandscape){
            _oGameElementsContainer.x = CANVAS_WIDTH/2 - 200;
            _oGameElementsContainer.y = CANVAS_HEIGHT/2 - 10;
            
            _oStartExtractionToggle.setPosition(_pStartExtractionTogglePos.x, _pStartExtractionTogglePos.y);
            
            smartResize(_oGameElementsContainer, 0, -330);
        }else {
            _oGameElementsContainer.x = CANVAS_WIDTH/2 - 14;
            _oGameElementsContainer.y = CANVAS_HEIGHT/2 - 100;
            
            _oStartExtractionToggle.setPosition(CANVAS_WIDTH/2, _pStartExtractionTogglePos.y + 200);
            
            smartResize(_oGameElementsContainer, 30, 0);
        }
        
        _oSelectNumbersPanel.smartResize();
        _oPaytable.smartResize();
        _oLosePanel.smartResize();
        _oWinPanel.smartResize();
        _oHelpPanel.refreshPos();
        _oNumMatchedPanel.refreshPos();
    };


    this.convert3dPosTo2dScreen = function (pos, oCamera) {
        var v3 = new THREE.Vector3(pos.x, pos.y, pos.z);
        var vector = v3.project(oCamera);

        var widthHalf = Math.floor(s_iCanvasResizeWidth) * 0.5;
        var heightHalf = Math.floor(s_iCanvasResizeHeight) * 0.5;


        vector.x = ((vector.x * widthHalf) + widthHalf) * s_fInverseScaling;
        vector.y = (-(vector.y * heightHalf) + heightHalf) * s_fInverseScaling;

        return vector;
    };
    
    this.scenarioLoaded = function(){
        _bScenarioLoaded = true;
        _iGameState = STATE_PLAY;
        _bStartGame = true;
        
        this._initProbability();
        this._initGameElements();
        
        this.startBallsShuffle();
        
        s_oGame.refreshButtonPos();
    };
    
    this._initProbability = function(){
        _aProbabilityArray = new Array();
        var iLowerRange = 0;
        var iUpperRange;
        for(var i=0; i<PAYTABLE_SETTINGS.length; i++){
            if(PAYTABLE_SETTINGS[i].win_occurrence === 0){
                ///WILL NEVER OCCURS
                _aProbabilityArray[i] = {   combo: PAYTABLE_SETTINGS[i].num_balls_matched, 
                                            lower_range:-1,
                                            upper_range:-1
                                    };
            } else {
                iUpperRange =  iLowerRange + PAYTABLE_SETTINGS[i].win_occurrence;
            
                _aProbabilityArray[i] = {   combo: PAYTABLE_SETTINGS[i].num_balls_matched, 
                                            lower_range:iLowerRange,
                                            upper_range:iUpperRange
                                        };

                iLowerRange = iUpperRange;           
            }
        }
        
        ////SET NO WIN PROBABILITY
        if(iUpperRange < 100){
            iUpperRange = 100;
            _aProbabilityArray.push({       
                                            combo: 0, 
                                            lower_range:iLowerRange,
                                            upper_range:iUpperRange
                                    });
        }
    };
    
    this._initGameElements = function(){
        
        var oSprite = s_oSpriteLibrary.getSprite('sphere_back_0');
        var oSphereGlass = createBitmap(oSprite);
        oSphereGlass.x = -305;
        oSphereGlass.y = -300;
        _oGameElementsContainer.addChild(oSphereGlass);

        this._init2DBalls();
        
        var oSprite = s_oSpriteLibrary.getSprite('sphere_front_0');
        var oTube = createBitmap(oSprite);
        oTube.x = oSphereGlass.x;
        oTube.y = oSphereGlass.y;
        _oGameElementsContainer.addChild(oTube);
    };
    
    this.setBallSleep = function(iIndex, bVal){
        if(bVal){
            _aBalls[iIndex].getPhysics().sleep();
        }else {
            _aBalls[iIndex].getPhysics().wakeUp();
        }
    };

    this._init2DBalls = function () {
        _oBallsContainer = new createjs.Container();
        _oBallsContainer.x = -CANVAS_WIDTH/2;
        _oBallsContainer.y = -CANVAS_HEIGHT/2;
        _oGameElementsContainer.addChild(_oBallsContainer);
        
        _aBalls = new Array();
        var aBallBodies = _oScene.getBalls();
        for(var i=0; i<aBallBodies.length; i++){
            _aBalls[i] = new CBall(0, 0, aBallBodies[i], _oBallsContainer, /*Math.floor( Math.random()*3)*/i);
        }

        this.updateBallsPosition();
    };

    this.updateBallsPosition = function () {  
        for(var i=0; i<_aBalls.length; i++){
            var oBallBody = _aBalls[i].getPhysics();
            if(oBallBody === undefined){
                return;
            }
            
            var oPos2DBall = this.convert3dPosTo2dScreen(oBallBody.position, _oCamera);

            _aBalls[i].setPosition(oPos2DBall.x, oPos2DBall.y);
            _aBalls[i].rolls();
        }

        _oBallsContainer.sortChildren(this.sortFunction);
    };
    
    this.sortFunction = function(obj1, obj2, options) {
        if (obj1.z > obj2.z) { return -1; }
        if (obj1.z < obj2.z) { return 1; }
        
        return 0;
    };
    
    this.startBallsShuffle = function(){
        if(_aBallsToShuffle.length === 0 ){
            for(var i=0; i<TOTAL_NUMBERS; i++){
                _aBallsToShuffle.push(i);
            }
            shuffle(_aBallsToShuffle)
        }

        var iRandomIndex;
        for(var i=0; i<SHUFFLE_NUM_BALL_TO_MOVE_PER_TICK; i++){
            iRandomIndex = _aBallsToShuffle[_aBallsToShuffle.length-1];
            
            if(_aListBallsExtracted.indexOf(iRandomIndex) === -1){
                s_oScenario.addImpulse(iRandomIndex);
            }
            _aBallsToShuffle.splice(_aBallsToShuffle.length-1,1);
            if(_aBallsToShuffle.length === 0){
                break;
            }
        }

        //////// LIMITS ANGULAR SPEED IF EXCEED
        for(var i=0; i<_aBalls.length; i++){
            if(_aBalls[i].getPhysics().angularVelocity.lengthSquared() > 1000){
                _aBalls[i].getPhysics().angularVelocity.scale(0.3, _aBalls[i].getPhysics().angularVelocity);
            }
        }
    };
    
    this.chooseABallToExtract = function(){
        ////CHOOSE HOW TO EXTRACT BALL, BASED IF USER HAVE TO WIN OR NOT
        _iCurBallExtractedIndex = _aCombinationToExtract[_iBallsExtractCounter];

        var iTime = 300+Math.random()*300;
        var oVoidTarget;
        _oTweenChooseBallToExtract = createjs.Tween.get(oVoidTarget).to({}, iTime).call(function(){
            s_oGame.moveBallToTheCenterBeforeTheExit();
        });
       
    };
    
    this.moveBallToTheCenterBeforeTheExit = function(){
        var iY = 37;
        _oTweenMoveBallToCenter = createjs.Tween.get(_aBalls[_iCurBallExtractedIndex].getPhysics().position).to({x: 0, y: iY, z:-1}, 1500, createjs.Ease.cubicIn).call(function(){
            s_oGame.moveBallToTheExit();
        });
    };
    
    this.moveBallToTheExit = function(){
        ////I SHOULD FIND HOW TO REMOVE COLLISION FROM THE SLEEPY BALL
        _oScene.getWorld().removeBody( _aBalls[_iCurBallExtractedIndex].getPhysics() ); 
        _aListBallsExtracted.push(_iCurBallExtractedIndex);
        s_oGame.setBallSleep(_iCurBallExtractedIndex, true);
        _aBalls[_iCurBallExtractedIndex].setBallFrame(0);

        var iY = 44;
        
        _oTweenMoveBallToExit = createjs.Tween.get(_aBalls[_iCurBallExtractedIndex].getPhysics().position).to({x: 0, y: iY, z:-1}, 200, createjs.Ease.cubicIn).call(function(){
            s_oGame.moveBallToTheEndOfTube();
        });
    };
    
    this.moveBallToTheEndOfTube = function(){
        playSound("ball_extracted",1, false);
        

        var iCurveTime = 2500;
        var iLinearTime = iCurveTime*0.4;

        var iOffset = 9.5;      ///X
        var iStartTubeDeg = 90;
        var iEndTubeDeg = 270;
        var iStartTubeRadius = 44;
        var iEndTubeRadius = 47;
        var iLinearTubeEndX = 50;

        var oTubeRadians = {value : iStartTubeDeg}
        _oTubeRadians = oTubeRadians;
        var oCurBall = _aBalls[_iCurBallExtractedIndex];
        var iCurCounter = _iBallsExtractCounter;
        
        //////PRECALCULATE END SPOT////////
        var iX = iLinearTubeEndX - iOffset*iCurCounter;
        if(iX <= -iOffset/2){
            var iDegFactor = -70;
            var iMidTubeDeg = iStartTubeDeg + (iEndTubeDeg - iStartTubeDeg)/2
            
            iEndTubeDeg = linearFunction(iX, 0, iDegFactor, iEndTubeDeg, iMidTubeDeg)
        }

        _oTweenBallRotationInCurve = createjs.Tween.get(oCurBall.getSprite()).to({rotation:0}, iCurveTime*0.4/*1500*/).to({rotation:220}, iCurveTime*0.6/*2000*/);
        
        oCurBall.fallInTubeAnim();

        _oTweenBallInTubeCurve = createjs.Tween.get(oTubeRadians).to({value:iEndTubeDeg}, iCurveTime/*, createjs.Ease.cubicInOut*/).
                call(function(){
                    
                    var iTime = linearFunction(iX, 0, iLinearTubeEndX, 0, iLinearTime)

                    if(iX > -iOffset/2){
                        ///WE ARE IN LINEAR TUBE
                        _oTweenBallInTubeLinear = createjs.Tween.get(oCurBall.getPhysics().position).to({x: iX}, iTime);
                        
                        ////ROTATE///
                        var iMaxRotation = 440 + Math.random()*40;
                        var iRot = linearFunction(iX, 0, iLinearTubeEndX, 220, iMaxRotation)
                        _oTweenBallRotationInLinear = createjs.Tween.get(oCurBall.getSprite()).to({rotation:iRot}, iTime).call(function(){
                            oCurBall.endFallingTube();
                        });
                        /////////////
                    } else {
                        oCurBall.endFallingTube();
                    }
                    
                    if(iCurCounter === NUMBERS_TO_PICK-1){
                        s_oGame.extractionFinish();
                    };
                });
                
                
        _oTweenBallInTubeCurve.addEventListener("change", function(){
            var iCurRadians = degreesToRadians(oTubeRadians.value);
            var iCurRadius = linearFunction(oTubeRadians.value, iStartTubeDeg, iEndTubeDeg, iStartTubeRadius, iEndTubeRadius);
            var oPos = findPointOnCircle(0,0,iCurRadius,iCurRadians);

            oCurBall.getPhysics().position.x = oPos.x;
            oCurBall.getPhysics().position.y = oPos.y;
            oCurBall.getPhysics().position.z = 0;
        });

        /////DON'T WAIT THE END OF TUBE ANIMATION - BETTER
        s_oGame.onBallExtracted();
        
    };
    
    this.onBallExtracted = function(){
        if(_aListNumPlayed.indexOf(_iCurBallExtractedIndex) !== -1){
            s_oInterface.litPlayedNumber(_iCurBallExtractedIndex);
            
            _oNumMatchedPanel.show(_iCurBallExtractedIndex+1);
        }
        
        _iBallsExtractCounter++;
        
        if(_iBallsExtractCounter !== NUMBERS_TO_PICK){
            s_oGame.chooseABallToExtract();
        }
    };
    
    this.playACombination = function(aCombination){
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
        playSound("balls_shuffle", 1, true);
        _oHelpPanel.show();
        
        _aListNumPlayed = [];
        _aListNumPlayed = aCombination;
        
        s_oInterface.setPlayedNumbers(_aListNumPlayed);
    };
    
    this.startExtraction = function(){
        playSound("start_extraction",1,false);
        
        _oHelpPanel.hide();
        
        _aListBallsExtracted = new Array();
        _aCombinationToExtract = new Array();
        
        _aCombinationToExtract = this._getCombination();
        
        
        _oStartExtractionToggle.setClickable(false);
        s_oGame.chooseABallToExtract();
    };
    
    this.extractionFinish = function(){
        stopSound("balls_shuffle");
        
        var iNumBallsMatched = 0;
        for(var i=0; i<_aCombinationToExtract.length; i++){
            if(_aListNumPlayed.indexOf(_aCombinationToExtract[i]) !== -1){
                iNumBallsMatched++;
            }
        }
        

        var aInfo = s_oInterface.getNumbersInfo();
        var oPrizeInfo = this._getPrize(iNumBallsMatched);
        
        $(s_oMain).trigger("save_score",oPrizeInfo.index);
        $(s_oMain).trigger("share_event", oPrizeInfo.index);
        
        _szRedeemLink = oPrizeInfo.redeem_link;
        
        if(oPrizeInfo.prize_img_url){
            _oWinPanel.show(aInfo, _aListBallsExtracted, oPrizeInfo);
        } else{
            _oLosePanel.show(aInfo, _aListBallsExtracted, oPrizeInfo);
        }
    };
    
    this._getPrize = function(iNumBallsMatched){
        var oPrizeInfo;
        
        for(var i=0; i<PAYTABLE_SETTINGS.length; i++){
            if(PAYTABLE_SETTINGS[i].num_balls_matched === iNumBallsMatched){
                oPrizeInfo = PAYTABLE_SETTINGS[i];
                oPrizeInfo.index = i;
            }
        }
        
        return oPrizeInfo;
    };
    
    this._getCombination = function(){
        var iRandNumber = Math.random()*100;
        
        var iNumComboToGet;
        for(var i=0; i<_aProbabilityArray.length; i++){

            if(iRandNumber>=_aProbabilityArray[i].lower_range && iRandNumber<_aProbabilityArray[i].upper_range){
                iNumComboToGet = _aProbabilityArray[i].combo;
            }
        }

        var iNumLoseBalls = NUMBERS_TO_PICK - iNumComboToGet;
        
        var aWinCombination = this._getBallsFromPlayedList(iNumComboToGet);
        var aLoseCombination = this._getNonPlayedBalls(iNumLoseBalls);
        
        var aCombination = aWinCombination.concat(aLoseCombination);

        shuffle(aCombination);

        return aCombination;
    };
    
    this._getBallsFromPlayedList = function(iNum){
        var aCombination = _aListNumPlayed.slice();

        shuffle(aCombination);
        
        aCombination.splice(iNum);

        return aCombination;
    };
    
    this._getNonPlayedBalls = function(iNum){
        var aCombination = new Array();

        for(var i=0; i<iNum; i++){
            var iNextNum = Math.floor( Math.random()*TOTAL_NUMBERS );
            while(_aListNumPlayed.indexOf(iNextNum) !== -1 || aCombination.indexOf(iNextNum) !== -1){
                iNextNum = Math.floor( Math.random()*TOTAL_NUMBERS );
            }
            
            aCombination.push(iNextNum);
        }

        return aCombination;
    };
    
    this.getCamera = function(){
        return _oCamera;
    };

    this.getStartButPosition = function(){
        return _oStartExtractionToggle.getPosition();
    };
    
    this.unload = function () {
        clearTimeout(_iTimeOutID);
        stopSound("balls_shuffle");
        if(_aBalls[_iCurBallExtractedIndex] !== undefined && _aBalls[_iCurBallExtractedIndex] !== null){
            createjs.Tween.removeTweens(_aBalls[_iCurBallExtractedIndex]);
            createjs.Tween.removeTweens(_aBalls[_iCurBallExtractedIndex].getSprite());
            createjs.Tween.removeTweens(_aBalls[_iCurBallExtractedIndex].getPhysics().position);
            createjs.Tween.removeTweens(_oTubeRadians);
        }

        _bStartGame = false;

        _oStartExtractionToggle.unload();
        
        s_oStage.removeAllChildren();
        _oInterface.unload();

        _oLosePanel.unload();
        _oWinPanel.unload();
        _oSelectNumbersPanel.unload();
    };


    this.onExit = function () {
        s_oGame.unload();

        $(s_oMain).trigger("end_session");
        setVolume("soundtrack", 1);
        s_oMain.gotoMenu();
    };

    this.onRestart = function () {
        _iBallsExtractCounter = 0;
        
        _aBallsToShuffle = new Array();
        
        _oStartExtractionToggle.setActive(true);
        _oStartExtractionToggle.setClickable(true);
        
        s_oGame.resetBallsPositions();
        
        _aListBallsExtracted = new Array();
        
        _oSelectNumbersPanel.show();
    };

    this.resetBallsPositions = function(){
        ///RESET ALL BALLS PARAMS
        var aRandomStartPosition = s_oScenario.getRandomStartPositions();
        for(var i=0; i<_aBalls.length; i++){
            _aBalls[i].reset();
            
            
            var oBallBody = _aBalls[i].getPhysics();
            oBallBody.position.copy(aRandomStartPosition[i]);
        }
        
        ///RETURN BALLS EXTRACTED IN WORLD SIMULATION
        for(var i=0; i<_aListBallsExtracted.length; i++){
            var oBallBody = _aBalls[_aListBallsExtracted[i]].getPhysics();
            _oScene.getWorld().addBody( oBallBody );
            
            ///DELETE A DIRTY PROPERTY GENERATED BY CREATEJS TWEEN
            createjs.Tween.removeTweens(oBallBody.position);
            delete oBallBody.position.tweenjs_count;
        }
    };

    this.showPaytable = function(){
        _oPaytable.show();
    };

    this.onRedeem = function(){
        s_oGame.onExit();
        window.open(_szRedeemLink);
    };

    this._updateInit = function () {
        _oScene.update();
    };

    this.pause = function(bVal){
        _bStartGame = !bVal;
        
        for(var i=0; i<_aListBallsExtracted.length; i++){
            var iIndex = _aListBallsExtracted[i];
            _aBalls[iIndex].pauseAnim(bVal) 
        };
        
        if(_oTweenChooseBallToExtract){
            _oTweenChooseBallToExtract.paused = bVal;
        }
        if(_oTweenMoveBallToCenter){
            _oTweenMoveBallToCenter.paused = bVal;
        }
        if(_oTweenMoveBallToExit){
            _oTweenMoveBallToExit.paused = bVal;
        }
        if(_oTweenBallRotationInCurve){
            _oTweenBallRotationInCurve.paused = bVal;
        }
        if(_oTweenBallInTubeCurve){
            _oTweenBallInTubeCurve.paused = bVal;
        }
        if(_oTweenBallInTubeLinear){
            _oTweenBallInTubeLinear.paused = bVal;
        }
        if(_oTweenBallRotationInLinear){
            _oTweenBallRotationInLinear.paused = bVal;
        }
    };
   
    this._updatePlay = function () {
        if (_bStartGame) {
            _oScene.update();
            
            this.updateBallsPosition();
            
            _iShuffleTickTime -= s_iTimeElaps;
            if(_iShuffleTickTime<= 0){
                _iShuffleTickTime = SHUFFLE_TICK_TIME;
                this.startBallsShuffle();
            }
        }
    };

    this.update = function () {
        
        switch (_iGameState) {
            case STATE_INIT:
                {
                    this._updateInit();
                }
                break;
            case STATE_PLAY:
                {
                    this._updatePlay();
                }
                break;
        }
    };

    s_oGame = this;


    this._init(iLevel);
}

var s_oGame;