import { Component, HostListener,OnInit } from '@angular/core';

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

  open:boolean=false;
  displayMenu:boolean=false;

  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth < 992) {
      this.displayMenu = false;
    } else if(window.innerWidth > 992) {
      this.displayMenu = true;
    }
  }

  openMenu(){
    if (this.open){
      this.open = false;
    } else {
      this.open = true;
    }
  }

}
