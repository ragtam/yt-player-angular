import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YtPlayerAdapterModule } from './yt-player-adapter/yt-player-adapter.module';
import { YtPlayerComponent } from './yt-player-angular.component';

@NgModule({
  imports: [CommonModule, YtPlayerAdapterModule],
  declarations: [YtPlayerComponent],
  exports: [YtPlayerComponent]
})
export class YtPlayerAngularModule {}
