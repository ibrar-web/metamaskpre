//oEaseInInfos/oEaseOutInfos:oEaseType,iTimeEase,oProperty
function CCreditsPanel(oEaseInInfos,oEaseOutInfos){
    var _oListener;
    var _oEaseInInfos = oEaseInInfos;
    var _oEaseOutInfos = oEaseOutInfos;
    var _oFade;
    var _oPanelContainer;
    var _oButExit;
    var _oLogo;
    var _oPanel;
    
    var _pStartPanelPos;
    
    this._init = function(){
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oListener = _oFade.on("click",this._onLogoButRelease);
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0.7},500);
        
        _oPanelContainer = new createjs.Container();   
        s_oStage.addChild(_oPanelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oPanel = createBitmap(oSprite);        
        _oPanel.regX = oSprite.width/2;
        _oPanel.regY = oSprite.height/2;
        _oPanelContainer.addChild(_oPanel);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = -oSprite.height/2;  
        _pStartPanelPos = {x: _oPanelContainer.x, y: _oPanelContainer.y};
        
        
        var iWidth = oSprite.width;
        var iHeight = 42;
        var iX = 0;
        var iY = -80;

        var oTitle = new CTLText(_oPanelContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    40, "center", FONT_COLOR, FONT, 1,
                    2, 2,
                    TEXT_DEVELOPED,
                    true, true, false,
                    false );

        var iY = 120;
        var oLink = new CTLText(_oPanelContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    40, "center", FONT_COLOR, FONT, 1,
                    2, 2,
                    "www.codethislab.com",
                    true, true, false,
                    false );

        
        var oSprite = s_oSpriteLibrary.getSprite('ctl_logo');
        _oLogo = createBitmap(oSprite);
        
        _oLogo.regX = oSprite.width/2;
        _oLogo.regY = oSprite.height/2;
        _oLogo.y = 20;
        _oPanelContainer.addChild(_oLogo);
      
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(396, -240, oSprite, _oPanelContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
        
        createjs.Tween.get(_oPanelContainer).to(_oEaseInInfos.property,_oEaseInInfos.time, _oEaseInInfos.type);
    };
    
    this.unload = function(){
        createjs.Tween.get(_oFade).to({alpha:0},500);
        createjs.Tween.get(_oPanelContainer).to(_oEaseOutInfos.property,_oEaseOutInfos.time, _oEaseOutInfos.type).call(function(){
            s_oStage.removeChild(_oFade);
            s_oStage.removeChild(_oPanelContainer);

            _oButExit.unload();
        }); 
        
        _oFade.off("mousedown",_oListener);  
    };
    
    this._onLogoButRelease = function(){
        window.open("http://www.codethislab.com/index.php?&l=en");
    };
    
    this._init();
    
    
};


