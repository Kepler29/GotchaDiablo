import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { AuthService, UserType } from "../../../../auth/services/auth.service";
import { UserService } from "../../../../../services/users/user.service";
import { first } from "rxjs/operators";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {UserModel} from "../../../../auth";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
})
export class DeactivateAccountComponent implements OnInit {

  user$!: Observable<UserType>;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private unsubscribe: Subscription[] = [];
  isLoading: boolean | undefined;
  // @ts-ignore
  form: UntypedFormGroup;
  id:string='';
  name:string='';
  phone:string='';
  country:string='';
  hasError: boolean | undefined;

  constructor(private auth: AuthService,
              private fb: UntypedFormBuilder,
              private service: UserService,
              private cdr: ChangeDetectorRef) {
    // @ts-ignore
    this.user$ = this.auth.currentUserSubject.asObservable();
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
    return this.form.controls;
  }

  initForm() {
    this.form = this.fb.group({
      confirm: [
        false
      ]
    });
  }

  saveSettings() {
    Swal.fire({
      title: '¿Esta seguro que decea eliminar la cuenta?',
      text: '¡Esta apunto de eliminar la cuenta!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.isLoading$.next(true);
        this.hasError = false;
        const deactivateSubscr = this.service
          .deactivateAccount(this.id)
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
        this.unsubscribe.push(deactivateSubscr);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se elimino la cuenta',
          'error'
        )
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
