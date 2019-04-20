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
    constructor() { }

    ngOnInit() {
    }

    public setGameOver($event: number) {
        this.touchedCordsCount = $event;
        this.isGameOver = true;
    }

}
