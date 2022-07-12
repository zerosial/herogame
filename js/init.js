const player = new Hero();
const life = document.getElementById("life");
const time = document.getElementById("time");
const score = document.getElementById("score");
let ghosts = [];
let killCounter = 0;
let deathCounter = 5;
let limitTime = 60;

function intro() {
  const modal = document.getElementById("modal");
  const startBtn = document.getElementsByClassName("start-area")[0];

  startBtn.addEventListener("click", (e) => {
    modal.style.display = "none";
    init();
  });
}

function init() {
  document.addEventListener(
    "keydown",
    function (e) {
      checkKey(e, true);
    },
    false
  );

  document.addEventListener(
    "keyup",
    function (e) {
      checkKey(e, false);
    },
    false
  );

  setInterval(function () {
    initGhost();
  }, 2000);

  setInterval(function () {
    limitTime -= 1;
    time.innerText = `시간 : ${limitTime}`;
    if (limitTime === 0) {
      alert(`게임 오버 점수는 ${killCounter}입니다.`);
      window.location.reload();
    }
  }, 1000);

  window.requestAnimationFrame(updateAllghosts);
}

function checkKey(e, isMoving) {
  if (isMoving) {
    const keyID = e.keyCode || e.which;

    switch (keyID) {
      case 39:
        player.move("right");
        e.preventDefault();
        break;
      case 37:
        player.move("left");
        e.preventDefault();
        break;
    }
  } else {
    player.stop();
  }
}

function initGhost() {
  const ghost = new Ghost();
  ghosts.push(ghost);
}

function updateAllghosts() {
  ghosts.forEach((el, idx) => {
    if (!el.isDead) {
      el.move(player);
    }
    if (el.isKill) {
      killCounter += 1;
      ghosts.splice(idx, 1);
      score.innerText = `스코어 : ${killCounter}`;
    }
    if (el.isDead) {
      const soundEffect = new Audio("./audio/life.wav");
      soundEffect.play();
      deathCounter -= 1;
      ghosts.splice(idx, 1);
      life.innerText = `라이프 : ${deathCounter}`;
      if (deathCounter === 0) {
        alert(`게임 오버 점수는 ${killCounter}입니다.`);
        window.location.reload();
      }
    }
  });

  window.requestAnimationFrame(updateAllghosts);
}

intro();
