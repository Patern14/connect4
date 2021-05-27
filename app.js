console.log("App.js CONNECTED")
/* ============================================================================
    SUMMARY

        Selectors

        Victory conditions

        Swap turn and check victory

        Reset game

        Check clicked cell - can be disabled
=============================================================================*/


/* ============================================================================
    Selectors
=============================================================================*/
var tableRow = document.getElementsByTagName("tr");
var tableCell = document.getElementsByTagName("td");
var tableSlot = document.querySelectorAll(".slot");
const playerTurn = document.querySelector(".player_turn");
const playerColorSample = document.querySelector(".player_color_sample");
const resetGame = document.querySelector(".reset_game");

while (!player1) {
    //var player1 = prompt("Player 1: enter your name. You will be RED.")
    var player1 = "Player 1";
}
player1Color = "red";

while (!player2) {
    //var player2 = prompt("Player 2: enter your name. You will be YELLOW.")
    var player2 = "Player 2"
}
player2Color = "yellow";

var currentPlayer = 1;
playerTurn.textContent = `${player1}'s turn.`;
playerColorSample.style.backgroundColor = player1Color;


/* ============================================================================
    Victory conditions
=============================================================================*/
const checkColor = (one, two, three, four) => {
    return (one === two && one === three && one === four && one !== "white");
}

const checkHorizontal = () => {
    for (let row = 0; row < tableRow.length; row++) {
        //console.log("check horizontal Row: " + row)
        for (let col = 0; col < 4; col++) {
            //console.log("check horizontal Col: " + col)
            if (checkColor( tableRow[row].children[col].style.backgroundColor, 
                            tableRow[row].children[col+1].style.backgroundColor, 
                            tableRow[row].children[col+2].style.backgroundColor, 
                            tableRow[row].children[col+3].style.backgroundColor)
            ) { return true }
        }
    }
}

const checkVertical = () => {
    for (let col = 0; col < 7; col++) {
        //console.log("check vertical Col: " + col)
        for (let row = 0; row < 3; row++) {
            //console.log("check vertical Row: " + row)
            if (checkColor( tableRow[row].children[col].style.backgroundColor, 
                            tableRow[row+1].children[col].style.backgroundColor, 
                            tableRow[row+2].children[col].style.backgroundColor, 
                            tableRow[row+3].children[col].style.backgroundColor)
            ) { return true }
        } 
    }
}
const checkDiagonalToRight = () => {
    for (let col = 0; col < 4; col++) {
        //console.log("check diagonal right Col: " + col)
        for (row = 0; row < 3; row++) {
            //console.log("check diagonal right Row: " + row)
            if (checkColor( tableRow[row].children[col].style.backgroundColor, 
                            tableRow[row+1].children[col+1].style.backgroundColor, 
                            tableRow[row+2].children[col+2].style.backgroundColor, 
                            tableRow[row+3].children[col+3].style.backgroundColor)
            ) { return true }
        }
    }
}

const checkDiagonalToLeft = () => {
    for (let col = 0; col < 4; col++) {
        //console.log("check diagonal left Col: " + col)
        for (row = 5; row > 2; row--) {
            //console.log("check diagonal left Row: " + row)
            if (checkColor( tableRow[row].children[col].style.backgroundColor, 
                            tableRow[row-1].children[col+1].style.backgroundColor, 
                            tableRow[row-2].children[col+2].style.backgroundColor, 
                            tableRow[row-3].children[col+3].style.backgroundColor)
            ) { return true }
        }
    }
}

const checkDraw = () => {
    let fullSlot = [];
    for (let i = 0; i < tableCell.length; i++) {
        if (tableCell[i].style.backgroundColor !== "white") {
            fullSlot.push(tableCell[i]);
        }
    }
    if (fullSlot.length === tableCell.length) {
        return true;
    }
}


/* ============================================================================
    Swap turn and check victory
=============================================================================*/
const changeColor = (e) => {
    let column = e.target.cellIndex;
    let row = [];
    
    for (let i = 5; i > -1; i--) {       // i=5 because we start at the table bottom.
        if (tableRow[i].children[column].style.backgroundColor == "white") {
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;
                row[0].classList.add(player1Color);
                if (checkHorizontal() || checkVertical() || checkDiagonalToRight() || checkDiagonalToLeft()) {
                    playerTurn.textContent = `${player1} WINS!`;
                    playerTurn.style.color = player1Color;
                    playerColorSample.style.backgroundColor = player1Color;
                    return (alert(`${player1} WINS!`));
                } else if (checkDraw()) {
                    playerTurn.textContent = "It's a DRAW...";
                    return (alert("DRAW!"));
                } else {
                    playerTurn.textContent = `${player2}'s turn.`;
                    playerColorSample.style.backgroundColor = player2Color;
                    return currentPlayer = 2;
                }
            } else {
                row[0].style.backgroundColor = player2Color;
                row[0].classList.add(player2Color)
                if (checkHorizontal() || checkVertical() || checkDiagonalToRight() || checkDiagonalToLeft()) {
                    playerTurn.textContent = `${player2} WINS!`;
                    playerTurn.style.color = player2Color;
                    playerColorSample.style.backgroundColor = player2Color;
                    return (alert(`${player2} WINS!`));
                } else if (checkDraw()) {
                    playerTurn.textContent = "It's a DRAW...";
                    return (alert("DRAW!"));
                } else {
                    playerTurn.textContent = `${player1}'s turn.`;
                    playerColorSample.style.backgroundColor = player1Color;
                    return currentPlayer = 1;
                }
            }
        }
    }
}

Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener("click", changeColor);
    cell.style.backgroundColor = "white";
});


/* ============================================================================
    Reset game
=============================================================================*/
resetGame.addEventListener("click", () => {
    console.log("Reset button CLICKED")
    tableSlot.forEach(slot => {
        slot.style.backgroundColor = "white";
        slot.classList.remove(player1Color, player2Color);
    });
    playerTurn.style.color = "black";
    return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn.` : playerTurn.textContent = `${player2}'s turn.`,
    playerColorSample.style.backgroundColor = player.currentPlayer.Color
    );
})


/* ============================================================================
    Check clicked cell - can be disabled
=============================================================================*/
for (let i = 0; 1 < tableCell.length; i++) { 
    tableCell[i].addEventListener("click", (e) => {
        console.log("row: " + e.target.parentElement.rowIndex +", column: "+ e.target.cellIndex)
    })
}

