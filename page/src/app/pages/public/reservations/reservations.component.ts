import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import { AuthService, UserType } from "../../auth";
import { UntypedFormBuilder, UntypedFormGroup, NgForm } from "@angular/forms";
import { ReservationsService } from "../../../services/public/reservations.service";
import { Reservation } from "../../../interfaces/reservation";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.sass']
})
export class ReservationsComponent implements OnInit {

  form: UntypedFormGroup | undefined;
  user$: Observable<UserType> | undefined;
  reservations:Reservation[]=[];
  create:boolean=false;
  reservation:any={};
  date:any;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean=false;
  reservationDialog:boolean=false;
  private unsubscribe: Subscription[] = [];

  constructor(private fb: UntypedFormBuilder,
              private auth: AuthService,
              private service: ReservationsService,
              private cdr: ChangeDetectorRef) {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.user$.subscribe( user => {
      // @ts-ignore
      this.getData(user?.id);
    });
  }

  ngOnInit(): void {
  }

  getData(user: string){
    this.service.getReservations(user).subscribe( response => {
      this.reservations = response.reservations;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  saveReservation(form: NgForm){
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('user', form.value.user);
    params.append('date', form.value.date);
    this.service.postReservation(params).subscribe( response => {
      this.reservations.push(response.reservation);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'La reservación se creó con exíto.',
        timer: 2000
      });
      this.cdr.detectChanges();
      this.reservationDialog = false;
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: error.error.msg,
        timer: 2000
      });
      this.cdr.detectChanges();
      this.reservationDialog = false;
    });
  }

  created(){
    this.create = true;
    this.reservationDialog = true;
    this.reservation = {};
  }

  clear(){
    this.reservation = {}
    this.create = false;
    this.reservationDialog = false;
  }


}
