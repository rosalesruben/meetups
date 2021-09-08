import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/models/IUser';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header-kiosko',
  templateUrl: './header-kiosko.component.html',
  styleUrls: ['./header-kiosko.component.scss']
})
export class HeaderKioskoComponent implements OnInit {
  modalRef: MDBModalRef;
  modalConfig = {
    backdrop: false,
    ignoreBackdropClick: true,
  };

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
    // this.router.navigate(['/']);
  }

  openLoginModal() {
    this.modalRef = this.modalService.show(
      LoginModalComponent,
      this.modalConfig
    );

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
