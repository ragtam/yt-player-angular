[![Build Status](https://travis-ci.org/ragtam/yt-player-angular.svg?branch=master)](https://travis-ci.org/ragtam/yt-player-angular)

# Yt-Player-Angular

This package is an Angular wrapper for [yt-player](https://www.npmjs.com/package/yt-player), YouTube Player API.

Lets you embed Youtube video and control it ( play/pause/seek and many more ) programatically.

Latest version supports **Angular 10**. :metal:

Ver. 4.x.x => Angular 9; Ver. 3.x.x => Angular 8.

---

**yt-player** package is exported as a **commonJS** module. Due to that fact Angular 10 is going to throw a warning at build time about optimization bailouts. You can switch that off by adding 'allowedCommonJsDependencies' to build options located in angular.json file in your project.

```
"options": {
            "allowedCommonJsDependencies": ["yt-player"],
            ...
          }
```

You can read more about that [here](https://angular.io/guide/build#configuring-commonjs-dependencies)

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

# YtPlayerAngularApp

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Powerful, Extensible Dev Tools**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@yt-player-angular-app/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
