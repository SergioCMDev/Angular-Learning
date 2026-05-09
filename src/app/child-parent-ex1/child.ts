import {Component, output} from '@angular/core';
import { TodoItem } from './TodoItem';
@Component({
  selector: 'app-child',
  styles: `
    .btn {
      padding: 50px;
    }
  `,
  template: ` <button class="btn" (click)="addItem()">Add Item</button> `,
})
export class Child {
  incrementCountEvent = output<number>();
  addItemEvent = output<TodoItem>();

  count = 0;

  addItem() {
    const element = new TodoItem(this.count, '🐢')
    this.addItemEvent.emit(element);
  }
  onClick(){
    this.count++;
    this.incrementCountEvent.emit(this.count)
  }
}
