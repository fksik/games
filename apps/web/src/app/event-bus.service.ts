import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

type Event = 'get-name';

interface EventData<T> {
  name: Event;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private subject$ = new Subject<EventData<unknown>>();

  constructor() {}

  emit<T>(event: Event, data: T) {
    this.subject$.next({ data: data, name: event });
  }

  on<T>(eventName: Event) {
    return this.subject$.pipe(
      filter((e) => e.name === eventName),
      map((e) => e.data as T)
    );
  }
}
