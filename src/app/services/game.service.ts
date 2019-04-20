import { Injectable } from '@angular/core';

import { DiamondCord, SAVED_GAME_ID } from '../functions/utils';



@Injectable({
    providedIn: 'root'
})
export class GameService {


    constructor() { }

    public saveGame(diamondArray: DiamondCord[], touched: DiamondCord[]) {
        localStorage.clear();
        const gameData = JSON.stringify({ diamondArray: diamondArray, touched: touched });
        localStorage.setItem(SAVED_GAME_ID, gameData);
    }

    public isSavedGame() {
        return !!localStorage.getItem(SAVED_GAME_ID);
    }

    public loadSavedGame(key: string) {
        const gameData = localStorage.getItem(key);
        return safeJsonParse(gameData);
    }
}

function safeJsonParse(data: string) {
    try {
        return JSON.parse(data);
    } catch {
        return undefined;
    }
}
