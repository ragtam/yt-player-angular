import { NgModule } from '@angular/core';
import { YtPlayerComponent } from './yt-player-angular.component';
import { YtPlayerFasadeModule } from './yt-player-fasade/yt-player-fasade.module';

@NgModule({
  imports: [YtPlayerFasadeModule],
  declarations: [YtPlayerComponent],
  exports: [YtPlayerComponent]
})
export class YtPlayerAngularModule { }
