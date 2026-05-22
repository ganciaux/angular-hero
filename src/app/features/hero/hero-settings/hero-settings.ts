import { Component, inject, signal } from '@angular/core';
import { HeroClass } from '../hero.model';
import { form, max, min, minLength, required, FormField } from '@angular/forms/signals';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';

interface HeroFormData {
  name: string;
  heroClass: HeroClass;
  level: number;
}

@Component({
  selector: 'app-hero-settings',
  imports: [FormField],
  templateUrl: './hero-settings.html',
  styleUrl: './hero-settings.scss',
})
export class HeroSettings {
  router = inject(Router)
  heroService = inject(HeroService)
  heroModel = signal<HeroFormData>({
    name: this.heroService.hero().name,
    heroClass: this.heroService.hero().heroClass,
    level: this.heroService.hero().level,
  });
  
  heroForm = form(this.heroModel, (path) => {
    required(path.name, { message: 'Le nom est requis' });
    minLength(path.name, 2, { message: 'Minimum 2 caractères' });
    required(path.heroClass, { message: 'La classe est requise' });
    min(path.level, 1, { message: 'Level minimum est 1' });
    max(path.level, 5, { message: 'Level maximum est 5' });
  });

  onSubmit(){
    if (this.heroForm().valid()){
      const {name, level, heroClass} = this.heroModel();
      this.heroService.configure(name, heroClass, level)
      this.router.navigate(['/hero']);
    }
  
}
}
