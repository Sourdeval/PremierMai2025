import { Component, inject, Input, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../model/message.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'pre-mai25-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  _chatCollection = "Musique";

  @Input() set chatCollection(value: string){
    this._chatCollection = value;
    this.refreshMessageCollection();
  }

  get chatCollection(): string {
    return this._chatCollection;
  }

  firestore: Firestore = inject(Firestore);
  items$?: Observable<Message[]>;

  authorMessageToPost = new FormControl('');
  messageToPost = new FormControl('');

  constructor() {
    this.refreshMessageCollection();
  }

  refreshMessageCollection(){
    const aCollection = collection(this.firestore, this.chatCollection)
    this.items$ = collectionData(aCollection) as Observable<Message[]>;
  }

  sendMessage() {
    const aCollection = collection(this.firestore, this.chatCollection)
    addDoc(aCollection,
      <Message> { author: this.authorMessageToPost.value, message: this.messageToPost.value }).then(() => {
        this.authorMessageToPost.setValue('');
        this.messageToPost.setValue('');
      })
  }
}
