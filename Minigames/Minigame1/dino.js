// Variáveis do jogo
let board;
let boardWidth = 1700; // Ajuste o tamanho do quadro
let boardHeight = 400; // Ajuste o tamanho do quadro
let context;

// Dino
let dinoWidth = 30; // Ajuste o tamanho do dino
let dinoHeight = 30; // Ajuste o tamanho do dino
let dinoX = 50;
let dinoY = 300; // Ajuste a posição inicial do dino
let dinoJumpHeight = 100; // Ajuste a altura do pulo do dino
let dinoJumpSpeed = 10; // Ajuste a velocidade do pulo do dino
let dinoJumping = false; // Variável para controlar se o dino está pulando
let dinoJumpCount = 0; // Variável para controlar a altura do pulo
let dinoJumpCooldown = false; // Variável para controlar o cooldown do pulo
let dinoImage = new Image(); // Imagem do dino
dinoImage.src = 'Minigame1/skin.png'; // Caminho da imagem do dino

// Obstáculos
let obstacleArray = [];
let obstacleWidth = 30; // Ajuste o tamanho dos obstáculos
let obstacleHeight = 30; // Ajuste o tamanho dos obstáculos
let obstacleGap = 150; // Ajuste o espaçamento entre os obstáculos
let obstacleSpeed = 5; // Ajuste a velocidade dos obstáculos
let obstacleSpawnTimer = 0; // Temporizador para gerar obstáculos
let obstacleImage = new Image(); // Imagem do obstáculo vermelho

// Obstáculos
let redObstacleImage = new Image(); // Imagem do obstáculo vermelho
redObstacleImage.src = 'Minigame1/espinhos.png'; // Substitua pelo caminho da imagem do obstáculo vermelho

let yellowObstacleImage = new Image(); // Imagem do obstáculo amarelo
yellowObstacleImage.src = 'Minigame1/Plataforma.png'; // Substitua pelo caminho da imagem do obstáculo amarelo

let brownObstacleImage = new Image(); // Imagem do obstáculo marrom e linha de chegada
brownObstacleImage.src = 'Minigame1/Chegada.png'; // Substitua pelo caminho da imagem do obstáculo marrom e linha de chegada

// Cenário
let backgroundColor = "#4388ff"; // Cor do fundo
let platformColor = "#000000"; // Cor da plataforma

// Mapa do jogo
let map = [
    
    ".................................................................................................................................................................................................................................................................................................................................................................................................................................",
    "................................................................................................................................................................................................................................................................................................................................................................................................................................=",
    ".......................................................................................................................................................................OO.................................................OO....................................................................................................................................................................................................=",
    "..........................................................................................................................................................OO.......OO.....................................................OO.OO....................................................................................................................................#............................................................=",
    "..........................................................................................................................................................OO.OO........##.................................................OO....OO.......#.....#.............OOO...........................................................................................OOOOOOOOOOOOOOOO.....................................................=",
    "..........................................................................................................................................................OO.....##....OO.................................................OO......OOOOOOOOOOOOOO.......#OOO......#.OOO.....................OOO.........OOO...........OOO..............................OOO.......................................................................=",
    "..........................................................................................................................................................OO.....OO.......................................................OO....................OOOOOOOO....#....O...........#OO......#OO..........OO..OOO...OOOOOO..............................OOO............................................................................=",
    "................................................................................................................................#...........#......#......OO.....................................##.......................OO................................O...........OOOOOOOOOOOOOOOOO.....##...OO##OOO###OOOOOO.....###..OO..............OO.................................................................................=",
    "..............................OO..........................................................................................OOOOOOOOOOOOOOOOOOOOOOOOOO......OO.....................................OO.......................OO..................................................................OO...OOOOOOOOOOOOOOOO.....OOO..OO.......OOO##.....................................................................................=",
    "................OO......OO....OO...................OO....OO................................................OO..........OOOO.....O...........O......O......OO................................OO.............OO.............OO.......................................................................OO..OOO...OOOOOO..........OO..OO...OOOOO.................................OOOO....OOO...OOO...................................=",
    ".OO.........OO..OO..OO..OO....OO...........OO....OOOO............................OO...........OOO.....OOO..OO...OOOOO.....O.....O...........O......O......OO....................OOOOOO..OOOOO........OO....OO......OO.....OO.......................................................................OO..OOO...OOOOOO..........OO.....##OOOOO....................................................OOO..............................=",
    "#OO###OOOO##OO##OO##OO##OO####OO###OOOOOO##OO##OOOOOO###..........#.......#.....#OO##OOOOOOO##OOOOOOO#OOO##OO##......##...O.....O...........O......O......OO..........................##OOOOO..........##..OO.....#OO.....OO#######################################################################OO..OOO...OOOOOO..........OO.....OOOOOOO#######################################################......#......#.......#........=",
    "................................................................................................................................................................................................................................................................................................................................................................................................................................."
];

