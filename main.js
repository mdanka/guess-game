const WORDS = [
    "teszt",
    "algoritmus",
    "a számítógépek gyorsak",
    "ügyesek vagytok",
    "a technológia érdekes"
];
var wordIndex = 0;
var word = WORDS[wordIndex];
var currentCharacterIndex = 0;
var guesses = [];

function startGame(index) {
    wordIndex = index;
    word = WORDS[wordIndex];
    currentCharacterIndex = 0;
    guesses = [];
    redraw();
}

function isGameOver() {
    return currentCharacterIndex >= WORDS[wordIndex].length;
}

function guess(guessedCharacter) {
    if (isGameOver()) {
        return;
    }
    const currentCharacter = word[currentCharacterIndex];
    console.log(`Current character: ${currentCharacter}`);
    console.log(`Guessed character: ${guessedCharacter}`);
    if (currentCharacter === guessedCharacter) {
        currentCharacterIndex++;
    } else {
        while (guesses.length <= currentCharacterIndex) {
            guesses.push([]);
        }
        var columnGuesses = guesses[currentCharacterIndex];
        if (columnGuesses.indexOf(guessedCharacter) === -1) {
            columnGuesses.push(guessedCharacter);
        }
        console.log(`Guesses: ${JSON.stringify(guesses)}`);
    }
    redraw();
}

function redraw() {
    var content = $("#mainContent");
    content.text("");
    content.append("<table id='table'></table>");
    var table = $("#table");
    table.append("<tr id='firstRow'></tr>");
    var firstRow = $("#firstRow");
    // Fill the first row
    for (var i = 0; i < word.length; i++) {
        var cellContent = i < currentCharacterIndex ? word[i] : "?";
        firstRow.append(`<td>${renderChar(cellContent)}</td>`);
    }
    // Number of new rows to make
    var maxGuessesMade = 0;
    for (var i = 0; i < guesses.length; i++) {
        var numOfGuesses = guesses[i].length;
        if (numOfGuesses > maxGuessesMade) {
            maxGuessesMade = numOfGuesses;
        }
    }
    console.log(`Guess row number: ${maxGuessesMade}`);
    // Filling new rows and cells
    for (var rowIndex = 0; rowIndex < maxGuessesMade; rowIndex++) {
        table.append(`<tr id="row-${rowIndex}"></tr>`);
        var row = $(`#row-${rowIndex}`);
        for (var colIndex = 0; colIndex < word.length; colIndex++) {
            row.append(`<td id="cell-${rowIndex}-${colIndex}"></td>`);
            var cell = $(`#cell-${rowIndex}-${colIndex}`);
            if (guesses.length <= colIndex) {
                continue;
            }
            var columnGuesses = guesses[colIndex];
            if (columnGuesses.length <= rowIndex) {
                continue;
            }
            var guess = columnGuesses[rowIndex];
            cell.text(renderChar(guess));
        }
    }
}

function drawHeader() {
    var header = $("#header");
    header.text("");
    for (var i = 0; i < WORDS.length; i++) {
        header.append(`<div onclick="startGame(${i})">${i}</div>`);
    }
}

function renderChar(char) {
    if (char === " ") {
        return "_";
    }
    return char.toUpperCase();
}

$(document).ready(function() {
    drawHeader();
    startGame(0);
});

$(document).on("keypress", function(event) {
    console.log(`Keypress: ${event.key}`);
    guess(event.key);
    $("#body").focus();
});
