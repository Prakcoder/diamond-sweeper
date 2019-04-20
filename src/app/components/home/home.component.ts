import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

import { SAVED_GAME_ID } from '../../functions/utils';
import { NotificationService } from '../../notification/services/notification.service';
import { GameService } from '../../services/game.service';


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

    constructor(private gameService: GameService,
        private notificationService: NotificationService) { }

    ngOnInit() {
    }

    public startNewGame() {
        this.newGame.emit();
    }

    public loadSavedGame() {
        if (!this.gameService.isSavedGame()) {
            this.notificationService.show('No saved game!!!');
            return;
        }
        this.loadGame.emit(SAVED_GAME_ID);
    }

    public resetGamestate() {
        this.resetGame.emit();
        this.notificationService.show('Game reset done!!!');
    }

}
