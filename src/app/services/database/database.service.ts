import { Injectable, EventEmitter } from '@angular/core';

interface Page {
  path: string,
  head: {
    title: string,
    description: string,
    image: string,
    color: {
      text: string,
      background: string
    }
  },
  body: string
}

interface Post {
  title: string,
  link: string
}

interface Download {
  name: string,
  description: string,
  image: string,
  link: string
}

@Injectable({
  providedIn: 'root'
})
export class Database {

  public pages: Page[] = [];
  public posts: Post[] = [];
  public downloads: Download[] = [];
  public onChange: EventEmitter<Boolean> = new EventEmitter();
  constructor() { }
  set(key: string, value: any) {
    this[key] = value;
    this.onChange.emit(true);
  }
}
