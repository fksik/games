import { CardStats } from '../game/card-stats';
import { IUser } from './user.model';

export class User {
  cardsInHard: Array<CardStats>;
  roundPlayed: boolean = false;
  isMaster: boolean = false;

  constructor(public user: IUser) {
    this.cardsInHard = [];
  }

  addCard(card: CardStats) {
    this.cardsInHard.push(card);
  }

  dropCard(): CardStats {
    if (this.cardsInHard.length > 0) {
      return this.cardsInHard.shift()!;
    }
    throw new Error('No Cards for the user');
  }

  get name() {
    return this.user.name || this.user.id;
  }
}

export type Users = Array<User>;
