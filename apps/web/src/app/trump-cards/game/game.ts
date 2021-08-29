import { User, Users } from '../user/user';
import { Round } from './round';

export class Game {
  users: Users = [];
  tableClean: boolean = true;
  round?: Round;

  constructor(public master: User) {}

  static createGame(master: User): Game {
    return new Game(master);
  }

  addUser(user: User): boolean {
    if (this.hasUser(user)) {
      this.users.push(user);
      return true;
    }
    return false;
  }

  removeUser(user: User): boolean {
    if (this.hasUser(user)) {
      this.users = this.users.filter((_) => _.id !== user.id);
      return true;
    }
    return false;
  }

  hasUser(user: User): boolean {
    return this.users.findIndex((_) => _.id === user.id) >= 0;
  }

  checkRoundComplete() {
    if (this.round) {
      const complete = this.users.every((_) => _.roundPlayed);
      if (complete) {
        this.initiateRoundComplete();
      }
    }
  }

  initiateRoundComplete() {
    const round = this.round!;
    const cards = round.roundCards;
    round.highUser.cardsInHard = [...round.highUser.cardsInHard, ...cards];
    round.resetUsers();
    this.round = undefined;
  }

  get usersCount() {
    return this.users.length;
  }
}
