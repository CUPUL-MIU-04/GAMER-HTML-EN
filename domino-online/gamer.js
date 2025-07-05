const players = [];
const maxPlayers = 5;
let playerId = null;
let gameStarted = false;

document.getElementById('joinBtn').addEventListener('click', joinGame);
document.getElementById('startBtn').addEventListener('click', startGame);

function joinGame() {
    if (players.length >= maxPlayers) {
        alert('El juego está lleno (5 jugadores)');
        return;
    }
    
    const name = prompt('Ingresa tu nombre:');
    if (!name) return;
    
    playerId = players.length;
    players.push({ id: playerId, name: name, score: 0 });
    updateGame();
    
    if (players.length === maxPlayers) {
        document.getElementById('startBtn').disabled = false;
    }
    
    document.getElementById('joinBtn').disabled = true;
}

function startGame() {
    gameStarted = true;
    document.getElementById('gameState').textContent = '¡Juego iniciado!';
    document.getElementById('startBtn').disabled = true;
    
    // Lógica simple del juego: cada jugador puede sumar puntos
    players.forEach(player => {
        const playerDiv = document.getElementById(`player-${player.id}`);
        const btn = document.createElement('button');
        btn.textContent = 'Sumar Punto';
        btn.onclick = () => {
            player.score++;
            updateGame();
            checkWinner();
        };
        playerDiv.appendChild(btn);
    });
}

function updateGame() {
    const playersDiv = document.getElementById('players');
    playersDiv.innerHTML = '';
    
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.id = `player-${player.id}`;
        playerDiv.innerHTML = `
            <h3>${player.name}</h3>
            <p>Puntos: ${player.score}</p>
            ${player.id === playerId ? '<p>(Tú)</p>' : ''}
        `;
        playersDiv.appendChild(playerDiv);
    });
    
    if (gameStarted) {
        document.getElementById('gameState').textContent = 'Juego en progreso...';
    } else {
        document.getElementById('gameState').textContent = 
            `Jugadores: ${players.length}/${maxPlayers}`;
    }
}

function checkWinner() {
    const winner = players.find(p => p.score >= 5);
    if (winner) {
        alert(`${winner.name} ha ganado el juego!`);
        resetGame();
    }
}

function resetGame() {
    players.forEach(p => p.score = 0);
    gameStarted = false;
    updateGame();
    document.getElementById('startBtn').disabled = players.length < maxPlayers;
}