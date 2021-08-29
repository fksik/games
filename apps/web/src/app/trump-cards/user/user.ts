import { v4 } from 'uuid';
import { Card, Cards } from '../game/card';

export class User {
  id = v4();
  cardsInHard: Cards;
  roundPlayed: boolean = false;

  constructor(public name: string) {
    this.cardsInHard = [];
  }

  addCard(card: Card) {
    this.cardsInHard.push(card);
  }

  dropCard(): Card {
    if (this.cardsInHard.length > 0) {
      return this.cardsInHard.shift()!;
    }
    throw new Error('No Cards for the user');
  }
}

export type Users = Array<User>;
