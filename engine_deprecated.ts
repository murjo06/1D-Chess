/*
const boardTemplate = ["wk", "wn", "wr", "", "", "", "br", "bn", "bk"];
const colors = ["rgb(181, 136, 99)", "rgb(240, 217, 181)"];
const selectedColors = ["rgb(219, 195, 73)", "rgb(248, 236, 117)"];
let board = boardTemplate;
const boardHTML = document.querySelector("#chess-board");
let currentSquare = 0;
let turn: "w" | "b" = "w";
let selectedPiece = -1;
let useSockets = false;
const colorNames = {
    w: "White",
    b: "Black"
};
const pieceNames = {
    k: "king",
    n: "knight",
    r: "rook"
}

function drawSquares() {
    if(boardHTML instanceof HTMLElement) {
        for(let i = 0; i < boardHTML.childElementCount; i++) {
            for(let j = 0; j < boardHTML.children[i].childElementCount; j++) {
                boardHTML.children[i].removeChild(boardHTML.children[i].children[j]);
            }
            boardHTML.children[i].innerHTML = board[i] == "" ? "" : `<img src="./pieces/${board[i]}.png" alt="${colorNames[board[i][0]]} ${pieceNames[board[i][1]]}"/>`;
        }
    }
}

function init() {
    currentSquare = 0;
    turn = "w";
    board = boardTemplate;
    if(boardHTML instanceof HTMLElement) {
        drawSquares();
        for(let i = 0; i < boardHTML.childElementCount; i++) {
            boardHTML.children[i].addEventListener("click", (event) => {
                if(event.target instanceof HTMLElement) {
                    selectPiece(Array.prototype.indexOf.call(boardHTML.children, event.target.nodeName == "IMG" ? event.target.parentElement : event.target));
                }
            });
        }
    }
}
init();

function selectPiece(piece: number) {
    if(boardHTML instanceof HTMLElement) {
        if(board[piece] == "" && selectedPiece != -1) {
            if(getLegalMoves(selectedPiece).includes(piece)) {
                movePiece(selectedPiece, piece);
                boardHTML.children[piece].classList.remove("highlighted-square");
            }
            boardHTML.children[selectedPiece].classList.remove("highlighted-square");
            selectedPiece = -1;
            return;
        }
        if(board[piece] != "" && selectedPiece != piece) {
            if(selectedPiece != -1) {
                movePiece(selectedPiece, piece);
                boardHTML.children[selectedPiece].classList.remove("highlighted-square");
            }
            boardHTML.children[piece].classList.add("highlighted-square");
            if(selectedPiece != -1) {
                boardHTML.children[piece].classList.remove("highlighted-square");
            }
            selectedPiece = piece;
        } else if(selectedPiece == piece) {
            boardHTML.children[piece].classList.remove("highlighted-square");
            selectedPiece = -1;
        }
    }
}

function getPiecePosition(piece: string) {
    for(let i = 0; i < board.length; i++) {
        if(board[i] == piece) {
            return i;
        }
    }
    return -1;
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
        return [...before, ...after];
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

function drawHints(moves: number[]) {
    if(boardHTML instanceof HTMLElement) {
        for(let i = 0; i < moves.length; i++) {
            boardHTML.children[i].innerHTML += `<span class="legal-move"></span>`;
        }
    }
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
    board[to] = board[from];
    board[from] = "";
    drawSquares();
}

function gameLoop() {
    if(!useSockets) {
        if(turn == "w") {

        } else {

        }
    }
}
*/