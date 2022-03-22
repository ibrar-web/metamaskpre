function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);       
        createjs.Touch.enable(s_oStage);
        
        s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
        
        
        s_iPrevTime = new Date().getTime();

        createjs.Ticker.setFPS(FPS);
	createjs.Ticker.addEventListener("tick", this._update);
		
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
		
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };

    this.soundLoaded = function(){
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
    };
    
    this._initSounds = function(){
        Howler.mute(!s_bAudioActive);


        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({path: './game4/sounds/',filename:'chip',loop:false,volume:1, ingamename: 'chip'});
        s_aSoundsInfo.push({path: './game4/sounds/',filename:'click',loop:false,volume:1, ingamename: 'click'});
        s_aSoundsInfo.push({path: './game4/sounds/',filename:'fiche_collect',loop:false,volume:1, ingamename: 'fiche_collect'});
        s_aSoundsInfo.push({path: './game4/sounds/',filename:'wheel_sound',loop:true,volume:1, ingamename: 'wheel_sound'});
        s_aSoundsInfo.push({path: './game4/sounds/',filename:'win',loop:false,volume:1, ingamename: 'win'});
        s_aSoundsInfo.push({path: './game4/sounds/',filename:'lose',loop:false,volume:1, ingamename: 'lose'});
        
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

                                                                                          });
                                                                                         break;
                                                                                     }
                                                                                 }
                                                                       
                                                            } 
                                                        });

            
        }, (bDelay ? 200 : 0) );
        
        
    };


    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

	s_oSpriteLibrary.addSprite("bg_menu","./game4/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_exit","./game4/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_game","./game4/sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("audio_icon","./game4/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("msg_box","./game4/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("hit_area_0","./game4/sprites/hit_area_0.png");
        s_oSpriteLibrary.addSprite("hit_area_color","./game4/sprites/hit_area_color.png");
        s_oSpriteLibrary.addSprite("hit_area_horizontal","./game4/sprites/hit_area_horizontal.png");
        s_oSpriteLibrary.addSprite("hit_area_number","./game4/sprites/hit_area_number.png");
        s_oSpriteLibrary.addSprite("hit_area_couple_horizontal","./game4/sprites/hit_area_couple_horizontal.png");
        s_oSpriteLibrary.addSprite("hit_area_couple_vertical","./game4/sprites/hit_area_couple_vertical.png");
        s_oSpriteLibrary.addSprite("hit_area_small","./game4/sprites/hit_area_small.png");
        s_oSpriteLibrary.addSprite("hit_area_horizontal_half","./game4/sprites/hit_area_horizontal_half.png");
        s_oSpriteLibrary.addSprite("chip_box","./game4/sprites/chip_box.png");
        s_oSpriteLibrary.addSprite("but_bets","./game4/sprites/but_bets.png");
        s_oSpriteLibrary.addSprite("but_bg","./game4/sprites/but_bg.png");
        s_oSpriteLibrary.addSprite("but_clear_all","./game4/sprites/but_clear_all.png");
        s_oSpriteLibrary.addSprite("but_clear_last","./game4/sprites/but_clear_last.png");
        s_oSpriteLibrary.addSprite("but_rebet","./game4/sprites/but_rebet.png");
        s_oSpriteLibrary.addSprite("but_play","./game4/sprites/but_play.png");
        s_oSpriteLibrary.addSprite("logo_credits","./game4/sprites/logo_credits.png");
        s_oSpriteLibrary.addSprite("but_credits","./game4/sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("history_bg","./game4/sprites/history_bg.png");
        s_oSpriteLibrary.addSprite("show_number_panel","./game4/sprites/show_number_panel.png");
        s_oSpriteLibrary.addSprite("show_number_bg","./game4/sprites/show_number_bg.png");
        s_oSpriteLibrary.addSprite("ball","./game4/sprites/ball.png");
        s_oSpriteLibrary.addSprite("enlight_0","./game4/sprites/enlight_0.png");
        s_oSpriteLibrary.addSprite("enlight_color","./game4/sprites/enlight_color.png");
        s_oSpriteLibrary.addSprite("enlight_horizontal","./game4/sprites/enlight_horizontal.png");
        s_oSpriteLibrary.addSprite("enlight_number","./game4/sprites/enlight_number.png");
        s_oSpriteLibrary.addSprite("enlight_horizontal_half","./game4/sprites/enlight_horizontal_half.png");
        s_oSpriteLibrary.addSprite("select_fiche","./game4/sprites/select_fiche.png");
        s_oSpriteLibrary.addSprite("spin_but","./game4/sprites/spin_but.png");
        s_oSpriteLibrary.addSprite("placeholder","./game4/sprites/placeholder.png");
        s_oSpriteLibrary.addSprite("circle_red","./game4/sprites/circle_red.png");
        s_oSpriteLibrary.addSprite("circle_green","./game4/sprites/circle_green.png");
        s_oSpriteLibrary.addSprite("circle_black","./game4/sprites/circle_black.png");
        s_oSpriteLibrary.addSprite("final_bet_bg","./game4/sprites/final_bet_bg.png");
        s_oSpriteLibrary.addSprite("neighbor_bg","./game4/sprites/neighbor_bg.jpg");
        s_oSpriteLibrary.addSprite("neighbor_enlight","./game4/sprites/neighbor_enlight.png");
        s_oSpriteLibrary.addSprite("hitarea_neighbor","./game4/sprites/hitarea_neighbor.png");
        s_oSpriteLibrary.addSprite("bg_wheel","./game4/sprites/bg_wheel.jpg");
        s_oSpriteLibrary.addSprite("logo_game_0","./game4/sprites/logo_game_0.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./game4/sprites/but_fullscreen.png");
        
        s_oSpriteLibrary.addSprite("board_roulette","./game4/sprites/board_roulette.jpg");
        
        for(var i=0;i<NUM_FICHES;i++){
            s_oSpriteLibrary.addSprite("fiche_"+i,"./game4/sprites/fiche_"+i+".png");
        }
        
        for(var j=0;j<NUM_MASK_BALL_SPIN_FRAMES;j++){
            s_oSpriteLibrary.addSprite("wheel_handle_"+j,"./game4/sprites/mask_ball_spin/wheel_handle_"+j+".png");
        }
        
        for(var t=0;t<NUM_MASK_BALL_SPIN_FRAMES;t++){
            s_oSpriteLibrary.addSprite("wheel_numbers_"+t,"./game4/sprites/wheel_anim/wheel_numbers_"+t+".png");
        }
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);

    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onImageLoadError = function(szText){
        
    };
	
    this.preloaderReady = function(){
        this._loadImages();
		
	if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        _bUpdate = true;
    };
    
    this._onRemovePreloader = function(){
        _oPreloader.unload();

        this.gotoMenu();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoGame = function(){
        _oGame = new CGame(_oData);   
							
        _iState = STATE_GAME;
    };
    
    this.gotoHelp = function(){
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
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    _oData = oData;
    ENABLE_FULLSCREEN = oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    SHOW_CREDITS = _oData.show_credits;

    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = false;
var s_bFullscreen = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain = null;
var s_oSpriteLibrary;
var s_aSounds;
var s_aSoundsInfo;