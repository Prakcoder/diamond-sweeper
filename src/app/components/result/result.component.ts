import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() touchedCordsCount: number;
  @Input() gameSize: number;
  constructor() { }

  ngOnInit() {
  }

  public getGameScore() {
    return (this.gameSize * this.gameSize) - this.touchedCordsCount;
  }

}
