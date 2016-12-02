import { Component ,ViewChild} from '@angular/core';
import { Platform, Nav,AlertController } from 'ionic-angular';
import { StatusBar,  Push,Splashscreen } from 'ionic-native';

//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  constructor(platform: Platform,public alertCtrl: AlertController) {
    platform.ready().then(() => { 
      this.rootPage = LoginPage;
      debugger;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
       let push = Push.init({
        android: {
          senderID: "913189782714",
          forceShow: "true"
        },
        ios: {
          alert: "true",
          badge: false,
          sound: "true",
        },
        windows: {}
         });
         push.on('registration', (data) => {
       
          localStorage.setItem("device_token",data.registrationId);
        //TODO - send device token to server
      });

      push.on('notification', (data) => {
        console.log('message', data.message);
        let self = this;
        //if user using app and push notification comes
        if (data.additionalData.foreground) {
          // if application open, show popup
          let confirmAlert = this.alertCtrl.create({
            title: 'New Notification',
            message: data.message,
            buttons: [{
              text: 'Ignore',
              role: 'cancel'
            }, {
              text: 'View',
              handler: () => {
                //TODO: Your logic here
                self.nav.push(LoginPage, {message: data.message});
              }
            }]
          });
          confirmAlert.present();
        } else {
          //if user NOT using app and push notification comes
          //TODO: Your logic on click of push notification directly
          self.nav.push(LoginPage, {message: data.message});
          console.log("Push notification clicked");
        }
      });
      push.on('error', (e) => {
        console.log(e.message);
      });
    });
  }
}