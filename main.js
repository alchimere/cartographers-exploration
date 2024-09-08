const btnReset = document.getElementById('btn-reset');
const tilesArea = document.getElementById('card-cell-fields');
    
btnReset.addEventListener("click", reset);


const availableTilesWithoutMonster = [
    "img/forest.png",
    "img/village.png",
    "img/farm.png",
    "img/lake.png"
];
const availableTiles = [
    ...availableTilesWithoutMonster,
    "img/monster.png"
];

function randomCompare() {
    return -1 + Math.random() * 2;
}

function randomPick(collection, num) {
    if (!num || num <= 0) {
        throw 'num shoud be positive';
    }

    if (num > collection.length) {
        throw 'cannot pick more element than collection length';
    }

    let picked = collection.copyWithin();
    picked.sort(randomCompare);

    return picked.slice(0, num);
}

function reset() {
    nextCard();
}

let previousTiles = [];
function nextCard() {
    const tiles = randomPick(availableTilesWithoutMonster, 2);
    if (tiles == previousTiles) {
        return nextCard();
    }
    
    displayTiles(tiles);
}

function displayTiles(tiles) {
    tilesArea.innerHTML = "";
    tiles.forEach(tile => {
        tilesArea.innerHTML += '<div><img src="'+tile+'"/></div>';
    });
}
