import { Component, OnInit } from '@angular/core';
import { areSameCoordinates, DiamondCord, findDirection, getDistance } from 'src/app/functions/utils';

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
    private lastClicked: DiamondCord = undefined;
    public arrowDirection: string = ''; // Will be used as class in html

    constructor() { }

    ngOnInit() {
    }

    public hasDiamond(cord: DiamondCord) {
        return !!this.diamondArray.find(dia => areSameCoordinates(dia, cord));
    }

    public setClicked(cord: DiamondCord) {
        if (this.isTouched(cord)) {
            return;
        }
        this.lastClicked = cord;
        if (this.hasDiamond(cord)) {
            --this.hiddenDiamond;
        }
        this.getDirection(cord);
        this.touchedCords.push(cord);
    }

    public isTouched(cord: DiamondCord) {
        return !!this.touchedCords.find(t => areSameCoordinates(t, cord));
    }

    public isGameOver() {
        return this.hiddenDiamond === 0;
    }

    public getGameScore() {
        return (boardSize * boardSize) - this.touchedCords.length;
    }

    public isLastClicked(cord: DiamondCord) {
        return areSameCoordinates(cord, this.lastClicked);
    }

    public getDirection(cord: DiamondCord) {
        const nearest = this.getNearestDiamond(cord);
        if (!nearest) {
            return;
        }
        this.arrowDirection = findDirection(cord, nearest);
    }

    public getNearestDiamond(clickedCord: DiamondCord) {
        if (this.isTouched(clickedCord)) {
            return undefined;
        }
        let nearest: number | undefined;
        let distance: number | undefined;

        this.diamondArray.forEach((currentDiamond, ind) => {
            const alreadyTouched = this.isTouched(currentDiamond);
            if (alreadyTouched) {
                return;
            }
            const dis = getDistance(currentDiamond, clickedCord);
            if (!nearest || dis < distance) {
                nearest = ind;
                distance = dis;
            }
        });
        return this.diamondArray[nearest];
    }
}

function getIndexArray() {
    const arr: number[] = [];
    for (let i = 0; i < boardSize; ++i) {
        arr.push(i);
    }
    return arr;
}
