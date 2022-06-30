import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Package} from "../../../interfaces/package";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {AuthService, UserType} from "../../../modules/auth";
import {Title} from "@angular/platform-browser";
import {PackagesService} from "../../../services/admin/packages.service";
import {NgForm} from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  @ViewChild('btn') btn: ElementRef;

  packages: Package[]=[];
  packDialog: boolean;
  unit: boolean;
  pack:{ image: string; name: string; _id: string; price: number; description: string, intro: string; slug: string; active: boolean; delete: boolean }=<Package>{
    _id: '',
    name: '',
    slug: '',
    price: 0,
    description: '',
    intro: '',
    image: '',
    active: true,
    delete: false
  };
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  submitted: boolean;
  selectedPackages: Package[];
  roles:any[]=[];
  statuses: any[];
  types: any[];
  loading: boolean = true;
  image:any;
  imageInit:any;
  thumbnail:any;
  create:boolean=false;
  pError:boolean=false;
  role={};
  private unsubscribe: Subscription[] = [];
  signedUser$: Observable<UserType>;


  constructor(private titleService: Title,
              private cdr: ChangeDetectorRef,
              private service: PackagesService,
              private auth: AuthService) {
    this.titleService.setTitle("Paquetes");
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
    this.service.getPackages().subscribe(response => {
      this.packages = response.packages;
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
    this.pack = {
      _id: '',
      name: '',
      slug: '',
      price: 0,
      description: '',
      intro: '',
      image: '',
      active: true,
      delete: false
    };
    this.image = '';
    this.imageInit = '';
    this.thumbnail = '';
    this.create=true;
    this.submitted = false;
    this.packDialog = true;
  }

  editPackage(pack: Package) {
    this.pack = {...pack};
    this.image = '';
    this.imageInit = pack.image;
    this.thumbnail = '';
    this.packDialog = true;
    this.create=false;
    this.pError=false;
  }

  hideDialog() {
    this.packDialog = false;
    this.submitted = false;
  }

  isObjEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  savePackage(form: NgForm){
    if (this.create) {
      this.store(form);
    }
    else {
      this.update(form);
    }
      this.packDialog = false;
      this.pack = {
        _id: '',
        name: '',
        slug: '',
        price: 0,
        description: '',
        intro: '',
        image: '',
        active: true,
        delete: false
      };
      this.pError=false;
    this.cdr.detectChanges();
  }

  store(form: NgForm) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', form.value.name);
    params.append('price', form.value.price);
    params.append('intro', form.value.intro);
    params.append('description', form.value.description);
    if (this.image){
      params.append('file', this.image);
    }
    this.service.postPackage(params).subscribe( response => {
      console.log(response);
      this.packages.push(response.package);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'El Paquete se creó con exíto.',
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
    params.append('name', form.value.name);
    params.append('price', form.value.price);
    params.append('intro', form.value.intro);
    params.append('description', form.value.description);
    if (this.image != ''){
      params.append('file', this.image);
    }
    this.service.putPackage(this.pack._id, params).subscribe( response => {
      const index = this.packages.findIndex(item => item._id == response.package._id);
      this.packages[index] = response.package;
      this.isLoading$.next(false);
      this.getData();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'El Paquete se actualizo con exíto.',
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
      })
      this.cdr.detectChanges();
    });
  }


  active(pack: string, option: boolean){
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('id', pack);
    params.append('option', option.toString());
    this.service.activePackage(params).subscribe(response => {
      let active = '';
      const index = this.packages.findIndex(item => item._id == response.package._id);
      this.packages[index] = response.package;
      this.isLoading$.next(false);
      this.getData();
      if (response.package.active){
        active = 'activo';
      } else {
        active = 'des activo';
      }
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: `El Paquete se ${active} con exíto.`,
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

  delete(pack: string){
    Swal.fire({
      title: '¿Esta seguro que decea eliminar el Paquete?',
      text: '¡Esta apunto de eliminar el Paquete!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.isLoading$.next(true);
        this.service.deletePackage(pack).subscribe(response => {
          const index = this.packages.findIndex(item => item._id == response.package._id);
          this.packages.splice(index, 1);
          this.isLoading$.next(false);
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El Paquete se elimino con exíto.',
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
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelado',
            'No se elimino el control',
            'error'
        )
      }
    })
    this.cdr.detectChanges();
  }

  getImage(e: any){
    let file = e.target.files[0];
    this.image = file;
    this.uploadImage(file);
  }

  uploadImage(file: any){
    let reader = new FileReader();
    reader.onload = (e) => {
      //@ts-ignore
      this.thumbnail = e.target.result;
      this.cdr.detectChanges();
    }

    reader.readAsDataURL(file);
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
