import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

    @Input() touchedCordsCount: number;
    @Input() gameSize: number;

    constructor(private gameService: GameService) { }

    ngOnInit() {
    }

    public getGameScore() {
        const score = (this.gameSize * this.gameSize) - this.touchedCordsCount;
        this.gameService.saveGameHighScore(score);
        return score;
    }

}
