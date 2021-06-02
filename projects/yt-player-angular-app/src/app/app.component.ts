import { ChangeDetectorRef, Component } from '@angular/core';
import {
  PlayerOptions,
  StateChange,
  PlaybackQuality,
  StateChangeType,
  YtPlayerService,
} from 'yt-player-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public playerOptions: PlayerOptions = {
    autoplay: false,
    timeupdateFrequency: 1000,
  };
  public videoIdForm: FormGroup;
  public videoId = 'fJ9rUzIMcZQ';
  public apiMethods = [
    { action: () => this.ytPlayerService.play(), text: 'play()' },
    { action: () => this.ytPlayerService.pause(), text: 'pause()' },
    { action: () => this.ytPlayerService.stop(), text: 'stop()' },
    {
      action: () =>
        this.writeToLog(
          `getCurrentTime() || ${this.ytPlayerService.getCurrentTime()}`
        ),
      text: 'getCurrentTime()',
    },
    { action: () => this.ytPlayerService.seek(20), text: 'seek(20)' },
    {
      action: () => this.ytPlayerService.setVolume(100),
      text: 'setVolume(100)',
    },
    {
      action: () =>
        this.writeToLog(`getVolume() || ${this.ytPlayerService.getVolume()}`),
      text: 'getVolume()',
    },
    { action: () => this.ytPlayerService.mute(), text: 'mute()' },
    { action: () => this.ytPlayerService.unMute(), text: 'unMute()' },
    {
      action: () =>
        this.writeToLog(`isMuted() || ${this.ytPlayerService.isMuted()}`),
      text: 'isMuted()',
    },
    {
      action: () => this.ytPlayerService.setSize(320, 180),
      text: 'setSize(320, 180)',
    },
    {
      action: () => this.ytPlayerService.setSize(640, 360),
      text: 'setSize(640, 360)',
    },
    {
      action: () => this.ytPlayerService.setPlaybackRate(0.5),
      text: 'setPlaybackRate(0.5)',
    },
    {
      action: () => this.ytPlayerService.setPlaybackRate(1),
      text: 'setPlaybackRate(1)',
    },
    {
      action: () =>
        this.ytPlayerService.setPlaybackQuality(PlaybackQuality.Small),
      text: 'setPlaybackQuality(PlaybackQuality.Small)',
    },
    {
      action: () =>
        this.writeToLog(
          `getPlaybackRate() || ${this.ytPlayerService.getPlaybackRate()}`
        ),
      text: 'getPlaybackRate()',
    },
    {
      action: () =>
        this.writeToLog(
          `getAvailablePlaybackRates() || ${this.ytPlayerService.getAvailablePlaybackRates()}`
        ),
      text: 'getAvailablePlaybackRates()',
    },
    {
      action: () =>
        this.writeToLog(`getDuration() ${this.ytPlayerService.getDuration()}`),
      text: 'getDuration()',
    },
    {
      action: () =>
        this.writeToLog(
          `getBufferingProgress() || ${this.ytPlayerService.getBufferingProgress()}`
        ),
      text: 'getBufferingProgress()',
    },
    {
      action: () =>
        this.writeToLog(`getState() || ${this.ytPlayerService.getState()}`),
      text: 'getState()',
    },
  ];
  public log = '';

  constructor(
    private ytPlayerService: YtPlayerService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.videoIdForm = this.fb.group({
      id: [this.videoId, Validators.required],
    });
  }

  public onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.videoId = form.controls.id.value;
    }
  }

  public onClearLogClick(): void {
    this.log = '';
  }

  public onStateChange(stateChange: StateChange): void {
    this.writeToLog(
      `State Change Type: ${StateChangeType[stateChange.type]} || Payload: ${
        stateChange.payload
      }`
    );
    this.cd.detectChanges();
  }

  private writeToLog(text: string): void {
    this.log = `\r${text}` + `\n${this.log || ''}`;
  }
}
