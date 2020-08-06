import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public autor: any = {nombre:'DTELL', Date:"2020 - 2021"};

  constructor() { }

  ngOnInit(): void {
  }

}
