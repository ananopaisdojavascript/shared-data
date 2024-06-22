import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, toArray } from 'rxjs';
import { IPeople } from './people';

const url = 'http://localhost:3000/people'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  http = inject(HttpClient)

  private sourceArr = new BehaviorSubject<IPeople[]>([])
  
  currentSourceArr = this.sourceArr.asObservable()

  private targetArr = new BehaviorSubject<IPeople[]>([])

  currentTargetArr = this.targetArr.asObservable()

  fetchDataToSource() {
    this.http.get<IPeople[]>(url).subscribe(data => {
      this.sourceArr.next(data)
    })
  }

  createDataToSource(person: IPeople) {
    this.http.post<IPeople[]>(url, person).subscribe(data => {
      this.sourceArr.next(data)
    })
  }

  addToTargetArray(item: IPeople) {
    const currentTargetArr = this.targetArr.getValue();
    currentTargetArr.push(item);
    this.targetArr.next(currentTargetArr);
  }

  getTargetArray(): IPeople[] {
    return this.targetArr.getValue();
  }

  transferItemToTargetArray(index: number) {
    this.sourceArr.pipe(
      concatMap(peopleArr => {
        const item = peopleArr.splice(index, 1)[0];
        this.targetArr.next([...this.targetArr.getValue(), item]);
        return [peopleArr];
      })
    ).subscribe(peopleArr => {
      this.sourceArr.next(peopleArr);
    });
  }

}
