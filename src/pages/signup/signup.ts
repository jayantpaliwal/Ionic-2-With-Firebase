import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import{ LoginPage } from '../login/login';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController,LoadingController } from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {global} from '../global/global';
import {MessagesPage} from '../messages/messages';
import {Device} from 'ionic-native';
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
 email;
 password;
 name;
 confirmpassword;
     constructor(public navCtrl: NavController,public http: Http,public alertCtrl: AlertController,public af: AngularFire,public loadingCtrl: LoadingController) {
       
     }

 form()
{
if(this.password != this.confirmpassword)
{
let alert = this.alertCtrl.create({
      title: 'Password issue',
      subTitle: 'Your password should be same as confirmpassword',
      buttons: ['OK']
    });
    alert.present();
return;
}

   if(this.password.length < 6){
    let alert = this.alertCtrl.create({
      title: 'Password issue',
   subTitle: 'Your password length minumin 6 digit.',
      buttons: ['OK']
    });
    alert.present();
    return;
}
     var self = this;
  localStorage.setItem('password',this.password);
    let loading = this.loadingCtrl.create(
      {
        content: "Please wait...",
        spinner: 'crescent',
        //   duration: 1000,
        //    dismissOnPageChange:true
      });
    loading.present();
    
               firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function (user) {
                var firebaseRef = firebase.database().ref();
                var userdata = firebase.auth().currentUser;
                if (userdata != null) {
                    var usersRef = firebaseRef.child('Users');
                    usersRef.push({
                        uid: userdata.uid,
                        Name:self.name,
                        Email: userdata.email,
                        Password: localStorage.getItem('password'),
                        //DeviceId: Device.device.uuid,
                        DeviceId:localStorage.getItem("device_token")
                    });
                    global.USER_ID = userdata.uid;
                          loading.dismiss();
                  self.navCtrl.push(MessagesPage);

                }


}).catch(function(error) {      
  loading.dismiss();
  let alert = self.alertCtrl.create({
      title: 'Authentication',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
    return;


});
}
}


