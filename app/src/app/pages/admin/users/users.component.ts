import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../interfaces/user";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {UsersService} from "../../../services/admin/users.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {NgForm} from "@angular/forms";
import {AuthService, UserType} from "../../../modules/auth";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('btn') btn: ElementRef;

  users: User[]=[];
  userDialog: boolean;
  unit: boolean;
  user:{ uid: string; password: string; role: string; pass: string; name: string; active: boolean; avatar: string; email: string }=<User>{
    uid: '',
    name: '',
    password: '',
    pass:'',
    email: '',
    role: '',
    avatar: '',
    active: false,
  };
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  submitted: boolean;
  selectedUsers: User[];
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
  private unsubscribe: Subscription[] = [];
  signedUser$: Observable<UserType>;


  constructor(private titleService: Title,
              private cdr: ChangeDetectorRef,
              private service: UsersService,
              private auth: AuthService) {
    this.roles = [
      {name: 'Administrador', code: 'ADMIN_ROLE'},
      {name: 'Empleado', code: 'EMPLOYEE_ROLE'},
      {name: 'Cliente', code: 'CLIENT_ROLE'},
    ]
    this.titleService.setTitle("Usuarios");
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
    this.service.getUsers().subscribe(response => {
      this.users = response.users;
      this.loading = false;
      this.statuses = [
        {label: 'Activo', value: true},
        {label: 'Des Activo', value: false},
      ];
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
    this.user = {
      uid: '',
      name: '',
      password: '',
      pass:'',
      email: '',
      role: '',
      avatar: '',
      active: false,
    };
    this.create=true;
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: User) {
    this.user = {...user};
    console.log();
    switch (this.user.role) {
      case 'SUPER_ADMIN_ROLE':
        this.role = {name: 'Administrador', code: 'ADMIN_ROLE'}
        break;
      case 'ADMIN_ROLE':
        this.role = {name: 'Administrador', code: 'ADMIN_ROLE'}
        break;
      case 'CLIENT_ROLE':
        this.role = {name: 'Cliente', code: 'CLIENT_ROLE'}
        break;
      case 'EMPLOYEE_ROLE':
        this.role = {name: 'Empleado', code: 'EMPLOYEE_ROLE'}
        break;
    }
    this.userDialog = true;
    this.create=false;
    this.pError=false;
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  isObjEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  saveUser(form: NgForm){
    if(form.value.password != form.value.pass) {
      this.pError=true;
    } else  {
      if (this.create) {
        this.store(form.value.name, form.value.email, form.value.password, form.value.role.code);
      }
      else {
        this.update(form.value.name, form.value.email, form.value.password, form.value.role.code);
      }
      this.userDialog = false;
      this.user = {
        uid: '',
        name: '',
        password: '',
        pass:'',
        email: '',
        role: '',
        avatar: '',
        active: false,
      };
      this.pError=false;
    }
  }

  store(name: string, email: string, password: string, role: string) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', name);
    params.append('email', email);
    params.append('password', password);
    params.append('role', role);
    this.service.postUser(params).subscribe( response => {
      this.users.push(response.user);
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'El Usuario se creó con exíto.',
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

  update(name: string, email: string, password: string, role: string) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', name);
    params.append('email', email);
    params.append('password', password);
    params.append('role', role);
    this.service.putUser(this.user.uid, params).subscribe( response => {
      const index = this.users.findIndex(item => item.uid == response.user._id);
      this.users[index] = response.user;
      this.isLoading$.next(false);
      this.getData();
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'El Usuario se actualizo con exíto.',
        timer: 3000
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


  active(user: string, option: boolean){
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('id', user);
    params.append('option', option.toString());
    this.service.activeUser(params).subscribe(response => {
      let active = '';
      const index = this.users.findIndex(item => item.uid == response.user._id);
      this.users[index] = response.user;
      this.isLoading$.next(false);
      this.getData();
      if (response.user.active){
        active = 'activo';
      } else {
        active = 'des activo';
      }
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: `El Usuario se ${active} con exíto.`,
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

  delete(user: string){
    Swal.fire({
      title: '¿Esta seguro que decea eliminar el usuario?',
      text: '¡Esta apunto de eliminar el usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.isLoading$.next(true);
        this.service.deleteUser(user).subscribe(response => {
          const index = this.users.findIndex(item => item.uid == response.user._id);
          this.users.splice(index, 1);
          this.isLoading$.next(false);
          this.cdr.detectChanges();
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El Usuario se elimino con exíto.',
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
            'No se elimino el usuario',
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
