import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrumpCardsRoutingModule } from './trump-cards-routing.module';
import { TrumpCardsComponent } from './trump-cards.component';
import { TrumpCardsService } from './trump-cards.service';
import { StartButtonComponent } from './start-button/start-button.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GetUserNameComponent } from './get-user-name/get-user-name.component';

@NgModule({
  declarations: [TrumpCardsComponent, StartButtonComponent, LobbyComponent, GetUserNameComponent],
  imports: [CommonModule, TrumpCardsRoutingModule],
  providers: [TrumpCardsService],
})
export class TrumpCardsModule {}
