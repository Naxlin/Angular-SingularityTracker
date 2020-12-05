import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Singularity } from '../singularity.model';
import { SingularityService } from '../singularity.service';

@Component({
  selector: 'app-singularity-list',
  templateUrl: './singularity-list.component.html',
  styleUrls: ['./singularity-list.component.css']
})
export class SingularityListComponent implements OnInit, OnDestroy {
  singularities: Singularity[] = [];
  sub: Subscription;
  searchTerm: string = "";

  constructor(private singService: SingularityService) { }

  ngOnInit(): void {
    this.sub = this.singService.singularityListChangedEvent.subscribe(
      (singularities: Singularity[]) => {
        this.singularities = singularities;
      }
    );
    this.singService.getSingularities();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  search(value: string) {
    this.searchTerm = value;
  }
}