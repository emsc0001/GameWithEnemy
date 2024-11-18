console.log("Running tiles");

const TILE_SIZE = 32; // Størrelse på hver tile i pixels

function start () {
    displayTiles();
    updatePlayerPosition();
}

// En simpel 10x10 model med variation
const tiles = [
    [0, 0, 0, 0, 0, 6, 0, 3, 0, 0, 0, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 4, 4, 4, 2],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 4, 0, 2, 4, 4, 1, 2],   
    [0, 6, 0, 1, 0, 0, 0, 3, 0, 1, 0, 2, 2, 4, 2, 2],
    [0, 0, 0, 1, 0, 6, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 3, 0, 1, 1, 1, 1, 1, 0, 6],
    [0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 6]
];


const GRID_HEIGHT = tiles.length;
const GRID_WIDTH = tiles[0].length;

// Funktion til at oprette det visuelle grid
function createTiles() {
    const background = document.getElementById("background");

    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            const tile = document.createElement('div');
            tile.classList.add("tile");
            tile.style.width = `${TILE_SIZE}px`;
            tile.style.height = `${TILE_SIZE}px`;
            tile.style.position = "absolute";
            tile.style.left = `${col * TILE_SIZE}px`;
            tile.style.top = `${row * TILE_SIZE}px`;
            background.appendChild(tile);
        }
    }
}

function displayTiles() {
    const background = document.getElementById("background");
    const visualTiles = background.children;

    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            const index = row * GRID_WIDTH + col;
            const visualTile = visualTiles[index];
            const tileType = tiles[row][col];
            const tileClass = getClassForTileType(tileType);
            visualTile.classList.add(tileClass);
        }
    }
}

function getClassForTileType(tileType) {
    switch (tileType) {
        case 0: return 'grass';
        case 1: return 'path';
        case 2: return 'wall';
        case 3: return 'water';
        case 4: return 'path';
        default: return 'flowers';
    }
}
// Returnerer tileværdi på en given koordinat
function getTileAtCoord(row, col) {
    if (row < 0 || row >= GRID_HEIGHT || col < 0 || col >= GRID_WIDTH) {
        return 0; // Returner standardværdien, hvis udenfor grænserne
    }
    return tiles[row][col];
}

// Returnerer tileværdi baseret på en pixelposition
function getTileAtPos(x, y) {
    const row = Math.floor(y / TILE_SIZE);
    const col = Math.floor(x / TILE_SIZE);
    return getTileAtCoord(row, col);
}

// Konverterer en pixelposition til koordinater
function coordFromPos(x, y) {
    return {
        row: Math.floor(y / TILE_SIZE),
        col: Math.floor(x / TILE_SIZE)
    };
}

// Konverterer koordinater til en pixelposition
function posFromCoord(row, col) {
    return {
        x: col * TILE_SIZE,
        y: row * TILE_SIZE
    };
}


// Player logic
let playerRow = 0;
let playerCol = 0;

function updatePlayerPosition() {
    const player = document.getElementById("player");
    const position = posFromCoord(playerRow, playerCol);
    player.style.transform = `translate(${position.x}px, ${position.y}px)`;
}

document.addEventListener("keydown", (event) => {
    let newRow = playerRow;
    let newCol = playerCol;

    switch (event.key) {
        case "ArrowUp":
            newRow = playerRow - 1;
            break;
        case "ArrowDown":
            newRow = playerRow + 1;
            break;
        case "ArrowLeft":
            newCol = playerCol - 1;
            break;
        case "ArrowRight":
            newCol = playerCol + 1;
            break;
        default:
            return; // Ignore other keys
    }

    // Ensure the new position is within bounds and not a wall
    if (
        newRow >= 0 &&
        newRow < GRID_HEIGHT &&
        newCol >= 0 &&
        newCol < GRID_WIDTH &&
        tiles[newRow][newCol] !== 2 // Assuming 2 is the wall tile
    ) {
        playerRow = newRow;
        playerCol = newCol;
        updatePlayerPosition();
    }
});

// Initialize the game
window.addEventListener("DOMContentLoaded", () => {
    createTiles();
    displayTiles();
    updatePlayerPosition();
});

createTiles();
displayTiles();
