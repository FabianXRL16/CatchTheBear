let closedGame = false;

function toPlay() {
  let total = document.querySelector(".scoreTotal");
  total.innerHTML = `Score 0`;
  closedGame = false;
  e = 11;
  score = 0;
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
          countdown.innerHTML = "3";
          countdown.style.zIndex = 2;
          time.style.zIndex = 1;
          time.style.opacity = 0;
          playing.style.filter = "blur(0)";
          score = 0;
          setTimeout(gameTime, 10);
        }, 500);
      }, 1000);
    }, 1000);
  }, 1000);
}

function reset() {
  localStorage.removeItem("localBestScores");
}

toShowBestScores();

function getData() {
  let getItem = localStorage.getItem("localBestScores");
  if (!getItem) {
    return [];
  }
  return JSON.parse(getItem);
}

function toShowBestScores() {
  let listBestScores = document.querySelector("#bestScores");
  let data = getData();
  listBestScores.innerHTML = "";
  if (!data || data.length == 0) {
    return;
  }
  let html = `
    <h4>Best Scores</h4>
    <ul>`;
  data.forEach((score) => {
    html += `<li>${score} ${score === 1 ? "pto" : "ptos"}</li>`;
  });
  html += `</ul>`;
  listBestScores.innerHTML = html;
}

let score = 0;
function countScore(bear) {
  let total = document.querySelector(".scoreTotal");
  score++;
  total.innerHTML = `Score ${score}`;
  let layer = document.querySelector(`.layer-${bear}`);
  layer.style.transform = "scale(.8)";
  layer.style.transition = ".2s";
  layer.disabled = true;
  setTimeout(function () {
    layer.style.opacity = 0
    layer.style.transform = "scale(1)";
    layer.disabled = false;
    setTimeout(function () {
      layer.style.opacity = 1
    }, 200);
  }, 200);
}

let j = 2;
let audio = new Audio("./assets/sound/sound.mp3");
function sound() {
  let on = document.querySelector(".on");
  let off = document.querySelector(".off");
  audio.volume = 0.1;
  audio.paused ? audio.play() : audio.pause();
  if (j % 2 === 0) {
    off.style.display = "none";
    on.style.display = "block";
    on.style.transform = "scale(1)";
  } else {
    on.style.display = "none";
    off.style.display = "block";
    off.style.transform = "scale(1)";
  }
  j = j + 1;
}

let e = 10;
function gameTime() {
  let time = document.querySelector(".timer");
  if (!closedGame) {
    time.style.color = "#0f7886";
    e--;
    time.innerHTML = `${e}s`;
    var intervalo = setTimeout(gameTime, 1000);
    if (e < 3) {
      time.style.color = "#043036";
    }
    if (e === 0) {
      clearInterval(intervalo);
      let notClick = document.querySelectorAll("#btnBear");
      notClick.forEach((n) => {
        n.disabled = true;
      });
      time.style.color = "#043036";
      gameOver();
    }
  } else {
    time.innerHTML = "10s";
  }
}

let arr = getData();

function gameOver() {
  if (score > 0) {
    addBestScores(score);
  }
  localStorageAddScores(arr);

  let newScore = document.querySelector("#titleGameOver");
  newScore.innerHTML = `Your score <br> <b>${score} ${
    score === 1 ? "pto" : "ptos"
  }</b>`;

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

  toShowBestScores();

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
  if (!arr.includes(newScore)) {
    arr.push(newScore);
  }
  arr
    .sort((a, b) => a - b)
    .reverse()
    .splice(3, 1);
}

function localStorageAddScores(list) {
  localStorage.setItem("localBestScores", JSON.stringify(list));
}

function cancel() {
  let playing = document.querySelector("#playing");
  let lobby = document.querySelector("#lobby");
  playing.style.transform = "scale(0)";
  playing.style.opacity = 0;
  playing.style.zIndex = 2;
  playing.style.transition = ".5s";
  lobby.style.opacity = 1;
  lobby.style.zIndex = 4;
  lobby.style.transform = "scale(1)";
  lobby.style.transition = ".5s";
  score = 0;
  e = 11;
  closedGame = true;
}
