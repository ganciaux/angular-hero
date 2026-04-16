import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  protected isOpen=signal<boolean>(false);

  open(){
    this.isOpen.set(true);
  }

  close(){
    this.isOpen.set(false);
  }
}
