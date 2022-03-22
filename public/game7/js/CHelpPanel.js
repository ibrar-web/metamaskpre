function CHelpPanel(){
    var _oText1;
    var _oText2;

    var _oHelpBg;
    var _oGroup;
    var _oParent;

    this._init = function(){
        var oParent = this;
        
        _oGroup = new createjs.Container();
        _oGroup.addChild(_oHelpBg);
        _oGroup.alpha=0;
        _oGroup.on("pressup",function(){oParent._onExitHelp();});
        s_oStage.addChild(_oGroup);
        
        
        _oHelpBg = createBitmap(s_oSpriteLibrary.getSprite('bg_help'));
        _oGroup.addChild(_oHelpBg);
        
        
 
        _oText1 = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-250, (CANVAS_HEIGHT/2)-190, 500, 100, 
                    30, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP1,
                    true, true, true,
                    false );

        _oText2 = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-250, (CANVAS_HEIGHT/2)-60, 500, 100, 
                    30, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP2,
                    true, true, true,
                    false );


        createjs.Tween.get(_oGroup).to({alpha:1}, 700);         
    };

    this.unload = function(){
        s_oStage.removeChild(_oGroup);

        var oParent = this;
        _oGroup.off("pressup",function(){oParent._onExitHelp()});
    };

    this._onExitHelp = function(){
        _oParent.unload();
        s_oGame._onExitHelp();
    };

    _oParent=this;
    this._init();

}
