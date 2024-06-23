import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OneComponent } from './one/one.component';
import { CommonModule } from '@angular/common';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { SharedService } from './shared.service';
import { url } from './people';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, OneComponent, TwoComponent, ThreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  sharedService = inject(SharedService);

  ngOnInit() {
    this.sharedService.fetchData(url)
  }
}
