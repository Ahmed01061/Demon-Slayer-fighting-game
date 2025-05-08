const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;

ctx.fillRect(0, 0, canvas.width, canvas.height);

// Audio Elements
const backgroundMusic = new Audio('./audio/background_music.mp3'); // Replace with your actual file path
backgroundMusic.loop = true;
// To play background music, you might need user interaction first due to browser policies.
// Example: document.body.addEventListener('click', () => backgroundMusic.play(), { once: true });

const playerAttackSound1 = new Audio('./audio/player_attack1.wav'); // Placeholder
const playerAttackSound2 = new Audio('./audio/player_attack2.wav'); // Placeholder
const playerAttackSound3 = new Audio('./audio/player_attack3.wav'); // Placeholder
const playerAttackSound4 = new Audio('./audio/player_attack4.wav'); // Placeholder

const enemyAttackSound1 = new Audio('./audio/enemy_attack1.wav');   // Placeholder
const enemyAttackSound2 = new Audio('./audio/enemy_attack2.wav');   // Placeholder
const enemyAttackSound3 = new Audio('./audio/enemy_attack3.wav');   // Placeholder
const enemyAttackSound4 = new Audio('./audio/enemy_attack4.wav');   // Placeholder

const playerJumpSound = new Audio('./audio/player_jump.wav');     // Placeholder
const enemyJumpSound = new Audio('./audio/enemy_jump.wav');       // Placeholder

const playerHitSound = new Audio('./audio/player_hit.wav');         // Placeholder
const enemyHitSound = new Audio('./audio/enemy_hit.wav');           // Placeholder

const playerDeathSound = new Audio('./audio/player_death.wav');     // Placeholder
const enemyDeathSound = new Audio('./audio/enemy_death.wav');       // Placeholder

// Sound Play Helper
function playSound(audioElement) {
  if (audioElement) {
    audioElement.currentTime = 0; // Rewind to start
    audioElement.play().catch(error => console.error("Error playing sound:", audioElement.src, error));
  }
}

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  arrowUp: {
    pressed: false,
  },
};

const backGround = new Sprite({
  possition: {
    x: 0,
    y: 0,
  },
  imgSrc: "./imgs/bg.png",
});

const bird = new Sprite({
  possition: {
    x: 50,
    y: 100,
  },
  imgSrc: "./imgs/bird.png",
  scale: 0.2,
  framesMax: 6,
});

const player1 = new Fighter({
  possition: { x: 0, y: 0 },
  velocity: { x: 20, y: 10 },
  color: "green",
  offset: {
    x: 0, //go back
    y: 0, // go up
  },
  imgSrc: "./imgs/komodo-tangero/idel.png",
  framesMax: 2,
  scale: 0.6,
  sprites: {
    idle: {
      imgSrc: "./imgs/komodo-tangero/idel.png",
      framesMax: 2,
      framesHold: 17,
    },
    run: {
      imgSrc: "./imgs/komodo-tangero/run.png",
      framesMax: 8,
      scale: 0.6,
    },
    runBack: {
      imgSrc: "./imgs/komodo-tangero/runBack.png",
      framesMax: 8,
      scale: 0.6,
    },
    jump: {
      imgSrc: "./imgs/komodo-tangero/jump.png",
      framesMax: 1,
      scale: 0.6,
    },
    jumpBack: {
      imgSrc: "./imgs/komodo-tangero/jumpBack.png",
      framesMax: 1,
      scale: 0.6,
    },
    fall: {
      imgSrc: "./imgs/komodo-tangero/fall.png",
      framesMax: 1,
      scale: 0.6,
    },
    fallBack: {
      imgSrc: "./imgs/komodo-tangero/fallBack.png",
      framesMax: 1,
      scale: 0.6,
    },
    attack1: {
      imgSrc: "./imgs/komodo-tangero/attack1.png",
      framesMax: 6,
      scale: 0.6,
      framesHold: 8,
    },
    attack2: {
      imgSrc: "./imgs/komodo-tangero/attack2.png",
      framesMax: 6,
      scale: 0.6,
      framesHold: 8,
    },
    attack3: {
      imgSrc: "./imgs/komodo-tangero/attack3.png",
      framesMax: 5,
      scale: 0.6,
      framesHold: 8,
    },
    attack4: {
      imgSrc: "./imgs/komodo-tangero/attack4.png",
      framesMax: 7,
      scale: 0.6,
      framesHold: 8,
    },
    getHit: {
      imgSrc: "./imgs/komodo-tangero/hit.png",
      framesMax: 3,
      scale: 0.6,
      framesHold: 9,
    },
    death: {
      imgSrc: "./imgs/komodo-tangero/death.png",
      framesMax: 4,
      scale: 0.6,
      framesHold: 9,
    },
  },
  attackBox: {
    offset: {
      x: 0,
      y: 80,
    },
    width: 100,
    height: 30,
  },
});

