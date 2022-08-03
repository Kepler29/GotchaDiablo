import { Component, OnInit } from '@angular/core';
import { User } from "../../../interfaces/user";
import { StorageService } from "../../../services/storage/storage.service";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { AuthService, UserType } from "../../../pages/auth/services/auth.service";



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  user:User=<User>{};
  public date = new Date();
  public API_ADMIN_URL = `${environment.adminUrl}`;
  user$: Observable<UserType> | undefined;

  constructor(private storage: StorageService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }

}
