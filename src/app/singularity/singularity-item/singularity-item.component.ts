import { Component, Input, OnInit } from '@angular/core';
import { Singularity } from '../singularity.model';

@Component({
  selector: 'app-singularity-item',
  templateUrl: './singularity-item.component.html',
  styleUrls: ['./singularity-item.component.css']
})
export class SingularityItemComponent implements OnInit {
  @Input() singularity: Singularity;

  constructor() { }
  ngOnInit(): void {}
}
