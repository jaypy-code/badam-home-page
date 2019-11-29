import { Component, OnInit } from '@angular/core';
import { Database } from '../../services/database/database.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(public database: Database) { }

  ngOnInit() {
  }

}
