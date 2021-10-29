import { User, Users } from '../models/user';
import { CardStats } from './card-stats';

type Cards = Array<CardStats>;

export class Round {
  roundCards: Cards = [];
  playedUsers: Users = [];

  constructor(
    public allSegments: Array<string>,
    public segment: string,
    public highCard: CardStats,
    public highUser: User
  ) {
    this.highUser.roundPlayed = true;
  }

  placeCard(card: CardStats, user: User) {
    this.decideHighCard(card, user);
    this.roundCards.push(card);
    user.roundPlayed = true;
  }

  private decideHighCard(card: CardStats, user: User): void {
    const value = card.get(this.segment)!;
    const highCardValue = this.highCard.get(this.segment)!;
    if (value > highCardValue) {
      this.highCard = card;
      this.highUser = user;
    } else if (value === highCardValue) {
      const value = card.get('rank')!;
      const highCardValue = this.highCard.get('rank')!;
      if (value > highCardValue) {
        this.highCard = card;
        this.highUser = user;
      }
    }
  }

  resetUsers() {
    this.playedUsers.forEach((_) => (_.roundPlayed = false));
  }

  get roundCardsCount() {
    return this.roundCards.length;
  }
}
