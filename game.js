var winsArray = [7, 56, 448, 73, 146, 292, 273, 84]; // Wins condition values
var totalGameMoves = 0; // Total number of moves for the current game.
var catWins = 0; // Total number of cat wins.

// Player 1 information.
var player1 = {
    name: '',
    symbol: 'X',
    class: 'player1Marker',
    hoverID: 'player1Hover',
    gameTotal: 0,
    wins: 0
}

// Player 2 information.
var player2 = {
    name: '',
    symbol: 'O',
    class: 'player2Marker',
    hoverID: 'player2Hover',
    gameTotal: 0,
    wins: 0
};

// Set the current player to player 1.
var currentPlayer = player1;

function initialize()
{
    // Get the player names
    player1.name = prompt('Please enter player 1 name');
    player2.name = prompt('Please enter player 2 name');

    // Set the names in the score boxes.
    document.getElementById('player1Name').innerHTML = player1.name;
    document.getElementById('player2Name').innerHTML = player2.name;

    drawSymbols();
}

// Draw the players' symbols underneath their names.
function drawSymbols()
{
    document.getElementById('player1Icon').innerHTML = player1.symbol;
    document.getElementById('player2Icon').innerHTML = player2.symbol;

    drawScore();
}

// Draw the players' scores underneath their symbols.
function drawScore()
{
    document.getElementById('player1Wins').innerHTML = 'Wins: ' + player1.wins;
    document.getElementById('player2Wins').innerHTML = 'Wins: ' + player2.wins;
}

// A player has clicked on a square.
function playerMoved(id, value)
{
    // Attempt to place a marker.
    if (changeMarker(id))
    {
        // If the box was able to be clicked on,
        // add the box's value to the current
        // player's total.
        updatePlayerTotal(value);

        // Increment the total number of game moves.
        totalGameMoves++;

        // check for winner
        if (checkForWinner(currentPlayer.gameTotal))
        {
            // Update the current player's number of wins.
            currentPlayer.wins++;

            // Notify the players of the winner.
            alert(currentPlayer.name + ' wins!');

            resetBoard();
            swapPlayerSymbols();
            drawSymbols();
        }
        else if (totalGameMoves >= 9)
        {
            // Nobody has won in 9 moves, meaning
            // it's a cat win.
            catWins++;
            alert('Cat wins!');

            // Update the number of cat wins on the display.
            document.getElementById('catWins').innerHTML = 'Cat Wins: ' + catWins;

            resetBoard();
            swapPlayerSymbols();
            drawSymbols();
        }
        else
        {
            // Switch players
            changeCurrentPlayer();
        }
    }
}

// Reset the board for another game.
function resetBoard()
{
    // Set each player's game score back to zero.
    player1.gameTotal = 0;
    player2.gameTotal = 0;

    // Empty each game board cell.
    var cells = document.getElementsByClassName('cell');

    for (var i = 0; i < cells.length; i++)
    {
        cells[i].innerHTML = '';
        cells[i].className = 'cell';
    }

    // Reset the number of game moves.
    totalGameMoves = 0;
}

function swapPlayerSymbols()
{
    // Swap the player1 and player2's symbols for the next game
    var tempSymbol = player1.symbol;
    player1.symbol = player2.symbol;
    player2.symbol = tempSymbol;

    // Set the first player to whoever has the symbol 'X'
    currentPlayer = player1.symbol === 'X' ? player1 : player2;
}

function changeMarker(box)
{
    // Check to see if the box has anything in it already.
    if (box.innerHTML === '')
    {
        // If not, put the current player's symbol into the box,
        // add their clicked on class to it, and return true.
        box.innerHTML = currentPlayer.symbol;
        box.className = box.className + ' ' + currentPlayer.class;
        return true;
    }
    else if (box.id === currentPlayer.hoverID && box.innerHTML === currentPlayer.symbol)
    {
        // Otherwise, if the player has been hovering over the box and clicks it,
        // add their clicked on class to it, remove their hover ID, and return true.
        box.id = '';
        box.className = box.className + ' ' + currentPlayer.class;
        return true;
    }

    // The box has already been filled by a player.
    return false;
}

function changeCurrentPlayer()
{
    // Swap the current player.
    currentPlayer = currentPlayer === player1 ? player2 : player1;
}

function updatePlayerTotal(value)
{
    // Update the current player's total with the
    // value of the new cell they clicked on.
    currentPlayer.gameTotal += value;
}

function checkForWinner(score)
{
    for (var i = 0; i < winsArray.length; i++)
    {
        //compare the wins Array occurrence bitwise to the current score //
        if ((winsArray[i] & score) === winsArray[i])
        {
            return true; //bitwise match - we have a winner!
        }
    }

    return false;
}

function mouseOver(box)
{
    // Check if the cell is empty.
    if (box.innerHTML === '')
    {
        // If so, add the current player's symbol
        // and hover ID to it.
        box.innerHTML = currentPlayer.symbol;
        box.id = currentPlayer.hoverID;
    }
}

function mouseOff(box)
{
    // Check if the current player has been hovering
    // over this cell.
    if (box.id === currentPlayer.hoverID)
    {
        // If so, empty it and remove their hover ID.
        box.innerHTML = '';
        box.id = '';
    }
}