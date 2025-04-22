import { Component, inject, Input } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Message } from '../model/message.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pre-mai25-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  _chatCollection = "Musique";
  colorList = ["aqua","coral","cornflowerblue","crimson","darkorange","darkorchid","darksalmon","darkseagreen","deeppink","deepskyblue","forestgreen","fuchsia","gold",
    "greenyellow","hotpink","lightgreen","lightseagreen","lime","orange","orangered","orchid","palegoldenrod","paleturquoise","plum","purple","rebeccapurple","red","royalblue","saddlebrown",
    "salmon","seagreen","skyblue","slateblue","springgreen","steelblue","tomato","turquoise","violet","yellow","yellowgreen"];

  @Input() set chatCollection(value: string){
    this._chatCollection = value;
    this.refreshMessageCollection();
  }

  get chatCollection(): string {
    return this._chatCollection;
  }

  firestore: Firestore = inject(Firestore);
  items$?: Observable<Message[]>;

  authorMessageToPost = new FormControl('', Validators.required);
  messageToPost = new FormControl('', Validators.required);

  constructor() {
    this.refreshMessageCollection();
  }

  refreshMessageCollection(){
    const aCollection = collection(this.firestore, this.chatCollection);
    this.items$ = (collectionData(aCollection) as Observable<Message[]>)
      .pipe(map(messages => messages.sort((m1, m2) => m1.timestamp - m2.timestamp)));
  }

  sendMessage() {
    const aCollection = collection(this.firestore, this.chatCollection)
    addDoc(aCollection,
      <Message>
      { 
        author: this.authorMessageToPost.value,
        message: this.messageToPost.value,
        timestamp: new Date().getTime()
      }).then(() => {
        this.authorMessageToPost.setValue('');
        this.messageToPost.setValue('');
      })
  }

  getAuthorColor(authorName: string): string {
    let sumChar = 19;
    for (let i = 0; i<authorName.length; i++) {
      sumChar += authorName.charCodeAt(i);
    }
    sumChar %= this.colorList.length;
    return this.colorList.at(sumChar) ?? 'red';
  }
}
