import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RayconnectService } from './services/rayconnect/rayconnect.service';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
// import { HomeComponent } from './components/home-old/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { PageComponent } from './components/page/page.component';
import { ContactComponent } from './components/contact/contact.component';
import { DownloadComponent } from './components/download/download.component';
import { PricingComponent } from './components/pricing/pricing.component';

import { HeaderComponent } from './includes/header/header.component';
import { FooterComponent } from './includes/footer/footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'page/faq', component: FaqComponent },
  { path: 'page/contact', component: ContactComponent },
  { path: 'page/download', component: DownloadComponent },
  { path: 'page/pricing', component: PricingComponent },
  { path: 'page/:name', component: PageComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FaqComponent,
    PageComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    DownloadComponent,
    PricingComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RayconnectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