const enmy = new Fighter({
  possition: { x: 450, y: 100 },
  velocity: { x: 0, y: 10 },
  color: "blue",
  offset: {
    x: -50,
    y: 40,
  },
  imgSrc: "./imgs/inoski/Idel.png",
  framesMax: 5,
  scale: 0.8,
  sprites: {
    idle: {
      imgSrc: "./imgs/inoski/idel.png",
      framesMax: 5,
      framesHold: 17,
    },
    run: {
      imgSrc: "./imgs/inoski/run.png",
      framesMax: 2,
      scale: 0.6,
    },
    runBack: {
      imgSrc: "./imgs/inoski/runBack.png",
      framesMax: 2,
      scale: 0.6,
    },
    jump: {
      imgSrc: "./imgs/inoski/jump.png",
      framesMax: 1,
      scale: 0.6,
    },
    jumpBack: {
      imgSrc: "./imgs/inoski/jumpBack.png",
      framesMax: 1,
      scale: 0.6,
    },
    fall: {
      imgSrc: "./imgs/inoski/fall.png",
      framesMax: 1,
      scale: 0.6,
    },
    fallBack: {
      imgSrc: "./imgs/inoski/fallBack.png",
      framesMax: 1,
      scale: 0.6,
    },
    attack1: {
      imgSrc: "./imgs/inoski/attack1.png",
      framesMax: 4,
      scale: 0.6,
      framesHold: 9,
    },
    attack2: {
      imgSrc: "./imgs/inoski/attack2.png",
      framesMax: 6,
      scale: 0.6,
      framesHold: 10,
    },
    attack3: {
      imgSrc: "./imgs/inoski/attack3.png",
      framesMax: 3,
      scale: 0.6,
      framesHold: 10,
    },
    attack4: {
      imgSrc: "./imgs/inoski/attack4.png",
      framesMax: 5,
      scale: 0.6,
      framesHold: 8,
    },
    getHit: {
      imgSrc: "./imgs/inoski/hit.png",
      framesMax: 3,
      scale: 0.6,
      framesHold: 10,
    },
    death: {
      imgSrc: "./imgs/inoski/death.png",
      framesMax: 5,
      scale: 0.6,
      framesHold: 10,
    },
  },
  attackBox: {
    offset: {
      x: 0,
      y: 90,
    },
    width: 90,
    height: 30,
  },
});

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  backGround.update();
  bird.update();

  player1.update();
  enmy.update();

  player1.velocity.x = 0;
  enmy.velocity.x = 0;

  if (player1.possition.x < -100) {
    player1.possition.x = 960;
  }
  if (player1.possition.x >= 1000) {
    player1.possition.x = 0;
  }

  if (enmy.possition.x < -100) {
    enmy.possition.x = 960;
  }
  if (enmy.possition.x >= 1000) {
    enmy.possition.x = 0;
  }

  //jumping

  //Player Movement
  if (keys.a.pressed && player1.lastKey === "a") {
    player1.velocity.x = -5;
    player1.switchSprite("runBack");
  } else if (keys.d.pressed && player1.lastKey === "d") {
    player1.velocity.x = 5;
    player1.switchSprite("run");
  } else {
    player1.switchSprite("idle");
  }

  //jumping
  if (keys.a.pressed && player1.velocity.y < 0) {
    player1.switchSprite("jumpBack");
  } else if (player1.velocity.y < 0) {
    player1.switchSprite("jump");
  } else if (player1.velocity.y > 0 && keys.a.pressed) {
    player1.switchSprite("fallBack");
  } else if (player1.velocity.y > 0) {
    player1.switchSprite("fall");
  }

  //Enemy Movement
  if (keys.ArrowLeft.pressed && enmy.lastKey === "ArrowLeft") {
    enmy.velocity.x = -5;
    enmy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enmy.lastKey === "ArrowRight") {
    enmy.velocity.x = 5;
    enmy.switchSprite("runBack");
  } else {
    enmy.switchSprite("idle");
  }

  //enmy jumping
  if (keys.ArrowRight.pressed && enmy.velocity.y < 0) {
    enmy.switchSprite("jumpBack");
  } else if (enmy.velocity.y < 0) {
    enmy.switchSprite("jump");
  } else if (enmy.velocity.y > 0 && keys.ArrowRight.pressed) {
    enmy.switchSprite("fallBack");
  } else if (enmy.velocity.y > 0) {
    enmy.switchSprite("fall");
  }

  //detiction for collision
  //playerAttack
  if (
    rectangularCollision({ rectangular1: player1, rectangular2: enmy }) &&
    player1.isAttacking &&
    player1.currentFrame === 3
  ) {
    const enemyHealthBeforeHit = enmy.health;
    enmy.getHit();
    playSound(enemyHitSound);
    document.querySelector("#enemyHealth").style.width = enmy.health + "%";
    if (enmy.health <= 0 && enemyHealthBeforeHit > 0) {
        playSound(enemyDeathSound);
    }
    player1.isAttacking = false;
    // console.log("Player Attack");
  }

  //if player miss
  if (player1.isAttacking & (player1.currentFrame === 3)) {
    player1.isAttacking = false;
  }

  //if enmy miss
  if (enmy.isAttacking & (enmy.currentFrame === 3)) {
    enmy.isAttacking = false;
  }
  //EnemyAttack

  if (
    rectangularCollision({ rectangular1: enmy, rectangular2: player1 }) &&
    enmy.isAttacking &&
    enmy.currentFrame === 2
  ) {
    const playerHealthBeforeHit = player1.health;
    player1.getHit();
    playSound(playerHitSound);
    document.querySelector("#playerHealth").style.width = player1.health + "%";
    if (player1.health <= 0 && playerHealthBeforeHit > 0) {
        playSound(playerDeathSound);
    }
    enmy.isAttacking = false;
    // console.log("Enmy Attack");
  }

  if (enmy.health <= 0 || player1.health <= 0) {
    determinWinner({
      player: player1,
      enmy: enmy,
      timerId,
    });
  }
}

