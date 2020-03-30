import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YtPlayerComponent } from './yt-player-angular.component';

describe('YtPlayerAngularComponent', () => {
  let component: YtPlayerComponent;
  let fixture: ComponentFixture<YtPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YtPlayerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YtPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
