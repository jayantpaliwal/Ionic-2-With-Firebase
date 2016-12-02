import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Global page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-global',
  templateUrl: 'global.html'
})
export class GlobalPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello GlobalPage Page');
  }

}
export var global ={
  USER_ID:'',
  DEVICE_ID:'',
};