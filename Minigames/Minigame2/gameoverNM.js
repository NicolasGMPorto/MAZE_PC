// gameover.js

let onGameOver = () => {
    clearInterval(gameInterval); // Parar o loop do jogo
    window.removeEventListener("keydown", keydownHandler); // Parar de ouvir eventos de teclado
    canvasContext.fillStyle = "white";
    canvasContext.font = "30px Arial";
    canvasContext.fillText("GAME OVER", canvas.width / 2 - 100, canvas.height / 2);
    let restart = confirm("Deseja jogar novamente?");
    if (restart) {
        resetGame(); // Função para reiniciar o jogo
    }
};

let resetGame = () => {
    lives = 1;
    score = 0;
    createNewPacman(); // Função para criar um novo Pac-Man
    createGhosts(); // Função para criar novos fantasmas
    gameInterval = setInterval(gameLoop, 500 / fps); // Reiniciar o loop do jogo
    window.addEventListener("keydown", keydownHandler); // Começar a ouvir eventos de teclado novamente
};
