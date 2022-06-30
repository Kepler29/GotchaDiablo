import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Image } from "../../../interfaces/image";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { AuthService, UserType } from "../../../modules/auth";
import { Title } from "@angular/platform-browser";
import { GalleryService } from "../../../services/admin/gallery.service";
import { NgForm } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @ViewChild('btn') btn: ElementRef;

  images: Image[]=[];
  imageDialog: boolean;
  unit: boolean;
  image:Image =<Image>{
    _id: '',
    name: '',
    slug: '',
    image: '',
    active: true,
    delete: false
  };
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  submitted: boolean;
  selectedImages: Image[];
  statuses: any[];
  types: any[];
  file:any;
  imageInit:any;
  thumbnail:any;
  loading: boolean = true;
  create:boolean=false;
  viewPassword:boolean=false;
  viewPass:boolean=false;
  type:any;
  private unsubscribe: Subscription[] = [];
  signedUser$: Observable<UserType>;


  constructor(private titleService: Title,
              private cdr: ChangeDetectorRef,
              private service: GalleryService,
              private auth: AuthService) {
    this.titleService.setTitle("Galeria");
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
    this.service.getImages().subscribe(response => {
      console.log(response);
      this.images = response.images;
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
    this.image = {
      _id: '',
      name: '',
      slug: '',
      image: '',
      active: true,
      delete: false
    };
    this.create=true;
    this.submitted = false;
    this.imageInit = '';
    this.thumbnail = '';
    this.file = '';
    this.imageDialog = true;
  }

  editImage(image: Image) {
    this.image = {...image};
    this.imageDialog = true;
    this.imageInit = this.image.image;
    this.thumbnail = '';
    this.file = '';
    this.create=false;
  }

  hideDialog() {
    this.imageDialog = false;
    this.submitted = false;
  }

  isObjEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  saveImage(form: NgForm){
    if (this.create) {
      this.store(form);
    }
    else {
      this.update(form);
    }
      this.imageDialog = false;
      this.image = {
        _id: '',
        name: '',
        slug: '',
        image: '',
        active: true,
        delete: false
      };
    this.cdr.detectChanges();
  }

  store(form: NgForm) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', form.value.name);
    if (this.file){
      params.append('file', this.file);
    }
    this.service.postImage(params).subscribe( response => {
      console.log(response);
      this.images.push(response.image);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'La Imagen se creó con exíto.',
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
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', form.value.name);
    if (this.file){
      params.append('file', this.file);
    }
    this.service.putImage(this.image._id, params).subscribe( response => {
      const index = this.images.findIndex(item => item._id == response.image._id);
      this.images[index] = response.image;
      this.isLoading$.next(false);
      this.getData();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'La Imagen se actualizo con exíto.',
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


  active(image: string, option: boolean){
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('id', image);
    params.append('option', option.toString());
    this.service.activeImage(params).subscribe(response => {
      let active = '';
      const index = this.images.findIndex(item => item._id == response.image._id);
      this.images[index] = response.image;
      this.isLoading$.next(false);
      this.getData();
      if (response.image.active){
        active = 'activo';
      } else {
        active = 'des activo';
      }
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: `La Imagen se ${active} con exíto.`,
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
    });
    this.cdr.detectChanges();
  }

  delete(image: string){
    Swal.fire({
      title: '¿Esta seguro que decea eliminar el Imagen?',
      text: '¡Esta apunto de eliminar el Imagen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.isLoading$.next(true);
        this.service.deleteImage(image).subscribe(response => {
          const index = this.images.findIndex(item => item._id == response.image._id);
          this.images.splice(index, 1);
          this.isLoading$.next(false);
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'La Imagen se elimino con exíto.',
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelado',
            'No se elimino la Imagen',
            'error'
        )
      }
    })
    this.cdr.detectChanges();
  }

  getImage(e: any){
    let file = e.target.files[0];
    this.file = file;
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
