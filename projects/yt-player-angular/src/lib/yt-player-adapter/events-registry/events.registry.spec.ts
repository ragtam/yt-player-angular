import { TestBed } from '@angular/core/testing';
import { YouTubePlayer } from '../../yt-player';
import { StateChangeType, PlaybackQuality } from '../../domain';
import { EventsRegistry } from './events-registry';
import { YouTubePlayerMock } from './youtube-player-mock';

describe('EventsRegistry', () => {
    let service: EventsRegistry;
    const ytPlayerMock = new YouTubePlayerMock();

    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [EventsRegistry],
        })
    );

    beforeEach(() => {
        service = TestBed.get(EventsRegistry);
        service.register((ytPlayerMock as unknown) as YouTubePlayer);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('error event should publish error message', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('error');

        expect(spy).toHaveBeenCalledWith({
            type: StateChangeType.Error,
            payload: 'test error',
        });
    });

    it('unplayable event should publish on "unplayable" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('unplayable');

        expect(spy).toHaveBeenCalledWith({
            type: StateChangeType.Unplayable,
            payload: 'test video id',
        });
    });

    it('unstarted should publish on "unstarted" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('unstarted');

        expect(spy).toHaveBeenCalledWith({
            type: StateChangeType.Unstarted,
            payload: undefined,
        });
    });

    it('ended should publish on "ended" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('ended');

        expect(spy).toHaveBeenCalledWith({
            type: StateChangeType.Ended,
            payload: undefined,
        });
    });

    it('playing should publish on "playing" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('playing');

        expect(spy).toHaveBeenCalledWith({
            type: StateChangeType.Started,
            payload: undefined,
        });
    });

    it('paused should publish on "paused" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('paused');

        expect(spy).toHaveBeenCalledWith({
            type: StateChangeType.Paused,
            payload: undefined,
        });
    });

    it('buffering should publish on "buffering" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('buffering');

        expect(spy).toHaveBeenCalledWith({
            type: StateChangeType.Buffering,
            payload: undefined,
        });
    });

    it('cued should publish on "cued" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('cued');

        expect(spy).toHaveBeenCalledWith({
            type: StateChangeType.Cued,
            payload: undefined,
        });
    });

    it('playbackQualityChange should publish on "playbackQualityChange" event', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('playbackQualityChange');

        expect(spy).toHaveBeenCalledWith({
            type: StateChangeType.QualityChanged,
            payload: PlaybackQuality.Medium,
        });
    });

    it('playbackRateChange should publish rate', () => {
        const spy = spyOn(service.stateChange$, 'next');

        ytPlayerMock.fireEvent('playbackRateChange');

        expect(spy).toHaveBeenCalledWith({
            type: StateChangeType.RateChanged,
            payload: 0.75,
        });
    });
});
