import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { UserType } from "../../../pages/auth";
import { AuthService } from "../../../pages/auth/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth < 992) {
      this.displayMenu = false;
    } else if(window.innerWidth > 992) {
      this.displayMenu = true;
    }
  };
  user$: Observable<UserType> | undefined;
  open:boolean=false;
  displayMenu:boolean=false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if (window.innerWidth < 992) {
      this.displayMenu = false;
    } else if(window.innerWidth > 992) {
      this.displayMenu = true;
    }
    // @ts-ignore
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  openMenu(){
    if (this.open){
      this.open = false;
    } else {
      this.open = true;
    }
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }

}
