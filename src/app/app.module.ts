import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingularityComponent } from './singularity/singularity.component';
import { SingularityEditComponent } from './singularity/singularity-edit/singularity-edit.component';
import { SingularityDetailComponent } from './singularity/singularity-detail/singularity-detail.component';
import { SingularityListComponent } from './singularity/singularity-list/singularity-list.component';
import { HeaderComponent } from './header/header.component';
import { SingularityItemComponent } from './singularity/singularity-item/singularity-item.component';
import { SingularityFilterPipe } from './singularity/singularities-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SingularityComponent,
    SingularityEditComponent,
    SingularityDetailComponent,
    SingularityListComponent,
    HeaderComponent,
    SingularityItemComponent,
    SingularityFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
