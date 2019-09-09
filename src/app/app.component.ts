import { Component, OnInit } from '@angular/core';
import { YtPlayerComponent, YtPlayerService, PlayerOptions } from 'yt-player-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  playerOptions: PlayerOptions = {
    autoplay: false,
    timeupdateFrequency: 1000
  };
  title = 'looptube';

  constructor( private ytPlayerService: YtPlayerService ) { }

  public ngOnInit(): void {
    this.ytPlayerService.timeUpdate$.subscribe(res => {
      console.log('timeUpdate:', res);
    });

    this.ytPlayerService.playbackRateChange$.subscribe(res => {
      console.log('ratechange', res);
    });
  }

  public play(): void {
    this.ytPlayerService.play();
  }
}
