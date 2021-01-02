import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-meetup',
  templateUrl: './new-meetup.component.html',
  styleUrls: ['./new-meetup.component.scss']
})
export class NewMeetupComponent implements OnInit {
  steps: boolean[];

  constructor() { }

  ngOnInit(): void {
    this.steps = [true, false, false, false]
  }

  showStep(stepNumber: number){
    this.steps[stepNumber] = true;
  }

}
