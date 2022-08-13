import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgForm } from "@angular/forms";
import { AuthService, UserType } from "../../../modules/auth";
import { Reservation } from "../../../interfaces/reservation";
import { ReservationsService } from "../../../services/admin/reservations.service";
import { User } from "../../../interfaces/user";
import {UsersService} from "../../../services/admin/users.service";


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  @ViewChild('btn') btn: ElementRef;

  reservations: Reservation[]=[];
  users: any[]=[];
  user: any={};
  reservationDialog: boolean;
  unit: boolean;
  reservation:Reservation = <Reservation>{
    _id:'',
    user: {
      uid: '',
      name: '',
      password: '',
      pass:'',
      email: '',
      role: '',
      avatar: '',
      active: false,
    },
  };
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  submitted: boolean;
  selectedReservations: Reservation[];
  roles:any[]=[];
  statuses: any[];
  types: any[];
  loading: boolean = true;
  image:any;
  imageInit:any;
  thumbnail:any;
  create:boolean=false;
  viewPassword:boolean=false;
  viewPass:boolean=false;
  pError:boolean=false;
  typePassword:string='password';
  typePass:string='password';
  role={};
  date:any;
  hour:any;
  private unsubscribe: Subscription[] = [];
  signedUser$: Observable<UserType>;
  format: number;


  constructor(private titleService: Title,
              private cdr: ChangeDetectorRef,
              private service: ReservationsService,
              private serviceUsers: UsersService,
              private auth: AuthService) {
    this.format = 12;
    this.titleService.setTitle("Reservaciones");
    const loadingSubscr = this.isLoading$
        .asObservable()
        .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.getData();
    this.signedUser$ = this.auth.currentUserSubject.asObservable();
  }

  setUnit(){
    if (this.unit){
      this.unit = false;
    } else {
      this.unit = true;
    }
  }

  getData(){
    this.service.getReservations().subscribe(response => {
      this.reservations = response.reservations;
      this.loading = false;
      this.statuses = [
        {label: 'Activo', value: true},
        {label: 'Des Activo', value: false},
      ];
      this.getUsers();
      this.cdr.detectChanges();
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
    });
  }

  getUsers(){
    this.serviceUsers.getUsers().subscribe(response => {
      let users = response.users.filter((item: {role: string;}) => item.role == 'ADMIN_ROLE');
      for (let i=0;users.length>i;i++){
        let user = {name: users[i].name, code: users[i].uid}
        this.users.push(user);
      }
      this.loading = false;
      this.cdr.detectChanges();
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
    });
  }


  replaceImage(image: any){
    image.onerror = '';
    image.src = 'assets/images/missing.png'
  }

  created() {
    this.reservation = {
      _id: '',
      // @ts-ignore
      user: {},
      // @ts-ignore
      date: '',
      active: true,
      delete: false,
    };
    this.create=true;
    this.submitted = false;
    this.reservationDialog = true;
  }

  editReservation(reservation: Reservation) {
    this.reservation = {...reservation};
    this.date = new Date(this.reservation.date);
    this.user = {name: this.reservation.user.name, code: this.reservation.user._id};
    this.reservationDialog = true;
    this.create=false;
    this.pError=false;
  }

  hideDialog() {
    this.reservationDialog = false;
    this.submitted = false;
  }

  isObjEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  saveReservation(form: NgForm){
    if(form.value.password != form.value.pass) {
      this.pError=true;
    } else  {
      if (this.create) {
        this.store(form);
      }
      else {
        this.update(form);
      }
      this.reservationDialog = false;
      this.reservation = {
        _id: '',
        // @ts-ignore
        user: {},
        // @ts-ignore
        date: '',
        active: true,
        delete: false,
      };
      this.pError=false;
    }
  }

  store(form: NgForm) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('user', form.value.user.code);
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
    });
  }

  update(form: NgForm) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('user', form.value.user.code);
    params.append('date', form.value.date);
    this.service.putReservation(this.reservation._id, params).subscribe( response => {
      const index = this.reservations.findIndex(item => item._id == response.reservation._id);
      this.reservations[index] = response.reservation;
      this.isLoading$.next(false);
      this.getData();
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'La reservación se actualizo con exíto.',
        timer: 3000
      });
      this.cdr.detectChanges();
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
    });
  }


  active(reservation: string, option: boolean){
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('id', reservation);
    params.append('option', option.toString());
    this.service.activeReservation(params).subscribe(response => {
      let active = '';
      const index = this.reservations.findIndex(item => item._id == response.reservation._id);
      this.reservations[index] = response.reservation;
      this.isLoading$.next(false);
      this.getData();
      if (response.reservation.active){
        active = 'activo';
      } else {
        active = 'des activo';
      }
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: `La reservación se ${active} con exíto.`,
        timer: 2000
      });
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
    });
  }

  delete(reservation: string){
    Swal.fire({
      title: '¿Esta seguro que decea eliminar la reservación?',
      text: '¡Esta apunto de eliminar la reservación!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.isLoading$.next(true);
        this.service.deleteReservation(reservation).subscribe(response => {
          const index = this.reservations.findIndex(item => item._id == response.reservation._id);
          this.reservations.splice(index, 1);
          this.isLoading$.next(false);
          this.cdr.detectChanges();
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'La reservación se elimino con exíto.',
            timer: 2000
          });
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
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelado',
            'No se elimino la reservación',
            'error'
        )
      }
    })
  }

  togglePassword(){
    if (this.viewPassword){
      this.typePassword = 'text';
      this.viewPassword = false;
    } else {
      this.typePassword = 'paassword';
      this.viewPassword = true;
    }
  }

  togglePass(){
    if (this.viewPass){
      this.typePass = 'text';
      this.viewPass = false;
    } else {
      this.typePass = 'paassword';
      this.viewPass = true;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
