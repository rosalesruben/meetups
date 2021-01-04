import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() login = new EventEmitter<any>();
  @Output() changeMode = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  authenticate() {
    const authFormValue = this.loginForm.value;
    this.authService
      .login(authFormValue.username, authFormValue.password)
      .subscribe((response) => {
        this.login.emit("LOGGED")
      });
  }
}
