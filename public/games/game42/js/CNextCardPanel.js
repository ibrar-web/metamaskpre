function CNextCardPanel(oParentContainer){
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;
    
    var _oCell;
    var _oButNext;
    var _oFade;
    var _oContainer;
    var _oContainerWin;
    var _oParentContainer = oParentContainer;
    var _oThis = this;
    
    this._init = function(){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;
        _oListener = _oFade.on("click", function () {});
        _oContainer.addChild(_oFade);
        
        _oContainerWin = new createjs.Container();
        _oContainerWin.x = CANVAS_WIDTH/2;
        _oContainerWin.y = CANVAS_HEIGHT/2 -50;
        _oContainer.addChild(_oContainerWin);
        
        _oButNext = new CTextButton(CANVAS_WIDTH/2,CANVAS_HEIGHT/2 + 300,s_oSpriteLibrary.getSprite("but_generic"),TEXT_PLAY_NEXT,FONT,FONT_COLOR,60,_oContainer);
        _oButNext.addEventListener(ON_MOUSE_UP,this._onNext,this);
    };
    
    this.unload = function(){
        _oFade.off("click",_oListener);
        _oButNext.unload();
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.show = function(iType,bWin,bGameOver){
        _oContainerWin.removeAllChildren();
        _oContainerWin.scale = 1;
        _oContainer.visible = true;
        _oFade.alpha = 0;
        _oButNext.setVisible(false);
        if(bGameOver){
            _oButNext.changeText(TEXT_COMPLETE);
        }else{
            _oButNext.changeText(TEXT_PLAY_NEXT);
        }
        createjs.Tween.get(_oFade).to({alpha:0.7}, 500,createjs.Ease.cubicOut).call(function(){
                                                                                _oButNext.setVisible(true);
                                                                        });
        
        if(bWin){
            playSound("symbol"+iType,1,false);
            _oCell = new CGridCell(0,0,0,0,iType,_oContainerWin);
            _oCell.playAnim(true);
 
            createjs.Tween.get(_oContainerWin,{loop:-1}).to({scale: 1.1}, 850, createjs.Ease.quadOut).to({scale: 1}, 650, createjs.Ease.quadIn);
            
            $(s_oMain).trigger("prize_won",PAYTABLE[iType]);
        }else{
            playSound("no_win",1,false);
            var oSprite = s_oSpriteLibrary.getSprite("msg_box");
            var oMsgBox = createBitmap(oSprite);
            oMsgBox.regX = oSprite.width/2;
            oMsgBox.regY = oSprite.height/2;
            oMsgBox.scale = 0.8;
            _oContainerWin.addChild(oMsgBox);
            
            //NO WIN
            var oText = new CTLText(_oContainerWin, 
                    -300, -150, 600, 300, 
                    150, "center", FONT_COLOR, FONT, 1,
                    0, 0,
                    TEXT_NO_WIN,
                    true, true, true,
                    false );
        }
    };
    
    this.hide = function(){
        if(_oCell){
            _oCell.stopAllAnims();
            createjs.Tween.removeTweens(_oContainerWin);
        }
        
        _oContainer.visible = false;
    };
    
    this._onNext = function(){
        _oThis.hide();
        
        if(_aCbCompleted[ON_PLAY_NEXT_CARD]){
            _aCbCompleted[ON_PLAY_NEXT_CARD].call(_aCbOwner[ON_PLAY_NEXT_CARD]);
        }
    };
    
    this._init();
}