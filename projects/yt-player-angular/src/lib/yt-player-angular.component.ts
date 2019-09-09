import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { YtPlayerService } from './yt-player-fasade/yt-player-angular.service';
import { IdGeneratorService } from './utils/id-generator.service';
import { QueueService } from './utils/queue.service';
import { PlayerOptions } from './player-options';

@Component({
  selector: 'yt-player',
  template: `
    <div #ytHtmlElementHook></div>
  `,
  styles: []
})
export class YtPlayerComponent implements OnChanges, OnInit {

  @Input() public videoId: string;
  @Input() public options: PlayerOptions;

  @ViewChild('ytHtmlElementHook', { static: true }) ytHtmlElementHook: ElementRef;

  constructor(
    private ytPlayerService: YtPlayerService,
    private idGeneratorService: IdGeneratorService,
    private queueService: QueueService
  ) { }

  public ngOnInit() {
    this.setUpElementRefId();
    this.dequeuePlayerInitialization();
    this.loadVideo();
  }

  public ngOnChanges(sc: SimpleChanges): void {
    if (!this.videoIdIsDefined()) {
      return;
    }

    if ( this.elementRefIdIsDefined() ) {
      this.loadVideo();
    } else {
      this.enqueuePlayerInitialization();
    }
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

  private enqueuePlayerInitialization(): void {
    this.queueService.enqueue(() => this.initializePlayer());
  }

  private dequeuePlayerInitialization(): void {
    this.queueService.dequeue();
  }
}
