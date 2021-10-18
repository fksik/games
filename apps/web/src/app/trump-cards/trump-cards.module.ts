import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrumpCardsRoutingModule } from './trump-cards-routing.module';
import { TrumpCardsComponent } from './trump-cards.component';
import { TrumpCardsService } from './trump-cards.service';
import { StartButtonComponent } from './start-button/start-button.component';

@NgModule({
  declarations: [TrumpCardsComponent, StartButtonComponent],
  imports: [CommonModule, TrumpCardsRoutingModule],
  providers: [TrumpCardsService],
})
export class TrumpCardsModule {}
