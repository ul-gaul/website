import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  page = 4;
  page1 = 5;
  focus;
  focus1;
  focus2;
  
  constructor() { }

  ngOnInit(): void {
  }

}
