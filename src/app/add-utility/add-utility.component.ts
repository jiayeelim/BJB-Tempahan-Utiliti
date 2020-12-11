import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-utility',
  templateUrl: './add-utility.component.html',
  styleUrls: ['./add-utility.component.css']
})
export class AddUtilityComponent implements OnInit {

  addutilityform: FormGroup;
  /*ruangName: string;
  ruangInformation: string;
  ruangPrice: number;
  ruangCapacity: number;*/

  constructor() { }

  ngOnInit(): void {
  }

  

}
