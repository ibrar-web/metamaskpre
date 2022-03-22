var CANVAS_WIDTH = 1360;
var CANVAS_HEIGHT = 640;

var EDGEBOARD_X = 250;
var EDGEBOARD_Y = 40;

var FPS = 30;
var FPS_TIME      = 1000/FPS;
var DISABLE_SOUND_MOBILE = false;

var PRIMARY_FONT = "arialrounded";

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 2;
var STATE_GAME    = 3;

var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_DRAG_START  = 4;
var ON_DRAG_END    = 5;
var ON_RELEASE_YES = 6;
var ON_RELEASE_NO  = 7;

var MODE_EASY = 0;
var MODE_HARD = 1;

var STATE_CARD_DEALING = 0;

var ON_CARD_SHOWN = 0;
var ON_CARD_ANIMATION_ENDING = 1;
var ON_CARD_SELECTED = 2;
var ON_CARD_REMOVED = 3;

var CARD_BOARD = 0;
var CARD_PILE = 1;
var CARD_WASTE = 2;

var CARD_WIDTH = 78;
var CARD_HEIGHT = 119;
var CARD_OFFSET_X = 5;
var CARD_OFFSET_Y = CARD_HEIGHT/3;
var START_BOARD_X = CANVAS_WIDTH/2 - 3*(CARD_WIDTH+CARD_OFFSET_X);
var START_BOARD_Y = 200;
var NUM_CARDS_SOLITAIRE = 35;
var NUM_ROWS = 5;
var NUM_COLS = 7;
var TIME_CARD_DEALING = 200;
var TIME_CARD_REMOVE = 1000;
var SUM_MATCHING = 13;
var NUM_SCROLLING_DECK;
var SCORE_PER_CARD;
var SCORE_PER_ROW;
var MAX_TIME_SCORE = 300000; //5 MINUTES

var SOUNDTRACK_VOLUME_IN_GAME  = 0.1;
var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;