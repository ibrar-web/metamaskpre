function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oGame;

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = false;
        createjs.Touch.enable(s_oStage, true);
		
	s_bMobile = isMobile();

        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
            
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        s_oMain._loadImages();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            s_oMain._initSounds();
        }
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._initSounds = function(){
        Howler.mute(!s_bAudioActive);


        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({path: './game15/sounds/',filename:'win',loop:false,volume:1, ingamename: 'win'});
        s_aSoundsInfo.push({path: './game15/sounds/',filename:'click',loop:false,volume:1, ingamename: 'click'});
        s_aSoundsInfo.push({path: './game15/sounds/',filename:'game_over',loop:false,volume:1, ingamename: 'game_over'});
        s_aSoundsInfo.push({path: './game15/sounds/',filename:'card_dealing',loop:false,volume:1, ingamename: 'card_dealing'});
        s_aSoundsInfo.push({path: './game15/sounds/',filename:'matching',loop:false,volume:1, ingamename: 'matching'});
        s_aSoundsInfo.push({path: './game15/sounds/',filename:'bonus_row',loop:false,volume:1, ingamename: 'bonus_row'});
        s_aSoundsInfo.push({path: './game15/sounds/',filename:'soundtrack',loop:true,volume:1, ingamename: 'soundtrack'});
        
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


    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play","./game15/sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box","./game15/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("msg_box_small","./game15/sprites/msg_box_small.png");
        s_oSpriteLibrary.addSprite("but_credits","./game15/sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("ctl_logo","./game15/sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("bg_menu","./game15/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game","./game15/sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("but_exit","./game15/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon","./game15/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./game15/sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_yes","./game15/sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_no","./game15/sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_home","./game15/sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart","./game15/sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_restart_big","./game15/sprites/but_restart_big.png");
        s_oSpriteLibrary.addSprite("card_spritesheet","./game15/sprites/card_spritesheet.png");
        s_oSpriteLibrary.addSprite("time_icon","./game15/sprites/time_icon.png");
        s_oSpriteLibrary.addSprite("image_help_0_0","./game15/sprites/image_help_0_0.png");
        s_oSpriteLibrary.addSprite("image_help_1_0","./game15/sprites/image_help_1_0.png");
        s_oSpriteLibrary.addSprite("image_help_0_1","./game15/sprites/image_help_0_1.png");
        s_oSpriteLibrary.addSprite("image_help_1_1","./game15/sprites/image_help_1_1.png");
        s_oSpriteLibrary.addSprite("help_arrow_left","./game15/sprites/help_arrow_left.png");
        s_oSpriteLibrary.addSprite("help_arrow_right","./game15/sprites/help_arrow_right.png");
        s_oSpriteLibrary.addSprite("but_help","./game15/sprites/but_help.png");
        s_oSpriteLibrary.addSprite("mode_hard","./game15/sprites/mode_hard.png");
        s_oSpriteLibrary.addSprite("mode_easy","./game15/sprites/mode_easy.png");
        s_oSpriteLibrary.addSprite("but_mode","./game15/sprites/but_mode.png");
        s_oSpriteLibrary.addSprite("bg_select_mode","./game15/sprites/bg_select_mode.jpg");
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._allResourcesLoaded = function(){
        _oPreloader.unload();
        
        s_oSoundTrack = playSound("soundtrack", 1, true);
        
        s_oMain.gotoMenu();
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };   
    
    this.gotoModeMenu = function(){
        var oChooseMenu = new CChooseModePanel();
        
    };
    
    this.gotoGame = function(){
        _oGame = new CGame(_oData);  
        
        _iState = STATE_GAME;
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
    NUM_SCROLLING_DECK = oData.num_turn_pile;
    ENABLE_FULLSCREEN = oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    SCORE_PER_CARD = oData.card_score;
    SCORE_PER_ROW = oData.score_per_row;
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

var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oCanvas;
var s_bFullscreen = false;
var s_oSoundTrack = null;
var s_aSounds;
var s_iMode = MODE_HARD;