import re as regex
import config

class Game:
    def __init__(self, id):
        self.p1Went = False
        self.p2Went = False
        self.ready = False
        self.id = id
        self.moves = [None, None]
        self.allMoves = []
        self.board = config.BOARD_TEMPLATE
        self.wins = [0, 0]
        self.ties = 0

    def get_player_move(self, p):
        return self.moves[p]

    def play(self, player, move):
        self.moves[player] = move
        if player == 0:
            self.p1Went = True
        else:
            self.p2Went = True

    def connected(self):
        return self.ready

    def bothWent(self):
        return self.p1Went and self.p2Went

    def resetWent(self):
        self.p1Went = False
        self.p2Went = False

    def movePiece(self, startingPosition: int, endPosition: int):
        board = config.BOARD_TEMPLATE
        board[endPosition] = self.board[startingPosition]
        board[startingPosition] = ""
        self.board = board
        return board
    
    def isOppressed(self, square: int, color: int):
        if color == 0:
            return regex.search("K|N|R", self.board[square])
        else:
            return regex.search("k|n|r", self.board[square])