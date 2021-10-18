import {
  arrayUnion,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  updateDoc,
} from '@firebase/firestore';
import { environment } from 'apps/web/src/environments/environment';
import { addDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import { FirebaseService } from '../../firebase.service';
import { IRoom } from '../user/room.model';
import { User, Users } from '../user/user';
import { IUser } from '../user/user.model';
import { Round } from './round';

export class Game {
  static game: Game;
  users: Users = [];
  tableClean: boolean = true;
  round?: Round;

  constructor(
    private fb: FirebaseService,
    private roomRef: DocumentReference<IRoom>
  ) {}

  static async initiateGame(fb: FirebaseService, id?: string): Promise<Game> {
    if (!id) {
      return await Game.createRoom(fb);
    } else {
      return await Game.joinRoom(fb, id);
    }
  }

  private static async createRoom(fb: FirebaseService) {
    const roomRef = await addDoc<IRoom>(
      collection(fb.store, 'room') as CollectionReference<IRoom>
    );
    this.game = new Game(fb, roomRef);
    return this.game;
  }

  private static async joinRoom(fb: FirebaseService, id: string) {
    const collectionRef = collection(
      fb.store,
      'rooms'
    ) as CollectionReference<IRoom>;
    const roomRef = doc<IRoom>(collectionRef, id);
    const room = (await getDoc(roomRef)).data() as IRoom;

    const existingUID = localStorage.getItem('uid');
    const existingUser = room.users.find((_) => _.id === existingUID);
    if (!(existingUID && existingUser)) {
      const user: IUser = { id: v4(), isMaster: false };
      const newUser = new User(user);
      room.users.push(user);
      await updateDoc(roomRef, {
        answer: roomWithAnswer.answer,
        users: arrayUnion(newUser),
      });
    }
    this.game = new Game(fb, roomRef);
    return this.game;
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
      this.users = this.users.filter((_) => _.user.id !== user.user.id);
      return true;
    }
    return false;
  }

  hasUser(user: User): boolean {
    return this.users.findIndex((_) => _.user.id === user.user.id) >= 0;
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

  public get id() {
    return this.roomRef.id;
  }
}
