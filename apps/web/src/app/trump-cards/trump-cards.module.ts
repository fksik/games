import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrumpCardsRoutingModule } from './trump-cards-routing.module';
import { TrumpCardsComponent } from './trump-cards.component';
import { TrumpCardsService } from './trump-cards.service';

@NgModule({
  declarations: [TrumpCardsComponent],
  imports: [CommonModule, TrumpCardsRoutingModule],
  providers: [TrumpCardsService],
})
export class TrumpCardsModule {}
