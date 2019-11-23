import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public menu: boolean = false;
  constructor(private router: Router) { }
  ngOnInit() {
    window.onscroll = () => {
      let top = window.scrollY;
      if (top < 100) {
        document.querySelector('header').classList.remove('scroll');
        document.getElementById('goUp').classList.remove('show');
      } else {
        document.querySelector('header').classList.add('scroll');
        document.getElementById('goUp').classList.add('show');
      }
    }
  }
  viewTo(to = '') {
    let elem = window.document.getElementById(to);
    if (elem) {
      elem.scrollIntoView();
    } else {
      this.router.navigate([`/page/${to}`])
    }
  }
}
