const boardTemplate = ["wk", "wn", "wr", "", "", "", "br", "bn", "bk"];
const colors = ["rgb(181, 136, 99)", "rgb(240, 217, 181)"];
const selectedColors = ["rgb(219, 195, 73)", "rgb(248, 236, 117)"];
let board = boardTemplate;
const boardHTML = document.querySelector("#chess-board") as HTMLElement;
let currentSquare = 0;
let turn: "w" | "b" = "w";
let selectedPiece = -1;

function init() {
    currentSquare = 0;
    turn = "w";
    board = boardTemplate;
    drawSquares();
    for(let i = 0; i < boardHTML.childElementCount; i++) {
        boardHTML.children[i].addEventListener("click", (event) => {
            if(event.target instanceof HTMLElement) {
                let target = event.target;
                if(target.nodeName == "IMG" || target.nodeName == "SPAN") {
                    target = target.parentElement as HTMLElement;
                }
                selectPiece(Array.prototype.indexOf.call(boardHTML.children, target));
            }
        });
    }
}
init();
function drawSquares() {
    for(let i = 0; i < boardHTML.childElementCount; i++) {
        for(let j = 0; j < boardHTML.children[i].childElementCount; j++) {
            boardHTML.children[i].removeChild(boardHTML.children[i].children[j]);
        }
        boardHTML.children[i].innerHTML = board[i] == "" ? "" : `<img src="./pieces/${board[i]}.png"/>`;
    }
}
function selectPiece(piece: number) {
    if(selectedPiece == piece) {
        boardHTML.children[piece].classList.remove("highlighted-square");
        selectedPiece = -1;
    } else {
        if(board[piece] == "") {
            if(selectedPiece != -1) {
                movePiece(selectedPiece, piece);
            }
            boardHTML.children[selectedPiece].classList.remove("highlighted-square");
            selectedPiece = -1;
        } else {
            if(selectedPiece == -1) {
                boardHTML.children[piece].classList.add("highlighted-square");
                removeHints();
                drawHints(getLegalMoves(piece));
                selectedPiece = piece;
            } else {
                if(board[piece][0] == board[selectedPiece][0]) {
                    boardHTML.children[selectedPiece].classList.remove("highlighted-square");
                    boardHTML.children[piece].classList.add("highlighted-square");
                    removeHints();
                    drawHints(getLegalMoves(piece));
                    selectedPiece = piece;
                } else {
                    if(getLegalMoves(selectedPiece).includes(piece)) {
                        movePiece(selectedPiece, piece);
                        removeHints();
                    } else {
                        boardHTML.children[selectedPiece].classList.remove("highlighted-square");
                        removeHints();
                    }
                }
            }
        }
    }
}
function getLegalMoves(piece: number) {
    let before: number[] = [];
    let after: number[] = [];
    let color: "w" | "b";
    if(board[piece][0] == "w") {
        color = "w";
    } else {
        color = "b";
    }
    let otherColor: "w" | "b" = color == "w" ? "b" : "w";
    if(board[piece][1] == "k") {
        if(isOpressed(piece + 1, color)) {
            after.push(piece + 1);
        }
        if(isOpressed(piece - 1, color)) {
            before.push(piece - 1);
        }
    }
    if(board[piece][1] == "n") {
        try {
            if(board[piece + 2] == "" || board[piece + 2][1] == otherColor) {
                after.push(piece + 2);
            }
        } catch {}
        try {
            if(board[piece - 2] == "" || board[piece - 2][1] == otherColor) {
                after.push(piece - 2);
            }
        } catch {}
    }
    if(board[piece][1] == "r") {
        try {
            for(let i = 0; i < piece - 1; i++) {
                if(board[piece - 1 - i][0] == color) {
                    break;
                }
                if(board[piece - 1 - i] == "") {
                    before.push(piece - 1 - i);
                } else {
                    before.push(piece - 1 - i);
                    break;
                }
            }
        } catch {}
        try {
            for(let i = 0; i < board.length - piece; i++) {
                if(board[piece + 1 + i][0] == color) {
                    break;
                }
                if(board[piece + 1 + i] == "") {
                    after.push(piece + 1 + i);
                } else {
                    after.push(piece + 1 + i);
                    break;
                }
            }
        } catch {}
    }
    return [...before, ...after];
}
function isOpressed(square: number, color: "w" | "b") {
    let oppositeColor: "w" | "b" = color == "w" ? "w" : "b";
    if(board[square + 1] == `${oppositeColor}k` || board[square - 1] == `${oppositeColor}k`) {
        return true;
    }
    if(board.includes(`${oppositeColor}r`)) {
        if(getLegalMoves(board.indexOf(`${oppositeColor}r`)).includes(square)) {
            return true;
        }
    }
    if(board.includes(`${oppositeColor}n`)) {
        if(getLegalMoves(board.indexOf(`${oppositeColor}n`)).includes(square)) {
            return true;
        }
    }
    return false;
}
function movePiece(from: number, to: number) {
    if(turn == board[from][0]) {
        if(board[to] != "") {
            boardHTML.children[to].removeEventListener("click", (event) => {
                if(event.target instanceof HTMLElement) {
                    let target = event.target;
                    if(target.nodeName == "IMG" || target.nodeName == "SPAN") {
                        target = target.parentElement as HTMLElement;
                    }
                    selectPiece(Array.prototype.indexOf.call(boardHTML.children, target));
                }
            });
        }
        board[to] = board[from];
        board[from] = "";
        drawSquares();
    }
    turn = turn == "w" ? "b" : "w";
}
function drawHints(moves: number[]) {
    for(let i = 0; i < moves.length; i++) {
        boardHTML.children[moves[i]].innerHTML += `<span class="${board[moves[i]] == "" ? "hint" : "hint-piece"}"></span>`;
    }
}
function removeHints() {
    for(let i = 0; i < boardHTML.childElementCount; i++) {
        try {
            boardHTML.children[i].removeChild(boardHTML.children[i].querySelector("span") as HTMLElement);
        } catch {}
    }
}