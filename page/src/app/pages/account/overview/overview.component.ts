import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService, UserType} from "../../auth/services/auth.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {

  user$: Observable<UserType>;

  constructor(private auth: AuthService,
              private cdr: ChangeDetectorRef) {
    // @ts-ignore
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  ngOnInit(): void {}
}
