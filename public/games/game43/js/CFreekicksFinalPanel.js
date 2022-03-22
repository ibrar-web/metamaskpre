function CFreekicksFinalPanel(oParentContainer){
    var _aCbCompleted;
    var _aCbOwner;
    var _oListenerClick;
    
    var _oTextCongrats;
    var _oTextWin;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("msg_box");
        var oBg = createBitmap(oSpriteBg);
        oBg.x = CANVAS_WIDTH/2;
        oBg.y = CANVAS_HEIGHT/2;
        oBg.regX = oSpriteBg.width/2;
        oBg.regY = oSpriteBg.height/2;
        _oContainer.addChild(oBg);
        
        _oTextCongrats = new createjs.Text(TEXT_GREAT,"70px "+FONT_GAME_1, "#fff");
        _oTextCongrats.textAlign = "center";
        _oTextCongrats.textBaseline = "alphabetic";  
        _oTextCongrats.lineWidth = 400;
        _oTextCongrats.x = CANVAS_WIDTH/2;
        _oTextCongrats.y = 320;
        _oContainer.addChild(_oTextCongrats);
        
        _oTextWin = new createjs.Text("","55px "+FONT_GAME_1, "#fff");
        _oTextWin.textAlign = "center";
        _oTextWin.textBaseline = "alphabetic"; 
        _oTextWin.lineWidth = 400;
        _oTextWin.lineHeight = 66;
        _oTextWin.x = CANVAS_WIDTH/2;
        _oTextWin.y = 430;
        _oContainer.addChild(_oTextWin);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.show = function(szTextTitle,szTextWin){
        _oTextCongrats.text = szTextTitle;
        _oTextWin.text = szTextWin;
        _oListenerClick = _oContainer.on("click",function(){});
        _oContainer.alpha = 0;
        _oContainer.visible = true;
        
        playSound("bonus_win",1,false);
        
        var oParent = this;
        createjs.Tween.get(_oContainer).to({alpha:1}, 800,createjs.Ease.cubicOut).call(function(){
                                                                                                setTimeout(function(){oParent.hide();},3000);
                                                                                    });
                                                                                                                                                                 
    };
    
    this.hide = function(){
        _oContainer.off("click",_oListenerClick);
        createjs.Tween.get(_oContainer).to({alpha:0}, 800,createjs.Ease.cubicOut).call(function(){_oContainer.visible = false;});
        
        if(_aCbCompleted[ON_EXIT_FREEKICKS]){
            _aCbCompleted[ON_EXIT_FREEKICKS].call(_aCbOwner[ON_EXIT_FREEKICKS]);
        }
    };
    
    _oParentContainer = oParentContainer;
    this._init();
}