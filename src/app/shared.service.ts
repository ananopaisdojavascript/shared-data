import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPeople } from './people';
import { BehaviorSubject, concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private firstArray = new BehaviorSubject<IPeople[]>([]);
  private secondArray = new BehaviorSubject<IPeople[]>([]);

  firstArray$ = this.firstArray.asObservable();
  secondArray$ = this.secondArray.asObservable();

  http = inject(HttpClient);

  fetchData(url: string) {
    this.http.get<IPeople[]>(url).subscribe(data => {
      this.firstArray.next(data);
    });
  }

  addDataToFirstArray(url: string, data: IPeople) {
    return this.http.post<IPeople>(url, data).subscribe(data => {
      const currentValue = this.firstArray.getValue();
      currentValue.push(data);
      return this.firstArray.next(currentValue);
    });
  }

  transferToSecondArray(item: IPeople) {
    const firstArrayValue = this.firstArray.value;
    const secondArrayValue = this.secondArray.value;

    const updateFirstArray = firstArrayValue.filter(i => i !== item)

    const updateSecondArray = [...secondArrayValue, item];

    this.firstArray.next(updateFirstArray);
    this.secondArray.next(updateSecondArray);
  }

}
