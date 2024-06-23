import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from '../shared.service';
import { IPeople } from '../people';
@Component({
  selector: 'app-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './three.component.html',
  styleUrl: './three.component.css'
})
export class ThreeComponent implements OnInit {

  secondArray: IPeople[] = [];

  sharedService = inject(SharedService);
  ngOnInit() {
    this.sharedService.secondArray$.subscribe(data => {
      this.secondArray = data
    })
  }
}
