import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
@Injectable()
export class AuthService {
  user: User;
  private registerUrl="http://localhost:5000/article/register";
  private loginUrl="http://localhost:5000/article/login";
  private sendUrl="http://localhost:5000/article/sendMail"

  constructor(public  afAuth:  AngularFireAuth,private http:HttpClient,private router:Router) {

   }
   firebaseAuth(){
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
   }
   async gfLogin(){
    await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(function(res){
      console.log(res);
      var user=res.additionalUserInfo['profile']
      // console.log(user)
      return res;
    })
   }
   registerUser(user){
   return this.http.post<any>(this.registerUrl,user);
   }
   loginUser(user){
    return this.http.post<any>(this.loginUrl,user);
    }
    send(user){
      return this.http.post<any>(this.sendUrl,user);
    }
}