// Outras variáveis
let gameOver = false;
let score = 0;

// Variável para controlar se o jogador venceu
let playerWon = false;

// Matriz para rastrear se um obstáculo foi gerado em determinada posição
let obstacleGenerated = [];

// Inicializa a matriz de obstáculos gerados
function initializeObstacleGenerated() {
    for (let i = 0; i < map.length; i++) {
        obstacleGenerated[i] = [];
        for (let j = 0; j < map[i].length; j++) {
            obstacleGenerated[i][j] = false;
        }
    }
}

// Função para verificar se um obstáculo já foi gerado em uma determinada posição do mapa
function isObstacleGenerated(row, col) {
    return obstacleGenerated[row][col];
}

// Função para marcar um obstáculo como gerado em determinada posição do mapa
function markObstacleGenerated(row, col) {
    obstacleGenerated[row][col] = true;
}

// Função para gerar obstáculos em uma posição específica do mapa
function generateObstacleAtPosition(col, row) {
    let obstacleType = map[row][col];
    let obstacleX = col * obstacleWidth - dinoX + boardWidth;
    let obstacleY = row * (boardHeight / map.length) + (boardHeight / map.length - obstacleHeight);

    let obstacle = {
        x: obstacleX,
        y: obstacleY,
        type: obstacleType,
        image: obstacleImage  // Adiciona a imagem ao objeto do obstáculo
    };
    obstacleArray.push(obstacle);
    markObstacleGenerated(row, col);
}

// Função para gerar obstáculos
function spawnObstacle() {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === "#" || map[row][col] === "=" || map[row][col] === "O") {
                if (!isObstacleGenerated(row, col)) {
                    let obstacleImage;
                    if (map[row][col] === "#") {
                        obstacleImage = redObstacleImage;
                    } else if (map[row][col] === "=") {
                        obstacleImage = brownObstacleImage;
                    } else {
                        obstacleImage = yellowObstacleImage;
                    }
                    generateObstacleAtPosition(col, row, obstacleImage);
                }
            }
        }
    }
}

// Função para gerar obstáculos em uma posição específica do mapa
function generateObstacleAtPosition(col, row, image) {
    let obstacleType = map[row][col];
    let obstacleX = col * obstacleWidth - dinoX + boardWidth;
    let obstacleY = row * (boardHeight / map.length) + (boardHeight / map.length - obstacleHeight);

    let obstacle = {
        x: obstacleX,
        y: obstacleY,
        type: obstacleType,
        image: image  // Use a imagem correspondente ao tipo de obstáculo
    };
    obstacleArray.push(obstacle);
    markObstacleGenerated(row, col);
}

// Função para desenhar as plataformas
function drawPlatforms() {
    context.fillStyle = platformColor;
    context.fillRect(0, boardHeight - 30, 1700, 30);
    context.fillRect(1700, boardHeight - 30, 1700, 30);
}

// Loop principal do jogo
function gameLoop() {
    if (!gameOver && !playerWon) {
        update();
        render();
    }
}

