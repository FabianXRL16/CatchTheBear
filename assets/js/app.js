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
          playing.style.filter = "blur(0)";
        }, 300);
      }, 1000);
    }, 1000);
  }, 1000);
}

let score = 0;
function countScore() {
  let total = document.querySelector(".scoreTotal");
  score = score + 1;
  total.innerHTML = `Score ${score}`;
}

function sound() {
  let sound = document.querySelector("#sound");
  sound.classList.remove("fa-volume-down");
  sound.classList.add("fa-volume-off");
}
