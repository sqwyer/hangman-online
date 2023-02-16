const allowedChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0"];

interface User {
    name: string,
    id: string
}

interface Game {
    code: string,
    host: string,
    users: User[],
    word: string
}

const games: Game[] = []

function createGame(game: Game) {
    games.push(game);
    return [game as Game, games[games.length]?.code as string];
}

function closeGame(code: string) {
    const found = games.find(self => self.code === code);
    if(found) {
        games.splice(games.indexOf(found), 1)
    }
}

function updateGame(code: string, game: Game) {
    const found = games.find(self => self.code === code);
    if(found) {
        games[games.indexOf(found)] = game;
    }
}

function findGame(code: string) {
    const found = games.find(self => self.code === code);
    if(found) return found;
    else return null;
}

function generateCode(): string {
    let code = "";
    for(let i = 0; i < 6; i++) {
        code += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }
    if(findGame(code) != null) return generateCode();
    else return code;
}

export { type Game, type User, games, createGame, closeGame, updateGame, generateCode, findGame }
