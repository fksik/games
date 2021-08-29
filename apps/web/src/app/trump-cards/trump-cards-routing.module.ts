import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrumpCardsComponent } from './trump-cards.component';

const routes: Routes = [{ path: '', component: TrumpCardsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrumpCardsRoutingModule {}
