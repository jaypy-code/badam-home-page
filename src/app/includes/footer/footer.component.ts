import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Database } from '../../services/database/database.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public database: Database, private router: Router) { }

  ngOnInit() {
  }

  viewTo(to = '') {
    let elem = window.document.getElementById(to);
    if (elem) {
      elem.scrollIntoView();
    } else {
      this.router.navigate([`/page/${to}`])
    }
  }

  goTop() {
    window.scrollTo(0, 0);
  }
}
