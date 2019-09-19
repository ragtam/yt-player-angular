import { Component, OnInit } from '@angular/core';
import { YtPlayerService, PlayerOptions, PlaybackQuality, StateChange, StateType } from 'yt-player-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public playerOptions: PlayerOptions = {
    autoplay: false,
    timeupdateFrequency: 1000
  };
  public videoIdForm: FormGroup;

  public videoId = 'ut_igW6OOtE';
  public apiMethods = [
    { action: () => this.ytPlayerService.play(), text: 'play()' },
    { action: () => this.ytPlayerService.pause(), text: 'pause()' },
    { action: () => this.ytPlayerService.stop(), text: 'stop()' },
    { action: () => console.log('getCurrentTime()', this.ytPlayerService.getCurrentTime()), text: 'getCurrentTime()' },
    { action: () => this.ytPlayerService.seek(20), text: 'seek(20)' },
    { action: () => this.ytPlayerService.setVolume(100), text: 'setVolume(100)'},
    { action: () => console.log('getVolume()', this.ytPlayerService.getVolume()), text: 'getVolume()'},
    { action: () => this.ytPlayerService.mute(), text: 'mute()' },
    { action: () => this.ytPlayerService.unMute(), text: 'unMute()' },
    { action: () => console.log('isMuted()', this.ytPlayerService.isMuted()), text: 'isMuted()' },
    { action: () => this.ytPlayerService.setSize(320, 180), text: 'setSize(320, 180)' },
    { action: () => this.ytPlayerService.setSize(640, 360), text: 'setSize(640, 360)' },
    { action: () => this.ytPlayerService.setPlaybackRate(0.5), text: 'setPlaybackRate(0.5)' },
    { action: () => this.ytPlayerService.setPlaybackRate(1), text: 'setPlaybackRate(1)' },
    { action: () => this.ytPlayerService.setPlaybackQuality(PlaybackQuality.Small), text: 'setPlaybackQuality(PlaybackQuality.Small)' },
    { action: () => console.log('getPlaybackRate()', this.ytPlayerService.getPlaybackRate()), text: 'getPlaybackRate()' },
    { action: () => console.log('getAvailablePlaybackRates()',
      this.ytPlayerService.getAvailablePlaybackRates()), text: 'getAvailablePlaybackRates()' },
    { action: () => console.log('getDuration()', this.ytPlayerService.getDuration()), text: 'getDuration()' },
    { action: () => console.log('getBufferingProgress()', this.ytPlayerService.getBufferingProgress()), text: 'getBufferingProgress()' },
    { action: () => console.log('getState()', this.ytPlayerService.getState()), text: 'getState()' }
  ];

  public playerOptionsBooleanProps = [
    { propertyName: 'autoplay', value: this.playerOptions.autoplay }
  ];

  constructor(
    private ytPlayerService: YtPlayerService,
    private fb: FormBuilder
  ) {
    this.videoIdForm = this.fb.group({
      id: [this.videoId, Validators.required]
    });
  }

  public onSubmit(form: FormGroup) {
    if ( form.valid ) {
      this.videoId = form.controls.id.value;
    }
  }

  public ngOnInit(): void {
    // this.ytPlayerService.stateChange$.subscribe( (stateChange: StateChange) => {
    //   console.log( StateType[stateChange.type], stateChange.payload);
    // } );
  }

  public onStateChange(stateChange: StateChange): void {
    console.log( `Type: ${StateType[stateChange.type]} || Payload: ${stateChange.payload}`);
  }
}