animate();

window.addEventListener("keydown", (e) => {
  if (!player1.dead) {
    switch (e.key) {
      case "d":
        keys.d.pressed = true;
        player1.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player1.lastKey = "a";
        break;
      case "w":
        if (player1.velocity.y === 0) {
          player1.velocity.y = -20;
          playSound(playerJumpSound);
        }
        break;
      case " ":
        player1.attack("1");
        playSound(playerAttackSound1);
        break;
      case "r":
        player1.attack("2");
        playSound(playerAttackSound2);
        break;
      case "e":
        player1.attack("3");
        playSound(playerAttackSound3);
        break;
      case "q":
        player1.attack("4");
        playSound(playerAttackSound4);
        break;
    }
  }
  if (!enmy.dead) {
    //enmy movement
    switch (e.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enmy.lastKey = "ArrowRight";
        // player1.velocity.x =1
        break;

      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enmy.lastKey = "ArrowLeft";
        break;

      case "ArrowUp":
        if (enmy.velocity.y === 0) {
          keys.arrowUp.pressed = true;
          enmy.velocity.y = -20;
          playSound(enemyJumpSound);
        }
        break;

      case "ArrowDown":
        enmy.attack("1");
        playSound(enemyAttackSound1);
        break;
      case "/":
        enmy.attack("2");
        playSound(enemyAttackSound2);
        break;
      case ".":
        enmy.attack("3");
        playSound(enemyAttackSound3);
        break;
      case ",":
        enmy.velocity.x = -105; // This seems like a special move, ensure sound fits
        enmy.velocity.y = -10;
        enmy.attack("4");
        playSound(enemyAttackSound4);
        break;
    }
  }
  // console.log(e.key);
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }
  switch (e.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
  // console.log(e.key);
});
