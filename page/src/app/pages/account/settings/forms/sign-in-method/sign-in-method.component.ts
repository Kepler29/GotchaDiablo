import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService, UserType } from "../../../../auth/services/auth.service";
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UserModel } from "../../../../auth";
import { first } from "rxjs/operators";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../../../services/users/user.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in-method',
  templateUrl: './sign-in-method.component.html',
  providers: [MessageService]
})
export class SignInMethodComponent implements OnInit, OnDestroy {

  user$!: Observable<UserType>;
  showChangeEmailForm: boolean = false;
  showChangePasswordForm: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean | undefined;
  hasError: boolean | undefined;
  defaultEmail: any = {
    email: '',
  };
  defaultPassword: any = {
    currentPassword: '',
    password: '',
    cPassword: '',
  };
  // @ts-ignore
  emailForm: UntypedFormGroup;
  // @ts-ignore
  passwordForm: UntypedFormGroup;
  id:string='';
  email:string='';
  private unsubscribe: Subscription[] = [];

  constructor(private auth: AuthService,
              private fb: UntypedFormBuilder,
              private fbp: UntypedFormBuilder,
              private service: UserService,
              private messageService: MessageService,
              private cdr: ChangeDetectorRef) {
    // @ts-ignore
    this.user$ = this.auth.currentUserSubject.asObservable();
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.user$.subscribe( (user) => {
      // @ts-ignore
      this.id = user.id;
      // @ts-ignore
      this.email = user.email;
    });
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.initForm();
    this.initFormP();
    // @ts-ignore
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  toggleEmailForm(show: boolean) {
    this.showChangeEmailForm = show;
  }

  get formEmail() {
    return this.emailForm.controls;
  }

  get formPassword() {
    return this.passwordForm.controls;
  }

  initForm() {
    this.emailForm = this.fb.group({
      email: [
        this.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
    });
  }

  initFormP(){
    this.passwordForm = this.fbp.group({
        currentPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ]),
        ],
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
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  saveEmail() {
    this.isLoading$.next(true);
    this.hasError = false;
    const result: {
      [key: string]: string;
    } = {};
    Object.keys(this.formEmail).forEach((key) => {
      result[key] = this.formEmail[key].value;
    });
    result['id'] = this.id;
    const updateUser = new UserModel();
    updateUser.setUser(result);
    const emailSubscr = this.service
      .changeEmail(updateUser)
      .pipe(first())
      .subscribe(user => {
        if (user) {
          this.isLoading$.next(false);
          this.showSuccess();
          this.cdr.detectChanges();
        } else {
          this.isLoading$.next(false);
          this.hasError = true;
        }
      }, error => {
        console.log(error);
        this.isLoading$.next(false);
        this.showError(error.error.errors[0].msg);
        this.cdr.detectChanges();
      });
    this.unsubscribe.push(emailSubscr);
  }

  togglePasswordForm(show: boolean) {
    this.showChangePasswordForm = show;
  }

  savePassword() {
    this.isLoading$.next(true);
    this.hasError = false;
    const result: {
      [key: string]: string;
    } = {};
    Object.keys(this.formPassword).forEach((key) => {
      result[key] = this.formPassword[key].value;
    });
    result['id'] = this.id;
    const updateUser = new UserModel();
    updateUser.setUser(result);
    const passwordSubscr = this.service
      .changePassword(updateUser)
      .pipe(first())
      .subscribe(user => {
        if (user) {
          this.isLoading$.next(false);
          this.showSuccess();
          this.cdr.detectChanges();
        } else {
          this.isLoading$.next(false);
          this.hasError = true;
        }
      }, error => {
        this.isLoading$.next(false);
        if (error.error.errors) {
          this.showError(error.error.errors[0].msg);
        } else {
          this.showError(error.error.msg);
        }
        this.cdr.detectChanges();
      });
    this.unsubscribe.push(passwordSubscr);
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'La información se actualizo con éxito.'});
  }

  showError(detail:string) {
    this.messageService.add({severity:'error', summary: 'Error', detail});
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
