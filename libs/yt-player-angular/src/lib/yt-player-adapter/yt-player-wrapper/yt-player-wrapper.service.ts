import { Injectable } from '@angular/core';
import { PlayerOptions } from '@libs/domain';
import { YouTubePlayer } from '@libs/yt-player';

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
