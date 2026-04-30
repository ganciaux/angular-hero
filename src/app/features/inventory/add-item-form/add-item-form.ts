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
  added = output<Omit<ItemModel, 'id'>>();

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
      name: this.name,
      type: this.type,
      quantity: this.quantity,
      equipped: false,
    });
    this.clear();
  }
}
