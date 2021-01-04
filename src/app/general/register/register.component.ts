import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_ROLE, IUser } from 'src/app/models/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  @Output() register = new EventEmitter<any>();
  @Output() changeMode = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: '',
      lastname: '',
      username: '',
      password: '',
      role: USER_ROLE.USER,
    });
  }

  ngOnInit(): void {}

  registerUser() {
    const registerFormValue = this.registerForm.value;
    this.authService
      .register(registerFormValue as IUser)
      .subscribe((user: IUser) => {
        this.register.emit("REGISTERED")
        this.authService
          .login(user.username, user.password)
          .subscribe((response) => {
            console.log("LOGEADO")
            console.log(response);
          });
      });
  }
}
