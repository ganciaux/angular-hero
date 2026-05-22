import { Component, signal } from '@angular/core';
import { HeroClass } from '../hero.model';

interface HeroFormData {
  name: string;
  heroClass: HeroClass;
  level: number;
}

@Component({
  selector: 'app-hero-settings',
  imports: [],
  templateUrl: './hero-settings.html',
  styleUrl: './hero-settings.scss',
})
export class HeroSettings {
heroModel = signal<HeroFormData>({name:'',heroClass:'warrior', level:1})

/*
heroForm = form(this.heroModel, (path) => {
  RequiredValidator(path.name, { message: 'Le nom est requis' });
  minLength(path.name, 2, { message: 'Minimum 2 caractères' });
  required(path.heroClass, { message: 'La classe est requise' });
  min(path.level, 1, { message: 'Level minimum est 1' });
  max(path.level, 5, { message: 'Level maximum est 5' });
});
*/
}
