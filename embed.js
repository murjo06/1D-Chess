//! THIS SCRIPT IS DEPRECATED, DO NOT USE IN PRODUCTION


/*
const pieceURL = "https://www.chess.com/chess-themes/pieces/neo/150/";
const boardTemplate = ["wk", "wn", "wr", "", "", "", "br", "bn", "bk", ""];
const colors = ["rgb(181, 136, 99)", "rgb(240, 217, 181)"];
const selectedColors = ["rgb(219, 195, 73)", "rgb(248, 236, 117)"];
let board = boardTemplate;
let highlightedSquare;
let currentLegalMoves = [];
const boardHTML = document.querySelector("#chess-board");
let currentSquare = 9;
let turn = "w";

function getPiecePosition(piece) {
    for(let i = 0; i < board.length; i++) {
        if(board[i] == piece) {
            return i;
        }
    }
    return -1;
}

const socket = new WebSocket("ws://localhost:3000");
socket.onopen = () => {
    console.log("socket open");
};
socket.onmessage = (message) => {
    let piece = message.data.split("_");
    movePiece(board, getPiecePosition(parseInt(piece[0])), parseInt(piece[1]), true);
}

for(let i = 0; i < boardTemplate.length - 1; i++) {
    boardHTML.children[i].setAttribute("piece", boardTemplate[i]);
    boardHTML.children[i].addEventListener("click", function() {
        if(getLegalMoves("k", board[board.indexOf("wk")])) {}
        let match = 0;
        let square = 0;
        for(let j = 0; j < boardHTML.childElementCount; j++) {
            match = (this == boardHTML.children[j]) ? j : match;
        }
        if(board[currentSquare][0] != turn && board[match][0] != turn) {
            return;
        }
        square = (board[match][0] != turn) ? currentSquare : match;
        let color = board[square][0];
        let legalMove = false;
        let gotHint = [];
        if((currentSquare != 9 && turn == color) || (board[currentSquare][0] == color && turn == color)) {
            for(let k = 0; k < boardHTML.childElementCount; k++) {
                try {
                    boardHTML.children[k].querySelector(".legal-move").parentNode.removeChild(boardHTML.children[k].querySelector(".legal-move"));
                } catch {}
            }
        }
        for(let n = 0; n < 2; n++) {
            let moves = getLegalMoves(board[square][1], square, color);
            for(let k = 0; k < moves[n].length; k++) {
                let move = moves[n][k];
                if(move == match && currentSquare != 9) {
                    legalMove = true;
                    currentLegalMoves.push(move);
                }
                try {
                    if(currentSquare == 9 || board[currentSquare][0] == color) {
                        boardHTML.children[move].appendChild(getHint());
                    }
                } catch {}
            }
        }
        for(let k = 0; k < boardHTML.childElementCount; k++) {
            if(!!boardHTML.children[k].querySelector(".legal-move")) {
                gotHint.push(k);
            }
        }
        color = board[match][0];
        if(board[currentSquare] != "" && board[currentSquare][0] != color && legalMove) {
            updateBoard(movePiece(board, currentSquare, match));
            turn = (turn == "w") ? "b" : "w";
            boardHTML.children[highlightedSquare].style.background = colors[highlightedSquare % 2];
            currentSquare = 9;
        } else {
            if(board[currentSquare] == board[match]) {
                currentSquare = 9;
            } else if(turn == color) {
                try {
                    boardHTML.children[highlightedSquare].style.background = colors[highlightedSquare % 2];
                } catch {}
                highlightedSquare = match;
                currentSquare = match;
                boardHTML.children[match].style.background = selectedColors[match % 2];
            }
        }
    });
    if(boardTemplate[i] != "") {
        let piece = document.createElement("img");
        piece.classList.add("chess-piece");
        piece.src = `${pieceURL}${boardTemplate[i]}.png`;
        boardHTML.children[i].appendChild(piece);
    }
}
function getHint() {
    let hint = document.createElement("div");
    hint.classList.add("legal-move");
    return hint;
}
function movePiece(position, start, end, server = false) {
    let pos = position;
    pos[end] = pos[start];
    pos[start] = "";
    if(!server) {
        socket.send(`${board[start]}_${end}`);
    }
    return pos;
}
function getLegalMoves(piece, position, color) {
    let before = [];
    let after = [];
    if(piece == "r") {
        try {
            for(let i = 0; i < position - 1; i++) {
                if(board[position - 1 - i][0] == color) {
                    break;
                }
                if(board[position - 1 - i] == "") {
                    before.push(position - 1 - i);
                } else {
                    before.push(position - 1 - i);
                    break;
                }
            }
        } catch {}
        try {
            for(let i = 0; i < board.length - position; i++) {
                if(board[position + 1 + i][0] == color) {
                    break;
                }
                if(board[position + 1 + i] == "") {
                    after.push(position + 1 + i);
                } else {
                    after.push(position + 1 + i);
                    break;
                }
            }
        } catch {}
        return [before, after];
    }
    if(piece == "n") {
        try {
            if(board[position - 2] == "" || board[position - 2][0] != color) {
                before.push(position - 2);
            }
        } catch {}
        try {
            if(board[position + 2] == "" || board[position + 2][0] != color) {
                before.push(position + 2);
            }
        } catch {}
        return [before, after];
    }
    if(piece == "k") {
        try {
            let behind = isOpressed(position - 1, color, false);
            let front = isOpressed(position + 1, color, false);
            if(behind) {
                before.push(position - 1);
            }
            if(front) {
                before.push(position + 1);
            }
        } catch {}
        console.log([before, after]);
        return [before, after];
    }
}
function updateBoard(update) {
    board = update;
    for(var i = 0; i < boardHTML.childElementCount; i++) {
        boardHTML.children[i].setAttribute("piece", update[i]);
        var element = boardHTML.children[i];
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        if(update[i] != "") {
            let piece = document.createElement("img");
            piece.classList.add("chess-piece");
            piece.src = `${pieceURL}${update[i]}.png`;
            boardHTML.children[i].appendChild(piece);
        }
    }
}
function isOpressed(square, color, mate) {
    if(!mate) {
        let rook = getLegalMoves("r", board.indexOf(`${color}r`), color);
        for(let i = 0; i < rook.length; i++) {
            for(let k = 0; k < rook[i].length; k++) {
                if(square == rook[i][k]) {
                    return true;
                }
            }
        }
        let knight = getLegalMoves("n", board.indexOf(`${color}n`), color);
        for(let i = 0; i < knight.length; i++) {
            for(let k = 0; k < knight[i].length; k++) {
                if(square == knight[i][k]) {
                    return true;
                }
            }
        }
        let oppositeColor = (color == "w") ? "b" : "w";
        let king = board.indexOf(`${oppositeColor}k`);
        if(square == king || square == king + 1 || square - 1) {
            return true;
        }
        return false;
    }
}
*/