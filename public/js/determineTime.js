// var end_date = document.getElementById("end_date").innerHTML;
var end_date = document.querySelectorAll(".end_date");
let date1 = [];
end_date.forEach((date) => {
  var date2 = date.innerHTML;
  console.log(date2);
  date1.push(new Date(date2));
});
console.log(date1);

let milliDate = [];
date1.forEach((date) => {
  let date3 = dayjs(date).valueOf();
  milliDate.push(date3);
});
console.log(milliDate);

//gets value in milliseconds
var now = dayjs().valueOf();
console.log(now);

//function to get hours, minutes, and seconds passing
function secondsToHms(seconds) {
  if (!seconds) return "";

  let duration = seconds;
  let hours = duration / 3600;
  duration = duration % 3600;

  let min = parseInt(duration / 60);
  duration = duration % 60;

  let sec = parseInt(duration);

  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }

  if (parseInt(hours, 10) > 0) {
    return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
  } else if (min == 0) {
    return `${sec}s`;
  } else {
    return `${min}m ${sec}s`;
  }
}
var timeLeft = secondsToHms(diff);
console.log(timeLeft);

document.getElementById("time-left").innerHTML = timeLeft;
