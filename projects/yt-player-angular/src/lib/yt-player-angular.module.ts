import { NgModule } from '@angular/core';
import { YtPlayerComponent } from './yt-player-angular.component';
import { YtPlayerAdapterModule } from './yt-player-adapter/yt-player-adapter.module';

@NgModule({
  imports: [YtPlayerAdapterModule],
  declarations: [YtPlayerComponent],
  exports: [YtPlayerComponent]
})
export class YtPlayerAngularModule { }
