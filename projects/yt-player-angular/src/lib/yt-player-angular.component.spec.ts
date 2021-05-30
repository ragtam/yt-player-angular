import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsRegistry } from './yt-player-adapter/events-registry/events-registry';
import { YtPlayerService } from './yt-player-adapter/yt-player.service';

import { YtPlayerComponent } from './yt-player-angular.component';

describe('YtPlayerAngularComponent', () => {
    let component: YtPlayerComponent;
    let fixture: ComponentFixture<YtPlayerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YtPlayerComponent],
            providers: [YtPlayerService, EventsRegistry],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YtPlayerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
