# Yt-Player-Angular

[STILL IN DEVELOPMENT] This package is an Angular wrapper for [yt-player](https://www.npmjs.com/package/yt-player), YouTube Player API.

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

In NgOnInit you can subscribe to streams YtPlayerService exposes:

```
this.ytPlayerService.timeUpdate$.subscribe(videoProgressInMs => {
    console.log(videoProgressInMs);
});
```

And control the player`s behaviour do:

```
this.ytPlayerService.play();
```
