import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toc-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.scss'],
})
export class EventsCalendarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  changeDate(event: Event) {
    const customEvent = event as CustomEvent;
    console.log(customEvent.detail.value);
  }
}
