import { Component, OnInit } from '@angular/core';

import { comparePairs, Pair } from '../../functions/utils';

const boardSize = 8;
@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    public indexArray = getIndexArray();
    public diamondArray: Pair[] = [[1, 4], [1, 3], [0, 2], [4, 0], [3, 3], [5, 0], [3, 4], [5, 1]];
    // We are using sparse matrix to store the coordinates of each diamond.
    // For Board size of n*n cells we need only n coordinates to store

    constructor() { }

    ngOnInit() {
    }

    public hasDiamond(xCord: number, yCord: number) {
        return !!this.diamondArray.find(dia => comparePairs(dia, [xCord, yCord]));
    }
}

function getIndexArray() {
    const arr: number[] = [];
    for (let i = 0; i < boardSize; ++i) {
        arr.push(i);
    }
    return arr;
}
