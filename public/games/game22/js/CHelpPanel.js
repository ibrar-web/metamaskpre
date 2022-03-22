function CHelpPanel(){
    var _oText1;
    var _oText1Back;
    var _oText2;
    var _oText2Back;   
    var _oText3;
    var _oText3Back;
    var _oText4;
    var _oText4Back;

    var _oHelpBg;
    var _oGroup;
    var _oParent;

    this._init = function(){
        var oParent = this;
        _oGroup = new createjs.Container();
        
        _oGroup.alpha=0;
        s_oStage.addChild(_oGroup);
        
        _oHelpBg = createBitmap(s_oSpriteLibrary.getSprite('bg_help'));
        _oGroup.addChild(_oHelpBg);
        
        var oText1Pos = {x: CANVAS_WIDTH/2-300, y: (CANVAS_HEIGHT/2)-205};
  
        _oText1Back = new CTLText(_oGroup, 
                    oText1Pos.x+2, oText1Pos.y+2, 600, 44, 
                    22, "center", "#000", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP1,
                    true, true, true,
                    false );

  
        _oText1 = new CTLText(_oGroup, 
                    oText1Pos.x, oText1Pos.y, 600, 44, 
                    22, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP1,
                    true, true, true,
                    false );         
  
        var oText2Pos = {x: CANVAS_WIDTH/2 -340, y: (CANVAS_HEIGHT/2)-140}
  
        _oText2Back = new CTLText(_oGroup, 
                    oText2Pos.x+2, oText2Pos.y+2, 320, 80, 
                    18, "right", "#000", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP2,
                    true, true, true,
                    false );

  
        _oText2 = new CTLText(_oGroup, 
                    oText2Pos.x, oText2Pos.y, 320, 80, 
                    18, "right", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP2,
                    true, true, true,
                    false );
     
        var oText3Pos = {x: CANVAS_WIDTH/2 -80, y: (CANVAS_HEIGHT/2) + 30};
  
        _oText3Back = new CTLText(_oGroup, 
                    oText3Pos.x+2, oText3Pos.y+2, 360, 80, 
                    18, "left", "#000", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP3,
                    true, true, true,
                    false );

  
        _oText3 = new CTLText(_oGroup, 
                    oText3Pos.x, oText3Pos.y, 360, 80, 
                    18, "left", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP3,
                    true, true, true,
                    false );
     
        var oText4Pos = {x: CANVAS_WIDTH/2 -340, y: (CANVAS_HEIGHT/2)+140};
  
        _oText4Back = new CTLText(_oGroup, 
                    oText4Pos.x+2, oText4Pos.y+2, 400, 80, 
                    18, "left", "#000", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP4,
                    true, true, true,
                    false );
                    
       
  
        _oText4 = new CTLText(_oGroup, 
                    oText4Pos.x, oText4Pos.y, 400, 80, 
                    18, "left", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP4,
                    true, true, true,
                    false );
        
        

        createjs.Tween.get(_oGroup).to({alpha:1}, 700);        
        
        _oGroup.on("pressup",function(){oParent._onExitHelp();});
        
        
    };

    this.unload = function(){
        s_oStage.removeChild(_oGroup);

        var oParent = this;
        _oGroup.off("pressup",function(){oParent._onExitHelp()});
    };

    this._onExitHelp = function(){
        _oParent.unload();
    };

    _oParent=this;
    this._init();

}
