import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { areSameCoordinates, DiamondCord, findDirection, generateUniquePairs, getDistance } from '../../functions/utils';
import { GameService } from '../../services/game.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    public indexArray = [];
    public diamondArray: DiamondCord[] = [];
    // We are using sparse matrix to store the coordinates of each diamond.
    // For Board size of n*n cells we need only n coordinates to store
    public touchedCords: DiamondCord[] = [];
    public hiddenDiamond: number;

    private lastClicked: DiamondCord = undefined;
    public arrowDirection: string = ''; // Will be used as class in html

    @Input() private gameSize: number;
    @Input() private gameId: string;
    @Output() private gameOver: EventEmitter<number> = new EventEmitter();

    constructor(private gameService: GameService) {
    }

    ngOnInit() {
        this.indexArray = getIndexArray(this.gameSize);
        if (!!this.gameId) {
            const data = this.gameService.loadSavedGame(this.gameId);
            this.diamondArray = data.diamondArray;
            this.touchedCords = data.touched;
            this.hiddenDiamond = computeHiddenDiamond(this.diamondArray, this.touchedCords, this.gameSize);
        } else {
            this.hiddenDiamond = this.gameSize;
            this.diamondArray = generateUniquePairs(this.gameSize);
        }
    }

    public hasDiamond(cord: DiamondCord) {
        return !!this.diamondArray.find(dia => areSameCoordinates(dia, cord));
    }

    public doNotAllowSave() {
        // No need to show save button if game just started or finished
        return this.hiddenDiamond === this.gameSize || this.hiddenDiamond === 0;
    }

    public setClicked(cord: DiamondCord) {
        if (this.isTouched(cord)) {
            return;
        }
        this.lastClicked = cord;
        this.getDirection(cord);
        this.touchedCords.push(cord);
        if (this.hasDiamond(cord)) {
            this.updateHiddenDiamond();
        }
    }

    private updateHiddenDiamond() {
        --this.hiddenDiamond;
        if (this.hiddenDiamond === 0) {
            this.gameOver.emit(this.touchedCords.length);
        }
    }

    public isTouched(cord: DiamondCord) {
        return !!this.touchedCords.find(t => areSameCoordinates(t, cord));
    }

    public isLastClicked(cord: DiamondCord) {
        if (!this.lastClicked) {
            return false;
        }
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
            if (nearest === undefined || dis < distance) {
                nearest = ind;
                distance = dis;
            }
        });
        return this.diamondArray[nearest];
    }

    public saveGame() {
        if (this.doNotAllowSave()) {
            return;
        }
        this.gameService.saveGame(this.diamondArray, this.touchedCords);
    }

    public closeGame() {
        this.resetGame();
        this.gameOver.emit();
    }

    public restartGame() {
        this.resetGame();
    }

    private resetGame() {
        this.touchedCords = [];
        this.hiddenDiamond = this.gameSize;
        this.lastClicked = undefined;
        this.arrowDirection = '';
    }
}


function getIndexArray(gameSize: number) {
    const arr: number[] = [];
    for (let i = 0; i < gameSize; ++i) {
        arr.push(i);
    }
    return arr;
}

function computeHiddenDiamond(diamondArray: DiamondCord[], touched: DiamondCord[], gameSize: number) {
    const visibleDiamond = diamondArray.filter(d => touched.find(t => areSameCoordinates(d, t)));
    return gameSize - visibleDiamond.length;
}
