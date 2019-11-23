import { Injectable, EventEmitter } from '@angular/core';
import Rayconnect from './rayconnect'
import * as pathToRegexp from 'path-to-regexp'

@Injectable({
  providedIn: 'root'
})

export class RayconnectService {

  public rayconnect = new Rayconnect({
    scopes: "badam",
    appID: "rayda",
    space: "main",
    type: "client"
  }, undefined, true);
  queryChange: EventEmitter<any> = new EventEmitter();
  LoginChange: EventEmitter<any> = new EventEmitter();
  AuthChange: EventEmitter<any> = new EventEmitter();



  constructor() {

    this.rayconnect.OnConnect(() => {

      if (!localStorage.token) {

        this.rayconnect.LoginWithPassword({ username: "guest", password: "guest" })
        this.rayconnect.user.uid = "guest"
      }
    })

    this.rayconnect.socket.on('exec_gram', async (msg) => {




      const data = this.rayconnect.Dpack(msg)





      // send ack
      this.rayconnect.Ack(data.info.reqID)






      this.queryChange.emit(data)
      // callback(, query)



    });

    this.rayconnect.socket.on('login', (msg) => {
      const data = this.rayconnect.Dpack(msg)

      this.LoginChange.emit(data)

    })

    this.rayconnect.AuthEvent.on('authed', (msg) => {
      this.AuthChange.emit(msg)
    })



  }

  getConnection() {
    return this.rayconnect
  }
  Query(query, data, callback) {




    if ((data.scope === query.scope) && (data
      .info
      .method === query.method)) {

      const opts = {
        strict: false,
        sensitive: false,
        end: true
      }
      let keys = []
      const regexp = pathToRegexp(query.address, keys, opts)


      const result = regexp.exec(data.address)

      let params = {}

      keys.map((key, i) => {
        if (!result) return

        if (result[i + 1]) {
          const m = typeof result[i + 1]
          if (m == "string") {
            params[key.name] = result[i + 1]
          }

        }
      })

      if (result) {
        return callback({
          sender: data.uid,
          token: data.token,
          data: JSON.parse(data.info.data),
          params : params,
          date: data.info.date
        })
      }




    }
  }
  AuthChecker() {
    const queryChange: EventEmitter<any> = new EventEmitter();

    this.rayconnect.onAuth('checker', (authed) => {
      queryChange.emit(authed)

    })

    return queryChange

  }
}
