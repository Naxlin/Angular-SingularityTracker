import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Singularity } from './singularity.model';

@Injectable({
  providedIn: 'root'
})
export class SingularityService {

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Application wide contacts list
  private singularities: Singularity[] = [];
  // Database connection url
  private dbUrl: string = "http://localhost:3000/singularities/";
  // Selecting a singularity Event Emitters
  singularityListChangedEvent = new Subject<Singularity[]>();

  // Setting up the http client
  constructor(private http: HttpClient) { }

  // Sort Singularities and emit them
  sortAndSend() {
    this.singularities = this.singularities.sort((a,b)=>a.name.toLowerCase()>b.name.toLowerCase()?1:b.name.toLowerCase()>a.name.toLowerCase()?-1:0)
    this.singularityListChangedEvent.next(this.singularities.slice());
  }

  // Returns a copy of singularity array
  getSingularities() { 
    this.http.get<{message: String, singularities: Singularity[]}>(this.dbUrl).subscribe((res: any) => {
      // Get singularities from database
      this.singularities = res.singularities;
      // Sort & Emit the contact list
      this.sortAndSend();
    },
    (error: any) => {
      console.log("Get Singularities Error: " + error);
    });
  }

  // Return a single singularity by id and through database
  getSingularityAPI(id: string) {
    return this.http.get<{message: String, singularity: Singularity}>(this.dbUrl + id);
  }

  // Returns a single singularity by id
  getSingularity(id: string) { 
    // Array.find() returns singularity object if found or the value undefined
    return this.singularities.find(singularity => singularity.id === id);
  }

  // Adds a new singularity with a new unique ID to the singularity array
  addSingularity(newSing: Singularity) {
    // Ensuring the new singularity exists
    if (!newSing)
      return;

    // Removing id if it exists (db sets this)
    newSing.id = '';

    // setting headers for the http post
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    // add to database
    this.http.post<{ message: string, singularity: Singularity }>(this.dbUrl, newSing, { headers: headers }).subscribe((res) => {
        // add new singularity to singularities
        this.singularities.push(res.singularity);
        // sort and emit
        this.sortAndSend();
      }
    );
  }

  // Updates a singularity with a new one, replacing the old singularity obj
  updateSingularity(ogSing: Singularity, newSing: Singularity) {
    // Ensuring both singularities exists
    if (!ogSing || !newSing)
      return;

    // If invalid index: leave function
    const pos = this.singularities.indexOf(ogSing);
    if (pos < 0) 
      return;

    // Replacing original singularity with new one by giving the new one the original's id
    newSing.id = ogSing.id;

    // Setting header
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put(this.dbUrl + ogSing.id, newSing, { headers: headers }).subscribe((res) => {
        this.singularities[pos] = newSing;
        this.sortAndSend();
      }
    );
  }
  
  deleteSingularity(singularity: Singularity) {
    // If no singularity: leave function
    if (!singularity)
      return;
      
    // If invalid index: leave function
    const pos = this.singularities.indexOf(singularity);
    if (pos < 0)
      return;

    // delete from database
    this.http.delete(this.dbUrl + singularity.id).subscribe((res) => {
        // cut out the singularity
        this.singularities.splice(pos, 1);
        // sort and emit
        this.sortAndSend();
      }
    );
  }
}
