function CBallFreekicks(iX, iY, oParentContainer,oParent){
    
    var _iStartX;
    var _iMaxNumWaveAnim;
    var _iWaveFrequency;
    
    var _oBallContainer;
    var _oBall;
    var _oThis;
    var _oParent = oParent;
    
    this._init = function(iX, iY, oParentContainer){
        
        _iStartX = iX;
        _iMaxNumWaveAnim = 2;
        _iWaveFrequency = 300;
        
        _oBallContainer = new createjs.Container();
        _oBallContainer.x = iX;
        _oBallContainer.y = iY;
        oParentContainer.addChild(_oBallContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('ball_freekicks');
        var iFrameWidth = oSprite.width/2;
        var iFrameHeight = oSprite.height/6;
        var oData = {   
                        images: [oSprite],
                        framerate: 30,
                        // width, height & registration point of each sprite
                        frames: {width: iFrameWidth, height: iFrameHeight, regX: iFrameWidth/2, regY: iFrameHeight/2}, 
                        animations: {launch:[0,11,"launch"]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oBall = createSprite(oSpriteSheet, "launch",0,0,0,0);
        _oBall.gotoAndStop("launch");
        _oBallContainer.addChild(_oBall);
        
    };
    
    this.unload = function(){
        oParentContainer.removeChild(_oBallContainer);
    };

    this.launch = function(iEndX, iEndY, iAreaHit, iXRelative, bStakeHit){
        _oBall.gotoAndPlay("launch");
        _oBall.framerate = 30;
        
        var iFlyTime = BALL_FLYTIME;
        
        var iRotation = iXRelative*BALL_MAX_ROTATION;
        new createjs.Tween.get(_oBallContainer).to({rotation:iRotation}, iFlyTime, createjs.Ease.cubicOut);
        
        new createjs.Tween.get(_oBallContainer).to({x:iEndX}, iFlyTime, createjs.Ease.cubicOut);
        
        new createjs.Tween.get(_oBallContainer).to({y:iEndY}, iFlyTime*0.5, createjs.Ease.cubicOut).call(function(){
            if(!bStakeHit){
                new createjs.Tween.get(_oBallContainer).to({y:iEndY + 200, alpha:0}, iFlyTime*0.5, createjs.Ease.cubicIn);
                _oParent.ballTouchTheTarget(_oBallContainer.x, _oBallContainer.y, iAreaHit);
                if(iAreaHit > NULL_TARGET_POLE){
                    _oThis._waveAnimation(_oBallContainer.x, _oBallContainer.y);
                }   
            } else {
                new createjs.Tween.removeTweens(_oBallContainer);
                _oBall.framerate = 10;
                _oParent.ballTouchTheTarget(_oBallContainer.x, _oBallContainer.y, iAreaHit);
                
                new createjs.Tween.get(_oBallContainer).to({y:iEndY + 400, alpha:0}, iFlyTime*0.5, createjs.Ease.cubicIn);
                new createjs.Tween.get(_oBallContainer).to({scaleX:_oBallContainer.scaleX+0.1, scaleY: _oBallContainer.scaleY+0.1}, iFlyTime*0.5).wait(1000).call(function(){
                    _oParent.ballArrived(bStakeHit);
                    new createjs.Tween.removeTweens(_oBallContainer);
                    _oBall.gotoAndStop("launch");
                });
            }
            
        });
        
        new createjs.Tween.get(_oBallContainer).to({scaleX:0.02, scaleY: 0.02}, iFlyTime, createjs.Ease.cubicOut).wait(1000).call(function(){
            _oParent.ballArrived(bStakeHit);
            new createjs.Tween.removeTweens(_oBallContainer);
            _oBall.gotoAndStop("launch");
        });
        
    };

    this.reset = function(){
        _oBallContainer.alpha = 1;
        _oBallContainer.scaleX = _oBallContainer.scaleY = 1;
        _oBallContainer.rotation = 0;
        
        _oBallContainer.x = iX;
        _oBallContainer.y = iY;
    };
    
    this._waveAnimation = function(iX, iY){
        if(_iMaxNumWaveAnim === 0){
            _iMaxNumWaveAnim = 2;
            _iWaveFrequency = 300;
            return;
        }
        this.spawnWave(iX, iY);
        setTimeout(function(){
            _oThis._waveAnimation(iX, iY);
            _iWaveFrequency -= 60;
        }, 200)
    };

    this.spawnWave = function(iX, iY){
        _iMaxNumWaveAnim--;
        
        var oCircle = new createjs.Shape();
        oCircle.graphics.setStrokeStyle(3);
        oCircle.graphics.beginStroke("rgba(255,255,255,1)").drawCircle(iX, iY, 1);
        oParentContainer.addChild(oCircle);
        
        new createjs.Tween.get(oCircle.graphics.command).to({radius:50}, 1000, createjs.Ease.cubicOut);
        new createjs.Tween.get(oCircle).to({alpha:0}, 1000, createjs.Ease.cubicOut).call(function(){
            oParentContainer.removeChild(oCircle);
        });
    };

    this.getContainer = function(){
        return _oBallContainer;
    };

    _oThis = this;
    this._init(iX, iY, oParentContainer);
}


