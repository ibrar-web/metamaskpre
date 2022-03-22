    function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _aLevelLoaded;

    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oLevelMenu;
    var _oGame;

    this.initContainer = function () {
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);
        createjs.Touch.enable(s_oStage);
        s_oStage.preventSelection = false;

        s_bMobile = jQuery.browser.mobile;
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
            $('body').on('contextmenu', '#canvas', function (e) {
                return false;
            });
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        _aLevelLoaded = new Array();

        s_oSpriteLibrary = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();

        _bUpdate = true;
    };

    this.soundLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._initSounds = function(){
        Howler.mute(!s_bAudioActive);
    
        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({path: './game11/sounds/',filename:'win_panel',loop:false,volume:1, ingamename: 'win_panel'});
        s_aSoundsInfo.push({path: './game11/sounds/',filename:'lose_panel',loop:false,volume:1, ingamename: 'lose_panel'});
        s_aSoundsInfo.push({path: './game11/sounds/',filename:'click',loop:false,volume:1, ingamename: 'click'});
        s_aSoundsInfo.push({path: './game11/sounds/',filename:'ball_extracted',loop:false,volume:1, ingamename: 'ball_extracted'});
        s_aSoundsInfo.push({path: './game11/sounds/',filename:'soundtrack',loop:true,volume:1, ingamename: 'soundtrack'});
        s_aSoundsInfo.push({path: './game11/sounds/',filename:'num_matched',loop:false,volume:1, ingamename: 'num_matched'});
        s_aSoundsInfo.push({path: './game11/sounds/',filename:'start_extraction',loop:false,volume:1, ingamename: 'start_extraction'});
        s_aSoundsInfo.push({path: './game11/sounds/',filename:'balls_shuffle',loop:false,volume:1, ingamename: 'balls_shuffle'});
        
        
        RESOURCE_TO_LOAD += s_aSoundsInfo.length;

        s_aSounds = new Array();
        for(var i=0; i<s_aSoundsInfo.length; i++){
            this.tryToLoadSound(s_aSoundsInfo[i], false);
        }
    };  
    
    this.tryToLoadSound = function(oSoundInfo, bDelay){
        
       setTimeout(function(){        
            s_aSounds[oSoundInfo.ingamename] = new Howl({ 
                                                            src: [oSoundInfo.path+oSoundInfo.filename+'.mp3'],
                                                            autoplay: false,
                                                            preload: true,
                                                            loop: oSoundInfo.loop, 
                                                            volume: oSoundInfo.volume,
                                                            onload: s_oMain.soundLoaded,
                                                            onloaderror: function(szId,szMsg){
                                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                     if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                         s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
                                                                                         break;
                                                                                     }
                                                                                }
                                                                        },
                                                            onplayerror: function(szId) {
                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                     if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                          s_aSounds[s_aSoundsInfo[i].ingamename].once('unlock', function() {
                                                                                            s_aSounds[s_aSoundsInfo[i].ingamename].play();
                                                                                            if(s_aSoundsInfo[i].ingamename === "soundtrack" && s_oGame !== null){
                                                                                                setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME);
                                                                                            }

                                                                                          });
                                                                                         break;
                                                                                     }
                                                                                 }
                                                                       
                                                            } 
                                                        });

            
        }, (bDelay ? 200 : 0) );
    };
    
    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("preloader_anim", "./game11/sprites/preloader_anim.png");
        s_oSpriteLibrary.addSprite("but_play", "./game11/sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./game11/sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_info", "./game11/sprites/but_info.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./game11/sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_yes", "./game11/sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_no", "./game11/sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_exit", "./game11/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_restart", "./game11/sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("logo", "./game11/sprites/logo.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./game11/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./game11/sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("msg_box", "./game11/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./game11/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_home", "./game11/sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_paytable", "./game11/sprites/but_paytable.png");
        s_oSpriteLibrary.addSprite("slot_paytable_bg", "./game11/sprites/slot_paytable_bg.png");

        for(var i=1; i<=TOTAL_NUMBERS; i++){
            s_oSpriteLibrary.addSprite("ball_"+i, "./game11/sprites/balls/ball_"+i+".png");
        }

        s_oSpriteLibrary.addSprite("bg_help","./game11/sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("hand_anim","./game11/sprites/hand_anim.png");
        s_oSpriteLibrary.addSprite("toggle_num", "./game11/sprites/toggle_num.png");
        s_oSpriteLibrary.addSprite("but_long", "./game11/sprites/but_long.png");
        s_oSpriteLibrary.addSprite("but_settings", "./game11/sprites/but_settings.png");
        s_oSpriteLibrary.addSprite("pick_numbers_panel", "./game11/sprites/pick_numbers_panel.png");
        s_oSpriteLibrary.addSprite("numbers_played_info_panel", "./game11/sprites/numbers_played_info_panel.png");
        s_oSpriteLibrary.addSprite("start_extraction_toggle", "./game11/sprites/start_extraction_toggle.png");
        s_oSpriteLibrary.addSprite("bg_nummatched", "./game11/sprites/bg_nummatched.png");
        s_oSpriteLibrary.addSprite("sphere_back_0", "./game11/sprites/sphere_back_0.png");
        s_oSpriteLibrary.addSprite("sphere_front_0", "./game11/sprites/sphere_front_0.png");

        for(var i=0; i<PAYTABLE_SETTINGS.length; i++){
            if(PAYTABLE_SETTINGS[i].prize_img_url !== ""){
                s_oSpriteLibrary.addSprite("prize_"+i, PAYTABLE_SETTINGS[i].prize_img_url);
            }
        }
        s_oSpriteLibrary.addSprite("ball_icon", "./game11/sprites/ball_icon.png");

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
    };

    this._onAllImagesLoaded = function () {

    };
    
    this._allResourcesLoaded = function(){
        _oPreloader.unload();
        s_oSoundTrack = playSound("soundtrack", 1, true);
        
        this.gotoMenu();
    }

    this.preloaderReady = function () {
        this._loadImages();
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
        }

        
        _bUpdate = true;
    };

    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function() {
        _oGame = new CGame(_oData, 0);

        _iState = STATE_GAME;
    };

    this.gotoLevelMenu = function () {
        _oLevelMenu = new CLevelMenu();
        _iState = STATE_MENU;
    };

    this.gotoHelp = function () {
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
    
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            Howler.mute(true);
        }
        
    };
    
    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            if(s_bAudioActive){
                Howler.mute(false);
            }
        }
        
    };
    
    this._update = function (event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (_iState === STATE_GAME) {
            _oGame.update();
        }

        s_oStage.update(event);

    };

    s_oMain = this;

    _oData = oData;
    ENABLE_CHECK_ORIENTATION = false;
    ENABLE_FULLSCREEN = oData.fullscreen;
    SHOW_CREDITS = oData.show_credits;
   
    PAYTABLE_SETTINGS = oData.paytable_settings;
    
    s_bAudioActive = oData.audio_enable_on_startup;
    
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_oPhysicsController;
var s_iCanvasResizeHeight;
var s_iCanvasResizeWidth;
var s_iCanvasOffsetHeight;
var s_iCanvasOffsetWidth;
var s_iCurLevel;
var s_iBackgroundLevel;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_oTweenController;
var s_oLocalStorage;
var s_bFullscreen = false;
var s_bStorageAvailable = true;
var s_aSounds;
var s_aSoundsInfo;