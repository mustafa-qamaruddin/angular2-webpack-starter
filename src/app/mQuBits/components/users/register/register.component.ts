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
import { RegisterService } from './../../../services/auth/register.service';
import { User } from './../../../models/user.model';
import { Config } from './../../../environments/config';
import { Router }  from '@angular/router';

@Component({
  selector: 'register',
  styleUrls: ['./register.component.css'],
  templateUrl: './register.component.html',
  providers: [RegisterService],
})
export class RegisterComponent implements OnInit {
  public genders: String[] = genders;
  public formErrors = {
    email: '',
    password: '',
    name: '',
    mobile: '',
    age: '',
    gender: ''
  };

  /**
   * Form Controls
   */
  public registrationForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
  ) {

  }

  public ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.registrationForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      name: ['', Validators.compose([Validators.minLength(6)])],
      mobile: ['', Validators.compose([Validators.minLength(7), Validators.maxLength(14), Validators.required])],
      age: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])]
    });

    this.registrationForm.valueChanges.subscribe((data) => (this.onValueChanged(data)));

    this.onValueChanged();
  }

  public onValueChanged(data?: any) {
    if (!this.registrationForm) {
      return;
    }
    for(let key in this.formErrors){
      this.formErrors[key] = '';
    }
  }

  public prepareUser(formValue: any): User {
    let ret: User = new User(
      0,
      formValue.email,
      formValue.mobile,
      formValue.password,
      Config.get('PremiseID'),
      formValue.age,
      formValue.gender,
      formValue.name,
    );
    return ret;
  }

  public onSubmit() {
    let params: User = this.prepareUser(this.registrationForm.value);
    this.registerService.register(params).subscribe(
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
