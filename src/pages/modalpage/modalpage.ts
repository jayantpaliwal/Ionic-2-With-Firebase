import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {global} from '../global/global';
import {MessagesPage} from '../messages/messages';
/*
  Generated class for the Modalpage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modalpage',
  templateUrl: 'modalpage.html'
})
export class ModalpagePage {

  constructor(public navCtrl: NavController) {}

 send_message(Message){
     var MessageUserId = global.USER_ID; debugger;
          var MessageText = Message;
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
                this.navCtrl.push(MessagesPage);
 }
 Cancel(){
   this.navCtrl.pop();
 }

}
