import { Injectable } from '@angular/core';
import { UserModel } from "../../pages/auth";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { AuthModel } from "../../pages/auth/models/auth.model";
import { environment } from "../../../environments/environment";
import {UserHttpService} from "./user-http.service";

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private unsubscribe: Subscription[] = [];
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private userHttpService: UserHttpService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.userHttpService.getUserByToken(auth.authToken).pipe(
      map((user: UserType) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateUser(params: any): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    this.isLoadingSubject.next(true);
    // @ts-ignore
    return this.userHttpService.updateUser(params, auth.authToken)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  changePassword(params: any): Observable<UserType> {
    const auth2 = this.getAuthFromLocalStorage();
    this.isLoadingSubject.next(true);
    // @ts-ignore
    let result = this.userHttpService.changePassword(params, auth2.authToken)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
    console.log(result);
    return result;
  }

  changeEmail(params: any): Observable<UserType> {
    const authE = this.getAuthFromLocalStorage();
    this.isLoadingSubject.next(true);
    // @ts-ignore
    return  this.userHttpService.changeEmail(params, authE.authToken)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  deactivateAccount(id: string): Observable<UserType> {
    const authE = this.getAuthFromLocalStorage();
    this.isLoadingSubject.next(true);
    // @ts-ignore
    let result = this.userHttpService.deactivateAccount(id, authE.authToken)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
    this.logout();
    return result;
  }

  public getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }
      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
