import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-utility',
  templateUrl: './update-utility.component.html',
  styleUrls: ['./update-utility.component.css']
})
export class UpdateUtilityComponent implements OnInit {

  updateutilityform: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
