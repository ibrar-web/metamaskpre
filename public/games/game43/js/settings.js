var CANVAS_WIDTH = 1500;
var CANVAS_HEIGHT = 768;

var EDGEBOARD_X = 180;
var EDGEBOARD_Y = 40;

var FPS = 30;
var FPS_TIME      = 1000/FPS;
var DISABLE_SOUND_MOBILE  = false;
var DISABLE_SOUND_DESKTOP = false;
var LOCALSTORAGE_STRING = "slot_ultimate_football_";

var FONT_GAME_1 = "robotoblack";
var FONT_GAME_2 = "VT323";

var STATE_LOADING = 0;
var STATE_MENU    = 1;	
var STATE_GAME    = 2;

var GAME_STATE_IDLE         = 0;
var GAME_STATE_SPINNING     = 1;
var GAME_STATE_SHOW_ALL_WIN = 2;
var GAME_STATE_SHOW_WIN     = 3;
var GAME_STATE_BONUS        = 4;
var GAME_STATE_FREEKICK     = 5;

var REEL_STATE_START   = 0;
var REEL_STATE_MOVING = 1;
var REEL_STATE_STOP    = 2;

var SPIN_BUT_STATE_SPIN = "spin";
var SPIN_BUT_STATE_STOP = "stop";
var SPIN_BUT_STATE_AUTOSPIN = "autospin";
var SPIN_BUT_STATE_DISABLE = "disable";
var SPIN_BUT_STATE_FREESPIN = "freespin";
var SPIN_BUT_STATE_SKIP = "skip";

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP   = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT  = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END   = 5;
var ON_END_BIG_WIN = 6;
var ON_BUT_YES_DOWN = 7;
var ON_END_PLAYER_MOVE = 8;
var ON_OPPONENT_HIDE = 9;
var ON_OPPONENT_TACKLE = 10;
var ON_BONUS_END = 11;
var ON_FREEKICK_PLAY = 12;
var ON_EXIT_FREEKICKS_MSGBOX = 13;
var ON_EXIT_FREEKICKS = 14;

var STATE_FREEKICKS_IDLE = 0;
var STATE_FREEKICKS_KICK = 1;

const BONUS_ANIM_RUN = 0;
const BONUS_ANIM_FALL = 1;
const BONUS_ANIM_TOUCHDOWN = 2;

var BONUS_BUTTON_1 = "up_left";
var BONUS_BUTTON_2 = "center_left";
var BONUS_BUTTON_3 = "down_left";
var BONUS_BUTTON_4 = "up_right";
var BONUS_BUTTON_5 = "center_right";
var BONUS_BUTTON_6 = "down_right";

var REEL_OFFSET_X = 330;
var REEL_OFFSET_Y = 97;
var WIDTH_MASK_SLOT;
var START_REEL_OFFSET_X;
var START_REEL_OFFSET_Y;

var NUM_REELS = 5;
var NUM_ROWS = 3;
var NUM_SYMBOLS = 10;
var WILD_SYMBOL = 7;
var BONUS_SYMBOL = 9;
var FREESPIN_SYMBOL = 8;

var NUM_PAYLINES = 20;
var SYMBOL_WIDTH = 171;
var SYMBOL_HEIGHT = 164;
var SYMBOL_ANIM_WIDTH = 340;
var SYMBOL_ANIM_HEIGHT = 326;
var WIN_BIG_ANIM_WIDTH = 281;
var WIN_BIG_ANIM_HEIGHT = 270;

const MULT_PER_BONUS_FINAL_PRIZE = 150;
const TIME_OPPONENT_RUN = 3000;
const STARTING_STANDS_SCALE_BONUS = 0.74;

var SPACE_BETWEEN_SYMBOLS = 12;
var SPACE_HEIGHT_BETWEEN_SYMBOLS = 3;
var MAX_FRAMES_REEL_EASE = 12;
var MIN_REEL_LOOPS;
var REEL_DELAY;
var REEL_START_Y = 20 -((SYMBOL_HEIGHT +SPACE_HEIGHT_BETWEEN_SYMBOLS )* 3);
var REEL_ARRIVAL_Y =  20 + ((SYMBOL_HEIGHT+SPACE_HEIGHT_BETWEEN_SYMBOLS) * 3);
var TIME_SHOW_WIN;
var TIME_SHOW_ALL_WINS = 2000;

var MAX_BET;
var TOTAL_MONEY;
var COIN_BET;

var BONUS_FREESPIN = 1;
var BONUS_GAME = 2;

var REEL_SCALE =1// 0.85;

var STATE_BONUS_IDLE = 0;
var STATE_BONUS_KICK = 1;
var STATE_BONUS_WIN = 2;
var STATE_BONUS_LOSE = 3;

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
var SOUNDTRACK_VOLUME_IN_GAME  = 1;	
var RESTART_CREDIT;	
var NUM_SPIN_FOR_ADS;

//////////FREEKICKS SETTINGS////////////////////
var NULL_TARGET = 0;
var NULL_TARGET_POLE = 1;
var GREEN_TARGET = 2;

var BALL_FLYTIME = 2500;
var BALL_MAX_ROTATION = 30;

var GOAL_AREA = new Array();
GOAL_AREA[0] = {x: 0, y: -40, width: 750, height: 435};
GOAL_AREA[1] = {x: -26, y: -94, width: 750, height: 420};
GOAL_AREA[2] = {x: -18, y: -78, width: 750, height: 400};

var STAKE_POS = new Array();
STAKE_POS[0] = [{x:-160, y:-260}, {x:-165, y:190}, {x:165, y:190}, {x:160, y:-260}];
STAKE_POS[1] = [{x:-185, y:-300}, {x:-190, y:170}, {x:140, y:150}, {x:135, y:-350}];
STAKE_POS[2] = [{x:-170, y:-330}, {x:-175, y:165}, {x:140, y:180}, {x:140, y:-280}];

var POST_POS = new Array();
POST_POS[0] = {x:0, y:66};
POST_POS[1] = {x:-26, y:20};

var TARGET_AREA_SPRITE_OFFSET = new Array();
TARGET_AREA_SPRITE_OFFSET[0] = {red:{x:0, y:0}, yellow:{x:0, y:0}, green:{x:0, y:0}};
TARGET_AREA_SPRITE_OFFSET[1] = {red:{x:0, y:0}, yellow:{x:4, y:-6}, green:{x:5, y:-9}};
TARGET_AREA_SPRITE_OFFSET[2] = {red:{x:0, y:0}, yellow:{x:-3, y:-6}, green:{x:-4, y:-9}};

var Y_BAR_OFFSET = new Array();
Y_BAR_OFFSET[0] = -150;
Y_BAR_OFFSET[1] = -150;
Y_BAR_OFFSET[2] = -150;

var GREEN_INDICATOR_RANGE = new Array();
GREEN_INDICATOR_RANGE[0] = {horiz:{left:-14, right:14}, vert:{top:-29, bot:24}};
GREEN_INDICATOR_RANGE[1] = {horiz:{left:-17, right:11}, vert:{top:-25, bot:32}};
GREEN_INDICATOR_RANGE[2] = {horiz:{left:-12, right:15}, vert:{top:-25, bot:32}};