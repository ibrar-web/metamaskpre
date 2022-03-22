function CEndPanel(oSpriteBg) {
    var _oListener;
    var _oBg;
    var _oGroup;
    var _oButRecharge;
    var _oButExit;

    var _oMsgTextBack;
    var _oMsgText;

    var _oThis = this;

    this._init = function(oSpriteBg) {
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible = false;
        s_oStage.addChild(_oGroup);


        _oBg = createBitmap(oSpriteBg);
        _oListener = _oBg.on("click", function() {});
        _oGroup.addChild(_oBg);


        _oMsgTextBack = new CTLText(_oGroup,
            CANVAS_WIDTH / 2 - 248, (CANVAS_HEIGHT / 2) - 198, 500, 300,
            50, "center", "#000", PRIMARY_FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);


        _oMsgText = new CTLText(_oGroup,
            CANVAS_WIDTH / 2 - 250, (CANVAS_HEIGHT / 2) - 200, 500, 300,
            50, "center", "#fff", PRIMARY_FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);

        _oButRecharge = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 160, s_oSpriteLibrary.getSprite("but_bet"), TEXT_RECHARGE, PRIMARY_FONT, "#fff", 40, false, _oGroup);
        _oButRecharge.enable();
        _oButRecharge.addEventListener(ON_MOUSE_UP, this._onRecharge, this);

        _oButExit = new CGfxButton(CANVAS_WIDTH / 2 + 300, CANVAS_HEIGHT / 2 - 160, s_oSpriteLibrary.getSprite("but_exit"), true, _oGroup);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
    };

    this.unload = function() {
        _oBg.off("click", _oListener);
        _oButRecharge.unload();
    };


    this.show = function() {
        playSound("game_over", 1, false);


        _oMsgTextBack.refreshText(TEXT_GAMEOVER);
        _oMsgText.refreshText(TEXT_GAMEOVER);

        _oGroup.visible = false;

        $(s_oMain).trigger("end_level", 1);
        $(s_oMain).trigger("show_interlevel_ad");

        createjs.Tween.get(_oGroup).to({ alpha: 1 }, 500);

    };

    this.hide = function() {
        _oGroup.visible = false;
        s_oInterface.enableArrow(true);

    };

    this._onExit = function() {
        _oThis.hide();
    };

    this._onRecharge = function() {
        $(s_oMain).trigger("recharge");
        _oThis.hide();
        s_oInterface._enableFiche(true);
    };

    this._init(oSpriteBg);

    return this;
}