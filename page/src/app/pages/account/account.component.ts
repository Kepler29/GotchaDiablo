import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { AuthService, UserType } from "../auth/services/auth.service";
import {  FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  defaultAuth: any = {
    email: '',
    password: '',
  };
  // @ts-ignore
  loginForm: FormGroup;
  user$: Observable<UserType>;
  percentageString: string = '50%';
  percentage: number = 50;
  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private cdr: ChangeDetectorRef) {
    // @ts-ignore
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.user$.subscribe( user => {
      if (user?.country){
        this.percentage = this.percentage + 25;
      }
      if (user?.phone){
        this.percentage = this.percentage + 25;
      }
      this.percentageString = this.percentage + '%';
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
