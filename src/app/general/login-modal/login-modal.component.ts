import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  action = new Subject();
  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {}

  login() {
    this.action.next('LOGGED');
  }
}
