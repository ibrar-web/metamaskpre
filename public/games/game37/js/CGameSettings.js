function CGameSettings(){
    
    var _aCardDeck;
    var _aShuffledCardDecks;
    var _aFichesValue;
    var _aPuckPos;
    
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
        
        _aFichesValue=new Array(0.1,1,5,10,25,100);
        
        this._initPuckPos();
        this._initPayouts();
    };
    
    this._initPuckPos = function(){
        _aPuckPos = new Array();
        _aPuckPos[GAP_1] = {x:494,y:414};
        _aPuckPos[GAP_2] = {x:548,y:414};
        _aPuckPos[GAP_3] = {x:604,y:414};
        _aPuckPos[GAP_4] = {x:660,y:414};
        _aPuckPos[GAP_5] = {x:716,y:414};
        _aPuckPos[GAP_6] = {x:770,y:414};
        _aPuckPos[GAP_7] = {x:826,y:414};
        _aPuckPos[GAP_8] = {x:882,y:414};
        _aPuckPos[GAP_9] = {x:936,y:414};
        _aPuckPos[GAP_10] = {x:992,y:414};
        _aPuckPos[GAP_11] = {x:1048,y:414};
        _aPuckPos[GAP_12] = {x:1048,y:414};
        _aPuckPos[CONSECUTIVE_RANK] = {x:1104,y:414};
        _aPuckPos[PAIR_RANK] = {x:1158,y:414};
        _aPuckPos[THREE_OF_A_KIND] = {x:1213,y:414};
    };

    this._initPayouts = function(){
        PAYOUT_MULT[GAP_1] = 5;
        PAYOUT_MULT[GAP_2] = 4;
        PAYOUT_MULT[GAP_3] = 2;
        PAYOUT_MULT[GAP_4] = 1;
        PAYOUT_MULT[GAP_5] = 1;
        PAYOUT_MULT[GAP_6] = 1;
        PAYOUT_MULT[GAP_7] = 1;
        PAYOUT_MULT[GAP_8] = 1;
        PAYOUT_MULT[GAP_9] = 1;
        PAYOUT_MULT[GAP_10] = 1;
        PAYOUT_MULT[GAP_11] = 1;
        PAYOUT_MULT[GAP_12] = 1;
        PAYOUT_MULT[CONSECUTIVE_RANK] = 0;
        PAYOUT_MULT[PAIR_RANK] = 0;
        PAYOUT_MULT[THREE_OF_A_KIND] = 11;
    };
		
    this.getFichesValues = function(){
            return _aFichesValue;
    };
		
    this.getFichesValueAt = function(iIndex){
            return _aFichesValue[iIndex];
    };
		
    this.getIndexForFiches = function(iValue){
        var iRes=0;
        for(var i=0;i<_aFichesValue.length;i++){
                if(_aFichesValue[i] === iValue){
                        iRes=i;
                }
        }
        return iRes; 
    };
		
    this.generateFichesPile = function(iFichesValue){
        var aFichesPile=new Array();
        var iValueRest;
        var iCont=_aFichesValue.length-1;
        var iCurMaxFicheStake=_aFichesValue[iCont];


        do{
                iValueRest=iFichesValue%iCurMaxFicheStake;
                iValueRest=CMath.roundDecimal(iValueRest,1);

                var iDivision=Math.floor(iFichesValue/iCurMaxFicheStake);

                for(var i=0;i<iDivision;i++){
                        aFichesPile.push(iCurMaxFicheStake);
                }

                iCont--;
                iCurMaxFicheStake=_aFichesValue[iCont];
                iFichesValue=iValueRest;
        }while(iValueRest>0 && iCont>-1);

        return aFichesPile;
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

        return _aShuffledCardDecks;	
    };
    
    this.getCardDeck = function(){
        return _aCardDeck;
    };
    
    this.getPuckPos = function(iIndex){
        return _aPuckPos[iIndex];
    };
    
    this._init();
}