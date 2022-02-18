module.exports = {

    checkWinner: (user, winner) => {
        if(user = winner){
            return true;
        }
        else{
            return false;
        }
    },

    timeRemaining: (end_date, start_date) => {
     let timeRemaining = (end_date - start_date)/86400000;
  
        if(isNaN(timeRemaining)){
            return 0;
        }
        else{ return timeRemaining
        };
    },
    isActive:(end_date, start_date) => {
        let timeRemaining = (end_date - start_date)/86400000;
     
           if(isNaN(timeRemaining)){
               return false;
           }
           else{ return true;
           };
       },

  };