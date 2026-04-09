import { Component, output } from '@angular/core';
import { ItemModel } from '../inventory.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-item-form',
  imports: [FormsModule],
  templateUrl: './add-item-form.html',
  styleUrl: './add-item-form.scss',
})
export class AddItemForm {
  name = '';
  type = '';
  quantity = 1;
  added = output<ItemModel>();

  clear() {
    this.name = '';
    this.type = '';
    this.quantity = 1;
  }

  onSubmit() {
    if (!this.name || !this.type || this.quantity <= 0) {
      return;
    }
    this.added.emit({
      id: crypto.randomUUID(),
      name: this.name,
      type: this.type,
      quantity: this.quantity,
    } as ItemModel);
    this.clear();
  }
}