// Atualiza a lógica do jogo
function update() {
    // Move o dino para cima se estiver pulando
    if (dinoJumping) {
        dinoY -= dinoJumpSpeed;
        dinoJumpCount += dinoJumpSpeed;
        if (dinoJumpCount >= dinoJumpHeight) {
            dinoJumping = false;
            dinoJumpCount = 0;
        }
    } else { // Move o dino para baixo se não estiver pulando
        dinoY += dinoJumpSpeed;
        if (dinoY >= boardHeight - dinoHeight - 30) {
            dinoY = boardHeight - dinoHeight - 30;
        }
    }

    // Cooldown do pulo
    if (!dinoJumping && dinoY === boardHeight - dinoHeight - 30) {
        dinoJumpCooldown = false;
    }

    // Atualiza o temporizador de geração de obstáculos
    obstacleSpawnTimer++;
    if (obstacleSpawnTimer >= 100) { // Ajuste o intervalo de geração de obstáculos
        spawnObstacle();
        obstacleSpawnTimer = 0;
    }

// Move os obstáculos para a esquerda
for (let i = 0; i < obstacleArray.length; i++) {
    obstacleArray[i].x -= obstacleSpeed;

    // Verifica se o obstáculo passou pelo jogador
    if (!obstacleArray[i].passed && obstacleArray[i].x + obstacleWidth < dinoX) {
        if (obstacleArray[i].type === "#") {
            // Incrementa a pontuação ao passar por um obstáculo "#"
            score++;
            obstacleArray[i].passed = true; // Marca o obstáculo como passado para evitar pontuar mais de uma vez
        }
    }

    // Verifica se houve colisão com o dino
    if (detectCollision(dinoX, dinoY, dinoWidth, dinoHeight, obstacleArray[i].x, obstacleArray[i].y, obstacleWidth, obstacleHeight)) {
        if (obstacleArray[i].type === "#" || obstacleArray[i].type === "=") {
            if (obstacleArray[i].type === "=") {
                playerWon = true;
                setTimeout(function() {
                    window.location.href = "Codes1.html";
                }, 500);
            } else {
                gameOver = true;
                setTimeout(function() {
                    window.location.href = ""; // Redireciona para outra página
                }, 500);
            }
        }
    }

    // Impede que o jogador passe pelos obstáculos vermelhos
    if (obstacleArray[i].type === "#" && obstacleArray[i].x < dinoX + dinoWidth && obstacleArray[i].x + obstacleWidth > dinoX &&
        obstacleArray[i].y < dinoY + dinoHeight && obstacleArray[i].y + obstacleHeight > dinoY) {
        gameOver = true;
        setTimeout(function() {
            window.location.href = ""; // Redireciona para outra página
        }, 500);
    }

    // Impede que o jogador passe pelos obstáculos amarelos
    if (obstacleArray[i].type === "O" && obstacleArray[i].x < dinoX + dinoWidth && obstacleArray[i].x + obstacleWidth > dinoX &&
        obstacleArray[i].y < dinoY + dinoHeight && obstacleArray[i].y + obstacleHeight > dinoY) {
        // Se o jogador estiver sobre um bloco amarelo e não estiver pulando, permita o pulo
        if (!dinoJumping) {
            dinoJumpCooldown = false;
        }
        dinoY = obstacleArray[i].y - dinoHeight;
    }
}

    // Remove os obstáculos que saíram da tela
    if (obstacleArray.length > 0 && obstacleArray[0].x + obstacleWidth <= 0) {
        obstacleArray.shift();
        score++; // Incrementa a pontuação quando passa por um obstáculo
    }
}

// Renderiza o jogo
function render() {
    context.clearRect(0, 0, boardWidth, boardHeight);

    // Desenha o fundo
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, boardWidth, boardHeight);

    // Desenha as plataformas
    drawPlatforms();

    // Desenha o dino
    context.drawImage(dinoImage, dinoX, dinoY, dinoWidth, dinoHeight);

    // Desenha os obstáculos
    for (let i = 0; i < obstacleArray.length; i++) {
        let obstacle = obstacleArray[i];
        context.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    }

    // Desenha a pontuação
    context.fillStyle = "black";
    context.font = "20px Courier";
    context.fillText("Score: " + score, 10, 20);

    // Se o jogo acabou, exibe a mensagem de game over
    if (gameOver) {
        context.fillStyle = "red";
        context.font = "50px Courier";
        context.fillText("Game Over", boardWidth / 2 - 150, boardHeight / 2);
    }

    // Se o jogador venceu, exibe a mensagem de vitória
    if (playerWon) {
        context.fillStyle = "green";
        context.font = "50px Courier";
        context.fillText("Você Venceu!", boardWidth / 2 - 180, boardHeight / 2);
    }
}
// Se o jogador venceu, exibe a mensagem de vitória
if (playerWon) {
    context.fillStyle = "green";
    context.font = "50px Courier";
    context.fillText("Você Venceu!", boardWidth / 2 - 180, boardHeight / 2);
}

// Função para iniciar um pulo
function jump(e) {
    if (e.code == "Space" && !dinoJumping && !dinoJumpCooldown) {
        dinoJumping = true;
        dinoJumpCooldown = true;
    }
}

// Função para verificar se um obstáculo já foi gerado em uma determinada posição
function obstacleExistsAtPosition(x, y) {
    for (let i = 0; i < obstacleArray.length; i++) {
        if (obstacleArray[i].x === x && obstacleArray[i].y === y) {
            return true;
        }
    }
    return false;
}

// Função para verificar colisão entre dois retângulos
function detectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Verifica se houve colisão considerando uma "hitbox" para o jogador
    if (x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        y1 + h1 > y2) {
        // Se o jogador estiver acima do obstáculo e não estiver completamente acima
        // ou completamente à esquerda ou à direita, considera como colisão
        if (y1 + h1 <= y2 && x1 + w1 > x2 && x1 < x2 + w2) {
            return false;
        }
        return true;
    }
    return false;
}

// Função principal
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // Inicializa a matriz de obstáculos gerados
    initializeObstacleGenerated();

    // Define o loop principal do jogo
    setInterval(gameLoop, 1000 / 60); // Ajuste a taxa de atualização do jogo (60 FPS)

    // Define os eventos de teclado
    document.addEventListener("keydown", jump);
}