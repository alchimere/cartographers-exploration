const btnReset = document.getElementById('btn-reset');
const btnNextCard = document.getElementById('btn-next-card');
const btnPrevCard = document.getElementById('btn-prev-card');
const tilesArea = document.getElementById('card-cell-fields');
const shapesArea = document.getElementById('card-cell-shapes');
const cardTime = document.getElementById('card-time');
const cardCounter = document.getElementById('card-counter');

btnReset.addEventListener("click", reset);
btnNextCard.addEventListener("click", nextCard);
btnPrevCard.addEventListener("click", prevCard);

const tileForest = "img/forest.png";
const tileVillage = "img/village.png";
const tileFarm = "img/farm.png";
const tileLake = "img/lake.png";
const tileMonster = "img/monster.png";
const availableTilesWithoutMonster = [
    tileForest,
    tileVillage,
    tileFarm,
    tileLake
];
const availableTiles = [
    ...availableTilesWithoutMonster,
    tileMonster
];

const shape1 = "img/shape1.png";
const shape2Diag = "img/shape2Diag.png";
const shape2I = "img/shape2I.png";
const shape3I = "img/shape3I.png";
const shape3V = "img/shape3V.png";
const shape4I = "img/shape4I.png";
const shape4L = "img/shape4L.png";
const shape4T = "img/shape4T.png";
const shape4Z = "img/shape4Z.png";
const shape5Plus = "img/shape5Plus.png";
const shape5Rect = "img/shape5Rect.png";
const shape5T = "img/shape5T.png";
const shape5V = "img/shape5V.png";
const shape5W = "img/shape5W.png";
const shape5Z = "img/shape5Z.png";

function load(key) {
    let val = localStorage.getItem(key);
    if (val)
        return JSON.parse(val);
    return val;
}
function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

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
    if (true || confirm('Reset the deck ?')) {
        setCurPos(0);
        save("deck", generateDeck())
    }
    displayCard();
}

function getDeck() {
    const deck = load("deck");
    if (deck)
        return deck;

    deck = generateDeck();
    save(deck);
    return deck;
}

function getDeckSize() {
    return getDeck().cards.length
}

function getCurPos() {
    const curPos = load("curPos");
    if (curPos)
        return curPos % getDeckSize();

    save("curPos", 0);
    return 0
}

function setCurPos(newPos) {
    save("curPos", newPos);
}

function displayCard() {
    let curPos = getCurPos();
    const deck = getDeck();
    const card = deck.cards[curPos];
    
    cardTime.innerHTML = card.time;
    // TODO display ruin
    displayTiles(card.tiles);
    displayShapes(card.shapes);
    updateCardCounter(deck, curPos);
}

function updateCardCounter(deck, pos) {
    let totalTime = 0;
    for (let i = 0; i <= pos; i++) {
        totalTime += deck.cards[i].time;
    }
    cardCounter.innerHTML = ''+(pos+1)+'/'+(deck.cards.length)+' ('+totalTime+')';
}

function generateDeck(options) { // TODO options to randomize tiles and shapes and allow reuse
    let deck = {
        cards: [
            {
                time: 0,
                tiles: availableTiles,
                shapes: [shape1]
            }, // terres fracturees
            {
                time: 1,
                tiles: [tileLake],
                shapes: [shape3I, shape5W],
                coin: true
            }, // grande riviere
            {
                time: 1,
                tiles: [tileForest],
                shapes: [shape2Diag, shape4Z],
                coin: true
            }, // foret oubliee
            {
                time: 1,
                tiles: [tileVillage],
                shapes: [shape3V, shape5Rect],
                coin: true
            }, // hameau
            {
                time: 1,
                tiles: [tileFarm],
                shapes: [shape2I, shape5Plus],
                coin: true
            }, // terres agricoles
            {
                time: 2,
                tiles: [tileVillage, tileFarm],
                shapes: [shape4T]
            }, // exploitation agricoles
            {
                time: 2,
                tiles: [tileVillage, tileLake],
                shapes: [shape4I]
            }, // village de pecheurs
            {
                time: 2,
                tiles: [tileFarm, tileLake],
                shapes: [shape5V]
            }, // ruisseau preserve
            {
                time: 2,
                tiles: [tileForest, tileFarm],
                shapes: [shape4L]
            }, // verger
            {
                time: 2,
                tiles: [tileForest, tileLake],
                shapes: [shape5T]
            }, // marecages
            {
                time: 2,
                tiles: [tileForest, tileVillage],
                shapes: [shape5Z]
            }, // village perche
        ]
    };

    deck.cards.sort(randomCompare);
    // Mark 2 random cards as ruin
    for (let i = 0; i < 2; i++) {
        deck.cards.ruin = true;
    }
    deck.cards.sort(randomCompare);

    return deck;
}

function nextCard() {
    setCurPos(getCurPos() + 1);
    displayCard();
}

function prevCard() {
    const curPos = getCurPos();
    if (curPos <= 0) {
        return;
    }
    
    setCurPos(curPos - 1);
    displayCard();
}

function displayTiles(tiles) {
    tilesArea.innerHTML = "";
    if (tiles)
        tiles.forEach(tile => {
            tilesArea.innerHTML += '<div><img src="'+tile+'"/></div>';
        });
}

function displayShapes(shapes) {
    shapesArea.innerHTML = "";
    if (shapes)
        shapes.forEach((shape, i) => {
            let html = '<div><img src="'+shape+'"/>'
            if (i == 0 && shapes.length > 1)
                html += ' &nbsp;<img src="img/coin.png"/>';
            html += '</div>';
            shapesArea.innerHTML += html;
        });
}

displayCard();