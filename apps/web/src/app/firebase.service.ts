import { Injectable } from '@angular/core';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import {
  collection,
  CollectionReference,
  Firestore,
  getFirestore,
} from 'firebase/firestore';
import { environment } from '../environments/environment';
import { IRoom } from './trump-cards/models/room.model';
import { User } from './trump-cards/models/user';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app!: FirebaseApp;
  public store!: Firestore;

  constructor() {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    this.app = initializeApp(environment.firebaseConfig);
    this.store = getFirestore(this.app);
  }

  get isInitialized(): boolean {
    return getApps().length !== 0;
  }

  get collection() {
    return collection(this.store, 'room') as CollectionReference<IRoom>;
  }

  getUserCollection(id: string) {
    return collection(this.store, 'room', id, 'users') as CollectionReference<
      Array<User>
    >;
  }
}
