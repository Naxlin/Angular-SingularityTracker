import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingularityDetailComponent } from './singularity/singularity-detail/singularity-detail.component';
import { SingularityEditComponent } from './singularity/singularity-edit/singularity-edit.component';
import { SingularityComponent } from './singularity/singularity.component';

const routes: Routes = [
  { path: "", redirectTo: "/singularities", pathMatch: 'full' },
  { path: "singularities", component: SingularityComponent, children: [
      { path: "new", component: SingularityEditComponent },
      { path: ":id", component: SingularityDetailComponent },
      { path: ":id/edit", component: SingularityEditComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
