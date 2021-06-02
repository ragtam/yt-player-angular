import {
    Component,
    OnInit,
    Input,
    OnChanges,
    ViewChild,
    ElementRef,
    OnDestroy,
    Output,
    EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerOptions, StateChange } from './domain';
import { IdGeneratorService, QueueService } from './utils';
import { YtPlayerService } from './yt-player-adapter/yt-player.service';

@Component({
    selector: 'yt-player',
    template: ` <div #ytHtmlElementHook></div> `,
})
export class YtPlayerComponent implements OnChanges, OnInit, OnDestroy {
    @Input() public videoId: string;
    @Input() public options: PlayerOptions;

    @Output() public stateChange = new EventEmitter<StateChange>();

    @ViewChild('ytHtmlElementHook', { static: true })
    private ytHtmlElementHook: ElementRef;

    private stateChangeSubscription: Subscription;
    private readonly errorMessage =
        'Player not initialized. Did you specify [videoId] input property of yt-player-component?';

    constructor(
        private ytPlayerService: YtPlayerService,
        private idGeneratorService: IdGeneratorService,
        private queueService: QueueService
    ) {}

    public ngOnInit() {
        this.setUpElementRefId();
        this.dequeuePlayerInitialization();
        this.loadVideo();
        this.subscribeToStateChanges();
    }

    public ngOnChanges(): void {
        if (!this.videoIdIsDefined()) {
            return;
        } else if (this.elementRefIdIsDefined()) {
            this.reloadVideo();
        } else {
            this.enqueuePlayerInitialization();
        }
    }

    public ngOnDestroy(): void {
        this.ytPlayerService.destroy();
        this.stateChangeSubscription.unsubscribe();
    }

    private setUpElementRefId(): void {
        const id = this.idGeneratorService.generate();
        this.ytHtmlElementHook.nativeElement.setAttribute('id', id);
    }

    private videoIdIsDefined(): boolean {
        return !!this.videoId;
    }

    private elementRefIdIsDefined(): boolean {
        return (
            this.ytHtmlElementHook.nativeElement &&
            this.ytHtmlElementHook.nativeElement.getAttribute('id')
        );
    }

    private initializePlayer(): void {
        const id = this.ytHtmlElementHook.nativeElement.getAttribute('id');
        this.ytPlayerService.init(`#${id}`, this.options);
    }

    private loadVideo(): void {
        try {
            this.ytPlayerService.load(this.videoId);
        } catch (err) {
            console.error(this.errorMessage);
        }
    }

    private reloadVideo(): void {
        this.ytPlayerService.destroy();
        this.initializePlayer();
        this.loadVideo();
    }

    private enqueuePlayerInitialization(): void {
        this.queueService.enqueue(() => this.initializePlayer());
    }

    private dequeuePlayerInitialization(): void {
        this.queueService.dequeue();
    }

    private subscribeToStateChanges(): void {
        this.stateChangeSubscription = this.ytPlayerService.stateChange$.subscribe(
            (stateChange) => this.stateChange.emit(stateChange)
        );
    }
}
