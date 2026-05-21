import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-create',
  imports: [ReactiveFormsModule],
  templateUrl: './hero-create.html',
  styleUrl: './hero-create.scss',
})
export class HeroCreate {
  fb = inject(FormBuilder)
  heroService = inject(HeroService)
  router = inject(Router)
  
  form = this.fb.nonNullable.group({
    name: [this.heroService.hero().name, [Validators.required, Validators.minLength(2)]],
    heroClass : [this.heroService.hero().heroClass, [Validators.required]],
    level: [this.heroService.hero().level, [Validators.min(1), Validators.max(5)]],
  })

  onSubmit(){
    if (this.form.valid){
      const { name, heroClass, level } = this.form.getRawValue();
      this.heroService.configure(name, heroClass, level )
      this.router.navigate(['/hero'])

    }
  }

  onReset(){
    this.form.reset()
  }
}
