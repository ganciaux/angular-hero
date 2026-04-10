import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'itemType', standalone: true })
export class ItemTypePipe implements PipeTransform {
  transform(type: string): string {
    if (type.toLowerCase() === 'sword') {
      return '⚔️ Sword';
    }
    if (type.toLowerCase() === 'potion') {
      return '🧪 Potion';
    }
    if (type.toLowerCase() === 'armor') {
      return '🛡️ Armor';
    }
    return '📦 ' + this.titlecase(type);
  }

  private titlecase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
