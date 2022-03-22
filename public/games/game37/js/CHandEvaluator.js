function CHandEvaluator(){
    
    this.evaluate = function(aHand){/*
        trace("aHand[0].rank: "+aHand[0].rank);
        trace("aHand[1].rank: "+aHand[1].rank);
        trace("aHand[2].rank: "+aHand[2].rank);*/
        //CHECK IF CONSECUTIVE RANKS
        if(Math.abs((aHand[0].rank - aHand[1].rank)) === 1){
            return {win:true,result:CONSECUTIVE_RANK};
        }
        
        //CHECK IF SAME RANK
        if(aHand[0].rank === aHand[1].rank){
            if(aHand[2].rank === aHand[0].rank){
                return {win:true,result:THREE_OF_A_KIND};
            }else{
                return {win:true,result:PAIR_RANK};
            }
        }
        
        //FIND GAP BETWEEN NUMBERS
        var iGap = Math.abs((aHand[0].rank - aHand[1].rank));
        if(aHand[0].rank > aHand[1].rank){
            var aSortedCards = [aHand[1].rank,aHand[0].rank];
        }else{
            var aSortedCards = [aHand[0].rank,aHand[1].rank];
        }
        
        if(aHand[2].rank > aSortedCards[0] && aHand[2].rank < aSortedCards[1]){
            return {win:true,result:window["GAP_"+iGap]};
        }else{
            return {win:false,result:window["GAP_"+iGap]};
        }
        
    };
    
}