import { Pipe, PipeTransform } from '@angular/core';
import { Singularity } from './singularity.model';

@Pipe({
  name: 'singFilter'
})
export class SingularityFilterPipe implements PipeTransform {
  transform(singularities: Singularity[], searchTerm): any {
    let filtered: Singularity[] = [];

    if (searchTerm || searchTerm.length > 0) {
      filtered = singularities.filter((sing: Singularity) => {
        return sing.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    
    if (filtered.length < 1)
      return singularities;

    return filtered;
  }
}
