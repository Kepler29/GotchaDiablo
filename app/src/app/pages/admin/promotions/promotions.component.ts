import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgForm } from "@angular/forms";
import { AuthService, UserType } from "../../../modules/auth";
import { Promotion } from "../../../interfaces/promotion";
import { PromotionsService } from "../../../services/admin/promotions.service";


@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

  @ViewChild('btn') btn: ElementRef;

  promotions: Promotion[]=[];
  promotionDialog: boolean;
  unit: boolean;
  promotion:Promotion = <Promotion>{
    name:'',
    price: 0,
    description: '',
    intro: '',
    image: ''
  };
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  submitted: boolean;
  selectedPromotions: Promotion[];
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
  dateStart:any;
  dateEnd:any;
  hour:any;
  private unsubscribe: Subscription[] = [];
  signedUser$: Observable<UserType>;


  constructor(private titleService: Title,
              private cdr: ChangeDetectorRef,
              private service: PromotionsService,
              private auth: AuthService) {
    this.titleService.setTitle("Promociones");
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
    this.service.getPromotions().subscribe(response => {
      this.promotions = response.promotions;
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
    this.promotion = {
      _id: '',
      name: '',
      // @ts-ignore
      dateStart: '',
      // @ts-ignore
      dateEnd: '',
      description: '',
      intro: '',
      active: true,
      delete: false,
    };
    this.dateStart = '';
    this.dateEnd = '';
    this.create=true;
    this.submitted = false;
    this.promotionDialog = true;
  }

  editPromotion(promotion: Promotion) {
    this.promotion = {...promotion};
    this.dateStart = new Date(this.promotion.dateStart);
    this.dateEnd = new Date(this.promotion.dateEnd);
    this.promotionDialog = true;
    this.create=false;
    this.pError=false;
  }

  hideDialog() {
    this.promotionDialog = false;
    this.submitted = false;
  }

  isObjEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  savePromotion(form: NgForm){
    if(form.value.password != form.value.pass) {
      this.pError=true;
    } else  {
      if (this.create) {
        this.store(form);
      }
      else {
        this.update(form);
      }
      this.promotionDialog = false;
      this.promotion = {
        _id: '',
        name: '',
        // @ts-ignore
        dateStart: '',
        // @ts-ignore
        dateEnd: '',
        description: '',
        intro: '',
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
    params.append('name', form.value.name);
    params.append('price', form.value.price);
    params.append('dateStart', form.value.dateStart);
    params.append('dateEnd', form.value.dateEnd);
    params.append('description', form.value.description);
    params.append('intro', form.value.intro);
    if (this.image != ''){
      params.append('file', this.image);
    }
    this.service.postPromotion(params).subscribe( response => {
      this.promotions.push(response.promotion);
      this.isLoading$.next(false);
      this.cdr.detectChanges();
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
    params.append('name', form.value.name);
    params.append('price', form.value.price);
    params.append('dateStart', form.value.dateStart);
    params.append('dateEnd', form.value.dateEnd);
    params.append('description', form.value.description);
    params.append('intro', form.value.intro);
    if (this.image != ''){
      params.append('file', this.image);
    }
    this.service.putPromotion(this.promotion._id, params).subscribe( response => {
      const index = this.promotions.findIndex(item => item._id == response.promotion._id);
      this.promotions[index] = response.promotion;
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


  active(promotion: string, option: boolean){
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('id', promotion);
    params.append('option', option.toString());
    this.service.activePromotion(params).subscribe(response => {
      let active = '';
      const index = this.promotions.findIndex(item => item._id == response.promotion._id);
      this.promotions[index] = response.promotion;
      this.isLoading$.next(false);
      this.getData();
      if (response.promotion.active){
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

  delete(promotion: string){
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
        this.service.deletePromotion(promotion).subscribe(response => {
          const index = this.promotions.findIndex(item => item._id == response.promotion._id);
          this.promotions.splice(index, 1);
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
