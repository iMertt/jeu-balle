let canvas = document.getElementById("game"),
  ctx = canvas.getContext("2d"),
  ballRadius = 9,
  x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
  y = canvas.height - 40,
  dx = 2,
  dy = -2;

let paddleHeight = 12,
  paddleWidth = 72;

// Position de départ de la pagaie
let paddleX = (canvas.width - paddleWidth) / 2;

// Briques
let rowCount = 5,
  columnCount = 9,
  brickWidth = 54,
  brickHeight = 18,
  brickPadding = 12,
  topOffset = 40,
  leftOffset = 33,
  score = 0;

// Tableau de briques
let bricks = [];
for (let c = 0; c < columnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < rowCount; r++) {
    // Définir la position des briques
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Événement de déplacement de la eventListener et fonction
document.addEventListener("mousemove", mouseMoveHandler, false);

// Déplacer la pagaie avec la souris
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// Dessiner une pagaie
function drawPaddle() {
  ctx.beginPath();
  ctx.roundRect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight,
    30
  );
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

// Dessiner une balle
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

// Dessiner des briques
function drawBricks() {
  for (let c = 0; c < columnCount; c++) {
    for (let r = 0; r < rowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + leftOffset;
        let brickY = r * (brickHeight + brickPadding) + topOffset;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
        ctx.fillStyle = "#333";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Score de piste
function trackScore() {
  ctx.font = "bold 16px sans-serif";
  ctx.fillStyle = "#333";
  ctx.fillText("Score : " + score, 8, 24);
}

// Vérifier les briques frappées par la balle
function hitDetection() {
  for (let c = 0; c < columnCount; c++) {
    for (let r = 0; r < rowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          // Check win
          if (score === rowCount * columnCount) {
            alert("Vous Avez Gagné!");
            document.location.reload();
          }
        }
      }
    }
  }
}

// Fonction principale
function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  trackScore();
  drawBricks();
  drawBall();
  drawPaddle();
  hitDetection();

  // Détecter les murs gauche et droit
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // Détecter le mur supérieur
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // Détecter les coups de pagaie
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      // Si la balle ne touche pas la pagaie
      alert("Jeu Terminé!");
      document.location.reload();
    }
  }

  // Mur inférieure
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  // Déplacer la balle
  x += dx;
  y += dy;
}

setInterval(init, 10);
