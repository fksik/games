import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'trump-cards', pathMatch: 'full' },
  {
    path: 'trump-cards',
    loadChildren: () =>
      import('./trump-cards/trump-cards.module').then(
        (m) => m.TrumpCardsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
