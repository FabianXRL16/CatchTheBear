function toPlay() {
  e = 6;
  let notClick = document.querySelectorAll("#btnBear");
  notClick.forEach((n) => {
    n.disabled = false;
  });
  let playing = document.querySelector("#playing");
  let time = document.querySelector("#time");
  let lobby = document.querySelector("#lobby");
  let countdown = document.getElementById("countdown");
  let countdownTitle = document.querySelector("#countdown");

  playing.style.opacity = 1;
  playing.style.zIndex = 2;
  playing.style.transform = "scale(1)";
  time.style.opacity = 1;
  time.style.zIndex = 3;
  time.style.transform = "scale(1)";
  lobby.style.opacity = 0;
  lobby.style.zIndex = 1;
  lobby.style.transform = "scale(0)";

  setTimeout(function () {
    countdown.innerHTML = "2";
    setTimeout(function () {
      countdown.innerHTML = "1";
      setTimeout(function () {
        countdown.innerHTML = "GO!";
        countdownTitle.style.animationName = "shaking";
        countdownTitle.style.animationDuration = ".3s";
        countdownTitle.style.animationTiming =
          "cubic-bezier(0.895, 0.03, 0.685, 0.22)";
        setTimeout(function () {
          playing.style.zIndex = 3;
          time.style.zIndex = 2;
          time.style.opacity = 0;
          playing.style.filter = "blur(0)";
          score = 0;
          setTimeout(gameTime, 700);
        }, 300);
      }, 1000);
    }, 1000);
  }, 1000);
}

function reset(){
  localStorage.clear()
}

let score = 0;
function countScore(bear) {
  let total = document.querySelector(".scoreTotal");
  score++;
  total.innerHTML = `Score ${score}`;
  let layer = document.querySelector(`.layer-${bear}`);
  layer.style.transform = "scale(.8)";
  layer.style.transition = ".5s";
  setTimeout(function () {
    layer.style.display = "none";
    layer.style.transform = "scale(1)";
    setTimeout(function () {
      layer.style.display = "block";
    }, 300);
  }, 300);
}

let m = 2;
function theme() {
  let sun = document.querySelector(".sun");
  let moon = document.querySelector(".moon");
  if (m % 2 === 0) {
    sun.style.display = "none";
    moon.style.display = "block";
    moon.style.transform = "scale(1)";
  } else {
    moon.style.display = "none";
    sun.style.display = "block";
    sun.style.transform = "scale(1)";
  }
  m = m + 1;
}

let j = 2;
function sound() {
  let on = document.querySelector(".on");
  let off = document.querySelector(".off");
  if (j % 2 === 0) {
    on.style.display = "none";
    off.style.display = "block";
    off.style.transform = "scale(1)";
  } else {
    off.style.display = "none";
    on.style.display = "block";
    on.style.transform = "scale(1)";
  }
  j = j + 1;
}

let e = 5;
function gameTime() {
  let time = document.querySelector(".timer");
  time.style.color = "#0f7886";
  e--;
  time.innerHTML = `${e}s`;
  var intervalo = setTimeout(gameTime, 1000);
  if (e < 3) {
    time.style.color = "red";
  }
  if (e === 0) {
    clearInterval(intervalo);
    let notClick = document.querySelectorAll("#btnBear");
    notClick.forEach((n) => {
      n.disabled = true;
    });
    time.style.color = "red";
    gameOver();
  }
}
let arr = [];

function gameOver() {
  addBestScores(score);
  localStorageAddScores(arr);

  let points = document.querySelector("#points");
  let time = document.querySelector("#time");
  let playing = document.querySelector("#playing");
  let lobby = document.querySelector("#lobby");

  points.style.opacity = 1;
  points.style.zIndex = 4;
  points.style.transform = "scale(1)";
  playing.style.filter = "blur(4px)";
  time.style.opacity = 0;
  time.style.display = 3;
  time.style.transform = "scale(0)";

  let newScore = document.querySelector("#titleGameOver");
  newScore.innerHTML = `Your score <br> <b>${score}ptos</b>`;

  setTimeout(function () {
    points.style.opacity = 0;
    points.style.zIndex = 1;
    playing.style.opacity = 0;
    playing.style.zIndex = 1;
    lobby.style.opacity = 1;
    lobby.style.zIndex = 4;
    lobby.style.transform = "scale(1)";
  }, 1000);
}

function addBestScores(newScore) {
  arr.push(newScore);
  let i, j, aux;
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        aux = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = aux;
      }
    }
  }
  arr.reverse();
}

function localStorageAddScores(list) {
  localStorage.setItem("localBestScores", JSON.stringify(list));
}
