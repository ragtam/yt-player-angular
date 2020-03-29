# Yt-Player-Angular

This package is an Angular wrapper for [yt-player](https://www.npmjs.com/package/yt-player), YouTube Player API.

## Demo

Go <a href="https://ragtam.github.io/yt-player-angular/">there</a> to see it working.

## Install

First, you need to install **yt-player** from NPM:

```
npm install yt-player
```

Then do the same for **yt-player-angular**:

```
npm install yt-player-angular
```

## Basic Usage

Add YtPlayerAngularModule to `imports` array in your `app.module.ts`:

```
import { YtPlayerAngularModule } from 'yt-player-angular';

@NgModule({
  imports: [
    YtPlayerAngularModule
  ]
...
```

Then add selector `yt-player` to AppComponent's template (`app.component.html`):

```
<yt-player [videoId]="'fJ9rUzIMcZQ'"></yt-player>
```

At this point you should be able to see the video.

## Controlling the player

`YtPlayerService` lets you control the player. Go to `app.component.ts` and add next `import` at the top of the file:

```
import { YtPlayerService, PlayerOptions } from 'yt-player-angular';
```

inject `YtPlayerService` in the constructor:

```
constructor( private ytPlayerService: YtPlayerService ) { }
```

Now you can start the video by calling

```
this.ytPlayerService.play();
```

## API

### Inputs

Selector `yt-player` accepts two input properties (first one is mandatory, second optional):

```
[videoId]
[options]
```

`videoId` accepts the id of the video you want to play. To specify `options`, `PlayerOptions` interface can be used. Options object might contain following properties (all of them are optional):

```
- width?: number;
- heiht?: number;
- autoplay?: boolean;           // Default false
- captions?: boolean | string;  // two-letter language code or false to disable it
- controls?: boolean;           // video player controls visible. Default true
- keyboard?: boolean;           // keyboard control. Default true
- fullscreen?: boolean;         // fullscreen button visible. Default true
- annotations?: boolean;        // video annotations. Default true
- modestBranding?: boolean;     // YT player with no YT logo. Default false
- related?: boolean;            // related videos at the end. Default false
- info?: boolean;               // Video title and uploader visible. Default true
- timeupdateFrequency?: number; // time between video progress updates. Default 1000 ms
- playsInline?: boolean;        // inline or fullscreen in an HTML5 player on iOS. Default true
```

Note that modern browsers might block autoplaying multimedia, explanation in [MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#Autoplay_availability).

### Outputs

Selector `yt-player` contains output property `stateChange`. In `app.component.html` add:

```
<yt-player [videoId]="'ut_igW6OOtE'" (stateChange)="onStateChange($event)"></yt-player>
```

and then add handler method in `app.component.ts`

```
public onStateChange(stateChange: StateChange): void {
  console.log( `Type: ${StateChangeType[stateChange.type]} || Payload: ${stateChange.payload}`);
}
```

It emits the same values as `stateChange$` stream described in Streams section of readme. To get data about changes either component's output or service`s stream can be used.

### Methods

`YtPlayerService` contains the following methods:

```
- play(): void
- pause(): void
- stop(): void
- getCurrentTime(): number
- seek(seconds: number): void     // go to specific second in video. Does not stop playback
- setVolume(value: number): void  // value between 0 - 100
- getVolume(): number
- mute(): void
- unMute(): void
- isMuted(): boolean
- setSize(width: number, height: number): void  // width && heiht in px
- setPlaybackRate(rate: number): void           // playback speed rate: 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2
- getPlaybackRate(): number
- getAvailablePlaybackRates(): number[]
- setPlaybackQuality(sugestedQuality: PlaybackQuality): void
- getDuration(): number
- getBufferingProgress(): number
- ​getState(): PlayerState
```

### Streams

`YtPlayerService` exposes the following stream:

```
stateChange$: Observable<StateChange>
```

It broadcasts objects of type `StateChange` that contains following properties:

```
type: StateChangeType;
payload?: any;
```

`StateChangeType` is an enum that lists information about type of broadcasted change:

```
Error,            // StateChange with payload containing error message: string
Unplayable,       // StateChange with payload containing video id: string
Unstarted,
Ended,
Started,
PlaybackProgress,
Paused,
Buffering,
Cued,
QualityChanged, // StateChange with payload containing applied quality: PlaybackQuality
RateChanged     // StateChange with payload containing applied rate: number
```
