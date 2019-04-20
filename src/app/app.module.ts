import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { ResultComponent } from './components/result/result.component';
import { NotificationModule } from './notification/notification.module';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        BoardComponent,
        ResultComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NotificationModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
