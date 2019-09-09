import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{
  path: 'player',
  loadChildren: () => import('./player/player.module').then(mod => mod.PlayerModule)
}, {
  path: 'home',
  loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
