import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Singularity } from '../singularity.model';
import { SingularityService } from '../singularity.service';

@Component({
  selector: 'app-singularity-detail',
  templateUrl: './singularity-detail.component.html',
  styleUrls: ['./singularity-detail.component.css']
})
export class SingularityDetailComponent implements OnInit, OnDestroy {
  singularity: Singularity;
  lastId: string;
  sub: Subscription;

  constructor(private singService: SingularityService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.lastId = params['id'];
        this.singularity = this.singService.getSingularity(params['id']);
      }
    );
    this.sub = this.singService.singularityListChangedEvent.subscribe(
      () => {
        this.singularity = this.singService.getSingularity(this.lastId);
    })
  }

  onDelete() {
    this.singService.deleteSingularity(this.singularity);
    this.router.navigate(["/singularities"]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
