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
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
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
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._initSounds = function(){
        Howler.mute(!s_bAudioActive);


        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({path: './games/game42/sounds/',filename:'win',loop:false,volume:1, ingamename: 'win'});
        s_aSoundsInfo.push({path: './games/game42/sounds/',filename:'press_but',loop:false,volume:1, ingamename: 'press_but'});
        s_aSoundsInfo.push({path: './games/game42/sounds/',filename:'gameover',loop:false,volume:1, ingamename: 'gameover'});
        s_aSoundsInfo.push({path: './games/game42/sounds/',filename:'soundtrack',loop:true,volume:1, ingamename: 'soundtrack'});
        s_aSoundsInfo.push({path: './games/game42/sounds/',filename:'scratch',loop:false,volume:1, ingamename: 'scratch'});
        s_aSoundsInfo.push({path: './games/game42/sounds/',filename:'no_win',loop:false,volume:1, ingamename: 'no_win'});
        s_aSoundsInfo.push({path: './games/game42/sounds/',filename:'particle',loop:false,volume:1, ingamename: 'particle'});
        
        for(var k=0;k<NUM_SYMBOLS;k++){
            s_aSoundsInfo.push({path: './games/game42/sounds/',filename:'symbol'+k,loop:true,volume:1, ingamename: 'symbol'+k});
        }
        
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

        s_oSpriteLibrary.addSprite("but_play","./games/game42/sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_home","./games/game42/sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart","./games/game42/sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_start_game","./games/game42/sprites/but_start_game.png");
        s_oSpriteLibrary.addSprite("msg_box","./games/game42/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_menu","./games/game42/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game","./games/game42/sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("but_exit","./games/game42/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon","./games/game42/sprites/audio_icon.png");   
        s_oSpriteLibrary.addSprite("but_credits","./games/game42/sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./games/game42/sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("ctl_logo","./games/game42/sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_yes","./games/game42/sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_settings","./games/game42/sprites/but_settings.png");
        s_oSpriteLibrary.addSprite("bg_help","./games/game42/sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("win_amount_bg","./games/game42/sprites/win_amount_bg.png");
        s_oSpriteLibrary.addSprite("gui_bg","./games/game42/sprites/gui_bg.png");
        s_oSpriteLibrary.addSprite("but_generic","./games/game42/sprites/but_generic.png");
        s_oSpriteLibrary.addSprite("but_generic_small","./games/game42/sprites/but_generic_small.png");
        s_oSpriteLibrary.addSprite("paytable_portrait","./games/game42/sprites/paytable_portrait.png");
        s_oSpriteLibrary.addSprite("paytable_landscape","./games/game42/sprites/paytable_landscape.png");
        s_oSpriteLibrary.addSprite("but_no","./games/game42/sprites/but_no.png");
        
        for(var k=0;k<NUM_SYMBOLS;k++){
            for(var t=0;t<25;t++){
                s_oSpriteLibrary.addSprite("symbol_"+k+"_"+t,"./games/game42/sprites/symbol_"+k+"/symbol_"+k+"_"+t+".png");
            }
        }
        
        for(var i=0;i<25;i++){
            s_oSpriteLibrary.addSprite("win_frame_anim_"+i,"./games/game42/sprites/win_frame_anim/win_frame_anim_"+i+".png");
        }
        
        for(var i=0;i<54;i++){
            s_oSpriteLibrary.addSprite("silver_scratch_"+i,"./games/game42/sprites/silver_scratch/silver_scratch_"+i+".png");
        }
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        //console.log("PERC: "+iPerc);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._onRemovePreloader = function(){
        try{
            saveItem("ls_available","ok");
        }catch(evt){
            // localStorage not defined
            s_bStorageAvailable = false;
        }

        _oPreloader.unload();

        s_oSoundTrack = playSound("soundtrack", SOUNDTRACK_VOLUME_IN_GAME,true);

        this.gotoMenu();
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    }; 
    
    this.gotoGame = function(){
        _oGame = new CGame(_oData);   						
        _iState = STATE_GAME;
    };

    this.stopUpdateNoBlock = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
    };

    this.startUpdateNoBlock = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false; 
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

    s_bAudioActive = oData.audio_enable_on_startup;
    ENABLE_FULLSCREEN = oData.fullscreen;
    NUM_CARDS = oData.num_cards;
    WIN_OCCURRENCE = oData.win_occurence;
    WIN_OCCURRENCE_PRIZES = oData.occurrence_per_prizes;
    PAYTABLE = oData.paytable_prizes;

    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_oCanvas;
var s_bFullscreen = false;
var s_aSounds;
var s_bStorageAvailable = true;
var s_aSoundsInfo;