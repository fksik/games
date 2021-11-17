import {
  arrayUnion,
  doc,
  DocumentReference,
  getDoc,
  onSnapshot,
  updateDoc,
} from '@firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { isEqual } from 'lodash';
import { v4 } from 'uuid';
import { FirebaseService } from '../../firebase.service';
import { GameErrors, GID_KEY, UID_KEY } from '../constants';
import { IRoom } from '../models/room.model';
import { User, Users } from '../models/user';
import { IUser } from '../models/user.model';
import { Round } from './round';

export class Game {
  static game: Game;
  users: Users = [];
  tableClean: boolean = true;
  round?: Round;

  constructor(
    private fb: FirebaseService,
    private roomRef: DocumentReference<IRoom>
  ) {
    onSnapshot(roomRef, {
      next: (snapshot) => {
        const data = snapshot.data();
        if (data) {
          for (const user of data?.users) {
            if (!this.hasUser(user)) {
              const newUser = new User(user);
              this.addUser(newUser);
            }
            this.compareAndUpdateUser(user);
          }
        }
      },
    });
  }

  static async initiateGame(fb: FirebaseService, name: string): Promise<Game> {
    return await Game.createRoom(fb, name);
  }

  private static async createRoom(fb: FirebaseService, name: string) {
    const user: IUser = { id: v4(), isMaster: true, name };
    const newUser = new User(user);
    const roomRef = await addDoc<IRoom>(fb.collection, { users: [user] });
    const game = new Game(fb, roomRef);
    this.game = game;
    game.addUser(newUser);
    Game.setGame(game.id);
    Game.setUser(newUser.id);
    return game;
  }

  public static async checkIfExistingUser(fb: FirebaseService, roomId: string) {
    const collectionRef = fb.collection;
    const roomRef = doc<IRoom>(collectionRef, roomId);
    const docRef = await getDoc(roomRef);
    if (!docRef.exists()) {
      throw new Error(GameErrors.ROOM_NOT_EXISTS);
    }
    const room = docRef.data() as IRoom;
    const existingUID = Game.checkIfHasUser();
    const existingUser = room.users.find((_) => _.id === existingUID);
    if (!(existingUID && existingUser)) {
      return false;
    }
    return true;
  }

  public static async joinAsExistingUser(fb: FirebaseService, id: string) {
    const collectionRef = fb.collection;
    const roomRef = doc<IRoom>(collectionRef, id);
    const docRef = await getDoc(roomRef);
    if (!docRef.exists()) {
      throw new Error(GameErrors.ROOM_NOT_EXISTS);
    }
    const room = docRef.data() as IRoom;
    this.game = new Game(fb, roomRef);
    for (const user of room.users) {
      const newUser = new User(user);
      this.game.addUser(newUser);
    }
    return this.game;
  }

  public static async joinAsNewUser(
    fb: FirebaseService,
    id: string,
    name: string
  ) {
    const collectionRef = fb.collection;
    const roomRef = doc<IRoom>(collectionRef, id);
    const docRef = await getDoc(roomRef);
    if (!docRef.exists()) {
      throw new Error(GameErrors.ROOM_NOT_EXISTS);
    }
    const room = docRef.data() as IRoom;

    const existingUID = Game.checkIfHasUser();
    const existingUser = room.users.find((_) => _.id === existingUID);
    if (!(existingUID && existingUser)) {
      const user: IUser = { id: v4(), isMaster: false, name };
      Game.setUser(user.id);
      room.users.push(user);
      await updateDoc(roomRef, {
        users: arrayUnion(user),
      });
    } else {
      throw new Error();
    }

    this.game = new Game(fb, roomRef);
    for (const user of room.users) {
      const newUser = new User(user);
      this.game.addUser(newUser);
    }
    return this.game;
  }

  addUser(user: User) {
    if (!this.hasUser(user)) {
      this.users.push(user);
      return;
    }
    throw new Error('User already Exists');
  }

  removeUser(user: User): boolean {
    if (this.hasUser(user)) {
      this.users = this.users.filter((_) => _.user.id !== user.id);
      return true;
    }
    return false;
  }

  getUser(id: string): User {
    const user = this.users.find((_) => _.id === id);
    if (user) {
      return user;
    }
    throw new Error('User Not Found');
  }

  hasUser(user: IUser): boolean {
    return this.users.findIndex((_) => _.user.id === user.id) >= 0;
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

  public static checkIfHasUser(): string | null {
    return localStorage.getItem(UID_KEY);
  }

  public static checkIfHasGame(): string | null {
    return localStorage.getItem(GID_KEY);
  }

  public static setGame(name: string) {
    localStorage.setItem(GID_KEY, name);
  }

  public static setUser(name: string) {
    localStorage.setItem(UID_KEY, name);
  }

  static clearGameStorage() {
    localStorage.removeItem(UID_KEY);
    localStorage.removeItem(GID_KEY);
  }

  private compareAndUpdateUser(user: IUser) {
    const refUser = this.getUser(user.id);
    if (!isEqual(refUser.user, user)) {
      refUser.user = user;
    }
  }
}
