import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser, USER_ROLE } from 'src/app/models/IUser';
import { Router } from '@angular/router';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  modalRef: MDBModalRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: MDBModalService
  ) {}

  ngOnInit(): void {}

  redirectToHome() {
    console.log('Redirect home');
  }

  get isLogged(): boolean {
    return this.authService.isLogged;
  }

  get currentUser(): IUser {
    return this.authService.user;
  }

  get userPermissions(): string[] {
    return this.authService.userPermissions;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openLoginModal() {
    this.modalRef = this.modalService.show(LoginModalComponent);

    this.modalRef.content.action.subscribe((result: any) => {
      if (result === 'SIGN_IN' || result === 'SIGN_ON') {
        this.modalRef.hide();
      }
    });
  }

  hasPermission(permission: string): boolean {
    return this.userPermissions.includes(permission);
  }
}
