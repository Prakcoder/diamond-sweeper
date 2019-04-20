import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BOARD_SIZE } from 'src/app/functions/utils';
import { GameService } from 'src/app/services/game.service';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

    public gameSize: number = BOARD_SIZE;
    public isGameOver: boolean = false;
    public touchedCordsCount: number;
    public gameInProgress: boolean = false;
    public gameId: string = undefined;
    public highScore$ = this.gameService.highScore$;

    constructor(private gameService: GameService) {

    }

    ngOnInit() {
        this.gameService.loadGameHighScore();
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
        this.gameId = undefined;
        this.gameInProgress = true;
    }

    public resetGame() {
        this.gameService.resetGame();
    }

    public loadGame(key: string) {
        this.gameId = key;
        this.gameInProgress = true;
    }

    public showMenu() {
        this.gameId = undefined;
        this.gameInProgress = undefined;
        this.isGameOver = undefined;
    }
}
