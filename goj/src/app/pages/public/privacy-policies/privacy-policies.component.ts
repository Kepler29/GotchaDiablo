import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-privacy-policies',
  templateUrl: './privacy-policies.component.html',
  styleUrls: ['./privacy-policies.component.sass']
})
export class PrivacyPoliciesComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("Politicas de Privacidad");
  }

  ngOnInit(): void {
  }

}
