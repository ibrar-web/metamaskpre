function CGameSettings(){
    
    var _aCardDeck;
    var _aShuffledCardDecks;

    
    this._init = function(){
        var iSuit = -1;
        _aCardDeck=new Array();
        for(var j=0;j<52;j++){
            
            var iRest=(j+1)%13;
            if(iRest === 1){
                iRest=14;
                iSuit++;
            }else if(iRest === 0){
                iRest = 13;
            }
            _aCardDeck.push({fotogram:j,rank:iRest,suit:iSuit});
        }
        
        //ADD JOKER
        _aCardDeck.push({fotogram:j,rank:15,suit:0});
        
        
    };
	
    this.getFichesValueAt = function(iIndex){
            return CHIP_VALUES[iIndex];
    };
		
    this.getIndexForFiches = function(iValue){
        var iRes=0;
        for(var i=0;i<CHIP_VALUES.length;i++){
                if(CHIP_VALUES[i] === iValue){
                        iRes=i;
                }
        }
        return iRes; 
    };
		
    this.generateFichesPile = function(iFichesValue){
        var aFichesPile=new Array();
        var iValueRest;
        var iCont=CHIP_VALUES.length-1;
        var iCurMaxFicheStake=CHIP_VALUES[iCont];


        do{
                iValueRest=iFichesValue%iCurMaxFicheStake;
                iValueRest=CMath.roundDecimal(iValueRest,1);

                var iDivision=Math.floor(iFichesValue/iCurMaxFicheStake);

                for(var i=0;i<iDivision;i++){
                        aFichesPile.push(iCurMaxFicheStake);
                }

                iCont--;
                iCurMaxFicheStake=CHIP_VALUES[iCont];
                iFichesValue=iValueRest;
        }while(iValueRest>0 && iCont>-1);

        return aFichesPile;
    };
		
    this.timeToString = function( iMillisec ){		
        iMillisec = Math.round((iMillisec/1000));

        var iMins = Math.floor(iMillisec/60);
        var iSecs = iMillisec-(iMins*60);

        var szRet = "";

        if ( iMins < 10 ){
                szRet += "0" + iMins + ":";
        }else{
                szRet += iMins + ":";
        }

        if ( iSecs < 10 ){
                szRet += "0" + iSecs;
        }else{
                szRet += iSecs;
        } 

        return szRet;   
    };
		
    this.getShuffledCardDeck = function(){
        var aTmpDeck=new Array();

        for(var i=0;i<_aCardDeck.length;i++){
                aTmpDeck[i]=_aCardDeck[i];
        }

        _aShuffledCardDecks = new Array();
        while (aTmpDeck.length > 0) {
                _aShuffledCardDecks.push(aTmpDeck.splice(Math.round(Math.random() * (aTmpDeck.length - 1)), 1)[0]);
        }
        
        
        //_aShuffledCardDecks.unshift({fotogram:52,rank:15,suit:0});
        //_aShuffledCardDecks.unshift({fotogram:13,rank:14,suit:1},{fotogram:4,rank:5,suit:0},{fotogram:26,rank:14,suit:2},{fotogram:45,rank:7,suit:3},{fotogram:20,rank:8,suit:1},{fotogram:30,rank:5,suit:2},{fotogram:50,rank:12,suit:3});

        return _aShuffledCardDecks;	
    };
    
    this.getCardDeck = function(){
        return _aCardDeck;
    };
                
    this._init();
}