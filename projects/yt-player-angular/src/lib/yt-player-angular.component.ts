import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { YtPlayerService } from './yt-player-fasade/yt-player-angular.service';
import { IdGeneratorService } from './utils/id-generator.service';
import { QueueService } from './utils/queue.service';
import { PlayerOptions } from './player-options';
import { StateChange } from './yt-player-fasade/models/state-change';
import { Subscription } from 'rxjs';

@Component({
  selector: 'yt-player',
  template: `
    <div #ytHtmlElementHook></div>
  `
})
export class YtPlayerComponent implements OnChanges, OnInit, OnDestroy {

  @Input() public videoId: string;
  @Input() public options: PlayerOptions;

  @Output() public stateChange = new EventEmitter<StateChange>();

  @ViewChild('ytHtmlElementHook', { static: true }) private ytHtmlElementHook: ElementRef;

  private stateChangeSubscription: Subscription;

  constructor(
    private ytPlayerService: YtPlayerService,
    private idGeneratorService: IdGeneratorService,
    private queueService: QueueService
  ) { }

  public ngOnInit() {
    this.setUpElementRefId();
    this.dequeuePlayerInitialization();
    this.loadVideo();
    this.subscribeToStateChange();
  }

  public ngOnChanges(): void {
    if (!this.videoIdIsDefined()) {
      return;
    } else if ( this.elementRefIdIsDefined() ) {
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
    return this.ytHtmlElementHook.nativeElement && this.ytHtmlElementHook.nativeElement.getAttribute('id');
  }

  private initializePlayer(): void {
    const id = this.ytHtmlElementHook.nativeElement.getAttribute('id');
    this.ytPlayerService.init(`#${id}`, this.options);
  }

  private loadVideo(): void {
    this.ytPlayerService.load(this.videoId);
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

  private subscribeToStateChange(): void {
    this.stateChangeSubscription = this.ytPlayerService.stateChange$
    .subscribe( stateChange => this.stateChange.emit(stateChange) );
  }
}
