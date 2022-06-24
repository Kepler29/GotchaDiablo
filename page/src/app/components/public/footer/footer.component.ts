import { Component, OnInit } from '@angular/core';
import { User } from "../../../interfaces/user";
import { StorageService } from "../../../services/storage/storage.service";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";
import {environment} from "../../../../environments/environment";



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  user:User=<User>{};
  public date = new Date();
  public API_ADMIN_URL = `${environment.adminUrl}`;

  constructor(private storage: StorageService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.storage.getUser();
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }

}
