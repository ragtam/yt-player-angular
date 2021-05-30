import { Injectable } from '@angular/core';
import { PlayerOptions } from '../../domain';
import { YouTubePlayer } from '../../yt-player';

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
