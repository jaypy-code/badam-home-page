import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { RayconnectService } from './services/rayconnect/rayconnect.service';
import { Database } from './services/database/database.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  private connection: Subscription;
  constructor(private rayconnect: RayconnectService, private database: Database, private router: Router) { }
  ngOnInit() {
    this.Login()
      .then(() => {
        console.log("Loggined successfully.");
        this.rayconnect.AuthChange.subscribe(() => this.getData());
      });

    this.router.events.subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  Login() {
    return new Promise((resolve, reject) => {
      this.rayconnect.LoginChange.subscribe((data) => {
        if (data.step == 2) {
          if (data.status) {
            const pack = this.rayconnect.rayconnect.loginData
            if (pack.username != "guest") {
              localStorage.setItem('token', data.data.token)
            }
            this.rayconnect.rayconnect.Auth(data.data.token)
            resolve();
          }
        }
      })
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  getData() {
    console.log("Getting data!");
    this.database.set("pages", [
      {
        path: "about",
        head: {
          title: "درباره ما",
          description: "",
          image: "",
          color: {
            text: "#000",
            background: "#fff"
          }
        },
        body: "<h1>hello world</h1>"
      }, {
        path: "feature",
        head: {
          sticky: true,
          title: "ویژگی ها و امکانات سیستم اتوماسیون تغذیه ی بادام ",
          description: "قابلیت های متمایز و ویژگی ها و امکاناتی که سیستم اتوماسیون تغذیه ی بادام برای سازمان شما که با بهترین سخت افزار ها، تجهیزات جانبی و با استفاده از بهترین روش های نرم افزاری و با سرعت و کیفیت عالی ارائه می دهد.",
          image: "",
          color: {
            text: "#000",
            background: "#fff"
          }
        },
        body: `
          <div class="inline-content flex c-ai c-jc">
            <div class="content">
              <h2>فست فود بخورید حال کنید</h2>
              <p>لورم ایپسوم</p>
            </div>
            <img src="/assets/undraw_Hamburger_8ge6.svg">
          </div>
          <div class="inline-content flex c-ai c-jc">
            <div class="content center">
              <h2>فست فود بخورید حال کنید</h2>
              <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
          </div>
          <div class="quote-content left flex column">
            <p>
            یکی از راه حل های مفید برای کاهش صف های تغذیه استفاده از سیستم مدیریتی با قابلیت توزیع افلاین هست 
            </p>
            <p>محمد جواد یاحقی</p>
          </div>
        `
      }
    ]);
    this.rayconnect.rayconnect.execQuery({
      scope: 'badam',
      uniqueID: 'badam',
      TokenID: '*',
      address: 'portal/sync/last/data',
      info: {
        method: 'SYNC',
        data: {}
      }
    })
    this.rayconnect.queryChange.subscribe((msg) => {
      this.rayconnect.Query({
        scope: 'badam',
        address: 'portal/blog/news',
        method: 'SEND'
      }, msg, async data => {
        this.database.posts = data.data.slice(0, 5);
      })
    })
  }
}
