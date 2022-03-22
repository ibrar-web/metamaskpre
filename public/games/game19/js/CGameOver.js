function CGameOver() {
    var _oTextTitle;
    var _oTextMsg;
    var _ButRecharge;
    var _oButExit;
    var _oContainer;

    this._init = function() {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oContainer.addChild(oBg);

        _oTextTitle = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 240, 240, 480, 72,
            36, "center", "#fff", FONT1, 1,
            0, 0,
            TEXT_NO_MONEY,
            true, true, true,
            false);

        _oTextMsg = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 240, 400, 480, 40,
            20, "center", "#fff", FONT1, 1,
            0, 0,
            TEXT_RECHARGE_MSG,
            true, true, true,
            false);


        _ButRecharge = new CTextButton(CANVAS_WIDTH / 2 + 170, 510, s_oSpriteLibrary.getSprite('but_bg'), TEXT_RECHARGE, FONT1, "#fff", 18, "center", s_oStage);
        _ButRecharge.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
        _oContainer.addChild(_ButRecharge.getSprite());

        _oButExit = new CTextButton(CANVAS_WIDTH / 2 - 170, 510, s_oSpriteLibrary.getSprite('but_bg'), TEXT_EXIT, FONT1, "#fff", 18, "center", s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        _oContainer.addChild(_oButExit.getSprite());

        this.hide();
    };

    this.unload = function() {
        _ButRecharge.unload();
        _oButExit.unload();
    };

    this.show = function() {
        //_oContainer.visible = true;
    };

    this.hide = function() {
        _oContainer.visible = false;
    };

    this._onRecharge = function() {
        $(s_oMain).trigger("recharge");
    };

    this._onExit = function() {
        s_oGame.onExit(true);
    };

    this._init();
}