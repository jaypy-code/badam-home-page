import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Database } from '../../services/database/database.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  public data: Object = null;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private database: Database) { }

  ngOnInit() {
    let self = this;
    function setPage() {
      if (self.database.pages.length == 0) {
        self.database.onChange.subscribe(() => {
          self.setPage();
        });
      } else {
        self.setPage();
      }
    }
    this.router.events.subscribe(setPage);
    setPage();
  }

  setPage() {
    let name = this.activatedRoute.params['_value']['name'];
    let data = null;
    data = this.database.pages.find(page => { return page.path == name });
    if (data == null) {
      this.router.navigate(['/']);
    }
    else {
      this.data = data;
      document.title = data['head']['title'];
    }
  }
}