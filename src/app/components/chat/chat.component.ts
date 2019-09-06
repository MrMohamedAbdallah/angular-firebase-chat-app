import { Component, OnInit } from "@angular/core";
import { Unsubscribe } from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { AngularFireFunctions } from "@angular/fire/functions";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  chatroomUnsubscribe: Unsubscribe;
  roomID: string = "";
  users: any;
  messages: any;
  msgForm: FormGroup;
  currentUser: any;

  constructor(
    private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private functions: AngularFireFunctions,
    private authService: AuthService
  ) {
    // Get the params
    this.activatedRoute.params.subscribe(params => {
      let id = params.id;
      if (id) {
        const msgRoom = this.functions.httpsCallable("createMessageRoom");

        msgRoom({ userID: id }).subscribe(
          docId => {
            this.messages = this.firestore
              .collection("/messages")
              .doc(docId)
              .collection("messages", ref => ref.orderBy("createdAt", "desc"))
              .valueChanges();
              this.roomID = docId;
          },
          err => {
            console.log("Room Error");
            console.error(err);
          }
        );
      }
    });

    // Get all users
    this.users = this.firestore.collection("/users").valueChanges();
    // Get current user
    this.currentUser = this.authService.getUser();
  }

  ngOnInit() {
    this.msgForm = new FormGroup({
      msg: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required])
    });
  }


  send(){
    let msg = this.msgForm.value.msg;
    let userID = this.currentUser.uid;

    this.firestore.collection(`/messages/${this.roomID}/messages`).add({
      userID: userID,
      content: msg,
      createdAt: Date.now()
    }).catch( err =>{ 
      console.log('Chat error');
      console.error(err);
    });

    this.msgForm.patchValue({
      msg: ''
    });
  }
}