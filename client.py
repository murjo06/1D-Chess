import pygame
from network import Network
import config

width = 900
height = 500
window = pygame.display.set_mode((width, height))
pygame.display.set_caption("Client")
pygame.font.init()

network = Network(config.PORT, config.SERVER_ADDRESS)

class Button:
    def __init__(self, text, x, y, color):
        self.text = text
        self.x = x
        self.y = y
        self.color = color
        self.width = 150
        self.height = 100

    def draw(self, win):
        pygame.draw.rect(win, self.color, (self.x, self.y, self.width, self.height))
        font = pygame.font.SysFont(config.FONT, 40)
        text = font.render(self.text, 1, (255, 255, 255))
        win.blit(text, (self.x + round(self.width / 2) - round(text.get_width() / 2), self.y + round(self.height / 2) - round(text.get_height() / 2)))

    def click(self, pos):
        x1 = pos[0]
        y1 = pos[1]
        if self.x <= x1 <= self.x + self.width and self.y <= y1 <= self.y + self.height:
            return True
        else:
            return False

def redrawWindow(window, game, player):
    window.fill((128, 128, 128))
    if not(game.connected()):
        font = pygame.font.SysFont(config.FONT, 80)
        text = font.render("Waiting for Player...", 1, (255, 0, 0), True)
        window.blit(text, (width / 2 - text.get_width() / 2, height / 2 - text.get_height() / 2))
    else:
        font = pygame.font.SysFont(config.FONT, 60)
        text = font.render("Your Move", 1, (0, 255, 255))
        window.blit(text, (80, 200))
        imageRects = []
        for i in range(len(config.BOARD_TEMPLATE)):
            pygame.draw.rect(window, config.BOARD_COLORS[i % 2], pygame.Rect(90 * i + 45, 45, 90, 90))
            if config.BOARD_TEMPLATE[i] != "":
                color = ""
                if config.BOARD_TEMPLATE[i] == config.BOARD_TEMPLATE[i].upper():
                    color = "w"
                else:
                    color = "b"
                image = pygame.image.load(f"pieces/{color}{config.BOARD_TEMPLATE[i]}.png")
                image = pygame.transform.smoothscale(image, (90, 90))
                imageRects.append(window.blit(image, (90 * i + 45, 45)))
            else:
                imageRects.append(pygame.Rect(90 * i + 45, 45, 90, 90))
        for image in range(len(imageRects)):
            for event in pygame.event.get():
                if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1 and imageRects[image].collidepoint(pygame.mouse.set_pos()):
                    game.movePiece(image, 0)
    pygame.display.update()

def main():
    run = True
    clock = pygame.time.Clock()
    player = int(network.getP())
    print("You are player ", player)
    while run:
        clock.tick(60)
        try:
            game = network.send("get")
        except:
            run = False
            print("Couldn't get game")
            break
        if game.bothWent():
            redrawWindow(window, game, player)
            pygame.time.delay(500)
            try:
                game = network.send("reset")
            except:
                run = False
                print("Couldn't get game")
                break
            font = pygame.font.SysFont("comicsans", 90)
            if (game.winner() == 1 and player == 1) or (game.winner() == 0 and player == 0):
                text = font.render("👍🏿", 1, (255, 0, 0))
            elif game.winner() == -1:
                text = font.render("Tie...", 1, (255, 0, 0))
            else:
                text = font.render("You have just exerted a great amount of skill issue", 1, (255, 0, 0))
            window.blit(text, (width / 2 - text.get_width() / 2, height / 2 - text.get_height() / 2))
            pygame.display.update()
            pygame.time.delay(2000)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
                pygame.quit()
        redrawWindow(window, game, player)

def menu_screen():
    run = True
    clock = pygame.time.Clock()
    while run:
        clock.tick(60)
        window.fill((128, 128, 128))     
        font = pygame.font.SysFont(config.FONT, 60)
        text = font.render("Connect to a server", 1, (255, 0, 0))
        window.blit(text, (100, 200))
        pygame.display.update()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                run = False
            if event.type == pygame.MOUSEBUTTONDOWN:
                run = False
    main()

while True:
    menu_screen()