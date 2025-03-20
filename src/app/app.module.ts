import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(
      {
        projectId: "premiermai2025b",
        appId: "1:41369266826:web:e7878cd3717a3dbe581b73",
        storageBucket: "premiermai2025b.firebasestorage.app",
        apiKey: "AIzaSyB5fHwEy6YbsyW_Gy9e-JwEgI63v6g6qfc",
        authDomain: "premiermai2025b.firebaseapp.com",
        messagingSenderId: "41369266826"
      })),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
