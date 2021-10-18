import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from 'apps/web/src/environments/environment';
import { addDoc, collection, CollectionReference } from 'firebase/firestore';
import { v4 } from 'uuid';
import { FirebaseService } from '../../firebase.service';
import { Game } from '../game/game';
import { IRoom } from '../user/room.model';
import { User } from '../user/user';
import { IUser } from '../user/user.model';

@Component({
  selector: 'games-start-button',
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.scss'],
})
export class StartButtonComponent {
  @Output()
  public initialize!: EventEmitter<void>;
  constructor(private fb: FirebaseService) {}

  ngOnInit(): void {}

  async createGame() {
    if (this.fb.isInitialized) {
      this.initialize.emit();
    }
  }

  public get isInitialized(): boolean {
    return this.fb.isInitialized;
  }
}
