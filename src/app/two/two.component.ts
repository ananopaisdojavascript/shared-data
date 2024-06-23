import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { IPeople } from '../people';

@Component({
  selector: 'app-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './two.component.html',
  styleUrl: './two.component.css'
})
export class TwoComponent implements OnInit {
  sharedService = inject(SharedService)

  sourceArray: IPeople[] = []

 
  ngOnInit() {
    this.sharedService.firstArray$.subscribe(data => {
      this.sourceArray = data
    })
  }

  transferItems(person: IPeople) {
    this.sharedService.transferToSecondArray(person)
  }

}
