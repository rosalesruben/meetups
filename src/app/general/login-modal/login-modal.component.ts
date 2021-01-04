import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

export enum MODAL_MODE {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  action = new Subject();
  MODAL_MODE: MODAL_MODE = MODAL_MODE.LOGIN;

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {}

  login() {
    this.action.next('SIGN_IN');
  }

  register(){
    this.action.next('SIGN_ON')
  }

  changeMode(mode: MODAL_MODE) {
    this.MODAL_MODE = mode;
  }
}
