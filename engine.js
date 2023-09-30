"use strict";
const boardTemplate = ["wk", "wn", "wr", "", "", "", "br", "bn", "bk"];
const colors = ["rgb(181, 136, 99)", "rgb(240, 217, 181)"];
const selectedColors = ["rgb(219, 195, 73)", "rgb(248, 236, 117)"];
let board = boardTemplate;
const boardHTML = document.querySelector("#chess-board");
let currentSquare = 0;
let turn = "w";
let selectedPiece = -1;
function init() {
    currentSquare = 0;
    turn = "w";
    board = boardTemplate;
    drawSquares();
    for (let i = 0; i < boardHTML.childElementCount; i++) {
        boardHTML.children[i].addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement) {
                //selectPiece(Array.prototype.indexOf.call(boardHTML.children, event.target.nodeName == "IMG" ? event.target.parentElement : event.target));
            }
        });
    }
}
init();
function drawSquares() {
    for (let i = 0; i < boardHTML.childElementCount; i++) {
        for (let j = 0; j < boardHTML.children[i].childElementCount; j++) {
            boardHTML.children[i].removeChild(boardHTML.children[i].children[j]);
        }
        boardHTML.children[i].innerHTML = board[i] == "" ? "" : `<img src="./pieces/${board[i]}.png"/>`;
    }
}
