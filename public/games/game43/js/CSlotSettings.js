function CSlotSettings(){
    
    this._init = function(){
        this._initSymbolSpriteSheets();
        this._initSymbolAnims();
        this._initSymbolsOccurence();
    };
    
    this._initSymbolSpriteSheets = function(){
        s_aSymbolData = new Array();
        for(var i=0;i<NUM_SYMBOLS;i++){
            var oData = {   // image to use
                            images: [s_oSpriteLibrary.getSprite('symbol_'+i)], 
                            // width, height & registration point of each sprite
                            frames: {width: SYMBOL_WIDTH, height: SYMBOL_HEIGHT, regX: 0, regY: 0}, 
                            animations: {  static: [0, 1],moving:[1,2] }
            };

            s_aSymbolData[i] = new createjs.SpriteSheet(oData);
        }  
    };

    this._initSymbolsOccurence = function(){
        s_aRandSymbols = new Array();
        
        var i;
        
        for(i=0;i<1;i++){
            s_aRandSymbols.push(9);
        }
        
        for(i=0;i<2;i++){
            s_aRandSymbols.push(8);
        }
        
        for(i=0;i<3;i++){
            s_aRandSymbols.push(7);
        }
        
        
        for(i=0;i<4;i++){
            s_aRandSymbols.push(6);
        }
        
        
        for(i=0;i<5;i++){
            s_aRandSymbols.push(5);
        }
        
        for(i=0;i<6;i++){
            s_aRandSymbols.push(4);
        }
        
        
        for(i=0;i<7;i++){
            s_aRandSymbols.push(3);
        }
        
        
        for(i=0;i<8;i++){
            s_aRandSymbols.push(2);
            s_aRandSymbols.push(1);
            s_aRandSymbols.push(0);
        }

    };
    
    this._initSymbolAnims = function(){
        s_aSymbolAnims = new Array();
        var iFrameRate = Math.floor(FPS/2);
        
        for(var k=0;k<NUM_SYMBOLS;k++){
                var oData = {   
                        framerate: iFrameRate,
                        images: [s_oSpriteLibrary.getSprite("symbol_"+k+"_anim")], 
                        // width, height & registration point of each sprite
                        frames: {width: SYMBOL_ANIM_WIDTH, height: SYMBOL_ANIM_HEIGHT},  
                        animations: {  static: [0],anim:[0,23] }
                };

                s_aSymbolAnims[k] = new createjs.SpriteSheet(oData);
            
            
        }
        
    };

    this._init();
}

var s_aSymbolData;
var s_aPaylineCombo;
var s_aSymbolAnims;
var s_aRandSymbols;
