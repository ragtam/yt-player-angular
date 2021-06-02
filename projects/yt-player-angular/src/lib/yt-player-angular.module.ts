import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YtPlayerComponent } from './yt-player-angular.component';

@NgModule({
    imports: [CommonModule],
    declarations: [YtPlayerComponent],
    exports: [YtPlayerComponent],
})
export class YtPlayerAngularModule {}
