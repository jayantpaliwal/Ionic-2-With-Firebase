
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { global } from '../global/global';
import { MessagesPage } from '../messages/messages';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})


export class LoginPage {
  email;
  password;
  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController, public af: AngularFire, private navParams: NavParams, public loadingCtrl: LoadingController) {
    var global = global;
  }

  loginFormSubmit() {
    if (this.password.length < 6) {
      let alert = this.alertCtrl.create({
        title: 'Password issue',
        subTitle: 'Your password length minumin 6 digit.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    var self = this;
    let loading = this.loadingCtrl.create(
      {
        content: "Please wait...",
        spinner: 'crescent',
        //   duration: 1000,
        //    dismissOnPageChange:true
      });
    loading.present();
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (user) {

      global.USER_ID = user.uid;
      loading.dismiss();
      self.navCtrl.push(MessagesPage, {}, { animate: true, direction: "forward" });
    }).catch(function (error) {
      loading.dismiss();
      let alert = self.alertCtrl.create({
        title: 'Authentication',
        subTitle: error.message,
        buttons: ['OK']
      });
      alert.present();
    });

  }
  signup() {
    this.navCtrl.push(SignupPage);
  }

}
