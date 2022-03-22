function CGameSettings(){
    
    var _aCardDeck;
    var _aShuffledCardDecks;
    var _aCardValue;
    
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
        //_aShuffledCardDecks.unshift({fotogram:26,rank:14,suit:2},{fotogram:16,rank:4,suit:1},{fotogram:4,rank:5,suit:0},{fotogram:3,rank:4,suit:0},{fotogram:41,rank:3,suit:3},{fotogram:1,rank:2,suit:0})
        //_aShuffledCardDecks.unshift({fotogram:2,rank:3,suit:0},{fotogram:45,rank:7,suit:3},{fotogram:17,rank:5,suit:1},{fotogram:18,rank:6,suit:1},{fotogram:14,rank:2,suit:1},{fotogram:18,rank:6,suit:1})
        return _aShuffledCardDecks;
    };
		
    this.getCardValue = function(iId){
            return _aCardValue[iId];
    };
                
    this._init();
}