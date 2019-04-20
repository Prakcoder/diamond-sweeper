import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SAVED_GAME_ID } from 'src/app/functions/utils';
import { GameService } from 'src/app/services/game.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    @Output() newGame = new EventEmitter();
    @Output() resetGame = new EventEmitter();
    @Output() loadGame = new EventEmitter();

    public message$ = new BehaviorSubject('');

    constructor(private gameService: GameService) { }

    ngOnInit() {
    }

    public startNewGame() {
        this.newGame.emit();
    }

    private closeMessage() {
        this.message$.next('');
    }

    private showMessage(message: string) {
        this.message$.next(message);
        setTimeout(() => {
            this.closeMessage();
        }, 3000);
    }

    public loadSavedGame() {
        if (!this.gameService.isSavedGame()) {
            this.showMessage('No saved game!!!');
            return;
        }
        this.loadGame.emit(SAVED_GAME_ID);
    }

    public resetGamestate() {
        this.resetGame.emit();
        this.showMessage('Game reset done!!!');
    }

}
