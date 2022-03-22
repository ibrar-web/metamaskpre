function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    
    var _oData;
    var _oPreloader;
    var _oGame;

    this.initContainer = function(){
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);  
        
        s_oAttachSection = new createjs.Container();
        s_oStage.addChild(s_oAttachSection);
        s_oStage.preventSelection = false;
        createjs.Touch.enable(s_oStage,true);
        
        s_bMobile = isMobile();

        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
        
        
        s_iPrevTime = new Date().getTime();

        createjs.Ticker.framerate = FPS;
	createjs.Ticker.addEventListener("tick", this._update);
	
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
		
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        this._loadImages();
        if( (DISABLE_SOUND_DESKTOP === false && s_bMobile === false) ||
                                            s_bMobile === true &&  DISABLE_SOUND_MOBILE === false  ){
            this._initSounds();
        }
        
        
        
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
        
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'avatar_win',loop:false,volume:1, ingamename: 'avatar_win'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'bonus_mult',loop:false,volume:1, ingamename: 'bonus_mult'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'bonus_win',loop:false,volume:1, ingamename: 'bonus_win'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'crowd_touchdown',loop:false,volume:1, ingamename: 'crowd_touchdown'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'enemy',loop:false,volume:1, ingamename: 'enemy'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'enemy_tackle',loop:false,volume:1, ingamename: 'enemy_tackle'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'game_over',loop:false,volume:1, ingamename: 'game_over'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'goal',loop:false,volume:1, ingamename: 'goal'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'kick',loop:false,volume:1, ingamename: 'kick'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'miss_goal',loop:false,volume:1, ingamename: 'miss_goal'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'win_bonus',loop:false,volume:1, ingamename: 'win_bonus'});       
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'press_but',loop:false,volume:1, ingamename: 'press_but'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'reel_stop',loop:false,volume:1, ingamename: 'reel_stop'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'reel_stop_bonus',loop:false,volume:1, ingamename: 'reel_stop_bonus'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'reel_stop_freespin',loop:false,volume:1, ingamename: 'reel_stop_freespin'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'start_reel',loop:false,volume:1, ingamename: 'start_reel'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'spin_but',loop:false,volume:1, ingamename: 'spin_but'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'symbol0',loop:false,volume:1, ingamename: 'symbol0'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'symbol1',loop:false,volume:1, ingamename: 'symbol1'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'symbol2',loop:false,volume:1, ingamename: 'symbol2'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'symbol3',loop:false,volume:1, ingamename: 'symbol3'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'symbol4',loop:false,volume:1, ingamename: 'symbol4'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'symbol5',loop:false,volume:1, ingamename: 'symbol5'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'symbol6',loop:false,volume:1, ingamename: 'symbol6'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'symbol7',loop:false,volume:1, ingamename: 'symbol7'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'symbol8',loop:false,volume:1, ingamename: 'symbol8'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'symbol9',loop:false,volume:1, ingamename: 'symbol9'});        
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'soundtrack_bonus',loop:true,volume:1, ingamename: 'soundtrack_bonus'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'crowd_idle',loop:true,volume:1, ingamename: 'crowd_idle'});
        s_aSoundsInfo.push({path: './games/game43/sounds/',filename:'crowd',loop:true,volume:1, ingamename: 'crowd'});
        
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
                                                                                            if(s_aSoundsInfo[i].ingamename === "crowd" && s_oGame !== null){
                                                                                                setVolume("crowd",SOUNDTRACK_VOLUME_IN_GAME);
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
        s_oSpriteLibrary.addSprite("bg_game","./games/game43/sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable1","./games/game43/sprites/paytable1.jpg");
        s_oSpriteLibrary.addSprite("paytable2","./games/game43/sprites/paytable2.jpg");
        s_oSpriteLibrary.addSprite("paytable3","./games/game43/sprites/paytable3.jpg");
        s_oSpriteLibrary.addSprite("paytable4","./games/game43/sprites/paytable4.jpg");
        s_oSpriteLibrary.addSprite("mask_slot","./games/game43/sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("win_frame_anim","./games/game43/sprites/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("but_text","./games/game43/sprites/but_text.png");
        s_oSpriteLibrary.addSprite("msg_box","./games/game43/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("but_arrow_next","./games/game43/sprites/but_arrow_next.png");
        s_oSpriteLibrary.addSprite("but_arrow_prev","./games/game43/sprites/but_arrow_prev.png");
        s_oSpriteLibrary.addSprite("logo","./games/game43/sprites/logo.png");
        s_oSpriteLibrary.addSprite("bg_loading_bonus","./games/game43/sprites/bg_loading_bonus.jpg");
        s_oSpriteLibrary.addSprite("bg_loading","./games/game43/sprites/bg_loading.jpg");
        s_oSpriteLibrary.addSprite("amount_bonus_win","./games/game43/sprites/amount_bonus_win.png");
        s_oSpriteLibrary.addSprite("symbol_0","./games/game43/sprites/symbol_0.jpg");
        s_oSpriteLibrary.addSprite("symbol_0_anim","./games/game43/sprites/symbol_0_anim.jpg");        
        s_oSpriteLibrary.addSprite("symbol_1","./games/game43/sprites/symbol_1.jpg");
        s_oSpriteLibrary.addSprite("symbol_1_anim","./games/game43/sprites/symbol_1_anim.jpg");
        s_oSpriteLibrary.addSprite("symbol_2","./games/game43/sprites/symbol_2.jpg");
        s_oSpriteLibrary.addSprite("symbol_2_anim","./games/game43/sprites/symbol_2_anim.jpg");
        s_oSpriteLibrary.addSprite("symbol_3","./games/game43/sprites/symbol_3.jpg");
        s_oSpriteLibrary.addSprite("symbol_3_anim","./games/game43/sprites/symbol_3_anim.jpg");
        s_oSpriteLibrary.addSprite("symbol_4","./games/game43/sprites/symbol_4.jpg");
        s_oSpriteLibrary.addSprite("symbol_4_anim","./games/game43/sprites/symbol_4_anim.jpg");        
        s_oSpriteLibrary.addSprite("symbol_5","./games/game43/sprites/symbol_5.jpg");
        s_oSpriteLibrary.addSprite("symbol_5_anim","./games/game43/sprites/symbol_5_anim.jpg");
        s_oSpriteLibrary.addSprite("symbol_6","./games/game43/sprites/symbol_6.jpg");
        s_oSpriteLibrary.addSprite("symbol_6_anim","./games/game43/sprites/symbol_6_anim.jpg");        
        s_oSpriteLibrary.addSprite("symbol_7","./games/game43/sprites/symbol_7.jpg");
        s_oSpriteLibrary.addSprite("symbol_7_anim","./games/game43/sprites/symbol_7_anim.jpg"); 
        s_oSpriteLibrary.addSprite("symbol_8","./games/game43/sprites/symbol_8.jpg");
        s_oSpriteLibrary.addSprite("symbol_8_anim","./games/game43/sprites/symbol_8_anim.jpg");         
        s_oSpriteLibrary.addSprite("symbol_9","./games/game43/sprites/symbol_9.jpg");
        s_oSpriteLibrary.addSprite("symbol_9_anim","./games/game43/sprites/symbol_9_anim.jpg"); 
        s_oSpriteLibrary.addSprite("bet_but","./games/game43/sprites/paylines/bet_but.png");
        s_oSpriteLibrary.addSprite("but_credits","./games/game43/sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_delete_savings","./games/game43/sprites/but_delete_savings.png");
        s_oSpriteLibrary.addSprite("but_exit","./games/game43/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./games/game43/sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_play","./games/game43/sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_yes","./games/game43/sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("ctl_logo","./games/game43/sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_credits","./games/game43/sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("audio_icon","./games/game43/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("bg_menu","./games/game43/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("text_bg","./games/game43/sprites/text_bg.png");
        s_oSpriteLibrary.addSprite("bg_loading_freekicks","./games/game43/sprites/bg_loading_freekicks.jpg");
        
        for(var j=0;j<2;j++){
            s_oSpriteLibrary.addSprite("paylines-"+j,"./games/game43/sprites/paylines/paylines-"+j+".png");
            
        }

        
        //AVATAR FRAMES
        for(var k=0;k<3;k++){
            s_oSpriteLibrary.addSprite("avatar_idle-"+k,"./games/game43/sprites/avatar/avatar_idle-"+k+".png");
        }
        
        for(var t=0;t<3;t++){
            s_oSpriteLibrary.addSprite("avatar_win1-"+t,"./games/game43/sprites/avatar/avatar_win1-"+t+".png");
        }
        
        for(var t=0;t<3;t++){
            s_oSpriteLibrary.addSprite("avatar_win2-"+t,"./games/game43/sprites/avatar/avatar_win2-"+t+".png");
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
    

    this._onRemovePreloader = function(){
        APIgetSlotInfos(this.settingPhase,this);
    };
    

    this.settingPhase = function( oInfos){
        try{
            saveItem(LOCALSTORAGE_STRING+"ls_available","ok");
        }catch(evt){
            // localStorage not defined
            s_bStorageAvailable = false;
        }
        
        s_oGameSettings = new CSlotSettings();
        s_oMsgBox = new CMsgBox();
        
        _oPreloader.unload();
        
 
        COIN_BET = oInfos.bets;
        START_BET = oInfos.start_bet;
        MIN_BET  = oInfos.bets[0];
        MIN_REEL_LOOPS = _oData.min_reel_loop;
        REEL_DELAY = _oData.reel_delay;
        TIME_SHOW_WIN = _oData.time_show_win;
        TIME_SHOW_ALL_WINS = _oData.time_show_all_wins;
        TOTAL_MONEY = oInfos.start_money;  
        ENABLE_FULLSCREEN = oData.fullscreen;
        SHOW_CREDITS = oData.show_credits;
        ENABLE_CHECK_ORIENTATION = oData.check_orientation;
        PAYTABLE_VALUES = oInfos.paytable;

        playSound("crowd",1,true);
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
    
   this.stopUpdateNoBlock = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
    };

    this.startUpdateNoBlock = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false; 
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
    ENABLE_CHECK_ORIENTATION = _oData.check_orientation;
    NUM_SPIN_FOR_ADS = oData.num_spin_for_ads;
    RESTART_CREDIT = oData.restart_credit;
    s_bAudioActive = oData.audio_enable_on_startup;
    
    this.initContainer();
}

var s_bMobile;
var s_bFullscreen = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oAttachSection;
var s_oMain;
var s_oSpriteLibrary;
var s_oMsgBox;
var s_oGameSettings;
var s_aSounds;
var s_aSoundsInfo;
var s_bStorageAvailable = true;