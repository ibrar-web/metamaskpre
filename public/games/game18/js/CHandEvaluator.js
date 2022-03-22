function CHandEvaluator(){
    
    var _aSortedHand;
    
    this.evaluate = function(aHand){
        _aSortedHand = new Array();
        for(var i=0;i<aHand.length;i++){
            _aSortedHand[i] = {rank:aHand[i].getRank(),suit:aHand[i].getSuit()};
        }
        
        _aSortedHand.sort(this.compareRank);
		
        
        var iRet = this.rankHand();

        return iRet;
    };
    
    this.rankHand = function(){
        if(this._checkForRoyalFlushNoDeuces()){
            return ROYAL_FLUSH_NO_DEUCES;
        }else if(this._checkForFourDeuces()){
            return FOUR_DEUCES;
        }else if(this._checkForRoyalFlushWithDeuces()){
            return ROYAL_FLUSH_WITH_DEUCES;
        }else if(this._checkForFiveOfAKind()){
            return FIVE_OF_A_KIND;
        }else if(this._checkForStraightFlush()){
            return STRAIGHT_FLUSH;
        }else if(this._checkForFourOfAKind()){
            return FOUR_OF_A_KIND;
        }else if(this._checkForFullHouse()){
            return FULL_HOUSE;
        }else if(this._checkForFlush()){
            return FLUSH;
        }else if(this._checkForStraight()){
            return STRAIGHT;
        }else if(this._checkForThreeOfAKind()){
            return THREE_OF_A_KIND;
        }else{
            this._identifyHighCard();
            return HIGH_CARD;
        }
    };
    
    
    
    this._checkForRoyalFlushNoDeuces = function(){
        if(this._isRoyalStraight() && this._isFlush()){
            for(var i=0;i<_aSortedHand.length;i++){
                if(_aSortedHand[i].rank === CARD_TWO){
                    return false;
                }
            }
            return true;
        }else{
            return false;
        }
    };
    
    this._checkForFourDeuces = function(){
        var oRet = this.getDeucesNum();
        
        if(oRet.cont === 4){
            _aSortedHand.splice(oRet.indexes[0],1);
            return true;
        }else{
            return false;
        }
    };
    
    this._checkForRoyalFlushWithDeuces = function(){
        if(this._isRoyalStraight() && this._isFlush()){
            for(var i=0;i<_aSortedHand.length;i++){
                if(_aSortedHand[i].rank === CARD_TWO){
                    return true;
                }
            }
            return false;
        }else{
            return false;
        }
     };
     
     this._checkForFiveOfAKind = function(){
         var iLastCard = _aSortedHand[_aSortedHand.length-1].rank;
         var oRet = this.getDeucesNum();
         var iCont = oRet.cont;
         var iStart = iCont;
         for(var i=iStart;i<_aSortedHand.length;i++){
             if(_aSortedHand[i].rank === iLastCard){
                 iCont++;
             }
         }

         return iCont===5?true:false;
     };

    this._checkForStraightFlush = function(){
        if(this._isStraight() && this._isFlush()){
            return true;
        }else {
            return false;
        }
    };

    this._checkForFourOfAKind = function(){
         var oRet = this.getDeucesNum();
         var iStart = oRet.cont;
         if(_aSortedHand[iStart].rank === _aSortedHand[3].rank){
            _aSortedHand.splice(4,1);
            return true;
        }else if(_aSortedHand[iStart+1].rank === _aSortedHand[4].rank){
            _aSortedHand.splice(iStart,1);
            return true;
        }else{
            return false;
        }
    };
    
    

    this._checkForFullHouse = function(){
        if( ( (_aSortedHand[0].rank === _aSortedHand[1].rank || _aSortedHand[0].rank === CARD_TWO) && _aSortedHand[2].rank === _aSortedHand[4].rank) || 
                                ( (_aSortedHand[0].rank === _aSortedHand[2].rank || (_aSortedHand[0].rank === CARD_TWO && _aSortedHand[1].rank === _aSortedHand[2].rank) ) 
                                    && _aSortedHand[3].rank === _aSortedHand[4].rank) || 
                                    (_aSortedHand[0].rank === CARD_TWO && _aSortedHand[0].rank === _aSortedHand[1].rank) && _aSortedHand[3].rank === _aSortedHand[4].rank ){
            return true;
        }else{
            return false;
        }
    };


    this._checkForFlush = function(){
        if(this._isFlush()){
            return true;
        } else{
            return false;
        }
    };

    this._checkForStraight = function(){
        if(this._isStraight()){
            return true;
        } else{
            return false;
        }
     };

    this._checkForThreeOfAKind = function() {
        var oRet = this.getDeucesNum();
         
        var iStart = oRet.cont;
        if(iStart ===2){
            _aSortedHand.splice(2,1);
            _aSortedHand.splice(2,1);
            return true;
        }
        
        if(iStart === 1){
            if(_aSortedHand[1].rank === _aSortedHand[2].rank){
                _aSortedHand.splice(3,1);
                _aSortedHand.splice(3,1);
                return true;
            }else if(_aSortedHand[1].rank === _aSortedHand[3].rank){
                _aSortedHand.splice(2,1);
                _aSortedHand.splice(3,1);
                return true;
            }else if(_aSortedHand[2].rank === _aSortedHand[3].rank){ 
                _aSortedHand.splice(1,1);
                _aSortedHand.splice(3,1);
                return true;
            }else if(_aSortedHand[3].rank === _aSortedHand[4].rank){
                _aSortedHand.splice(1,1);
                _aSortedHand.splice(1,1);
                return true;
            }
        }else{
            if(_aSortedHand[0].rank === _aSortedHand[1].rank && _aSortedHand[0].rank === _aSortedHand[2].rank){
                _aSortedHand.splice(3,1);
                _aSortedHand.splice(3,1);
                return true;
            } else if(_aSortedHand[1].rank === _aSortedHand[2].rank && _aSortedHand[1].rank === _aSortedHand[3].rank){
                _aSortedHand.splice(0,1);
                _aSortedHand.splice(3,1);
                return true;
            }else if(_aSortedHand[2].rank === _aSortedHand[3].rank && _aSortedHand[2].rank === _aSortedHand[4].rank){
                _aSortedHand.splice(0,1);
                _aSortedHand.splice(0,1);
                return true;
            }
        }

        return false;
    };

    this._checkForTwoPair = function(){
        if(_aSortedHand[0].rank === _aSortedHand[1].rank && _aSortedHand[2].rank === _aSortedHand[3].rank){
            _aSortedHand.splice(4,1);
            return true;
        }else if(_aSortedHand[1].rank === _aSortedHand[2].rank && _aSortedHand[3].rank === _aSortedHand[4].rank){
            _aSortedHand.splice(0,1);
            return true;
        }else if(_aSortedHand[0].rank === _aSortedHand[1].rank && _aSortedHand[3].rank === _aSortedHand[4].rank){
            _aSortedHand.splice(2,1);
            return true;
        } else{
            return false;
        }
    };

    this._checkForOnePair = function(){
        for(var i = 0; i < 4; i++){
            if(_aSortedHand[i].rank === _aSortedHand[i + 1].rank && _aSortedHand[i].rank > CARD_TEN){
                var p1 = _aSortedHand[i];
                var p2 = _aSortedHand[i + 1];
                _aSortedHand = new Array();
                _aSortedHand.push(p1);
                _aSortedHand.push(p2);

                return true;
            }
        }

        return false;
    };

    this._identifyHighCard = function(){
        for(var i = 0; i < 4; i++){
            _aSortedHand.splice(0,1);
        }
    };
    
    this._isFlush = function(){
        if(    (_aSortedHand[4].suit === _aSortedHand[0].suit || _aSortedHand[0].rank === CARD_TWO)
            && (_aSortedHand[4].suit === _aSortedHand[1].suit || _aSortedHand[1].rank === CARD_TWO)
            && (_aSortedHand[4].suit === _aSortedHand[2].suit || _aSortedHand[2].rank === CARD_TWO)
            && (_aSortedHand[4].suit === _aSortedHand[3].suit || _aSortedHand[3].rank === CARD_TWO)){
            return true;
        }else{
            return false;
        }
    };

    this._isRoyalStraight = function(){
        if( (_aSortedHand[0].rank === CARD_TEN || _aSortedHand[0].rank === CARD_TWO)
            && (_aSortedHand[1].rank === CARD_JACK || _aSortedHand[1].rank === CARD_TWO)
            && (_aSortedHand[2].rank === CARD_QUEEN || _aSortedHand[2].rank === CARD_TWO)
            && (_aSortedHand[3].rank === CARD_KING || _aSortedHand[3].rank === CARD_TWO)
            && (_aSortedHand[4].rank === CARD_ACE || _aSortedHand[4].rank === CARD_TWO)){
            return true;
        }else{
            return false;
        }
    };
	
    this._isStraight = function() {
        var iNumDeuces = this.getDeucesNum().cont;
        var iUsedDeuces = 0;
        for(var i=iNumDeuces;i<_aSortedHand.length-1;i++){
            var iDiff = _aSortedHand[i+1].rank - (_aSortedHand[i].rank + 1);

            if(iDiff > 0){
                if(_aSortedHand[i+1].rank === CARD_ACE && (_aSortedHand[iNumDeuces].rank - iNumDeuces - 1) === 1){
                     return true;
                }else{
                    iUsedDeuces += iDiff;
                    if (iUsedDeuces > iNumDeuces) {
                           return false;
                    }
                }
                
           }else if(iDiff < 0){
               return false;
           }
        }
        return true;
    };
    
    this.getDeucesNum = function(){
        var aIndexToSplice = new Array();
        for(var i=0;i<_aSortedHand.length;i++){
            if(_aSortedHand[i].rank !== CARD_TWO){
               aIndexToSplice.push(i);
            }
        }
        
        return {cont: _aSortedHand.length-aIndexToSplice.length, indexes:aIndexToSplice};
    };
    
    this.compareRank = function(a,b) {
        if (a.rank < b.rank)
           return -1;
        if (a.rank > b.rank)
          return 1;
        return 0;
    };
    
    this.getSortedHand = function(){
        return _aSortedHand;
    };

}