/**
 * @author Mustafa Qamar-ud-Din <m.qamaruddin@mQuBits.com>
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { genders } from './../../../models/user.model';
import { LoginService } from './../../../services/auth/login.service';
import { User } from './../../../models/user.model';
import { Config } from './../../../environments/config';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
  providers: [LoginService],
})
export class LoginComponent implements OnInit {

  public formErrors = {
    email: '',
    password: ''
  };

  /**
   * Form Controls
   */
  public loginForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
  ) {

  }

  public ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.loginForm.valueChanges.subscribe((data) => (this.onValueChanged(data)));

    this.onValueChanged();
  }

  public onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    for (let key in this.formErrors) {
      if (!this.formErrors[key]) {
        continue;
      }
      this.formErrors[key] = '';
    }
  }

  public prepareUser(formValue: any): User {
    let ret: User = new User(
      0,
      formValue.email,
      '',
      formValue.password,
      Config.get('PremiseID'),
      0,
      '',
      ''
    );
    return ret;
  }

  public onSubmit() {
    let params: User = this.prepareUser(this.loginForm.value);
    this.loginService.login(params).subscribe(
      (data) => {
        localStorage.setItem('currentUser', (String)(data.id));
        this.router.navigate(['users/profile']);
      },
      (errors) => {
        this.formErrors = errors;
      }
    );
  }

}
