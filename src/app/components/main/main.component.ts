import { Component, OnInit } from '@angular/core';

import { BOARD_SIZE } from '../../functions/utils';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public gameSize: number = BOARD_SIZE;
    public isGameOver: boolean = false;
    public touchedCordsCount: number;
    public gameInProgress: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    public setGameOver($event: number) {
        if (!$event) {
            this.gameInProgress = false;
            return;
        }
        this.touchedCordsCount = $event;
        this.isGameOver = true;
    }

    public startNewGame() {
        this.gameInProgress = true;
    }

}
