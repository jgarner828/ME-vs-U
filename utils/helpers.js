var dayjs = require('dayjs')

module.exports = {

 timeLeft: (end_date) => {
    var now = dayjs().valueOf();
    var real_endDate = dayjs(end_date).valueOf();
    // subtracts the end-date minus the current one then divides by 1000
    var diff = (real_endDate - now) / 1000; 
    //function to get hours, minutes, and seconds passing
    function secondsToHms(seconds) {
        if (!seconds) return '';
      
        let duration = seconds;
        let hours = duration / 3600;
        duration = duration % (3600);
      
        let min = parseInt(duration / 60);
        duration = duration % (60);
      
        let sec = parseInt(duration);
      
        if (sec < 10) {
          sec = `0${sec}`;
        }
        if (min < 10) {
          min = `0${min}`;
        }
      
        if (parseInt(hours, 10) > 0) {
          return `${parseInt(hours, 10)}h ${min}m ${sec}s`
        }
        else if (min == 0) {
          return `${sec}s`
        }
        else {
          return `${min}m ${sec}s`
        }
      }
      var timeLeft = secondsToHms(diff);
      console.log(timeLeft)
 },

    checkWinner: (user, winner) => {
        if(user = winner){
            return true;
        }
        else{
            return false;
        }
    },
  };