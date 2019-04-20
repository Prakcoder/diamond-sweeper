________________
# DiamondSweeper

This `Diamond Sweeper` is an interesting game. The rules of the game are as follows:

* The game board has 8x8 squares (initially, all represented by question marks)
* There are 8 diamonds hidden on the board, each diamond behind one of the squares
* When the user clicks on a square
    * If the square was hiding a diamond, the diamond appears
    * If the square was not a diamond, then an arrow appears, pointing towards the nearest diamond
    * Any arrows that were previously show become hidden
    * Otherwise, the square is opened, and blank

* The game ends when all diamonds are found. The user's score is the number of squares still left unturned.
________________


## Production server
Run `npm start` to run project in production mode and `npm run build` for production build.

## Development server

Run `npm run start-dev` to run project in development mode and `npm run build-dev` for development build.

## Project URL
After you start the server it will automatically open the browser with `http://localhost:4200/` url but you can also use same url to view project.

## Stackblitz url
You can directly view or run the project online by the following link: 
`https://stackblitz.com/github/Prakcoder/diamond-sweeper`

## Angular CLI
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

