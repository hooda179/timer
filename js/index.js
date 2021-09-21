const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const restart = document.querySelector("#restart");
const focusTime = document.querySelector("#focusTime");
let totalMinutes = 0;
let totalSeconds = 0;
let x;
let startMinute;
let StartSecond;
let audio;

restart.disabled = true;
stopBtn.disabled = true;

////////////////////////////////start button function//////////////////////
// when user press start
function countDown() {
  //   set starting time
  startMinute = Number(minutes.value);
  StartSecond = Number(seconds.value);
  // make some buttons disabled for security reasons
  minutes.disabled = true;
  seconds.disabled = true;
  restart.disabled = true;
  stopBtn.disabled = false;
  //   counting function
  x = setInterval(() => {
    //   at the end of counting
    if (Number(minutes.value) == 0 && Number(seconds.value == 0)) {
      // stop counting
      clearInterval(x);
      // enable the needed buttons
      minutes.disabled = false;
      seconds.disabled = false;
      // calculating focus period
      totalMinutes += startMinute;
      totalSeconds += StartSecond;
      focusTime.textContent = `${totalMinutes} minutes and ${totalSeconds} seconds`;
      // play an alert
      playMusic();
    }
    //   when seconds gets zero change minutes
    else if (seconds.value == 0) {
      minutes.value--;
      seconds.value = 59;
      //   the normal change
    } else {
      seconds.value--;
    }
  }, 1000);
}

//////////////////////////////////stop button function/////////////////////
// when user clicks stop button
function stop() {
  // stop counting
  clearInterval(x);
  // stop music if it runs
  if (audio) {
    audio.pause();
  }
  // enable restart button
  restart.disabled = false;
  // disable stop button
  stopBtn.disabled = true;
  // calculating focus period time
  const mins = startMinute - Number(minutes.value) - 1;
  const scnds = StartSecond + 60 - Number(seconds.value) + mins * 60;
  const focusedMinutes = Math.floor(scnds / 60);
  const focusedSeconds = scnds % 60;
  // adding the focus time to total time
  totalMinutes += focusedMinutes;
  totalSeconds += focusedSeconds;
  // enable time inputs
  minutes.disabled = false;
  seconds.disabled = false;
  // calculate the seconds to not be more than 60
  if (totalSeconds == 120) {
    totalSeconds = 0;
    totalMinutes += 2;
  } else if (totalSeconds > 60) {
    const overSeconds = totalSeconds % 60;
    totalSeconds = overSeconds;
    totalMinutes++;
  }
  // writing focus time
  focusTime.textContent = `${totalMinutes} minutes and ${totalSeconds} seconds`;
}

//////////////////////////////restert button function/////////////////////
// when user press restart
function restarting() {
  // reset the inputs to be zero
  minutes.value = 0;
  seconds.value = 0;
  // disable restart button
  restart.disabled = true;
}

//////////////////////////////play music function////////////////////////////////////////////
// music function
function playMusic() {
  audio = new Audio("music/done.mp3");
  audio.play();
}
////////////////////////////attaching events to buttons///////////////////////////////////////////////
// attach events to buttons
restart.addEventListener("click", restarting);
startBtn.addEventListener("click", countDown);
stopBtn.addEventListener("click", stop);
