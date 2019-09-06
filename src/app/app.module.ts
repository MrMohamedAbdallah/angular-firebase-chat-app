import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

// Forms
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ChatComponent } from './components/chat/chat.component';
import { HeaderComponent } from './components/header/header.component';
import { RoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { MessagesComponent } from './components/chat/messages/messages.component';
import { ToggleDirective } from './directives/toggle.directive';
import { WordsDirective } from './directives/words.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    HeaderComponent,
    HomeComponent,
    MessagesComponent,
    ToggleDirective,
    WordsDirective
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    BrowserAnimationsModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
