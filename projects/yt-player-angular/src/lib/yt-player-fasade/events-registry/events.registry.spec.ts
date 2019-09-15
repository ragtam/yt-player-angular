import { EventsRegistry, StateType } from './events-registry';
import { TestBed } from '@angular/core/testing';
import { PlaybackQuality } from '../models/playback-quality';

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

    it('error event should publish error message', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('error');

        expect(spy).toHaveBeenCalledWith({ type: StateType.Error, payload: 'test error' });
    });

    it('unplayable event should publish on "unplayable" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('unplayable');

        expect(spy).toHaveBeenCalledWith({ type: StateType.Unplayable, 'test video id'});
    });

    it('timeupdate event should publish "playback progress" event with sec converted to milliseconds', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('timeupdate');

        expect(spy).toHaveBeenCalledWith({ type: StateType.PlaybackProgress, 1000 });
    });

    it('unstarted should publish on "unstarted" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('unstarted');

        expect(spy).toHaveBeenCalledWith({ type: StateType.Unstarted });
    });

    it('ended should publish on "ended" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('ended');

        expect(spy).toHaveBeenCalledWith({ type: StateType.Ended });
    });

    it('playing should publish on "playing" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('playing');

        expect(spy).toHaveBeenCalledWith({ type: StateType.Started });
    });

    it('paused should publish on "paused" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('paused');

        expect(spy).toHaveBeenCalledWith({ type: StateType.Paused });
    });

    it('buffering should publish on "buffering" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('buffering');

        expect(spy).toHaveBeenCalledWith({ type: StateType.Buffering });
    });

    it('cued should publish on "cued" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('cued');

        expect(spy).toHaveBeenCalledWith({ type: StateType.Cued });
    });

    it('playbackQualityChange should publish on "playbackQualityChange" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('playbackQualityChange');

        expect(spy).toHaveBeenCalledWith({type: StateType.QualityChanged, payload: PlaybackQuality.Medium});
    });

    it('playbackRateChange should publish rate', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('playbackRateChange');

        expect(spy).toHaveBeenCalledWith({ type: StateType.RateChanged, payload: 0.75 });
    });
});
