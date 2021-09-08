import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {
  elements: any = [
    {
      id: 1, 
      heading1: '1231231321',
      heading2: 'Polvo Ala Blanco 1kg',
      heading3: '12.54',
      heading4: '123.00',
    },
    {
      id: 4, 
      heading1: '1231231321',
      heading2: 'Polvo Ala Blanco 1kg',
      heading3: '12.54',
      heading4: '123.00',
    },
    {
      id: 3, 
      heading1: '1231231321',
      heading2: 'Polvo Ala Blanco 1kg',
      heading3: '12.54',
      heading4: '123.00',
    },
  ];
  headElements = ['ID', 'Heading', 'Heading', 'Heading', 'Heading', 'Heading', 'Heading', 'Heading', 'Heading', 'Heading'];

  constructor() { }

  ngOnInit(): void {
  }

}
