import { Component, OnInit } from '@angular/core';
import { comparePairs, DiamondCord } from 'src/app/functions/utils';

const boardSize = 8;
@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    public indexArray = getIndexArray();
    public diamondArray: DiamondCord[] = [[1, 4], [1, 3], [0, 2], [4, 0], [3, 3], [5, 0], [3, 4], [5, 1]];
    // We are using sparse matrix to store the coordinates of each diamond.
    // For Board size of n*n cells we need only n coordinates to store
    public touchedCords: DiamondCord[] = [];
    private hiddenDiamond = boardSize;

    constructor() { }

    ngOnInit() {
    }

    public hasDiamond(cord: DiamondCord) {
        return !!this.diamondArray.find(dia => comparePairs(dia, cord));
    }

    public setClicked(cord: DiamondCord) {
        if (this.hasDiamond(cord)) {
            --this.hiddenDiamond;
        }
        this.touchedCords.push(cord);
    }

    public isTouched(cord: DiamondCord) {
        return !!this.touchedCords.find(t => comparePairs(t, cord));
    }

    public isGameOver() {
        return this.hiddenDiamond === 0;
    }

    public getGameScore() {
        return (boardSize * boardSize) - this.touchedCords.length;
    }
}

function getIndexArray() {
    const arr: number[] = [];
    for (let i = 0; i < boardSize; ++i) {
        arr.push(i);
    }
    return arr;
}
