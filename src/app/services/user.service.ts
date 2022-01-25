import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { Usuario } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private UserCollection: AngularFirestoreCollection<Usuario>;
  private user: Observable<Usuario[]>;
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.UserCollection = db.collection<Usuario>('user');
    this.user = this.UserCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getUsers() {
    return this.user;
   
  }
  getUser(id: string) {
    return this.UserCollection.doc<Usuario>(id).valueChanges(); 

  }
  inserUser(user: Usuario) {
    return this.UserCollection.add(user);
  }
  deleteUser(id: string) {
    return this.UserCollection.doc(id).delete();
  }
  updateUser(user: Usuario) {
    return this.UserCollection.doc(user.id).update(user);
  }
}
