import YouTubePlayer from "../../yt-player/yt-player";
import { Subject } from "rxjs";
import { Injectable, NgZone } from "@angular/core";
import { YtPlayerAdapterModule } from "../yt-player-adapter.module";
import { StateChange } from "../models/state-change";
import { StateChangeType } from "../models/state-change-type";

@Injectable({ providedIn: YtPlayerAdapterModule })
export class EventsRegistry {
  public stateChange$ = new Subject<StateChange>();

  constructor(private ngZone: NgZone) {}

  private eventHandlers = new Map<string, (args?: any) => void>([
    ["error", err => this.broadcastStatusChange(StateChangeType.Error, err)],
    [
      "unplayable",
      videoId => this.broadcastStatusChange(StateChangeType.Unplayable, videoId)
    ],
    ["unstarted", () => this.broadcastStatusChange(StateChangeType.Unstarted)],
    ["ended", () => this.broadcastStatusChange(StateChangeType.Ended)],
    ["playing", () => this.broadcastStatusChange(StateChangeType.Started)],
    ["paused", () => this.broadcastStatusChange(StateChangeType.Paused)],
    ["buffering", () => this.broadcastStatusChange(StateChangeType.Buffering)],
    ["cued", () => this.broadcastStatusChange(StateChangeType.Cued)],
    [
      "playbackQualityChange",
      quality =>
        this.broadcastStatusChange(StateChangeType.QualityChanged, quality)
    ],
    [
      "playbackRateChange",
      rate => this.broadcastStatusChange(StateChangeType.RateChanged, rate)
    ],
    [
      "timeupdate",
      time => this.broadcastStatusChange(StateChangeType.PlaybackProgress, time)
    ]
  ]);

  public register(player: YouTubePlayer) {
    this.eventHandlers.forEach((eventHandler, eventName) => {
      player.on(eventName, eventHandler);
    });
  }

  private broadcastStatusChange(type: StateChangeType, payload?: any): void {
    this.ngZone.run(() => this.stateChange$.next({ type, payload }));
  }
}
