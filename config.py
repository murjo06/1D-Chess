import socket

FONT = "arial"
BOARD_COLORS = [(181, 136, 99), (240, 217, 181)]
BOARD_TEMPLATE = ["K", "N", "R", "", "", "", "r", "n", "k"]
PORT = 5555
SERVER_ADDRESS = socket.gethostbyname(socket.gethostname()) #set this to the IPv4 address of your server