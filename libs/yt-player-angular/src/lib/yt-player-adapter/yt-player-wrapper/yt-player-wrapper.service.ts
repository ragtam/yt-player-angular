import { Injectable } from '@angular/core';
import { YouTubePlayer } from '@libs/yt-player';
import { PlayerOptions } from '../../player-options';

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
