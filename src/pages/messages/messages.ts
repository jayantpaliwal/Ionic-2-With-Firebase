import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { global } from '../global/global';
import {LoginPage} from '../login/login';
import {ModalpagePage} from '../modalpage/modalpage';
import { ModalController } from 'ionic-angular';
/*
  Generated class for the Messages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  Message = [];
  i = 0;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController,public modalCtrl: ModalController) {
    var self = this;
    
    let loading = this.loadingCtrl.create(
      {
        content: "Please wait...",
        spinner: 'crescent',
      });
    loading.present();
    var firebaseRef = firebase.database().ref();
    var MessageRef = firebaseRef.child("Message");

    var newItems = false;
    var MessageList = MessageRef.orderByChild('uid').equalTo(global.USER_ID);
    MessageList.on('child_added', function (messages) {
      if (newItems) {

        let toast = self.toastCtrl.create({
          message: messages.val().Message,
          duration: 2000,
          position: 'middle'
        });
        toast.present(toast);
      }
      self.Message.push({
        'Message': messages.val().Message,
        'Date':messages.val().Date,
        'Key': messages.key
      });
    });
    MessageList.once('value', function (id) {
   newItems = true;
  loading.dismiss();
    });
  }

  popup() {
   let modal = this.modalCtrl.create(ModalpagePage);
   modal.present();
    /*let alert = this.alertCtrl.create({
      title: 'Enter your Message',
      inputs: [
        {
          
          name: 'Message',
          placeholder: 'Message'
        },
      ],
      buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send',
        handler: data => {
          var MessageUserId = global.USER_ID; debugger;
          var MessageText = data.Message;
          var firebaseRef = firebase.database().ref();
          var messageRef = firebaseRef.child("Message");
          var currentdate = new Date();
                var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear();
                messageRef.push({
                    uid: MessageUserId,
                    Message: MessageText,
                    Date: datetime
                });
        }
      }]
    });
    alert.present();*/
  }
  delete(record) {
    var self = this;
    var firebaseRef = firebase.database().ref();
    var messageRef = firebaseRef.child("Message");
    messageRef.child(record.Key).remove().then(function (user) {
      for (self.i = 0; self.i < self.Message.length; self.i++) {
        if (self.Message[self.i].Key == record.Key) {
           self.Message.splice(self.i, 1);
        }
      }
    }).catch(function (error) {
    });

  }
  ionViewDidLoad() {
    console.log('Hello MessagesPage Page');
  }
  logout(){
    firebase.auth().signOut();
    this.navCtrl.setRoot(LoginPage);
     
  }

}
