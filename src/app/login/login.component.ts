import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import {AuthService} from '../Services/auth.service'
import { AngularFireAuth } from  "@angular/fire/auth";
import { auth } from  'firebase/app';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private title:String;
  private date:String;
  private content:String;
  private author:String;
   articleList:Array<any>=[];
   public phoneNumber:any
  //  your firebase config from web app
   public config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""

  };
  WindowRef:any;
  verificationCode;
  confirmation:firebase.auth.ConfirmationResult;
   public recaptchaVerifier;
  constructor(private router:Router,public  afAuth:  AngularFireAuth,
  private HTTP:HttpClient,
   public auth:AuthService) {
      firebase.initializeApp(this.config);
    }

  ngOnInit(){

  }
  async gLogin(){
await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(function(res){
  console.log(res);
  var user=res.additionalUserInfo['profile']
  console.log(user)
})
  }
  async fb(){
    await this.afAuth.signInWithPopup(new auth.FacebookAuthProvider()).then(function(res){
      console.log(res);
    })
  }
  async phone(){

    const appVerifier = this.recaptchaVerifier;
    this.phoneNumber="+0000000000"
// your phone number
    await this.afAuth.signInWithPhoneNumber(this.phoneNumber,appVerifier).then(function(res){
    //  this.confirmation=res
      console.log(res)
    }) .catch(function (error) {
      console.error("SMS not sent", error);
    });
  }
}
