import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { AuthService, UserType } from "../../../../auth/services/auth.service";
import { UserService } from "../../../../../services/users/user.service";
import { first } from "rxjs/operators";
import {UserModel} from "../../../../auth";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
  providers: [MessageService]
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
              private messageService: MessageService,
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
    this.showConfirm();
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
  }

  onConfirm() {
    this.messageService.clear('c');
    this.isLoading$.next(true);
    this.hasError = false;
    const deactivateSubscr = this.service
      .deactivateAccount(this.id)
      .pipe(first())
      .subscribe(user => {
        if (user) {
          this.isLoading$.next(false);
          this.showSuccess();
          this.cdr.detectChanges();
        } else {
          this.hasError = true;
          this.isLoading$.next(false);
        }
      });
    this.unsubscribe.push(deactivateSubscr);
  }

  onReject() {
      this.messageService.clear('c');
      this.showError();
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'La información se actualizo con éxito.'});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Cancelado', detail: 'No se elimino la cuenta'});
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
