import { Component, Input, OnInit } from '@angular/core';
import { PriceEstimatioResponseDto } from '../Dto/priceEstimatioResponseDto';

@Component({
  selector: 'app-priceBar',
  templateUrl: './priceBar.component.html',
  styleUrls: ['./priceBar.component.css']
})
export class PriceBarComponent implements OnInit {

  @Input() input! : PriceEstimatioResponseDto;

  price : string = "";
  constructor() { }

  ngOnInit() {
    if(this.badPrice() == true){
      this.price = "Preț nefavorabil";
    }

    if(this.fairPrice() == true){
      this.price = "Preț corect";
    }

    if(this.goodPrice() == true){
      this.price = "Preț bun";
    }

  }

  goodPrice(){
    if(this.input.price < (this.input.estimatedPrice - this.input.gaussBell)){
      return true;
    }
    return false;
  }

  badPrice(){
    if(this.input.price > (this.input.estimatedPrice + this.input.gaussBell)){
      return true
    }
    return false;
  }
  fairPrice(){
    if( 
      (this.input.price <  (this.input.estimatedPrice + this.input.gaussBell)) &&
      (this.input.price >  (this.input.estimatedPrice - this.input.gaussBell)) 
    ) 
    {
       return true;
    }
    return false;
  }

  noPrice(){
    if(this.input.price == 0){
      return true;
    }
    return false;
  }

}
