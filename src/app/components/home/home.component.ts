import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SAVED_GAME_ID } from 'src/app/functions/utils';
import { GameService } from 'src/app/services/game.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @Output() newGame = new EventEmitter();
    @Output() resetGame = new EventEmitter();
    @Output() loadGame = new EventEmitter();

    public showNoGameSaved: boolean;

    constructor(private gameService: GameService) { }

    ngOnInit() {
    }

    public startNewGame() {
        this.newGame.emit();
    }

    private closeMessage() {
        this.showNoGameSaved = false;
    }

    public loadSavedGame() {
        if (!this.gameService.isSavedGame()) {
            this.showNoGameSaved = true;
            setTimeout(() => {
                this.showNoGameSaved = false;
            }, 0);

            return;
        }
        this.loadGame.emit(SAVED_GAME_ID);
    }

    public resetGamestate() {
        this.resetGame.emit();
    }

}
