import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Singularity } from '../singularity.model';
import { SingularityService } from '../singularity.service';

@Component({
  selector: 'app-singularity-edit',
  templateUrl: './singularity-edit.component.html',
  styleUrls: ['./singularity-edit.component.css']
})
export class SingularityEditComponent implements OnInit {
  ogSingularity: Singularity;
  singularity: Singularity;
  compound: Singularity[] = [];
  editMode: boolean = false;
  id: string;
  blurred: string;

  constructor(private singService: SingularityService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id: string = params.id;
        if (!id) {
          this.editMode = false;
          return;
        } 
        this.ogSingularity = this.singService.getSingularity(id);
  
        if (!this.ogSingularity)
          return;

        this.editMode = true;
        this.singularity = JSON.parse(JSON.stringify(this.ogSingularity));

        if (this.singularity.compoundOf)
          this.compound = JSON.parse(JSON.stringify(this.singularity.compoundOf));
    });
  }

  onSubmit(form: NgForm) {
    if (this.editMode)
      this.singService.updateSingularity(this.ogSingularity, form.value);
    else
      this.singService.addSingularity(form.value);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onRemoveItem(index: string) {
    if (+index < 0 || +index >= this.compound.length)
      return;
   this.compound.splice(+index, 1);
  }

  onBlur(s: string) {
    this.blurred = s;
  }
}
