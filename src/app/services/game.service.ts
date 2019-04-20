import { Injectable } from '@angular/core';

import { DiamondCord, SAVED_GAME_ID } from '../functions/utils';
import { BehaviorSubject } from 'rxjs';

const HIGH_SCORE = 'diamond-high-score';


@Injectable({
    providedIn: 'root'
})
export class GameService {


    public highScore$ = new BehaviorSubject<number>(0);
    // BehaviorSubject will help in udpate UI

    constructor() { }

    public saveGame(diamondArray: DiamondCord[], touched: DiamondCord[]) {
        const gameData = JSON.stringify({ diamondArray: diamondArray, touched: touched });
        localStorage.removeItem(SAVED_GAME_ID);
        localStorage.setItem(SAVED_GAME_ID, gameData);
    }

    public saveGameHighScore(highScore: number) {
        this.highScore$.next(highScore);
        localStorage.setItem(HIGH_SCORE, '' + highScore);
    }

    public loadGameHighScore() {
        const highScore = localStorage.getItem(HIGH_SCORE);
        if (!!highScore) {
            this.highScore$.next(+highScore);
        }
    }

    public isSavedGame() {
        return !!localStorage.getItem(SAVED_GAME_ID);
    }

    public loadSavedGame(key: string) {
        const gameData = localStorage.getItem(key);
        return safeJsonParse(gameData);
    }

    public resetGame() {
        this.highScore$.next(0);
        localStorage.clear();
    }
}

function safeJsonParse(data: string) {
    try {
        return JSON.parse(data);
    } catch {
        return undefined;
    }
}
