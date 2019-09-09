import { EventsRegistry } from './events-registry';
import { TestBed } from '@angular/core/testing';
import { PlaybackQuality } from '../playback-quality';

describe('EventsRegistry', () => {
    let service: EventsRegistry;
    const ytPlayerMock = (() => {
        const m = new Map();
        return {
            on: (eventName: string, eventHandler: (args?: any) => void) => {
                m.set(eventName, eventHandler);
            },
            fireEvent: (eventName: string) => {
                const handler = m.get(eventName);
                switch ( eventName ) {
                    case 'error':
                        handler('test error');
                        break;
                    case 'unplayable':
                        handler('test video id');
                        break;
                    case 'timeupdate':
                        handler(1);
                        break;
                    case 'playbackQualityChange':
                        handler(PlaybackQuality.Medium);
                        break;
                    case 'playbackRateChange':
                        handler(0.75);
                        break;
                    default:
                        handler();
                }
            }
        };
    })();

    beforeEach(() => TestBed.configureTestingModule({
        providers: [ EventsRegistry ]
    }));

    beforeEach(() => {
        service = TestBed.get(EventsRegistry);
        service.register(ytPlayerMock);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('error$ should publish on "error" event', () => {
        const spy = spyOn(service.error$, 'next');

        ytPlayerMock.fireEvent('error');

        expect(spy).toHaveBeenCalled();
    });

    it('error$ should publish error message', () => {
        const spy = spyOn(service.error$, 'next');

        ytPlayerMock.fireEvent('error');

        expect(spy).toHaveBeenCalledWith('test error');
    });

    it('unplayable$ should publish on "unplayable" event', () => {
        const spy = spyOn(service.unplayable$, 'next');

        ytPlayerMock.fireEvent('unplayable');

        expect(spy).toHaveBeenCalled();
    });

    it('unplayable$ should publish video id', () => {
        const spy = spyOn(service.unplayable$, 'next');

        ytPlayerMock.fireEvent('unplayable');

        expect(spy).toHaveBeenCalledWith('test video id');
    });

    it('timeupdate$ should publish on "timeupdate" event', () => {
        const spy = spyOn(service.timeUpdate$, 'next');

        ytPlayerMock.fireEvent('timeupdate');

        expect(spy).toHaveBeenCalled();
    });

    it('timeupdate$ should publish current time converting seconds to milliseconds', () => {
        const spy = spyOn(service.timeUpdate$, 'next');

        ytPlayerMock.fireEvent('timeupdate');

        expect(spy).toHaveBeenCalledWith(1000);
    });

    it('unstarted$ should publish on "unstarted" event', () => {
        const spy = spyOn(service.unstarted$, 'next');

        ytPlayerMock.fireEvent('unstarted');

        expect(spy).toHaveBeenCalled();
    });

    it('ended$ should publish on "ended" event', () => {
        const spy = spyOn(service.ended$, 'next');

        ytPlayerMock.fireEvent('ended');

        expect(spy).toHaveBeenCalled();
    });

    it('playing$ should publish on "playing" event', () => {
        const spy = spyOn(service.playing$, 'next');

        ytPlayerMock.fireEvent('playing');

        expect(spy).toHaveBeenCalled();
    });

    it('paused$ should publish on "paused" event', () => {
        const spy = spyOn(service.paused$, 'next');

        ytPlayerMock.fireEvent('paused');

        expect(spy).toHaveBeenCalled();
    });

    it('buffering$ should publish on "buffering" event', () => {
        const spy = spyOn(service.buffering$, 'next');

        ytPlayerMock.fireEvent('buffering');

        expect(spy).toHaveBeenCalled();
    });

    it('cued$ should publish on "cued" event', () => {
        const spy = spyOn(service.cued$, 'next');

        ytPlayerMock.fireEvent('cued');

        expect(spy).toHaveBeenCalled();
    });

    it('playbackQualityChange$ should publish on "playbackQualityChange" event', () => {
        const spy = spyOn(service.playbackQualityChange$, 'next');

        ytPlayerMock.fireEvent('playbackQualityChange');

        expect(spy).toHaveBeenCalled();
    });

    it('playbackQualityChange$ should publish on "playbackQualityChange" event', () => {
        const spy = spyOn(service.playbackQualityChange$, 'next');

        ytPlayerMock.fireEvent('playbackQualityChange');

        expect(spy).toHaveBeenCalledWith(PlaybackQuality.Medium);
    });

    it('playbackRateChange$ should publish rate', () => {
        const spy = spyOn(service.playbackRateChange$, 'next');

        ytPlayerMock.fireEvent('playbackRateChange');

        expect(spy).toHaveBeenCalledWith(0.75);
    });
});
