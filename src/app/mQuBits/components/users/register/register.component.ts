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

@Component({
  selector: 'register',
  styleUrls: ['./register.component.css'],
  templateUrl: './register.component.html',
  providers: [RegisterService],
})
export class RegisterComponent implements OnInit {
  public genders: String[] = genders;
  public user: User;
  public error: any;

  /**
   * Form Controls
   */
  public registrationForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    private registerService: RegisterService,
    private fb: FormBuilder,
  ) {

  }

  public ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.registrationForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: '',
      mobile: '',
      age: '',
      gender: ''
    });
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
        this.user = data;
      },
      (error) => {
        console.log(error);
        this.error = error;
      }
    );
  }

}
