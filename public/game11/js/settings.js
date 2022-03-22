var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 1200;

var EDGEBOARD_X = 320;
var EDGEBOARD_Y = 320;

var DISABLE_SOUND_MOBILE = false;
var PRIMARY_FONT = "sourcesanspro-black";
var SECONDARY_FONT = "sourcesanspro-semibold";  //BOLDED ONE

var GAME_NAME = "lottery";

var FPS = 30;
var FPS_TIME = 1000 / FPS;

var SOUNDTRACK_VOLUME_IN_GAME = 0.3;

var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_HELP = 1;
var STATE_GAME = 3;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END = 5;
var ON_CONTROLLER_END    = 8;
var ON_CONTROLLER_REMOVE = 9;
var ON_CONTROLLER_ROLL = 10;
var ON_BACK_MENU = 12;
var ON_RESTART = 13;
var ON_NEXT_LEVEL = 14; 
var ON_REFUSE = 15;
var ON_CONFIRM = 16;
var ON_REDEEM = 17;

var NUM_FRAMES_PER_BALL = 18;

var BALL_LOTTERY_RADIUS = 40;   //centimeters

var BALL_MASS = 0.1;
var BALL_RADIUS = 5;
var BALL_LINEAR_DAMPING = 0.8;
var BALL_SCALE_REFERENCE;
var BALLS_START_POSITION = new Array();

var WORLD_GRAVITY = -980/3;

///////// CAMERA SETTINGS ////////////
var CANVAS_3D_OPACITY = 0.5;
var SHOW_3D_RENDER = false;
var MOVE_CAMERA_TEST = false;

var START_CAMERA_POSITION = {x: 0, y: 0, z: 100};
var NEAR = 0, FAR = 1000;
var CAMERA_ZOOM = 6;
////////////////////////////////////

///////// GAME SETTINGS ////////////
var TOTAL_NUMBERS = 40;
var NUMBERS_TO_PICK = 8;
var COMBO_LENGTH_TO_WIN;
var WIN_RATIO;
var PAYTABLE_SETTINGS;
////////////////////////////////////

///////// SHUFFLE SETTINGS ////////////
var SHUFFLE_TICK_TIME = 50;
var SHUFFLE_IMPULSE_STRENGTH = 9;
var SHUFFLE_NUM_BALL_TO_MOVE_PER_TICK = Math.floor(TOTAL_NUMBERS/8);
////////////////////////////////////


var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
