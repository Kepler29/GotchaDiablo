import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService, UserType } from "../../../../auth/services/auth.service";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { UserService } from "../../../../../services/users/user.service";
import { first } from "rxjs/operators";
import { UserModel } from "../../../../auth";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
})
export class ProfileDetailsComponent implements OnInit {

  user$: Observable<UserType>;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean | undefined;
  private unsubscribe: Subscription[] = [];
  defaultDetails: any = {
    name: '',
    phone: '',
    country: '',
  };
  // @ts-ignore
  detailsForm: FormGroup;
  id:string='';
  name:string='';
  phone:string='';
  country:string='';
  hasError: boolean | undefined;


  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private service: UserService,
              private cdr: ChangeDetectorRef) {
    // @ts-ignore
    this.user$ = this.auth.currentUserSubject.asObservable();
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
    this.user$.subscribe( (user) => {
      // @ts-ignore
      this.id = user.id;
      // @ts-ignore
      this.name = user.name;
      // @ts-ignore
      this.phone = user.phone;
      // @ts-ignore
      this.country = user.country;
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  get formDetails() {
    return this.detailsForm.controls;
  }

  initForm() {
    this.detailsForm = this.fb.group({
      name: [
        this.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      phone: [
        this.phone,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      country: [
        this.country,
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  submit() {
    this.isLoading$.next(true);
    this.hasError = false;
    const result: {
      [key: string]: string;
    } = {};
    Object.keys(this.formDetails).forEach((key) => {
      result[key] = this.formDetails[key].value;
    });
    result['id'] = this.id;
    const updateUser = new UserModel();
    updateUser.setUser(result);
    const detailsSubscr = this.service
      .updateUser(updateUser)
      .pipe(first())
      .subscribe(user => {
        if (user) {
          this.isLoading$.next(false);
          Swal.fire({
            icon: 'success',
            title: '¡Exito!',
            text: 'La información se actualizo con éxito.',
            timer: 2000
          });
          this.cdr.detectChanges();
        } else {
          this.hasError = true;
          this.isLoading$.next(false);
        }
      });
    this.unsubscribe.push(detailsSubscr);
  }

  saveSettings(form: NgForm) {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
