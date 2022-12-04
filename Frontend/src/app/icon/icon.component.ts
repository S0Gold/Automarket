import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Input() icon!: string;
  @Input() text!: string;
  @Input() color: string = "black";
  @Input() textClass: string = "";
  
  constructor() { }

  ngOnInit() {
  }

}
