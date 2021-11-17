import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GetUserNameComponent } from './get-user-name/get-user-name.component';
import { LobbyComponent } from './lobby/lobby.component';
import { StartButtonComponent } from './start-button/start-button.component';
import { TrumpCardsRoutingModule } from './trump-cards-routing.module';
import { TrumpCardsComponent } from './trump-cards.component';
import { TrumpCardsService } from './trump-cards.service';

@NgModule({
  declarations: [
    TrumpCardsComponent,
    StartButtonComponent,
    LobbyComponent,
    GetUserNameComponent,
  ],
  imports: [CommonModule, TrumpCardsRoutingModule, ReactiveFormsModule],
  providers: [TrumpCardsService],
})
export class TrumpCardsModule {}
