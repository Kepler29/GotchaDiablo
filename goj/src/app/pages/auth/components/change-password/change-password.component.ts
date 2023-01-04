import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  // @ts-ignore
  registrationForm: UntypedFormGroup;
  // @ts-ignore
  hasError: boolean;
  // @ts-ignore
  hasErrorToken: boolean;
  isLoading$: Observable<boolean>;
  user: UserModel = <UserModel>{
    id: ''
  };
  token:string='';

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.activatedRouter.params.subscribe( params => {
      this.token = params['token'];
      this.findToken(params['token']);
      console.log(params['token']);
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ]),
        ],
        agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  findToken(token: string) {
    this.hasError = false;
    const findTokenSubscr = this.authService
        .findToken(token)
        .pipe(first())
        .subscribe(user => {
          console.log(user);
          if (user) {
            this.user = user;
          } else {
            this.hasErrorToken = true;
          }
        });
    this.unsubscribe.push(findTokenSubscr);
  }

  submit() {
    this.hasError = false;
    const result: {
      [key: string]: string;
    } = {};
    Object.keys(this.f).forEach((key) => {
      result[key] = this.f[key].value;
    });
    if (this.user.id != null) {
      result['id'] = this.user.id;
    }
    result['token'] = this.token;
    const ChangePasswordSubscr = this.authService
      .changePassword(result)
      .pipe(first())
      .subscribe(user => {
        if (user) {
          this.router.navigate(['/']);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(ChangePasswordSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
