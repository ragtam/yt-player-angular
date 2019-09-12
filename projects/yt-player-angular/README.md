# Yt-Player-Angular

This package is an Angular wrapper for [yt-player](https://www.npmjs.com/package/yt-player), YouTube Player API.

Versions aligned with yt-player package:
- yt-player-angular@3.1.* works with yt-player@3.1.*

Go <a href="https://ragtam.github.io/yt-player-angular/">there</a> to see the demo.

## Install

First, you need to install **yt-player** from NPM:
```
npm install yt-player
```

Then do the same for **yt-player-angular**:
```
npm install yt-player-angular
```

## Usage

Add YtPlayerAngularModule to `imports` array in your app.module.ts:

```
import { YtPlayerAngularModule } from 'yt-player-angular';

@NgModule({
  imports: [
    YtPlayerAngularModule
  ]
...
```

Go to app.component.ts (or wherever you want to use the package) and add next `import` at the top of the file:

```
import { YtPlayerComponent, YtPlayerService, PlayerOptions } from 'yt-player-angular';
```

inject YtPlayerService in the constructor:

```
constructor( private ytPlayerService: YtPlayerService ) { }
```

Then add yt player angular selector `yt-player` to AppComponent's template (app.component.html):

```
<yt-player [videoId]="'57dGINi4YzI'"></yt-player>
```

Input property 'videoId' accepts the id of the video you want to play.

## API

Selector 'yt-player' accepts two input properties (first one is mandatory, second optional):
```
- [videoId]
- [options]
```

To specify options PlayerOptions interface can be used. It contains following properties:
```
- width?: number;
- heiht?: number;
- autoplay?: boolean;
- captions?: boolean;
- controls?: boolean;
- keyboard?: boolean;
- fullscreen?: boolean;
- annotations?: boolean;
- modestBranding?: boolean;
- related?: boolean;
- info?: boolean;
- timeupdateFrequency?: number;
```

YtPlayerService`s methods:
```
- play(): void
- pause(): void
- stop(): void
- getCurrentTime(): number
- seek(seconds: number): void
- setVolume(value: number): void
- getVolume(): number
- mute(): void
- unMute(): void
- isMuted(): boolean
- setSize(width: number, height: number): void
- setPlaybackRate(rate: number): void
- getPlaybackRate(): number
- getAvailablePlaybackRates(): number[]
- getDuration(): number
- ​getProgress(): number
- ​getState(): PlayerState
```

YtPlayerService`s streams:
```
- timeUpdate$: Observable<number>
- error$: Observable<string>
- unplayable$: Observable<string>
- timeUpdate$: Observable<number>}
- unstarted$: Observable<void>
- ended$: Observable<void>
- playing$: Observable<void>
- paused$: Observable<void>
- buffering$: Observable<void>
- cued$: Observable<void>
- playbackQualityChange$: Observable<PlaybackQuality>
- playbackRateChange$: Observable<number>
```
