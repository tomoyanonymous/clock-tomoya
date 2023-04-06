let state, timerInterval, currentProgress, currentSec, countSec = 60*20;
let alert = new Audio("../sounds/alert.wav");
alert.loop = true;

let urlQueryParam = function (name) {
  let vars = {};
  let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars[hash[0]] = hash[1];
  }
  return vars[name];
};

if (!isNaN(urlQueryParam('sec'))) {
  countSec = urlQueryParam('sec');
}

$(function () {
  setstate('off');
  print(countSec);

  $('#button-minus').click(function () {
    countSec = countSec - 60;
    print(countSec);
  });

  $('#button-plus').click(function () {
    countSec = countSec + 60;
    print(countSec);
  });

  $('#time').click(function () {
    touch();
  });
});

function touch() {
  if (state === 'on') {
    setstate('off');
    $('.button').show();
    clearInterval(timerInterval);
    alert.pause();
    print(countSec);
  } else {
    setstate('on');
    $('.button').hide();
    currentSec = countSec;
    timer();
    timerInterval = setInterval("timer()", 1000);
  }
}

function timer() {
  if (currentSec <= 0) {
    clearInterval(timerInterval);
    $('#view').addClass('over');
    alert.play();
  } else {
    currentProgress = Math.round((1 - currentSec / countSec) * 100);
    $('#view').css('background-size', currentProgress + '% 100%');
  }
  print(currentSec);
  currentSec--;
}

function print(sec) {
  let s = sec % 60;
  let m = (sec - s) / 60;
  let time = keepLength(m, 2) + ':' + keepLength(s, 2);
  $('#time').html(time);
  document.title = time;
}

function setstate(param) {
  state = param;
  $('#view').attr('class', param);
}

function keepLength(num, figures) {
  let numStr = String(num);
  while (numStr.length < figures) {
    numStr = '0' + numStr;
  }
  return numStr;
}
