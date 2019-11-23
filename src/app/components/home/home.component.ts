import { Component, OnInit } from '@angular/core';
import * as AOS from '../../../assets/resource/aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AOS.init();
  }

}