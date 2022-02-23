module.exports = {

    checkWinner: (user, winner) => {
        if(user = winner){
            return true;
        }
        else{
            return false;
        }
    },

    timeRemaining: (end_date, start_date, today) => {
        return today;
    //  let timeRemaining;
     
    // if(start_date>today){
    //     timeRemaining = (end_date - start_date)/86400000;
  
    //     if(isNaN(timeRemaining)){
    //         return 0;
    //     }
    //     else{ return timeRemaining
    //     };
    // };
    // if(start_date<today){
    //     timeRemaining = (end_date - today)/86400000;
  
    //     if(isNaN(timeRemaining)|| timeRemaining <0){
    //         return 0;
    //     }
    //     else{ return timeRemaining
    //     };

    // };

    },


    isActive:(end_date, start_date) => {

        
        let timeRemaining = (end_date - start_date)/86400000;
     
           if(isNaN(timeRemaining)){
               return false;
           }
           else{ return true;
           };
       },



    userScore:(var1, var2) => {
        if (var1 === var2) {
            return true;
        } else {
            return false;
        }
       },

    

  };