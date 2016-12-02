import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { GlobalPage } from '../pages/global/global';
import {ModalpagePage} from '../pages/modalpage/modalpage';
import { MessagesPage } from '../pages/messages/messages';
import { AngularFireModule } from 'angularfire2';
import {} from 'angular2/core';
export const firebaseConfig = {
  apiKey: "AIzaSyCFlBNI7kpEwjtSDj3rfpn5vhna9KvMpt4",
  authDomain: "fir-demo-5849c.firebaseapp.com",
  databaseURL: "https://fir-demo-5849c.firebaseio.com",
  storageBucket: "fir-demo-5849c.appspot.com",
  messagingSenderId: "913189782714"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    GlobalPage,
    MessagesPage,
    ModalpagePage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    GlobalPage,
    MessagesPage,
    SignupPage,
    ModalpagePage,
    HomePage
  ],
  providers: []
})

export class AppModule { }
