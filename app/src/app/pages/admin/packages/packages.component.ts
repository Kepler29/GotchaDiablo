import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Package } from "../../../interfaces/package";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { BehaviorSubject, Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import { PackagesService } from "../../../services/admin/packages.service";
import { ConfirmationService, MessageService } from "primeng/api";

// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class PackagesComponent implements OnInit {

  @ViewChild('btn') btn: ElementRef;

  packages: Package[]=[];
  packDialog: boolean;
  unit: boolean;
  pack:Package=<Package>{
    _id:  '',
    name: '',
    slug: '',
    price: '',
    description: '',
    intro: '',
    type: '',
    image: '',
    details: false,
    active: true,
    delete: false
  };
  @ViewChild('successSwal')
  public readonly successSwal!: SwalComponent;
  @ViewChild('successUpdateSwal')
  public readonly successUpdateSwal!: SwalComponent;
  @ViewChild('successDeleteSwal')
  public readonly successDeleteSwal!: SwalComponent;
  @ViewChild('dangerSwal')
  public readonly dangerSwal!: SwalComponent;
  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  submitted: boolean;
  selectedPackages: Package[];
  statuses: any[];
  types: any[];
  loading: boolean = true;
  image:any;
  imageInit:any;
  thumbnail:any;
  public Editor = ClassicEditor;
  private unsubscribe: Subscription[] = [];


  constructor(private titleService: Title,
              private cdr: ChangeDetectorRef,
              private service: PackagesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.titleService.setTitle("Lista de Paquetes");
    const loadingSubscr = this.isLoading$
        .asObservable()
        .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.getData();
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
      this.types = [
        {label: 'Programación', value: 'programming'},
        {label: 'Hopedaje', value: 'host'},
      ]
      this.cdr.detectChanges();
    }, error => {
      console.log(error);
    });
  }


  replaceImage(image: any){
    image.onerror = '';
    image.src = 'assets/images/missing.png'
  }

  openNew() {
    this.pack = {
      _id:  '',
      name: '',
      slug: '',
      price: '',
      description: '',
      intro: '',
      type: '',
      image: '',
      details: false,
      active: true,
      delete: false
    };
    this.submitted = false;
    this.packDialog = true;
  }

  editPack(pack: Package) {
    this.pack = {...pack};
    this.packDialog = true;
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

  savePack(){
    this.submitted = true;

    if (this.pack.name.trim() || this.pack.intro.trim() || this.pack.description.trim() || this.pack.price.trim()) {
      if (this.isObjEmpty(this.pack)) {
        console.log('vacio');
        // this.store(this.pack.name, this.pack.price, this.pack.description, this.pack.intro, this.pack.type);
      }
      else {
        this.update(this.pack.name, this.pack.price, this.pack.description, this.pack.intro, this.pack.type);
      }
      this.packDialog = false;
      this.pack = {
        _id:  '',
        name: '',
        slug: '',
        price: '',
        description: '',
        intro: '',
        type: '',
        image: '',
        details: false,
        active: true,
        delete: false
      };
      this.image = null;
      this.imageInit = null;
      this.thumbnail = null;
    }
  }

  store(name: string, price: string, description: string, intro: string, type: string) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', name);
    params.append('price', price);
    params.append('description', description);
    params.append('type', type);
    params.append('intro', intro);
    if (this.image){
      params.append('file', this.image);
    }
    this.service.postPackage(params).subscribe( response => {
      this.packages.push(response.package);
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      this.successSwal.fire();
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      this.dangerSwal.text = error.error.msg;
      this.cdr.detectChanges();
      this.dangerSwal.fire();
    });
  }

  update(name: string, price: string, description: string, intro: string, type: string) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', name);
    params.append('price', price);
    params.append('description', description);
    params.append('type', type);
    params.append('intro', intro);
    if (this.image){
      params.append('file', this.image);
    }
    this.service.putPackage(this.pack._id, params).subscribe( response => {
      const index = this.packages.findIndex(item => item._id == response.package._id);
      this.packages[index] = response.package;
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      this.successUpdateSwal.fire();
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      this.dangerSwal.text = error.error.msg;
      this.cdr.detectChanges();
      this.dangerSwal.fire();
    });
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

  active(pack: string, option: boolean){
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('id', pack);
    params.append('option', option.toString());
    this.service.activePackage(params).subscribe(response => {
      const index = this.packages.findIndex(item => item._id == response.package._id);
      this.packages[index] = response.package;
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      this.dangerSwal.text = error.error.msg;
      this.cdr.detectChanges();
      this.dangerSwal.fire();
    });
  }

  delete(pack: string){
    this.isLoading$.next(true);
    this.service.deletePackage(pack).subscribe(response => {
      const index = this.packages.findIndex(item => item._id == response.package._id);
      this.packages.splice(index, 1);
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      this.successDeleteSwal.fire();
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      this.dangerSwal.text = error.error.msg;
      this.cdr.detectChanges();
      this.dangerSwal.fire();
    });

  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
