import { HAMMER_LOADER, BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageService } from './services/message.service';
import { NavMenuComponent } from './components/layouts/nav-menu/nav-menu.component';
import { SideNavComponent } from './components/layouts/side-nav/side-nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { CoreModule } from './components/core/core.module';
import { TypesService } from './services/products/types.service';
import { RegionsService } from './services/products/regions.service';
import { JwtInterceptor } from './components/core/interceptors/jwt.interceptor';
import { ShopService } from './services/products/shop.service';
import { HeroComponent } from './components/layouts/hero/hero.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ErrorInterceptor } from './components/core/interceptors/error.interceptor';
import { BusyService } from './services/infrastructure/busy.service';
import { LoadingInterceptor } from './components/core/interceptors/loading.interceptor';
import { ScrollMenuComponent } from './components/kit/scroll-menu/scroll-menu.component';
import { DadataAddressComponent } from './components/kit/dadata-address/dadata-address.component';


registerLocaleData(localeRu, 'ru');

const userComponents = [
  ScrollMenuComponent
]

@NgModule({
  declarations:
  [
    AppComponent,
    NavMenuComponent,
    SideNavComponent,
    ErrorComponent,
    ServererrorComponent,
    NotFoundComponent,
    HeroComponent,
    userComponents
  ],

  imports:
  [
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    Ng2CarouselamosModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],

  exports: [
  ],

  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},

    TypesService,
    RegionsService,
    ShopService,
    BusyService,
    {
      provide: HAMMER_LOADER,
      useValue: () => new Promise(() => {})
    },
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
