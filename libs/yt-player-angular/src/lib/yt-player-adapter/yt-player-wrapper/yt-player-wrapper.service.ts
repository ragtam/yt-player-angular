import { Injectable } from '@angular/core';
import { YouTubePlayer } from '@lib/yt-player';
import { PlayerOptions } from 'yt-player-angular';

@Injectable({
    providedIn: 'root',
})
export class YtPlayerWrapperService {
    public createInstance(
        htmlId: string,
        playerOptions?: PlayerOptions
    ): YouTubePlayer {
        return new YouTubePlayer(htmlId, playerOptions);
    }
}
