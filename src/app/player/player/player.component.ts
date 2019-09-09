import { Component, OnInit } from '@angular/core';
import * as YTPlayer from 'yt-player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  private player: any;
  private startTime: number;
  private endTime: number;

  constructor() { }

  ngOnInit() {
    this.player = new YTPlayer('#player', { autoplay: true });
    this.player.load('57dGINi4YzI');
    this.player.setVolume(100);

    this.player.on('playing', () => {
      console.log('playing:', this.player.getDuration()); // => 351.521
    });

    this.player.on('timeupdate', (seconds) => {
      console.log('timeupdate: ', seconds);
      if ( this.endTime && seconds >= this.endTime ) {
        this.player.seek(this.startTime);
      }
    });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  startRecording() {
    this.startTime = this.player.getCurrentTime();
  }

  stopRecording() {
    this.endTime = this.player.getCurrentTime();
  }
}
