import { Component } from '@angular/core';
import { Child } from './child';
import { TodoItem } from './TodoItem';

@Component({
    selector: 'app-root',
    template: `
    <app-child (addItemEvent) = "addItem($event)"(incrementCountEvent) = "incrementCount($event)"/>
    <p>🐢 all the way down {{ items.length }}</p>
      <p>Count {{count}}</p>
    @for (item of items; track item.id){
      <p>{{item.message}}</p>
    }
  `,
    imports: [Child],
})
export class App {
    items = new Array<TodoItem>();
    count: number = 0;

    addItem(item: TodoItem) {
        this.items.push(item);
    }

    incrementCount(count: number) {
        this.count += 1;
    }
}