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
    this.sharedService.currentSourceArr.subscribe(data => {
      this.sourceArray = data
    })
  }

  transferData(index: number) {
    this.sharedService.transferItemToTargetArray(index)
  }
}
