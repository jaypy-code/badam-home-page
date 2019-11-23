import * as io from 'socket.io-client';
import * as MessagePack from 'what-the-pack';
import { EventEmitter } from 'events';
import { combineAll } from 'rxjs/operators';
const { decode } = MessagePack.initialize(2 ** 22); // 4MB
class Rayconnect {

  public authed
  public user
  public AuthEvent = new EventEmitter();
  public InterTime = 10;
  public Timeout = 3000;
  public loginData = {username : '', password : ''}
  private EventCtrl;
  public socket: SocketIOClient.Socket
  constructor(
    private ops = {
      scopes: '',
      appID: 'rayconnect',
      space: '',
      type: 'client'
    },
    private token,
    private config
  ) {
    this.Connect()

    this.OnConnect(() => {

     


    })

    this.socket.on('authed', (msg) => {

      const data = decode(
        MessagePack.Buffer.from(msg)
      )
      this.authed = true

      this.user = data.data
      this.EventCtrl = true

      this.AuthEvent.emit('authed', true)
    })
    

    this.socket.on('ack_gram', (msg) => {
      const data = decode(
        MessagePack.Buffer.from(msg)
      )
      console.info(data)
    })

    this.DisOnConnect(() => {
      this.authed = false
      // this.AuthEvent.
    })
  }

  AuthEmitter(authed){

    if(authed){
      this.AuthEvent.emit('authed', true)
    }
  }
  AuthChecker(callback){
  const interval = setInterval(()=>{

    if(this.authed){
      callback(this.authed)
      clearInterval(interval)
    }
  }, 50)

  setTimeout(() => {
    
    callback(this.authed)
    clearInterval(interval)

  }, 3000);
  }
  Ack(data) {
    this.socket.emit('ack_gram', {
      reqID: data
    })
  }
  ObjectIdvalue = function (id) {
    return id.id.toString();
  };
  OnConnect(callback) {
    this.socket.on('connect', () => {
      callback()
    })
  }

  RequestOTP(phone) {
    this.socket.emit('login', { phone })

  }

  VerifyPhone(phone, token) {
    this.socket.emit('login', { phone, token })
  }

  Guest() {
    this.socket.emit('loginup', { username: 'guest', password: 'guest' })
  }
  LoginWithPassword(data = { username: 'guest', password: 'guest' }) {

    console.log("hi system")
    this.loginData = data
    this.socket.emit('loginup', data)
  }

  public LoginEvent(callback) {
    this.socket.on('login', (msg) => {
      const data = decode(
        MessagePack.Buffer.from(msg)
      )
      callback(data)
    })
  }
  DisOnConnect(callback) {
    this.socket.on('disconnect', () => {
      callback()
    })
  }

  AuthOnConnect(token) {
    this.socket.on('connect', () => {
      this.Auth(token)
    })
  }

  Auth(token) {
    this.socket.emit("auth", {
      token
    })

  }

  onAuth(input, input2) {
    // Auth(localStorage.token)
    let callback
    let timer = this.Timeout
    let renable = false
    if (typeof input == 'function') {
      callback = input

    } else {
      if (input !== 'checker') {
        this.Auth(input)
      }

      if (input == 'checker') {
        timer = timer * 10000
        renable = true
      }

      callback = input2
    }

    if (renable) {
      callback(false)


    }
    const ins = setInterval(() => {
      if (this.authed) {
        callback(true)

        clearInterval(ins)
      }
    }, 10);

    const timeout = setTimeout(() => {
      if (!this.authed) {
        callback(false)

        clearInterval(ins)
      }
    }, timer);

    this.socket.on('no_authed', () => {
      clearTimeout(timeout)
      clearInterval(ins)
      callback(false)
    })


  }

  NoAuthed(callback) {
    this.socket.on('no_authed', () => {
      callback(false)
    })
  }


  Reconnect() {




  }

  Connect() {
    let connectionString = `https://server-test.rayconnect.ir`
    if (this.config) {
      connectionString = `https://server-test.rayconnect.ir?scopes=${this.ops.scopes}&appID=${this.ops.appID}&space=${this.ops.space}&type=${this.ops.type}`

      if (this.token) {
        connectionString += `&token=${this.token}`
      }
    } else {
      connectionString += `?token=${this.token}`
    }
    this.authed = false
    this.user = {}
    this.EventCtrl = false

    this.socket = io(connectionString, {
      upgrade: false,
      transports: ['websocket'],

    })
  }

  execQuery(param) {
   
    param.info.data = JSON.stringify(param.info.data)
    this.socket.emit("exec_gram", param)


  }

  News(callback) {
    this.socket.on('news', async (msg) => {

      const data = decode(
        MessagePack.Buffer.from(msg)
      )

      callback(data)
    })
  }
  Dpack(msg){
    const data = decode(
      MessagePack.Buffer.from(msg)
    )

    return data

  }
}

export default Rayconnect;
