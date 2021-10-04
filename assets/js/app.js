function toPlay() {
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
          setTimeout(gameTime, 700)
        }, 300);
      }, 1000);
    }, 1000);
  }, 1000);
}

let score = 0;
function countScore(bear) {
  let total = document.querySelector(".scoreTotal");
  score = score + 1;
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

let e = 5
function gameTime(){
  let time = document.querySelector(".timer")
  e--
  time.innerHTML = `${e}s`
  var intervalo = setTimeout(gameTime, 1000)
  if(e === 0){
    clearInterval(intervalo)
    console.log("hola")
  }
}
