import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerModule } from './player/player.module';
import { YtPlayerAngularModule } from 'yt-player-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlayerModule,
    YtPlayerAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
