import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingularityComponent } from './singularity/singularity.component';
import { SingularityEditComponent } from './singularity/singularity-edit/singularity-edit.component';
import { SingularityDetailComponent } from './singularity/singularity-detail/singularity-detail.component';
import { SingularityListComponent } from './singularity/singularity-list/singularity-list.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SingularityComponent,
    SingularityEditComponent,
    SingularityDetailComponent,
    SingularityListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
