console.log("App.js CONNECTED")

/* Selectors */

const tableRow = document.getElementsByTagName("tr");
const tableCell = document.getElementsByTagName("td");
const tableSlot = document.querySelector(".slot");
const playerTurn = document.querySelector(".player_turn");
const resetGame = document.querySelector(".reset_game");

for(let i = 0; 1 < tableCell.length; i++) {
    tableCell[i].addEventListener("click", (e) => {
        console.log("row: " + e.target.parentElement.rowIndex +", column: "+ e.target.cellIndex)
    })
}





