import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-piero-amato',
  templateUrl: './piero-amato.component.html',
  styleUrls: ['./piero-amato.component.scss']
})
export class PieroAmatoComponent implements OnInit{
  ngOnInit(): void {
Aos.init()
 }

}
