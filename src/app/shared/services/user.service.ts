import { Injectable } from '@angular/core';
import {User} from "../models/User";
import { AngularFirestore } from '@angular/fire/compat/firestore';
//import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
//import 'firebase/compat/auth';
//import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName='Users';

  constructor(private angularFirestone: AngularFirestore){}

  //CRUD (Create, delete, update, delete)

  create(user: User){
    return this.angularFirestone.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {
    return this.angularFirestone.collection<User>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.angularFirestone.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  update(user: User) {
   // const currentUser = firebase.auth().currentUser;
   // if (currentUser) {
    //  return currentUser.updateEmail(user.email)
     //   .then(() => this.angularFirestone.collection<User>(this.collectionName).doc(user.id).update(user));
   // }
   // return ;
    return this.angularFirestone.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    return this.angularFirestone.collection<User>(this.collectionName).doc(id).delete();
  }
}
